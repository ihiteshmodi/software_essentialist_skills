import type { Clock, EmailService, IdGenerator, PaymentGateway } from '../../src/tickets/ports';

// Hand-written doubles: each implements the contract and records what happened.
export class FakePaymentGateway implements PaymentGateway {
  readonly charges: Array<{ card: string; amount: number }> = [];
  constructor(private readonly declinedCards: string[] = []) {}
  async charge(card: string, amount: number) {
    this.charges.push({ card, amount });
    return this.declinedCards.includes(card) ? 'declined' : 'approved';
  }
}

export class EmailServiceSpy implements EmailService {
  private calls: Array<{ to: string; template: string }> = [];
  async send(to: string, template: 'tickets-confirmed' | 'payment-declined' | 'refund-issued') { this.calls.push({ to, template }); }
  getTimesCalled() { return this.calls.length; }
  getCalls() { return [...this.calls]; }
}

export class FakeClock implements Clock {
  constructor(private current = new Date('2026-10-05T10:00:00Z')) {}
  now() { return new Date(this.current); }
  async tickForward(seconds: number) { this.current = new Date(this.current.getTime() + seconds * 1000); }
}

export class SequentialIds implements IdGenerator {
  private count = 0;
  next() { return `order-${++this.count}`; }
}
