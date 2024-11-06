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


# @user2 @web
# Scenario: Como usuario 2 inicio sesion y mandó un mensaje al usuario 1
#   Given I navigate to page "<URL>"
#   And I wait for 5 seconds