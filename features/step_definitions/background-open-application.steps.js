'use strict';
var assert = require('assert');

module.exports = function() {
  
  this.World = require(process.cwd() + '/features/support/world').World;

  this.Given(/^I have opened the grocery list application$/, function(callback) {
    this.groceryListApplication = this.openGroceryList();
    assert(this.groceryListApplication, 'Grocery List Application is required to be open for editability.');
    callback();
  });

};