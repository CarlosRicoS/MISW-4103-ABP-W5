Feature: Registro de un miembro

  @user1 @web
  Scenario: EP-017 Guardar miembro nuevo con formulario vacío.
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
  Scenario: EP-018 Guardar miembro nuevo con email inválido.
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to members section
    And I open member form
    And I add member name and invalid email
    And I submit the creation form with invalid email
    Then Form should display error "<EMAIL_MSG_MEMBER_CREATION>" for invalid email

  @user3 @web
  Scenario: EP-019 Mostrar advertencia al intentar salir de formulario de creación de miembro.
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to members section
    And I open member form
    And I go back to members section
    Then warning modal opens
    And I continue leaving the new member form
    And the browser redirects to members list

  @user4 @web
  Scenario: EP-020 Guardar nuevo miembro exitoso.
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to members section
    And I open member form
    And I add all the required member data
    And I submit the creation form with correct data
    And I wait for 1 seconds
    Then it should render member actions button
    And it should render signup info

