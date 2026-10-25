Feature: My orders
  As an attendee
  I want to see the orders I placed
  So that I know how many tickets I have

  Scenario: James sees his two orders and not other people's
    Given James placed orders for 3 and 2 tickets
    And Sally placed an order for 1 ticket
    When James views his orders
    Then he should see orders for 3 and 2 tickets
