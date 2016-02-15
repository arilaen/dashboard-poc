module.exports = function(config) {
  config.set({
    files: [
      'shared/**/*.spec.js',
    ],

    frameworks: ['jasmine'],

    preprocessors: {
      'shared/**/*.spec.js': ['webpack']
    },

    reporters: ['progress', 'mocha'],

    webpack: {
      module: {
        loaders: [
          { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
      },
      watch: true
    },

    webpackServer: {
      noInfo: true
    },

    plugins: [
      require('karma-webpack'),
      require('karma-mocha-reporter'),
      require('karma-jasmine'),
      require('karma-phantomjs-launcher')
    ],

    browsers: ['PhantomJS']

  });
};
