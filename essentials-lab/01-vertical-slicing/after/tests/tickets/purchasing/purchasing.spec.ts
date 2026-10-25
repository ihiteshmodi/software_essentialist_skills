import { fileURLToPath } from 'node:url';
import { describeFeature, loadFeature } from '@amiceli/vitest-cucumber';
import { expect } from 'vitest';
import { OrdersStore } from '../../../src/modules/tickets/ordersStore';
import { purchaseTickets, type PurchaseTicketsResult } from '../../../src/modules/tickets/purchasing/purchaseTickets';

const feature = await loadFeature(fileURLToPath(new URL('./purchasing.feature', import.meta.url)));

const JAMES = 'user-james';
const purchaseFor = (registered: string[]) =>
  purchaseTickets({ orders: new OrdersStore(), userExists: (id) => registered.includes(id) });

describeFeature(feature, ({ Scenario }) => {
  Scenario('James buys three tickets for his company', ({ Given, When, Then }) => {
    let purchase: ReturnType<typeof purchaseFor>;
    let result: PurchaseTicketsResult;

    Given('James is registered', () => { purchase = purchaseFor([JAMES]); });
    When('James buys 3 tickets', () => { result = purchase({ userId: JAMES, quantity: 3 }); });
    Then('an order should have been placed', () => { expect(result.type).toBe('OrderPlaced'); });
  });

  Scenario('An unknown user cannot buy tickets', ({ When, Then }) => {
    let result: PurchaseTicketsResult;

    When('someone who is not registered buys 3 tickets', () => {
      result = purchaseFor([])({ userId: 'user-nobody', quantity: 3 });
    });
    Then('they should be told they are unknown', () => { expect(result.type).toBe('UnknownUser'); });
  });

  Scenario('Nobody can buy more than ten tickets in one order', ({ Given, When, Then }) => {
    let purchase: ReturnType<typeof purchaseFor>;
    let result: PurchaseTicketsResult;

    Given('James is registered', () => { purchase = purchaseFor([JAMES]); });
    When('James buys 11 tickets', () => { result = purchase({ userId: JAMES, quantity: 11 }); });
    Then('he should be told the quantity is invalid', () => { expect(result.type).toBe('InvalidQuantity'); });
  });
});
