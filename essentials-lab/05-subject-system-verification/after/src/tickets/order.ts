export type OrderStatus = 'Pending' | 'Paid' | 'Cancelled' | 'Refunded';
export type OrderSnapshot = { id: string; email: string; quantity: number; total: number; status: OrderStatus; paidAt: string | null };

export class InvalidTransition {
  constructor(readonly from: OrderStatus, readonly to: OrderStatus) {}
}

const ALLOWED: Record<OrderStatus, OrderStatus[]> = {
  Pending: ['Paid', 'Cancelled'],
  Paid: ['Refunded'],
  Cancelled: [],
  Refunded: [],
};

// Level 2: a state machine. Callers can only move it along allowed arrows.
export class Order {
  private constructor(private props: OrderSnapshot) {}

  static create(input: { id: string; email: string; quantity: number; total: number }) {
    return new Order({ ...input, status: 'Pending', paidAt: null });
  }

  static fromSnapshot(snapshot: OrderSnapshot) {
    return new Order({ ...snapshot });
  }

  pay(at: Date) { return this.moveTo('Paid', { paidAt: at.toISOString() }); }
  cancel() { return this.moveTo('Cancelled'); }
  refund() { return this.moveTo('Refunded'); }

  get id() { return this.props.id; }
  get status() { return this.props.status; }
  get paidAt() { return this.props.paidAt ? new Date(this.props.paidAt) : null; }
  toSnapshot(): OrderSnapshot { return { ...this.props }; }

  private moveTo(next: OrderStatus, changes: Partial<OrderSnapshot> = {}) {
    if (!ALLOWED[this.props.status].includes(next)) return new InvalidTransition(this.props.status, next);
    this.props = { ...this.props, ...changes, status: next };
    return undefined;
  }
}
