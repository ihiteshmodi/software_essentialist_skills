export type OrderPlaced = { type: 'OrderPlaced'; orderId: string; customerId: string; email: string; quantity: number; total: number };
export type PaymentSucceeded = { type: 'PaymentSucceeded'; orderId: string; email: string };
export type PaymentFailed = { type: 'PaymentFailed'; orderId: string; email: string; quantity: number; reason: string };
export type DomainEvent = OrderPlaced | PaymentSucceeded | PaymentFailed;

export type Handler<T extends DomainEvent['type']> = (event: Extract<DomainEvent, { type: T }>) => Promise<void>;

export interface EventBus {
  publish(event: DomainEvent): Promise<void>;
  subscribe<T extends DomainEvent['type']>(type: T, name: string, handler: Handler<T>): void;
}

// Breadth-first, one-directional dispatch: events published by a handler are queued, not nested.
// A failing handler is recorded and never blocks the others. Production needs persistence (outbox).
export class InProcessEventBus implements EventBus {
  readonly published: DomainEvent[] = [];
  readonly failures: Array<{ handler: string; event: DomainEvent['type']; error: string }> = [];
  private handlers = new Map<string, Array<{ name: string; handle: (e: DomainEvent) => Promise<void> }>>();
  private queue: DomainEvent[] = [];
  private dispatching = false;

  subscribe<T extends DomainEvent['type']>(type: T, name: string, handler: Handler<T>) {
    const list = this.handlers.get(type) ?? [];
    list.push({ name, handle: handler as (e: DomainEvent) => Promise<void> });
    this.handlers.set(type, list);
  }

  async publish(event: DomainEvent) {
    this.published.push(event);
    this.queue.push(event);
    if (this.dispatching) return;
    this.dispatching = true;
    try {
      while (this.queue.length) {
        const next = this.queue.shift()!;
        for (const { name, handle } of this.handlers.get(next.type) ?? []) {
          try {
            await handle(next);
          } catch (error) {
            this.failures.push({ handler: name, event: next.type, error: (error as Error).message });
          }
        }
      }
    } finally {
      this.dispatching = false;
    }
  }
}
