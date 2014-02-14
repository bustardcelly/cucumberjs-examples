'use strict';
var fs = require('fs');
var path = require('path');
var map = require('map-stream');
var tmpl = require('lodash.template');
var browserify = require('browserify');
var mkdirp = require('mkdirp');

var output = process.cwd() + '/build';

var wrap = function(wrapperTemplate) {
  return map(function(file, cb) {
    var content = file.toString();
    fs.readFile(path.resolve(wrapperTemplate), 'utf8', function(err, filedata) {
      cb(null, tmpl(filedata, {yield:content}));
    });
  });
};

var bundleApp = function(callback) {
  browserify(process.cwd() + '/script/app.js')
    .bundle({
      standalone: 'app'
    })
    .pipe(fs.createWriteStream(output + '/script/app.js'))
    .on('close', function() {
      if(callback) {
        callback();
      }
    });
};

var templateApp = function(callback) {
  fs.createReadStream(process.cwd() + '/template/app-main.us')
    .pipe(wrap(process.cwd() + '/template/wrapper.us'))
    .pipe(fs.createWriteStream(output + '/index.html'))
    .on('close', function() {
      if(callback) {
        callback();
      }
    });
};

mkdirp.sync(output + '/script');
bundleApp(templateApp);