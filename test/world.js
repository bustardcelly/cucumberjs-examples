!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.world=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],2:[function(_dereq_,module,exports){
(function (process){/*global window, document*/
'use strict';

var World = function World(callback) {

  this.window = process.browser ? window : {};
  this.app = undefined;
  this.groceryListApplication = undefined;

  var defineGlobals = function(w, doc) {
    this.app = w.app;
  };

  this.domload = function(callback) {
    (function(world) {
      if(document.readyState === 'complete') {
        defineGlobals.call(world, window, document);
        callback();  
      }
      else {
        var delegate = document.addEventListener ? 'addEventListener' : 'attachEvent';
        var eventType = document.addEventListener ? 'load' : 'onload';
        window[delegate](eventType, function() {
          defineGlobals.call(world, window, document);
          callback();
        });
      }
    }(this));
  };

  this.openGroceryList = function() {
    return this.app.newSession();
  };
  this.createGroceryItem = function() {
    return 'apple';
  };

  this.getGroceryListView = function() {
    return this.groceryListApplication.$listview;
  };

  this.getGroceryListViewItemAtIndex = function(index) {
    return this.groceryListApplication.$listview.childNodes[index].textContent;
  }

  this.emptyGroceryListView = function() {
    this.groceryListApplication.empty();
  };

  this.enterNewGorceryListItem = function(item) {
    this.groceryListApplication.enterNewItem(item);
  };

  this.createClickEvent = function() {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, false);
    return event;
  };

  this.clickAddGroceryListItem = function() {
    var clickevent = this.createClickEvent();
    this.groceryListApplication.$addbutton.dispatchEvent(clickevent);
  };

  callback();

};

module.exports.World = World;}).call(this,_dereq_("/Users/toddanderson/Documents/workspace/custardbelly/cucumberjs-browser/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/toddanderson/Documents/workspace/custardbelly/cucumberjs-browser/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":1}]},{},[2])
(2)
});