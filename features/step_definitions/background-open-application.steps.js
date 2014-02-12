'use strict';
var assert = require('assert');

module.exports = function() {
  
  this.World = require('../support/world').World;

  this.Given(/^I have opened the grocery list application$/, function(callback) {
    (function(world) {
      world.domload(function() {
        world.groceryListApplication = world.openGroceryList();
        assert(world.groceryListApplication, 'Grocery List Application is required to be open for editability.');
        callback();
      });
    }(this));
  });

};