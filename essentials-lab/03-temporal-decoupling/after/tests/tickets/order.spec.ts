import { describe, expect, it } from 'vitest';
import { InvalidTransition, Order } from '../../src/modules/tickets/domain/order';

const placed = () => Order.place({ id: 'o1', customerId: 'james', quantity: 3, unitPrice: 100 }) as Order;

// Level 2: one test per arrow and per forbidden arrow.
describe('Order', () => {
  describe('place', () => {
    it('starts out placed with the total price', () => {
      const order = placed();
      expect(order.getStatus()).toBe('Placed');
      expect(order.total).toBe(300);
    });

    it.each([0, 11, 2.5])('knows %s tickets is an invalid quantity', (quantity) => {
      expect(Order.place({ id: 'o1', customerId: 'james', quantity, unitPrice: 100 })).toBe('InvalidQuantity');
    });
  });

  describe('confirm', () => {
    it('moves a placed order to confirmed', () => {
      const order = placed();
      order.confirm();
      expect(order.getStatus()).toBe('Confirmed');
    });

    it('knows a cancelled order cannot be confirmed', () => {
      const order = placed();
      order.cancel();
      expect(order.confirm()).toEqual(new InvalidTransition('Cancelled', 'Confirmed'));
      expect(order.getStatus()).toBe('Cancelled');
    });
  });

  describe('cancel', () => {
    it('moves a placed order to cancelled', () => {
      const order = placed();
      order.cancel();
      expect(order.getStatus()).toBe('Cancelled');
    });

    it('knows a confirmed order cannot be cancelled', () => {
      const order = placed();
      order.confirm();
      expect(order.cancel()).toBeInstanceOf(InvalidTransition);
    });
  });
});
