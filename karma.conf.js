// Karma configuration

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    frameworks: ['qunit'],

    // list of files / patterns to load in the browser
    files: ['arlement.spec.js'],

    // preprocess matching files before serving them to the browser
    preprocessors: {
      'arlement.spec.js': ['rollup']
    },

    rollupPreprocessor: {
      output: {
        format: 'umd'
      }
    },

    // test results reporter to use
    reporters: ['progress'],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    browsers: ['Chrome', 'Firefox'],

    // Continuous Integration mode
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
