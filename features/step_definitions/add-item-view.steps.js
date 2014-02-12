var assert = require('assert');

module.exports = function() {
  'use strict';

  var enteredItem;

  this.World = require('../support/world').World;

  this.Given(/^I have an empty grocery list view$/, function(callback) {
    this.emptyGroceryListView();
    assert.equal(this.getGroceryListView().childNodes.length, 0);
    callback();
  });

  this.When(/^I provide a valid grocery list item name$/, function(callback) {
    enteredItem = this.createGroceryItem();
    this.enterNewGorceryListItem(enteredItem);
    callback();
  });

  this.When(/^I select to add an item$/, function(callback) {
    this.clickAddGroceryListItem();
    callback();
  });

  this.Then(/^The item is added to the grocery list view$/, function(callback) {
    assert.equal(this.getGroceryListViewItemAtIndex(0), enteredItem, 'Entered item should be first in empty list.');
    callback();
  });

  this.Then(/^The item is accessible from the grocery list collection$/, function(callback) {
    assert.equal(this.groceryListApplication.list.getItemIndex(enteredItem), 0, 'Added item should be found at first index.');
    callback();
  });

};