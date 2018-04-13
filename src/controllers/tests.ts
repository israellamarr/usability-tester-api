import { Request, Response, Router } from 'express';
import * as webdriver from 'webdriverio' ;

import Build from '../domain/build';
import { PathAssertions } from '../domain/path-assertions';
import Persona from '../domain/persona';
import Resolution from '../domain/resolution';
import Test from '../domain/test';
import BuildModel from '../models/build';
import TestService from '../services/test-service';

import AWS from 'aws-sdk';
import fs from 'fs';

import Config from '../config';

const WDIO_CONF = process.env.NODE_ENV === 'production' ? './wdioconfig/wdio-docker.conf.js' : './wdioconfig/wdio-server.conf.js';
const TEST_RESULTS_DIR = 'test_results';
const testsRouter: Router = Router();
const testService = new TestService();

AWS.config.update( {
  region: 'us-east-1',
  accessKeyId: Config.S3.awsAccessKeyId,
  secretAccessKey: Config.S3.awsSecret
} );

/**
 * Connects to a Selenium server to execute the designated test and upload the results to s3.
 *
 * @formParam { string } test_id: Unique asset id indicating which asset to test ex. LWP-001
 * @formParam { Resolution } resolution: object with x, y and title indicating desired viewport config
 */
testsRouter.post( '/start/', ( req: Request, res: Response ) => {
  const test_id = req.body.test_id;
  const resolution: Resolution = req.body.resolution;
  const persona: Persona = req.body.persona;
  const pathAssertions: PathAssertions = req.body.pathAssertions;
  const build_id = `${ test_id }-${ new Date().getTime() }`;

  if ( test_id && build_id ) {
    startBuild( test_id, build_id, resolution, persona, pathAssertions );
    res.json( {
      success: true,
      response: `Starting test ${ test_id }`
    } );
  } else {
    res.json( {
      success: false,
      response: `Failed to start test ${ test_id }`
    } );
  }
} );

function startBuild ( test_id: string, build_id: string, resolution: Resolution, persona: Persona, pathAssertions: PathAssertions ) {
  const filename = `${ test_id }-${ new Date().getTime() }`;
  if ( ! fs.existsSync( './screenshots' ) ) {
    fs.mkdirSync( './screenshots' );
  }
  const testScreenshots = `./screenshots/${ filename }`;
  if ( ! fs.existsSync( testScreenshots ) ) {
    fs.mkdirSync( testScreenshots );
  }

  const wdio_config = {
    reporterOptions: {
      filename,
      combined: true,
      outputDir: `${ TEST_RESULTS_DIR }/${ test_id }`
    },
    screenshotPath: `./screenshots/${ filename }`,
    specs: [ `./tests/**/${ test_id }.spec.js` ],
    resolution,
    persona,
    pathAssertions,
    test_id
  };

  const WDIO = new webdriver.Launcher( WDIO_CONF, wdio_config );
  const build_data: Build = {
    build_id,
    start_time: new Date(),
    test_id
  };
  saveBuildData( build_data, () => {
    WDIO.run().then( ( resp: any ) => {
      const testData = buildTestData( test_id, filename, resolution );
      removeBuild( build_id );
      uploadResultsToS3( testData );
    }, ( error: string ) => {
      console.error( 'testData', error );
      removeBuild( build_id );
    } );
  } );
}

/**
 * Builds a Test domain object out of test data
 * @param {string} testID asset identifier ex. LWP-001
 * @param {string} filename combination of a testID and timestamp for identifying instances of a test
 *                 ex. LWP-004-1517195951256
 * @param {Resolution} resolution x, y and name of resolution
 * @returns {Test}
 */
function buildTestData ( testID: string, filename: string, resolution: Resolution ): Test {
  const resultsFile: string = fs.readFileSync( `${ TEST_RESULTS_DIR }/${ testID }/${ filename }.json`, 'UTF8' );

  const result: any = JSON.parse( resultsFile );
  let suite: any;
  if ( result.suites.length > 0 ) {
    suite = result.suites[0];
  }
  return {
    browser: result.capabilities.browserName,
    duration: suite.duration,
    end: new Date( suite.end ),
    failed: result.state.failed,
    passed: result.state.passed,
    results: resultsFile,
    skipped: result.state.skipped,
    start: new Date( suite.start ),
    test_id: testID,
    test_path: filename,
    resolution
  };
}

/**
 * Creates a Build document
 * @param {Build} build
 * @param {() => void} callback
 */
function saveBuildData ( build: Build, callback: () => void ) {
  BuildModel.create( build, ( err: {}, newBuild: Test ) => {
    if ( err ) {
      console.error( err );
    } else {
      callback();
    }
  } );
}

/**
 * Removes the build with the designated buildID
 * @param {Build} build_id
 */
function removeBuild ( build_id: string ) {
  BuildModel.deleteOne( {
    build_id
  }, err => {
    if ( err ) {
      console.error( err );
    }
  } );
}

function uploadResultsToS3 ( test: Test ) {
  const s3 = new AWS.S3();
  const rootPath = 'screenshots';
  const s3ResultsPath = 'captures';
  const testPath = test.test_path;
  const files = fs.readdirSync( `${ rootPath }/${ testPath }` );
  const s3Locations: string[] = [];
  let completed = 0;

  console.log( files );
  console.log( 'Uploading screenshots... Files will be located at ' + s3ResultsPath + '/' + testPath + '/' );

  if ( files.length ) {
    for ( const fileName of files ) {
      fs.readFile( `${ rootPath }/${ testPath }/${ fileName }`, function ( err: any, data: any ) {
        if ( !err ) {
          const base64data = new Buffer( data, 'binary' );
          const config = {
            Bucket: Config.S3.bucket,
            Key: `${ s3ResultsPath }/${ testPath }/${ fileName }`,
            Body: base64data,
            ACL: 'public-read',
            ContentType: 'image/png'
          };

          s3.upload ( config, function ( error: any, s3Data: any ) {
            if ( error ) {
              console.log( 'Error', error );
            }

            if ( s3Data ) {
              completed ++;
              s3Locations.push( s3Data.Location );
              if ( completed === files.length ) {
                console.log( 'Upload complete' );
                test.screenshots = s3Locations;
                testService.saveTest( test ).then(
                  null,
                  testError => console.log( testError )
                );
              }
            }
          } );
        } else {
          console.log( err );
        }
      } );
    }
  } else {
    console.log( 'No screenshots!' );
    test.screenshots = [];
    testService.saveTest( test ).then(
      null,
      testError => console.log( testError )
    );
  }
}

export default testsRouter;
