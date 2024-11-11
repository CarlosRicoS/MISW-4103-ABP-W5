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