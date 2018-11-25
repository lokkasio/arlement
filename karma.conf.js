// Karma configuration

const baseConfig = {
  basePath: '',

  frameworks: ['qunit'],

  files: ['arlement.spec.js'],

  preprocessors: {
    'arlement.spec.js': ['rollup']
  },

  rollupPreprocessor: {
    output: {
      format: 'umd'
    }
  },

  reporters: ['dots'],

  autoWatch: false,

  browsers: ['Firefox'],

  singleRun: true
}

const customLaunchers = {
  sl_win10_edge_14: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    version: '14'
  },
  sl_win10_chrome_49: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 10',
    version: '49'
  },
  sl_win10_firefox_51: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Windows 10',
    version: '51'
  },
  sl_macos1011_safari_10: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.11',
    version: '10'
  },
  sl_ios_safari: {
    appiumVersion: '1.8.0',
    base: 'SauceLabs',
    browserName: 'Safari',
    deviceName: 'iPhone Simulator',
    platformVersion: '10.0',
    platformName: 'iOS'
  },
  sl_android_chrome: {
    appiumVersion: '1.9.1',
    base: 'SauceLabs',
    browserName: 'Chrome',
    deviceName: 'Android GoogleAPI Emulator',
    platformVersion: '6.0',
    platformName: 'Android'
  }
}

const sauceLabsConfig = {
  reporters: ['dots', 'saucelabs'],

  browsers: Object.keys(customLaunchers),

  singleRun: true,

  concurrency: 2,

  sauceLabs: {
    testName: 'Arlement',
    recordScreenshots: false,
    recordVideo: false,
    startConnect: false,
    build: process.env.TRAVIS_BUILD_NUMBER,
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
  },

  customLaunchers: customLaunchers
}

module.exports = function (config) {
  if (process.env.TRAVIS) {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
      console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
      process.exit(1)
    }

    config.set(Object.assign(baseConfig, sauceLabsConfig))
  } else {
    config.set(baseConfig)
  }
}
