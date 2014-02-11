var assert = require('assert');

module.exports = function() {
  'use strict';

  this.World = require('../support/world').World;

  this.Given(/^I have an empty grocery list view$/, function(callback) {
    this.emptyGroceryListView();
    assert.equal(this.groceryListView.childNodes.length, 0);
    callback();
  });

  this.When(/^I select to add an item$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^I can provide a name for the grocery list item$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.When(/^I provide a valid grocery list item name$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^The item is added to the grocery list view$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

  this.Then(/^The item is accessible from the grocery list collection$/, function(callback) {
    // express the regexp above with the code you wish you had
    callback.pending();
  });

};