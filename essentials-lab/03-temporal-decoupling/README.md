# Lab 03 · Temporal Decoupling

> "The reality is that requirements are temporal."
> "When you do place order, what's happening is Amazon is dispatching an event."

**The essential:** end each slice at its own state change and publish an event; handlers start the next slices. Model the success path first, then the failures with compensating events.

## Smell (`before/src/makePurchase.ts`)
A transaction script: reserve seats → charge card → save order → send email → track analytics, all awaited in one call. `before/tests/makePurchase.spec.ts` **passes while documenting the damage**:
- a declined card leaves seats reserved with no order (inconsistent state);
- an email outage fails the whole purchase *after* the customer was charged, and analytics never runs.

## Fix (`after/`)
```
PlaceOrder ──publishes──▶ OrderPlaced
   OrderPlaced ─▶ inventory.reserveSeats
   OrderPlaced ─▶ billing.chargeCustomer ──▶ PaymentSucceeded | PaymentFailed
   OrderPlaced ─▶ analytics.track
   PaymentSucceeded ─▶ tickets.confirmOrder, notifications.ticketsConfirmed
   PaymentFailed    ─▶ tickets.cancelOrder, inventory.releaseSeats (compensation), notifications.paymentFailed
```
- `PlaceOrder` only places the order (state `Placed`) and announces it. Its test asserts the event, not emails.
- `Order` is a state machine: `Placed → Confirmed | Cancelled`, nothing leaves the end states (`order.spec.ts`, one test per arrow and forbidden arrow).
- `compose.ts` lists every "after X, do Y" policy as one subscription, in one place.
- `InProcessEventBus` dispatches breadth-first (events raised inside handlers are queued) and isolates failures: a failing handler is recorded in `bus.failures` and never blocks the others.

`purchaseFlow.spec.ts` widens the subject to include the bus and shows: happy path; declined card → order cancelled, seats released, customer told; mail outage → order still confirmed, only that handler failed.

## What to notice
- Each handler is its own slice with its own test (`chargeCustomer.spec.ts`).
- The bus is in-process: a crash loses queued events. Production needs persistence (an outbox) and idempotent handlers. That's an architecture decision, not something to bolt on later.

## Exercises
1. New policy: "when payment fails, retry once after 2 days". Which event, which handler, which module? Inject a clock.
2. Add "after an order is confirmed, update the attendee count dashboard". How many existing files change? (Answer: `compose.ts` plus the new handler.)
3. Make `reserveSeats` fail when sold out. What compensation should happen? Write the flow test first.

Skill: `event-driven-decoupling`. Course: essentials-physical--temporal-decoupling, ddd-feedbook--aggregates (`makePurchase`).
