# Lab 05 · Subject/System Verification

> "It's us placing a boundary around the thing we want to verify to be able to tell if it's going to help us achieve a goal."
> "It's okay to mock… just make sure you mock correctly. You want parity between what's real and fake."

**The essential:** put a boundary around exactly one guess and verify it with the right kind of check: **result** (input → output), **state** (act, then inquire), or **communication** (did it call its collaborators correctly). Keep every fake honest with a contract test.

## Smell (`before/`)
`purchaseTickets` checks `result.ok`, but the payment SDK (`provider-sdk.ts`) actually returns `{ status }`.
- `purchaseTickets.mocked.spec.ts`: library-mock soup (`vi.mock` × 3). The mocked payment returns `{ ok: true }`. **Green.**
- `purchaseTickets.real.spec.ts`: the same code with the real SDK **declines every good card**. Nothing connected the mock to reality: "we're only testing our mocks."

## Fix (`after/`), one test file per guess point
| Level | File | Verification |
|---|---|---|
| 1 Stateless | `pricing.spec.ts` | Result: `it.each` table (group discount at 5+, early-bird price) |
| 2 Stateful | `order.spec.ts` | State: `Pending → Paid → Refunded`, `Pending → Cancelled`; one test per arrow and forbidden arrow; named states from `doubles/orderStates.ts` (builder) |
| 3 Application | `purchaseTickets.spec.ts` | Result + state + **communication** with hand-written `FakePaymentGateway` and `EmailServiceSpy` |
| 3 + time | `refundOrder.spec.ts` | `FakeClock.tickForward(15 days)`: the refund window closes without waiting or patching globals |
| 4 Outgoing adapter | `contracts.spec.ts` | Contract: one spec looped over in-memory + SQLite repositories, fake + provider payment gateways, system + fake clocks |

## What to notice
- While building this lab, the contract spec caught a real parity bug: the SQLite repository leaked an extra `paid_at` key that the in-memory fake didn't have. That is exactly what contract tests are for.
- The payment contract would have caught the `before/` bug too: the provider adapter must return `'approved'` for a good card.
- Spies live in their own files (`tests/doubles/`) and implement the contract; no inline mock objects.
- Time is a role. *Knowing when* (the 14-day window) lives in the use case, not the entity.

## Exercises
1. Change `ProviderPaymentGateway` to return `response.ok` like the `before/` code. Which test fails?
2. Add "refund only if the conference hasn't started". Which level? Which double changes?
3. Add a third `OrdersRepository` actor (e.g. JSON file). Add it to the contract list and make it pass.

Skills: `test-strategy`, `test-doubles-and-contracts`, `tdd-test-writing`. Course: essentials-physical--subject-system-verification, testing--contract-tests.
