import { describe, expect, it } from 'vitest';
import { OrdersStore } from '../../src/modules/tickets/ordersStore';
import { PlaceOrder } from '../../src/modules/tickets/placing/placeOrder';
import { InProcessEventBus } from '../../src/shared/eventBus';

const command = { orderId: 'o1', customerId: 'james', email: 'james@example.com', quantity: 3, unitPrice: 100 };

// Level 3: the command only places the order and announces it. No billing, email or stock here.
describe('PlaceOrder', () => {
  it('saves a placed order and publishes OrderPlaced', async () => {
    const orders = new OrdersStore();
    const bus = new InProcessEventBus();

    const result = await new PlaceOrder(orders, bus).execute(command);

    expect(result).toEqual({ type: 'OrderPlaced', orderId: 'o1' });
    expect((await orders.get('o1'))?.getStatus()).toBe('Placed');
    expect(bus.published).toEqual([
      { type: 'OrderPlaced', orderId: 'o1', customerId: 'james', email: 'james@example.com', quantity: 3, total: 300 },
    ]);
  });

  it('knows an invalid quantity places nothing and announces nothing', async () => {
    const bus = new InProcessEventBus();

    const result = await new PlaceOrder(new OrdersStore(), bus).execute({ ...command, quantity: 0 });

    expect(result.type).toBe('InvalidQuantity');
    expect(bus.published).toEqual([]);
  });
});
