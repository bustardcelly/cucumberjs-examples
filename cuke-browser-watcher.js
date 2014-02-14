#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var map = require('map-stream');
var tmpl = require('lodash.template');
var watch = require('node-watch');
var child_process = require('child_process');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var browserify = require('browserify');

var http = require('http');
var tinylr = require('tiny-lr');
var connect = require('connect');
var open = require('open');
var S = require('string');

var tempdir = '.tmp';
var outdir = 'test';
var browserCukes;

var livereloadPort = 35729;
var connectPort = 8080;
var JS_EXT = /^.*\.js/i;
var options = ['-f', 'ui',
               '-o', outdir,
               '--tmpl', tempdir + '/testrunner.html'];

var wrap = function(wrapperTemplate) {
  return map(function(file, cb) {
    var content = file.toString();
    fs.readFile(path.resolve(wrapperTemplate), 'utf8', function(err, filedata) {
      cb(null, tmpl(filedata, {yield:content}));
    });
  });
};

// [TASKS]
// a. re-bundle the app.
var bundleApplication = function(f, callback) {
  return function() {
    browserify(__dirname + '/script/app.js')
      .bundle({
        standalone: 'app'
      })
      .pipe(fs.createWriteStream(path.resolve(outdir + '/script/app.js')))
      .on('close', function() {
        console.log('changed app.js...');
        if(callback) {
          callback();
        }
      });
  };
};
// b. template testrunner with app partial.
var templateTestRunner = function(callback) {
  fs.createReadStream(__dirname + '/template/app-main.us')
    .pipe(wrap(__dirname + '/template/testrunner-wrapper.us'))
    .pipe(fs.createWriteStream(path.resolve(tempdir + '/testrunner.html')))
    .on('close', function() {
      if(callback) {
        callback();
      }
    });
};
// c. rerun cucumberjs-browser tool.
var cuke = function(f, callback) {
  return function() {
    var filename = S(path.basename(f, '.js').split('.').join('-')).camelize().s;
    // templateTestRunner(function() {
      browserCukes = child_process.spawn('cucumberjs-browser', options)
        .on('exit', function() {
          console.log('changed ' + filename + '...');
          rimraf(tempdir, function() {
            if(callback) {
              callback();
            }
          });
        });
    // });
  };
};

// 1. Recursive mkdir /test/script if not exist.
mkdirp.sync(outdir + '/script');
mkdirp.sync(tempdir);

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
  cuke('./features/support/world', function() {
    bundleApplication('./script/app.js', function() {
      open('http://localhost:' + connectPort + '/cucumber-testrunner.html');  
    })();
  })();
});

// 4. Watch source and generate bundles.
watch(['./features', './script'], {recursive:true}, function(filename) {
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
    var bundleAppInvoke = bundleApplication(filename, function() {
      lr.changed({
        body: {
          files: ['script/app']
        }
      });
      resolver();
    });
    if(/^script?/i.test(filename)) {
      resolver = resolveWatch(1);
      bundleAppInvoke();
    }
    else if(/^features?/i.test(filename)) {
      resolver = resolveWatch(2);
      cuke(filename, function() {
        lr.changed({
          body: {
            files: [filename]
          }
        });
        resolver();
        bundleAppInvoke();
      })();
    }
  }

});