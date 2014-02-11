#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var watch = require('node-watch');
var child_process = require('child_process');
var mkdirp = require('mkdirp');
var browserify = require('browserify');

var http = require('http');
var tinylr = require('tiny-lr');
var connect = require('connect');
var open = require('open');
var S = require('string');

var outdir = 'test';
var browserCukes;

var livereloadPort = 35729;
var connectPort = 8080;
var JS_EXT = /^.*\.js/i;
var options = ['-f', 'ui',
               '-o', outdir,
               '--tmpl', 'template/testrunner.html'];

// 1. Recursive mkdir /test/script if not exist.
mkdirp.sync(outdir + '/script');

// 2. Create tiny-livereload server.
var lr = tinylr();
lr.listen(livereloadPort, function() {
  console.log('livereload listening on ' + livereloadPort + '...');
});

// 3. Start server on localhost.
var app = connect().use(connect.static(__dirname + '/test'));
var server = http.createServer(app).listen(connectPort, function() {
  console.log('local server started on ' + connectPort + '...');
  console.log('Note: Remember to start the livereload browser extension!');
  console.log('http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-');
  open('http://localhost:' + connectPort + '/cucumber-testrunner.html');
});

// [TASKS]
// a. re-bundle the app.
var bundleApplication = function(f, resolver) {
  return function(callback) {
    browserify(__dirname + '/script/app.js')
      .bundle({
        standalone: 'app'
      })
      .pipe(fs.createWriteStream(path.resolve(outdir + '/script/app.js')))
      .on('close', function() {
        console.log('changed app.js...');
        lr.changed({
          body: {
            files: ['script/app.js']
          }
        });
        resolver();
        if(callback) {
          callback();
        }
      });
  };
};
// b. rerun cucumberjs-browser tool.
var cuke = function(f, resolver) {
  return function(callback) {
    var filename = S(path.basename(f, '.js').split('.').join('-')).camelize().s;
    browserCukes = child_process.spawn('cucumberjs-browser', options)
      .on('exit', function() {
        console.log('changed ' + filename + '...');
        lr.changed({
          body: {
            files: [filename]
          }
        });
        resolver();
        if(callback) {
          callback();
        }
      });
  };
};

// 4. Watch source and generate bundles.
watch(['./features/step_definitions', './script'], {recursive:true}, function(filename) {
  // Used to resolve when running operation(s) are complete.
  var resolver;
  var running = false;
  var resolveWatch = function(limit) {
    var count = 0;
    running = true;
    return function() {
      if(++count === limit) {
        count = 0;
        running = false;
      }
      else {
        running = true;
      }
    };
  };

  if(!running && filename.match(JS_EXT)) {
    if(/^script?/i.test(filename)) {
      resolver = resolveWatch(1);
      bundleApplication(filename, resolver)();
    }
    else if(/^features?/i.test(filename)) {
      resolver = resolveWatch(2);
      cuke(filename, resolver)(bundleApplication(filename, resolver));
    }
  }

});