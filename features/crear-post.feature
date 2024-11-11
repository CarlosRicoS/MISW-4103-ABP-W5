Feature: Crear post

  @user1 @web
  Scenario: EP-06 Crear un post en el mismo instante
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to posts section
    And I wait for 1 seconds
    And I open post form
    And I wait for 1 seconds
    And I fill post form
    And I wait for 1 seconds
    And I publish post
    And I wait for 1 seconds
    Then I should see the published post confirmation

  @user2 @web
  Scenario: EP-07 Crear un post y programar fecha de lanzamiento
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to posts section
    And I wait for 1 seconds
    And I open post form
    And I wait for 1 seconds
    And I fill post form
    And I wait for 1 seconds
    And I schedule post
    And I wait for 1 seconds
    Then I should see the published post confirmation

    @user3 @web
  Scenario: EP-08 Guardar un post en la seccion de borradores
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to posts section
    And I wait for 1 seconds
    And I open post form
    And I wait for 1 seconds
    And I fill post form
    And I wait for 1 seconds
    And I draft the post
    Then I should see the post in the admin section as a draft

    @user4 @web
  Scenario: EP-10 Eliminar un post
    Given I navigate to page "<URL>"
    And I wait for 1 seconds
    When I login with email "<USERNAME>" and password "<PASSWORD>"
    And I wait for 1 seconds
    And I go to posts section
    And I wait for 1 seconds
    And I open post form
    And I wait for 1 seconds
    And I fill post form
    And I wait for 1 seconds
    And I delete the post
    Then I shouldnt see the post in the admin section