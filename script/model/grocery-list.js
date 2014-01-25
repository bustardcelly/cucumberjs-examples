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