module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.html': ['html2js']
    },

    files: [
      '*.js',
      '*.html'
    ],

    browsers: ['Chrome'],

    reporters: ['dots'],

    plugins: [
      'karma-html2js-preprocessor',
      'karma-chrome-launcher'
    ]
  });
};