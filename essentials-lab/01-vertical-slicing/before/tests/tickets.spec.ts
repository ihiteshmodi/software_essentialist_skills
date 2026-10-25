import { describe, expect, it } from 'vitest';
import { OrderRepository } from '../src/repositories/orderRepository';
import { UserRepository } from '../src/repositories/userRepository';
import { TicketService } from '../src/services/ticketService';
import { UserService } from '../src/services/userService';

describe('ticket service', () => {
  it('purchase and list', () => {
    const users = new UserService(new UserRepository());
    const tickets = new TicketService(new OrderRepository(), users);
    const userId = users.register('james@example.com', 'secret').user!.id;

    tickets.purchase(userId, 3);

    expect(tickets.list(userId)).toHaveLength(1);
    expect(tickets.purchase('nobody', 3).error).toBe('unknown user');
    expect(tickets.purchase(userId, 0).error).toBe('invalid quantity');
  });
});
