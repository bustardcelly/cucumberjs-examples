!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.app=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/*global document*/
'use strict';

var GroceryList = _dereq_('./model/grocery-list');

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
},{"./model/grocery-list":2}],2:[function(_dereq_,module,exports){
'use strict';

var groceryList = {
  empty: function() {
    this.list.length = 0;
  },
  add: function(item) {
    this.list.push(item);
  },
  getAll: function() {
    return this.list;
  },
  getItemIndex: function(value) {
    var index = this.list.length;
    while(--index > -1) {
      if(this.list[index] === value) {
        return index;
      }
    }
    return -1;
  }
};

module.exports = {
  create: function() {
    return Object.create(groceryList, {
      'list': {
        value: [],
        writable: false,
        enumerable: true  
      }
    });
  }
};
},{}]},{},[1])
(1)
});