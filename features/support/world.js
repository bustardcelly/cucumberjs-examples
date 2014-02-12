/*global window, document*/
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

module.exports.World = World;