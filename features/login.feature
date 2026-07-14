Feature: Login
  As a user of SauceDemo
  I want to log in
  So that I can access the inventory

  Scenario: Standard user can log in successfully
    Given I am on the login page
    When I log in as the "standard" user
    Then the inventory page should load

  Scenario: Locked-out user cannot log in
    Given I am on the login page
    When I log in as the "locked" user
    Then I should see an error message