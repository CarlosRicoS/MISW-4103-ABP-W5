Feature: Visualizar los posts

  @user1 @web
  Scenario: EP-011 Ver todos los posts
    Given I navigate to page "<URL>"
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I go to posts section
    And I select the all filter
    Then The url now shouldn't have parameters

  @user2 @web
  Scenario: EP-012 Ver posts para miembros
    Given I navigate to page "<URL>"
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I go to posts section
    And I select the access filter
    Then The url now should have visibility for members parameter

  @user3 @web
  Scenario: EP-013 Ver posts de un solo autor
    Given I navigate to page "<URL>"
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I go to posts section
    And I select the author filter
    Then The url now should have the author parameter

  @user4 @web
  Scenario: EP-014 Ver posts de un tag
    Given I navigate to page "<URL>"
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I go to posts section
    And I select the tag filter
    Then The url now should have the news tag parameter

  @user5 @web
  Scenario: EP-015 Ver posts ordenados de manera ascendente
    Given I navigate to page "<URL>"
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I go to posts section
    And I select the order
    Then The url now should have the order parameter
