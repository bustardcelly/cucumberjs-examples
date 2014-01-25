'use strict';

var application = require(process.cwd() + '/script/app');

var World = function World(callback) {

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