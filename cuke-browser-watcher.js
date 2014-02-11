#!/usr/bin/env node
var fs = require('fs');
var watch = require('node-watch');
var child_process = require('child_process');
var mkdirp = require('mkdirp');
var browserify = require('browserify');
var running = false;
var outdir = 'test';
var browserCukes;

var JS_EXT = /^.*\.js/i;
var options = ['cucumberjs-browser', 
               '-f', 'ui',
               '-o', outdir,
               '--tmpl', 'template/testrunner.html'];

// Recursive mkdir /test/script if not exist.
mkdirp.sync(outdir + '/script');
// Watch source and generate bundles.
watch(['./features/step_definitions', 'script'], {recursive:true}, function(filename) {
  
  if(!running && filename.match(JS_EXT)) {

    running = true;

    // if /script/*
    browserify('./script/app.js')
      .bundle({
        standalone: 'app.js'
      })
      .pipe(fs.createWriteStream('./' + outdir + '/script'))
      .on('close', function() {
        // Live Reload.
      });

    // else if features
    browserCukes = child_process.spawn('node', options)
                    .on('exit', function() {
                      running = false;
                      // Live Reload.
                    });

  }

});