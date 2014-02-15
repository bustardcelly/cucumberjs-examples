!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.cukefeatures=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = "Feature: Shopper can add and view new item in Grocery List&crarr"+
"  As a shopper using the browser-based app&crarr"+
"  I want to add an item to my grocery list view&crarr"+
"  So that I can remember to buy that item at the grocery store&crarr"+
"&crarr"+
"  Background: Grocery List Application is Open&crarr"+
"    Given I have opened the grocery list application&crarr"+
"&crarr"+
"  Scenario: Submit of valid item adds item to list&crarr"+
"    Given I have an empty grocery list view&crarr"+
"    When I provide a valid grocery list item name&crarr"+
"    And I select to add an item&crarr"+
"    Then The item is added to the grocery list view&crarr"+
"&crarr"+
"  Scenario: Submit of valid item adds item to collection&crarr"+
"    Given I have an empty grocery list view&crarr"+
"    When I provide a valid grocery list item name&crarr"+
"    And I select to add an item&crarr"+
"    Then The item is accessible from the grocery list collection&crarr"+"&crarr"+
"Feature: Shopper can add an item to their Grocery List&crarr"+
"  As a shopper&crarr"+
"  I want to add an item to my grocery list&crarr"+
"  So that I can remember to buy that item at the grocery store&crarr"+
"&crarr"+
"  Background: Grocery List Application is Open&crarr"+
"    Given I have opened the grocery list application&crarr"+
"&crarr"+
"  Scenario: Item added to grocery list&crarr"+
"    Given I have an empty grocery list&crarr"+
"    When I add an item to the list&crarr"+
"    Then The grocery list contains a single item&crarr"+
"&crarr"+
"  Scenario: Item accessible from grocery list&crarr"+
"    Given I have an empty grocery list&crarr"+
"    When I add an item to the list&crarr"+
"    Then I can access that item from the grocery list&crarr";
},{}]},{},[1])
(1)
});