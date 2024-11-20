Feature: App rc

  @user1 @web @dataIndex=1
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
