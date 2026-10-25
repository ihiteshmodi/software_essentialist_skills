import type { Order } from './order';

export interface OrdersRepository {
  save(order: Order): Promise<void>;
  getById(id: string): Promise<Order | null>;
}

export interface PaymentGateway {
  charge(card: string, amount: number): Promise<'approved' | 'declined'>;
}

export interface EmailService {
  send(to: string, template: 'tickets-confirmed' | 'payment-declined' | 'refund-issued'): Promise<void>;
}

export interface Clock {
  now(): Date;
  tickForward(seconds: number): Promise<void>;
}

export interface IdGenerator {
  next(): string;
}
