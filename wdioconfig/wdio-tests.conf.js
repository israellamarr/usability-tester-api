if ( process.env.RUN_MODE !== 'production' ) {
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
    specs: [

    ],
    // define specific suites
    suites: {
      demo: [
        './tests/demo/**/*.spec.*'
      ],
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
    seleniumLogs: './test-results/selenium',
    sync: true,
    bail: 1,
    coloredLogs: true,
    // screenshotPath: './screenshots',
    waitforTimeout: 5000, // Timeout for all 'waitForX' calls
    reporters: [ 'spec', 'json' ],
    reporterOptions: {
      outputDir: './test-results/',
      filename: 'test-results'
    },

    framework: 'jasmine',
    jasmineNodeOpts: {
      defaultTimeoutInterval: 5000 // Maximum length of a single test
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

    after: function ( result, capabilities, specs ) {
    }
  };
} else {
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
    specs: [
      './tests-dist/**/*spec.js'
    ],
    // define specific suites
    suites: {
      demo: [
        './tests-dist/demo/**/*.spec.js'
      ]
    },
    //

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
    seleniumLogs: './test-results/selenium',
    sync: true,
    coloredLogs: true,
    screenshotPath: './test-results/screenshots',
    waitforTimeout: 7500, // Timeout for all 'waitForX' calls
    reporters: [ 'spec', 'json' ],
    reporterOptions: {
      outputDir: './test-results/',
      filename: 'test-results'
    },

    framework: 'jasmine',
    jasmineNodeOpts: {
      defaultTimeoutInterval: 10000 // Maximum length of a single test
    },

    before: function( data ) {
      require( '../tests-dist/utils/custom-browser-commands.js');
    },

    onPrepare: function( data ) {
    },

    onComplete: function( data ) {

    },

    beforeTest: function ( data ) {
    },

    after: function ( result, capabilities, specs ) {
    }
  };
}


