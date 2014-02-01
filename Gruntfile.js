module.exports = function(grunt) {
  'use strict';
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      cucumber: {
        files: ['features/**/*.js', 'script/**/*.js'],
        tasks: ['cucumberjs']
      }
    },
    cucumberjs: {
      src: 'features',
      options: {
        steps: 'features/step_definitions',
        format: 'pretty'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-cucumber');

  grunt.registerTask('watch-tests', 'Starts a watch for test automation.', ['watch:cucumber']);

};