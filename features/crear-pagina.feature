Feature: Crear página

  @user1 @web
  Scenario: EP_01 Crear una página nueva y publicarla de inmediato
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to pages section
    And I wait for 1 seconds
    And I open page form
    And I wait for 1 seconds
    And I fill page form
    And I wait for 1 seconds
    And I publish page
    And I wait for 1 seconds
    Then I should see the published page confirmation

  @user2 @web
  Scenario: EP_02 Crear una página nueva y guardarla como borrador
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to pages section
    And I wait for 1 seconds
    And I open page form
    And I wait for 1 seconds
    And I fill page form
    And I wait for 1 seconds
    And I return to pages section
    And I wait for 1 seconds
    Then I should see the page in the admin section as a draft

  @user3 @web
  Scenario: EP_03 Crear una página nueva y previsualizar la publicación
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to pages section
    And I wait for 1 seconds
    And I open page form
    And I wait for 1 seconds
    And I fill page form
    And I wait for 1 seconds
    And I preview page
    And I wait for 1 seconds
    Then I should see the preview of the new page
    And I wait for 1 seconds
    And I return to pages section