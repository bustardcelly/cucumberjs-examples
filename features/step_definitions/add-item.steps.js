'use strict';
var assert = require('assert');

var GroceryList = require(process.cwd() + '/script/model/grocery-list');

module.exports = function() {

  var myList,
      listItem = 'apple';

  this.Given(/^I have an empty grocery list$/, function(callback) {
    myList = GroceryList.create();
    callback();
  });

  this.When(/^I add an item to the list$/, function(callback) {
    myList.add(listItem);
    callback();
  });

  this.Then(/^The grocery list contains a single item$/, function(callback) {
    assert.equal(myList.getAll().length, 1, 'Grocery List should grow by one item.');
    callback();
  });

  this.Then(/^I can access that item from the grocery list$/, function(callback) {
    assert.notEqual(myList.getItemIndex(listItem), -1, 'Added item should be found at non-negative index.');
    callback();
  });

};