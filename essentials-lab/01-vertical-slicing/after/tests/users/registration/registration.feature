Feature: Registration
  As a conference attendee
  I want to create an account with my email
  So that I can buy tickets

  Scenario: James registers with a valid email
    Given nobody has registered with "james@example.com"
    When James registers with "james@example.com"
    Then James should be registered

  Scenario: Registration fails for an email that is already taken
    Given someone has registered with "james@example.com"
    When James registers with "JAMES@example.com"
    Then he should be told the email is already taken

  Scenario: Registration fails for an invalid email
    When James registers with "james-at-example"
    Then he should be told the email is invalid
