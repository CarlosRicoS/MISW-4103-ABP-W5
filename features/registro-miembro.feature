Feature: Registro de un miembro

  @user1 @web
  Scenario: EP_017 Guardar miembro nuevo con formulario vacío.
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to members section
    And I open member form
    And I submit the creation form empty
    And I wait for 1 seconds
    Then Form should display error "<NEW_MEMBER_ERROR_MSG>" for empty email


  @user2 @web
  Scenario: EP_018 Guardar miembro nuevo con email inválido.
    Given I navigate to page "<URL>"
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

  @user3 @web
  Scenario: EP_019 Mostrar advertencia al intentar salir de formulario de creación de miembro.
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to members section
    And I open member form
    And I go back to members section
    Then warning modal opens
    And I wait for 1 seconds
    And I continue leaving the new member form
    And I wait for 1 seconds
    And the browser redirects to members list

  @user4 @web
  Scenario: EP_020 Guardar nuevo miembro exitoso.
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to members section
    And I open member form
    And I wait for 1 seconds
    And I add all the required member data
    And I wait for 1 seconds
    And I submit the creation form with correct data
    And I wait for 1 seconds
    Then it should render member actions button
    And I wait for 1 seconds
    And it should render signup info

