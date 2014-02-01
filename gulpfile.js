var gulp = require('gulp');
var watch = require('gulp-watch');
var child_process = require('child_process');

var cucumber;
var running = false;
var options = ['node_modules/.bin/cucumber-js', 
               'features', 
               '-r', 'features/step_definitions',
               '-f', 'pretty'];

gulp.task('cucumber', function() {
  if(!running) {
    running = true;
    cucumber = child_process.spawn('node', options)
                    .on('exit', function() {
                      running = false;
                    });
    cucumber.stdout.on('data', function(d) {
      console.log(String(d));
    });

    cucumber.stderr.on('data', function(d) {
      console.error(String(d));
    });
  }
});

gulp.task('watch-tests', function() {
  gulp.src(['features/**/*.js', 'script/**/*.js'])
      .pipe(watch(function() {
        gulp.run('cucumber');
      }));
});