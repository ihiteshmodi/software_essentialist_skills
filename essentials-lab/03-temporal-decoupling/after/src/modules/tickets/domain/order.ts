export type OrderStatus = 'Placed' | 'Confirmed' | 'Cancelled';

export class InvalidTransition {
  constructor(readonly from: OrderStatus, readonly to: OrderStatus) {}
}

// State machine: Placed → Confirmed | Cancelled. Nothing leaves Confirmed or Cancelled.
export class Order {
  private constructor(
    readonly id: string,
    readonly customerId: string,
    readonly quantity: number,
    readonly total: number,
    private status: OrderStatus,
  ) {}

  static place(input: { id: string; customerId: string; quantity: number; unitPrice: number }): Order | 'InvalidQuantity' {
    if (!Number.isInteger(input.quantity) || input.quantity < 1 || input.quantity > 10) return 'InvalidQuantity';
    return new Order(input.id, input.customerId, input.quantity, input.quantity * input.unitPrice, 'Placed');
  }

  confirm(): InvalidTransition | undefined { return this.moveTo('Confirmed'); }
  cancel(): InvalidTransition | undefined { return this.moveTo('Cancelled'); }
  getStatus() { return this.status; }

  private moveTo(next: OrderStatus) {
    if (this.status !== 'Placed') return new InvalidTransition(this.status, next);
    this.status = next;
    return undefined;
  }
}
