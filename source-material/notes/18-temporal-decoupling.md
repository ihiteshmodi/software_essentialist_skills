# Lesson 18 — Physical Essential: Temporal Decoupling
- **Source file:** 18) Physical Essential Temporal Decoupling.txt
- **Category:** essential-physical
- **Topics:** temporal-decoupling, domain-events, event-handlers, policies, event-driven-architecture, coupling, idempotency, compensating-events, unit-of-work, feature-folders, redux, reactivity

## Summary
Temporal decoupling addresses requirements that are inherently about time — "after this," "before that," "when this happens, if X is true, in prod vs dev." Stuffing these into the end, start, or middle of an existing vertical slice creates coupling: steps block one another, and a failure midway (e.g. notification service) leaves the system inconsistent. Instead, a completed slice publishes an event (e.g. `OrderPlaced`) and event handlers trigger new vertical slices, possibly in entirely different systems. The Amazon checkout example illustrates billing, notifications, inventory, fulfillment, and analytics all reacting asynchronously, plus failure chains (`CustomerChargeFailed` → notify, wait, retry). Implementing this requires an event-based architecture; covered deeply in Pattern First and Responsibility First.

## Core ideas
- Vertical slicing + horizontal decoupling give a **grid** / "perpendicular awareness" (up/down, left/right) to find where things live: feature folders → operations → layers. Navigate like a table of contents: `source → modules → domain → feature → operation` → the misbehaving component.
- But new requirements often arrive in temporal form: "after this, do this work," "before this happens, do this work," "when this happens, under this circumstance, if this is already true," "if running in production/dev, do this."
- Khalil's past code: in an app helping students get jobs, he kept appending functionality *after a job was posted* inside the same operation — "a terrible way to add functionality that comes afterwards," but very common.
- Why bad: **coupling** — to verify the follow-up steps you must run everything else; steps wait on each other; if the notification service fails, subsequent important steps don't happen and the system is left in an undefined state.
- **Requirements are temporal**: always "after this, before that, only when this happens" — i.e. policies.
- Scalable alternative: **temporal decoupling** — decouple functionality using **events**.
- Flow: complete executing a vertical slice (e.g. trading app `make trade`) → publish event → handlers run follow-up slices.
- Amazon example: `place order` does NOT synchronously bill, email, update inventory, create fulfillment details, and log analytics — that would make requests too slow ("probably no one would be using Amazon"). Instead it publishes `OrderPlaced`; other infrastructure listens; **event handlers** invoke new vertical slices, sometimes in entirely different systems.
  - Billing system listens to `OrderPlaced` → tries to charge the card on file.
  - If charge fails → dispatch `CustomerChargeFailed` → per some policy, notification service listens, sends a notification, waits a couple of days before retrying.
- This complexity is necessary for keeping the system consistent (Khalil ties this to **idempotency**).
- Front end: likely already has this (reactivity is needed in every front-end architecture; Redux does this).
- Back end: contains more higher-level policy, so it's important to decouple operations and think through success/failure paths and **compensating events**.
- Khalil admits he's not an expert here himself — "I just know a lot from the experts."
- Guess points: requires an **event-based architecture** — the entire system becomes "event enabled"; influences everything from the system level down, since it's fundamental to what the system is.

## Named frameworks / mental models
- **Temporal decoupling (physical essential)**
  - Purpose: add time-dependent requirements (after/before/when/policies) without jamming them into existing slices.
  - Components: vertical slice completes → publishes **domain event** → **event handlers** (subscribers) → invoke new vertical slices (possibly other systems/subdomains) → which may publish further events (incl. failure/compensating events).
  - When to use: any "after X, do Y" / policy requirement; side-effects like notifications, billing, inventory, analytics.
- **The grid / table-of-contents navigation**: feature (vertical) × layer (horizontal) → find any code.
- **Requirements are temporal**: reframe incoming requirements as time/policy statements.
- **Event chain modeling** (Amazon): `PlaceOrder` → `OrderPlaced` → Billing charges card → `CustomerChargeFailed` → Notification policy (notify, wait, retry).

## Definitions
- **Coupling** — the tightness or interconnectedness of modules or lines of code.
- **Temporal decoupling** — decoupling functionality using events, instead of slotting new operations inside existing ones.
- **Event handlers** — pieces of infrastructure that listen for an event (e.g. `OrderPlaced`) and call new vertical slices.
- **Policy** — "only when this happens / under this circumstance" rule reacting to events (as used in the transcript).
- **Idempotency** — as the course states it here: "anytime we do anything in our system, it's going to keep the system in a consistent state." (Note: standard definition is that repeating an operation has the same effect as doing it once — the course's phrasing is closer to consistency/atomicity; inferred.)
- **Compensating events** — events created to handle/react to failures in decoupled operations (e.g. charge failed).
- **Event-based architecture** — system shaped so it is event-enabled throughout.

## Rules & heuristics
- Don't append follow-up work to the end/top/middle of an existing vertical slice with conditionals.
- Publish an event when a slice completes; let handlers trigger subsequent slices.
- Think through what happens if each decoupled operation succeeds and if it fails; design compensating events.
- Don't block the user's request on work that can happen later (billing, email, inventory, fulfillment, analytics).
- Treat requirements phrased as "after/before/when/if" as signals for events and policies.

## Anti-patterns / mistakes called out
- Continually adding functionality after a core action inside the same operation (Khalil's "after job posted" code).
- Sequential blocking calls where one failure (notification service) prevents other important work.
- Having to execute unrelated work just to verify one follow-up behavior (coupling harms testability).
- Environment checks ("if production/dev, do this") embedded inline (inferred link to Lesson 19).

## Code discussed
Khalil showed (on screen, not read aloud) code from his student-jobs app where more and more steps were appended after posting a job; only a notification service call is named in narration. Shape (names other than notification service are inferred placeholders):
```ts
// reconstructed from narration
async function postJob(input) {
  const job = await saveJob(input);
  await notificationService.notify(job); // if this fails, the remaining steps never run
  // ...more "after job is posted" work kept getting appended here
  return job;
}
```
Target shape (inferred from narration):
```ts
// reconstructed from narration
// PlaceOrder slice completes -> publish OrderPlaced
// Billing handler: on OrderPlaced -> ChargeCustomer slice
//   -> on failure publish CustomerChargeFailed
// Notification policy: on CustomerChargeFailed -> notify, wait a couple of days, retry
```

## Diagrams / visual models described
- Grid of vertical slices (features/operations) × horizontal layers used for navigation.
- Amazon event flow: Place Order → `OrderPlaced` → listeners (billing, notification email, inventory, fulfillment, analytics) → Billing → `CustomerChargeFailed` → Notification service → retry after delay.
- Guess points: event-based architecture affecting everything from the system level down.

## Notable quotes
- "The reality is that requirements are temporal."
- "Requirements always come in this form of after this, before that, or only when this happens, policies."
- "Coupling really just means the tightness or the interconnectedness of modules or lines of code."
- "What happens if notification service fails, then we're not going to be doing the other important things."
- "When you do place order, what's happening is Amazon is dispatching an event."
- "This topic is even one that I am not particularly an expert in. I just know a lot from the experts."

## Cross-references
- Lesson 16 (Vertical Slicing), Lesson 17 (Horizontal Decoupling) — together form the grid.
- Lesson 20 (Subject/System Verification — mail service removed from create-user diagram due to temporal decoupling).
- Lesson 19 (Composition — environment-dependent behavior, inferred).
- Patterns: Unit of Work, event-based backend architecture, Redux (front-end reactivity), domain events.
- Phases: Pattern First (unit of work, event-based backend), Responsibility First (building custom things), guess points.

## Fluff skipped
Greeting and sign-off ("[Tim Astro]" = "to mastery").

## AI-era relevance hint
- AI agents default to appending side-effects inline at the end of a function; recognizing temporal requirements and pushing them to events/handlers is a key human design call.
- Failure-path/compensation thinking (what if step 3 fails?) is rarely covered by generated code and must be specified or reviewed explicitly.

## Coverage proof
- Lines read: 60 / 60
- Final line (verbatim): "right here and I'll see you in the next one. As always, Tim Astro. you"
