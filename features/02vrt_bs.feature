Feature: App base

 @user1 @web @bs
  Scenario: EP_01 Crear una página nueva y publicarla de inmediato
    Given I navigate to page "<URL_BS>"
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


 @user2 @web @bs
  Scenario: EP_02 Crear una página nueva y guardarla como borrador
    Given I navigate to page "<URL_BS>"
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

 @user3 @web @bs
  Scenario: EP_04 Editar título y contenido de una página existente y publicarla
    Given I navigate to page "<URL_BS>"
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

 @user4 @web @bs
  Scenario: EP_05 Editar página publicada, cambiar a borrador y previsualizar
    Given I navigate to page "<URL_BS>"
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

 @user5 @web @bs
  Scenario: EP_06 Crear un post en el mismo instante
    Given I navigate to page "<URL_BS>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 5 seconds
    And I go to posts section
    And I wait for 1 seconds
    And I open post form
    And I wait for 1 seconds
    And I fill post form
    And I wait for 1 seconds
    And I publish post
    And I wait for 2 seconds
    Then I should see the published post confirmation

 @user6 @web @bs
  Scenario: EP_07 Crear un post y programar fecha de lanzamiento
    Given I navigate to page "<URL_BS>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 5 seconds
    And I go to posts section
    And I wait for 1 seconds
    And I open post form
    And I wait for 1 seconds
    And I fill post form
    And I wait for 1 seconds
    And I schedule post
    And I wait for 2 seconds
    Then I should see the published post confirmation

 @user7 @web @bs
  Scenario: EP_011 Ver todos los posts
    Given I navigate to page "<URL_BS>"
    And I wait for 5 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 10 seconds
    And I go to posts section
    And I wait for 10 seconds
    And I select the all filter
    And I wait for 10 seconds
    Then The url now shouldn't have parameters

  @user8 @web @bs
  Scenario: EP_012 Ver posts para miembros
    Given I navigate to page "<URL_BS>"
    And I wait for 5 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 10 seconds
    And I go to posts section
    And I wait for 10 seconds
    And I select the access filter
    And I wait for 10 seconds
    Then The url now should have visibility for members parameter

 @user9 @web @bs
  Scenario: EP_017 Guardar miembro nuevo con formulario vacío.
    Given I navigate to page "<URL_BS>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to members section
    And I open member form
    And I submit the creation form empty
    And I wait for 1 seconds
    Then Form should display error "<NEW_MEMBER_ERROR_MSG>" for empty email

 @user10 @web @bs
  Scenario: EP_018 Guardar miembro nuevo con email inválido.
    Given I navigate to page "<URL_BS>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to members section
    And I wait for 1 seconds
    And I open member form
    And I wait for 1 seconds
    And I add member name and invalid email
    And I wait for 1 seconds
    And I submit the creation form with invalid email
    Then Form should display error "<EMAIL_MSG_MEMBER_CREATION>" for invalid email