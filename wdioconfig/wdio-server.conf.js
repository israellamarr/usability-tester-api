var fs = require('fs');

exports.config = {
  services: [ 'selenium-standalone' ],
  seleniumArgs: {
    version: '3.7.0',
    drivers: {
      chrome: {
        version: '2.33'
      }
    }
  },

  seleniumInstallArgs: {
    version: '3.7.0',
    drivers: {
      chrome: {
        version: '2.33'
      }
    }
  },

  /**
   * server configurations
   */
  maxInstances: 1,
  /**
   * specify tests files
   */
  specs: [],
  // define specific suites
  suites: {
    demo: [
      './tests/demo/**/*.spec.js'
    ],
    otherFeature: [
      // ...
    ]
  },

  /**
   * capabilities
   */
  capabilities: [ {
    browserName: 'chrome',
    "loggingPrefs": {
      "browser": "ALL",
      "driver": "ALL"
    }
  } ],
  /**
   * tests configurations
   */
  logLevel: 'silent',
  seleniumLogs: './seleniumLogs',
  sync: true,
  coloredLogs: true,
  screenshotPath: './screenshots',
  waitforTimeout: 15000, // Timeout for all 'waitForX' calls
  reporters: [ 'spec', 'json' ],
  reporterOptions: {
    outputDir: './testsoutput',
    filename: 'results'
  },

  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 20000 // Maximum length of a single test
  },

  before: function( data ) {
    require( 'ts-node/register' );
    require( '../tests/utils/custom-browser-commands.ts');
  },

  onPrepare: function( data ) {
  },

  onComplete: function( data ) {

  },
  
  beforeTest: function ( data ) {

  },

  after: function (result, capabilities, specs) {
    
  }
};
