import type { EventBus } from '../../../shared/eventBus';
import { Order } from '../domain/order';
import type { OrdersStore } from '../ordersStore';

export type PlaceOrderCommand = { orderId: string; customerId: string; email: string; quantity: number; unitPrice: number };
export type PlaceOrderResult = { type: 'OrderPlaced'; orderId: string } | { type: 'InvalidQuantity' };

// The slice ends at its own state change: "an order should have been placed".
export class PlaceOrder {
  constructor(private readonly orders: OrdersStore, private readonly bus: EventBus) {}

  async execute(cmd: PlaceOrderCommand): Promise<PlaceOrderResult> {
    const order = Order.place({ id: cmd.orderId, customerId: cmd.customerId, quantity: cmd.quantity, unitPrice: cmd.unitPrice });
    if (order === 'InvalidQuantity') return { type: 'InvalidQuantity' };

    await this.orders.save(order);
    await this.bus.publish({
      type: 'OrderPlaced', orderId: order.id, customerId: order.customerId, email: cmd.email, quantity: order.quantity, total: order.total,
    });
    return { type: 'OrderPlaced', orderId: order.id };
  }
}
