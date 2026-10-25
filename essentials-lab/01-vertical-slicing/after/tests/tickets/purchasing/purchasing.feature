Feature: Purchasing tickets
  As a registered attendee buying for my company
  I want to buy several tickets at once
  So that my team can attend together

  Scenario: James buys three tickets for his company
    Given James is registered
    When James buys 3 tickets
    Then an order should have been placed

  Scenario: An unknown user cannot buy tickets
    When someone who is not registered buys 3 tickets
    Then they should be told they are unknown

  Scenario: Nobody can buy more than ten tickets in one order
    Given James is registered
    When James buys 11 tickets
    Then he should be told the quantity is invalid
