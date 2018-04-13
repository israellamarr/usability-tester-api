exports.config = {
  /**
   * server configurations
   */
  maxInstances: 1,
  host: 'localhost',
  port: 4444,
  /**
   * specify tests files
   */
  specs: [],
  // define specific suites
  suites: {
    demo: [
      './tests-dist/tests/demo/**/*.spec.js'
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
  sync: false,
  coloredLogs: true,
  screenshotPath: './screenshots',
  waitforTimeout: 1000, // Timeout for all 'waitForX' calls
  reporters: [ 'spec', 'json' ],
  reporterOptions: {
    outputDir: './testoutput',
    filename: 'results'
  },

  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 1000 // Maximum length of a single test
  },

  before: function() {
    require( '../tests-dist/tests/utils/custom-browser-commands.js');
  },

  onPrepare: function() {

  },
  onComplete: function() {

  }
};
