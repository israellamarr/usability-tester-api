import bodyParser from 'body-parser';
import express, { Express } from 'express';
import Mongoose from 'mongoose';

import assetsRouter from './controllers/assets';
import authRouter from './controllers/auth';
import testsRouter from './controllers/tests';

const healthcheck = require ( 'express-healthcheck' );

import Config from './config';

const appInstance = express();
const DEFAULT_PORT = process.env.NODE_ENV === 'production' ? 80 : 3000;

function setUpApp( app: Express ) {
  app.set( 'port', process.env.PORT || DEFAULT_PORT );
  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded( { extended: true } ) );
}

function setupRoutes( app: Express ) {
  app.use( '/healthcheck' ,  healthcheck() );
  app.use( function( req, res, next ) {
    res.header( 'Access-Control-Allow-Origin', '*' );
    res.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS' );
    res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
    next();
  } );
  app.use( '/auth', authRouter );
  app.use( '/assets', assetsRouter );
  app.use( '/tests', testsRouter );
}

function startApp( app: Express ) {
  Mongoose.connect( Config.mongo.URL );

  app.listen( app.get( 'port' ), () => {
    console.log( ( 'App is running at http://localhost:%d in %s mode' ),
      app.get( 'port' ), app.get( 'env' ) );
    console.log( 'Press CTRL-C to stop\n' );
  } );
}

setUpApp( appInstance );
setupRoutes( appInstance );
startApp( appInstance );
