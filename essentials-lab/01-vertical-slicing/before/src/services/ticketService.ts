import { OrderRepository } from '../repositories/orderRepository';
import { UserService } from './userService';
import { generateId, isValidQuantity } from '../utils/helpers';

export class TicketService {
  constructor(private orders: OrderRepository, private users: UserService) {}

  purchase(userId: string, quantity: number) {
    if (!this.users.exists(userId)) return { error: 'unknown user' };
    if (!isValidQuantity(quantity)) return { error: 'invalid quantity' };
    const order = { id: generateId(), userId, quantity };
    this.orders.add(order);
    return { order };
  }

  list(userId: string) {
    return this.orders.findByUser(userId);
  }
}
