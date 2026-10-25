import { fileURLToPath } from 'node:url';
import { describeFeature, loadFeature } from '@amiceli/vitest-cucumber';
import { expect } from 'vitest';
import { getMyOrders, type MyOrderView } from '../../../src/modules/tickets/my-orders/getMyOrders';
import { OrdersStore } from '../../../src/modules/tickets/ordersStore';

const feature = await loadFeature(fileURLToPath(new URL('./my-orders.feature', import.meta.url)));

describeFeature(feature, ({ Scenario }) => {
  Scenario("James sees his two orders and not other people's", ({ Given, And, When, Then }) => {
    const orders = new OrdersStore();
    let view: MyOrderView[];

    Given('James placed orders for 3 and 2 tickets', () => {
      orders.add({ id: 'o1', userId: 'james', quantity: 3 });
      orders.add({ id: 'o2', userId: 'james', quantity: 2 });
    });
    And('Sally placed an order for 1 ticket', () => {
      orders.add({ id: 'o3', userId: 'sally', quantity: 1 });
    });
    When('James views his orders', () => { view = getMyOrders(orders)('james'); });
    Then('he should see orders for 3 and 2 tickets', () => {
      expect(view.map((o) => o.tickets)).toEqual([3, 2]);
    });
  });
});
