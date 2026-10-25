Feature: Registration
  As a conference attendee
  I want to register with my email
  So that I can buy tickets later

  Scenario: James registers and his account is saved
    Given James has not registered yet
    When James registers with his email
    Then James should be able to find his registration

  Scenario: Registering twice with the same email is refused
    Given James has registered
    When James registers again with the same email
    Then he should be told the email is already taken
