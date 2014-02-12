/*global document*/
'use strict';

var GroceryList = require('./model/grocery-list');

var application = {
  init: function(list) {
    this.list = list;
    this.$listview = document.querySelector('#grocery-list');
    this.$itemInputView = document.querySelector('#item-input');
    this.$addbutton = document.querySelector('#add-button');
    (function(app) {
      app.$addbutton.addEventListener('click', function(event) {
        var item = app.$itemInputView.value;
        app.addItemToView(item);
        app.list.add(item);
      });
    }(this));
    return this;
  },
  empty: function() {
    var gl = this.$listview;
    while (gl.hasChildNodes()) {
      gl.removeChild(gl.lastChild);
    }
    this.list.empty();
  },
  enterNewItem: function(item) {
    this.$itemInputView.value = item;
  },
  addItemToView: function(item) {
    var li = document.createElement('li');
    var text = document.createTextNode(item);
    li.appendChild(text);
    this.$listview.appendChild(li);
  }
};

module.exports = {
  newSession: function() {
    var newList = GroceryList.create();
    return Object.create(application).init(newList);
  }
};