/*global window*/
'use strict';

// NOTE: had to use relative url for require in steps in order to properly bundle dependencies.
var application = require('../../script/app');

var World = function World(callback) {

  // this.window = process.browser ? window : {};
  
  this.groceryListApplication = undefined;

  this.openGroceryList = function() {
    return application.newSession();
  };
  this.createGroceryItem = function() {
    return 'apple';
  };

  callback();

};

module.exports.World = World;