Feature: Visualizar los posts

  @user1 @web
  Scenario: EP_011 Ver todos los posts
    Given I navigate to page "<URL>"
    And I wait for 5 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 10 seconds
    And I go to posts section
    And I wait for 10 seconds
    And I select the all filter
    And I wait for 10 seconds
    Then The url now shouldn't have parameters

  @user2 @web
  Scenario: EP_012 Ver posts para miembros
    Given I navigate to page "<URL>"
    And I wait for 5 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 10 seconds
    And I go to posts section
    And I wait for 10 seconds
    And I select the access filter
    And I wait for 10 seconds
    Then The url now should have visibility for members parameter

  @user3 @web
  Scenario: EP_013 Ver posts de un solo autor
    Given I navigate to page "<URL>"
    And I wait for 5 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 10 seconds
    And I go to posts section
    And I wait for 10 seconds
    And I select the author filter
    And I wait for 10 seconds
    Then The url now should have the author parameter

  @user4 @web
  Scenario: EP_014 Ver posts de un tag
    Given I navigate to page "<URL>"
    And I wait for 5 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 10 seconds
    And I go to posts section
    And I wait for 10 seconds
    And I select the tag filter
    And I wait for 10 seconds
    Then The url now should have the news tag parameter

  @user5 @web
  Scenario: EP_015 Ver posts ordenados de manera ascendente
    Given I navigate to page "<URL>"
    And I wait for 5 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 10 seconds
    And I go to posts section
    And I wait for 10 seconds
    And I select the order
    And I wait for 10 seconds
    Then The url now should have the order parameter
