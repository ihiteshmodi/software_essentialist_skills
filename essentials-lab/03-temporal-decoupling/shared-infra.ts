export class Inventory {
  constructor(public seatsLeft: number) {}
  async reserve(quantity: number) {
    if (quantity > this.seatsLeft) throw new Error('Sold out');
    this.seatsLeft -= quantity;
  }
  async release(quantity: number) { this.seatsLeft += quantity; }
}

export class PaymentProvider {
  charges: Array<{ customerId: string; amount: number }> = [];
  constructor(private declineCustomers: string[] = []) {}
  async charge(customerId: string, amount: number) {
    if (this.declineCustomers.includes(customerId)) throw new Error('Card declined');
    this.charges.push({ customerId, amount });
  }
}

export class Mailer {
  sent: Array<{ to: string; template: string }> = [];
  constructor(public down = false) {}
  async send(to: string, template: string) {
    if (this.down) throw new Error('Mail provider unavailable');
    this.sent.push({ to, template });
  }
}

export class Analytics {
  events: string[] = [];
  async track(event: string) { this.events.push(event); }
}
