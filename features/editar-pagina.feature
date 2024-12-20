Feature: Editar Página
  @user1 @web
    Scenario: EP_04 Editar título y contenido de una página existente y publicarla
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
      And I wait for 1 seconds
      And I close the published page modal
      And I wait for 1 seconds
      And I open current page form
      And I wait for 1 seconds
      And I fill page form with new title and content
      And I wait for 1 seconds
      And I update page
      And I wait for 1 seconds
      Then I should see the updated notification

  @user2 @web
    Scenario: EP_05 Editar página publicada, cambiar a borrador y previsualizar
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to pages section
    And I wait for 1 seconds
    And I open current page form
    And I wait for 1 seconds
    And I edit published status to unpublished
    And I wait for 1 seconds
    Then I should see revert to draft notification

  @user3 @web
  Scenario: EP_16 Editar una página asignando un tag
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to pages section
    And I wait for 1 seconds
    And I open current page form
    And I wait for 1 seconds
    And I update page tag
    And I wait for 5 seconds