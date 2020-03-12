Feature: Create a new auth
  In order to have auths in the platform
  As a normal user  permissions
  I want to create a new auth

  Scenario: A valid unexisting auth
    Given I send a POST request to "/add/auth" with body:
    """
    {
      "name": "John",
      "email": "john@mail.com",
      "password": "password",
    }
    """
    Then the response status code should be 200
    And the response should be {auth: ok ,token}
