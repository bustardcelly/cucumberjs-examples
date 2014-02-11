Feature: Shopper can add an item to their Grocery List
  As a shopper
  I want to add an item to my grocery list
  So that I can remember to buy that item at the grocery store

  Background: Grocery List Application is Open
    Given I have opened the grocery list application

  Scenario: Item added to grocery list
    Given I have an empty grocery list
    When I add an item to the list
    Then The grocery list contains a single item

  Scenario: Item accessible from grocery list
    Given I have an empty grocery list
    When I add an item to the list
    Then I can access that item from the grocery list