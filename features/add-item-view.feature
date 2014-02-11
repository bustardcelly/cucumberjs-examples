Feature: Shopper can add and view new item in Grocery List
  As a shopper using the browser-based app
  I want to add an item to my grocery list view
  So that I can remember to buy that item at the grocery store

  Background: Grocery List Application is Open
    Given I have opened the grocery list application

  Scenario: Select of Add Item opens input
    Given I have an empty grocery list view
    When I select to add an item
    Then I can provide a name for the grocery list item

  Scenario: Submit of valid item adds item to list
    Given I have an empty grocery list view
    When I select to add an item
    And I provide a valid grocery list item name
    Then The item is added to the grocery list view

  Scenario: Submit of valid item adds item to collection
    Given I have an empty grocery list view
    When I select to add an item
    And I provide a valid grocery list item name
    Then The item is accessible from the grocery list collection