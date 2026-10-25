# Lesson 95 — Part 2: Reviewing The Upfront Design & Next Steps

- **Source file:** 95) Part 2 Reviewing The Upfront Design & Next Steps.txt
- **Category:** qa-live
- **Topics:** responsibility-driven-design, object-stereotypes, upfront-design, FA²STR, frontend-architecture, canvas-zoom, control-center, interfacer, information-holder, service-provider, controller-vs-use-case, application-service, temporal-decoupling, vertical-slicing, event-subscription, programming-by-wishful-thinking, state-management, small-guesses, subject-system-verification, use-case-testing, gherkin, state-machines, object-calisthenics

## Summary
Khalil reviews (as a Loom-style recording) Lucas's upfront RDD design for a canvas "zoom in / zoom out" use case, following up on the Part 1 1-on-1 (lesson 94). He argues that core-value, granular frontend problems like canvas manipulation can't be solved by "blocky" pattern/library-first thinking; RDD is the developer's equivalent of first principles. He walks Lucas's diagram object-by-object — window API (interfacer), application observer/coordinator (control center), zoom controller (controller ≈ DDD application service), camera (information holder), canvas service (stateless service provider), canvas API (interfacer + controller) — confirming most decisions and flagging one: controllers/use cases should not subscribe to events themselves; introduce an intermediary subscription/event-handler object. He distinguishes changes inside a single transaction (vertical slice / aggregate change) from after-the-fact reactions (temporal decoupling via events). He stresses the design is still theoretical guesswork and the next step is moving into emergent design: write an application-level use-case test (Gherkin-style) for the dominant zoom use case, ignoring backend persistence, subscriptions and outside coordination for now. He also sketches the upcoming "straight line" curriculum: state machines, object calisthenics, object stereotypes, use-case testing, common collaborations, stubbing & mocking.

## Core ideas
- Canvas drag/drop/draw/zoom is core value of Lucas's app; blocky/pattern-first or "find a library/framework" approaches get you partway, then break as more use cases arrive and it must be extended.
- For such problems you must drop from code-first / best-practices-and-patterns thinking to first principles; for software designers the "metaphysics"/lowest level of thinking is **responsibility-driven design (RDD)**.
- Lucas: "if I hadn't stuck to the responsibility-driven mindset, I would have gotten lost" — other mindsets are too blocky for this problem.
- An object candidate appearing to fit more than one stereotype is normal and almost always happens; objects play multiple roles, like people do.
  - Example: a canvas service is an interfacer; add caching and it becomes structurer [recorded as "structure"] + interfacer.
- Choosing which stereotype a set of responsibilities belongs to = abstraction design + categorical thinking = coupling/cohesion.
- OO architecture = objects communicating with objects, "one object talking to the next, talking to the next". Object stereotypes answer "what types of objects should we use?".
- Designing with no infrastructure/persistence/backend fetch is good: simpler now; add those responsibilities later and adjust the design.
- Current work = **upfront design** (FA²STR top three parts, spoken as "find, architect, [automate]"). Only real once put into test form, starting with the first test at the correct guess point — very likely the **application guess point**, where use cases happen; "the most valuable guess point".
- Guess point order in the course: stateless → stateful → application.
- State initialized with defaults (e.g., zoom factor = 1) and held in memory during the app lifecycle until the page is [re]loaded.
- Frontend ↔ backend parallel: window wheel listener ≈ the network-handler part of Express that does outside IO; routing etc. is a different part. "It all will actually be the same" — categorical thinking.
- State management is the root of most complexity: where should data belong, who operates on it (behavior), where does that go (namespace).
- Sending delta-Y to a backend = new responsibility set (reconciling state changes, network events, possibly offline storage) → postpone. "Lead with the guess, but make small guesses at a time."
- Camera information holder (origin coordinates, zoom factor) = excellent decision; mirrors DDD/clean/hexagonal/ports-and-adapters backend patterns. Observe data where it belongs (information holders), e.g., with MobX.
- Relax on certainty — upfront work is theoretical; it gets real (physical) when turned into tests.
- Zoom-factor-related concepts may become their own objects (value objects) via object calisthenics rather than living on camera.
- Controller executes use cases; ≈ DDD application service.
- Change within a use case (single transaction) = how an aggregate must change → vertical slice. Change that happens after, via event dispatch + subscription = temporal decoupling.
- Canvas projection update after zoom = separate feature triggered by `ZoomUpdated` event → temporal decoupling.
- Controllers shouldn't subscribe to events; introduce an intermediary subscription object so the observer isn't depended on by "9,000 different non-declarative objects".
- Purpose of being pedantic about responsibility placement = **subject/system verification** (testability). Keep IO out of application layer; IO belongs in interfacing ports/adapters — the reason for dependency inversion and the dependency rule.

## Named frameworks / mental models
- **Responsibility-Driven Design (RDD)** — lowest-level/first-principles design thinking for devs. Use when problems are granular, core-value, and resist pattern/library-first approaches.
- **Object stereotypes** — stereotypical roles: interfacer, control center (coordinator/controller), information holder, service provider, structurer. Use to decide what kind of object owns a set of responsibilities; overlap is expected.
- **FA²STR** — upfront portion (top three steps) = theoretical design; then Specify (test) → emergent design. Currently in upfront.
- **Guess points** — stateless → stateful → application. First test here = application guess point (use cases; most valuable).
- **Value creation system: theoretical → physical** — solution becomes more real going theoretical → physical, upfront → emergent → deployed → most real in users' hands.
- **Programming by wishful thinking** — write the code you wish existed to peek into emergent design briefly during upfront work; move "a little closer to reality".
- **Vertical slicing vs temporal decoupling** — one transaction/use case (vertical slice) vs event → subscriber → later feature (temporal decoupling).
- **Coupling/cohesion "category theory game"** — daily judgement of where responsibilities go; no statically right answer.
- **Lead with the guess, make small guesses** — incrementally add responsibility sets (backend, offline) after the core works in-memory.
- **Subject/system verification** — responsibilities in the right place → easy testing; IO at ports only.
- **Straight line path (upcoming curriculum)** — state machines → object calisthenics → object stereotypes → use-case testing → common collaborations on the use case → stubbing & mocking; plus a cheat sheet and "full stateless/application" material.

## Definitions
- **Object stereotype** — the stereotypical kind of object "everything tends to be".
- **Interfacer** — object filling a responsibility gap by using an external API (e.g., window wheel listener, canvas API). Khalil would also call window wrapper an "external service".
- **Control center** — part of app tasked with control: coordinating (getting requests, routing to the right place), controlling (telling "do this, do this"), collaborations (generic term for the same).
- **Controller** — executes use cases; either *is* a single use case or holds many use cases as methods. ≈ DDD application service.
- **Information holder** — object where information belongs (e.g., camera: origin coordinates, zoom factor).
- **Service provider** — mostly stateless behavior, math logic, utility-class-like (e.g., canvas service computing new canvas state).
- **Delta Y** — (inferred by Khalil) amount of distance changed on Y axis from wheel scroll.
- **Temporal decoupling** — transaction happens, event dispatched, subscriber performs another feature later.
- **Subscription / event handler object** — creates the link between an event type and an extendable multitude of temporal side effects.

## Rules & heuristics
- Expect objects to play multiple stereotypes; don't agonize.
- Design without infrastructure first; add persistence/backend/offline responsibilities later.
- Relax on certainty during upfront design; validate soon in code/tests.
- Start testing at application guess point with the dominant use case — highest-value test.
- Make use cases readable (Gherkin) so everyone can read what should occur; given/when/then flows are hard to hold in your head — need step-by-step proof.
- Use state machines (or UML-ish tools) to visualize state changes.
- Store state in information holders; observe it there (MobX possible).
- Pull concept clusters (zoom factor state) out of entities into own objects (value objects) via object calisthenics.
- Name use cases with the most command-like statement from responsibilities (e.g., "update canvas projection").
- Controllers/use cases are called upon, don't subscribe; move subscribing/coordinating behavior into dedicated subscription objects.
- Watch for objects taking on more responsibilities than needed; break out and abstract.
- Keep IO out of application layer; IO in interfacing ports.
- When learning, jot concepts down as they come up.

## Anti-patterns / mistakes called out
- Code-first / library-first / blocky pattern approach for core-value granular problems.
- Doing all responsibilities at once (backend sync, offline, reconciliation) — too much cognitively.
- Many non-declarative objects depending directly on a single observer/coordinator.
- Service/controller (canvas API) both subscribing to events and doing the work — "not bad", but awkward; hurts testing.
- Khalil's own DDDForum `AfterCommentPosted` subscription — "not the best way", "wouldn't do this anymore", missed responsibilities.
- Misplaced responsibilities → hard to test; IO leaking into non-IO objects.
- Using tools you don't know (Excalidraw) slows teaching — Khalil switches to a familiar tool.

## Code discussed
Artifact: Lucas's Excalidraw diagram. Objects: `Window` and `Canvas` (external), window API interfacer, application observer/coordinator, `ZoomController`, `Camera` information holder, `CanvasService`, `CanvasAPI`, `MouseScrollEvent`, `ZoomUpdatedEvent`.

Window API interfacer (Khalil's wishful-thinking sketch, "Figma-driven development"):
```ts
// reconstructed from narration
class WindowAPI {
  constructor(private window: Window, private observer: ApplicationObserver) {
    this.window.addEventListener('wheel', (e) => this.handle(e));
  }
  private handle(event: WheelEvent) {
    switch (event.type) {
      case 'mouseScroll': // extendable to more events later
        this.observer.notify(new MouseScrollEvent(event.deltaY));
        break;
    }
  }
}
```

Zoom controller (use cases zoom in / zoom out; feature ends at updating zoom factor; then emits `ZoomUpdated`):
```ts
// reconstructed from narration
class Camera { // information holder
  constructor(public origin = { x: 0, y: 0 }, public zoomFactor = 1) {}
}
class ZoomController { // controller ≈ application service
  constructor(private camera: Camera, private observer: ApplicationObserver) {}
  zoomIn(deltaY: number) { /* update zoom factor */ this.observer.notify(new ZoomUpdatedEvent(/*...*/)); }
  zoomOut(deltaY: number) { /* ... */ }
}
```

Two controller shapes — no statically right answer (coupling/cohesion):
```ts
// reconstructed from narration
class UpdateCanvasProjection { execute() {} } // controller == single use case
class Canvas { updateCanvasProjection() {} /* other use cases */ } // controller w/ many use cases
```

Before → after for subscription:
- Before: `CanvasAPI` subscribes directly to `ZoomUpdated` on the observer and does projection work.
- After (recommended): intermediary `ZoomUpdatedEventSubscription` links events to side-effect use cases; `CanvasAPI`/controller only called upon. Generic example with second event `CanvasCleared`.
```ts
// reconstructed from narration
class ZoomUpdatedSubscription {
  constructor(observer: ApplicationObserver, private updateCanvasProjection: UpdateCanvasProjection) {
    observer.subscribe(ZoomUpdatedEvent, (e) => this.updateCanvasProjection.execute(e));
  }
}
```
- `CanvasService` (service provider, stateless): computes new canvas state → passed back → canvas object updated; all inside "update canvas projection" use case.
- DDDForum `AfterCommentPosted` subscription shown as idea of handler per event type.

## Diagrams / visual models described
- Lucas's diagram: left = external `Window`, `Canvas`; middle = application observer/coordinator (control center); zoom controller; camera; canvas service/API. Khalil annotates in red.
- Khalil's Express drawing: network ↔ Express (network-handler part = outside IO; routing = other part) as parallel to window listener.
- Theoretical vs physical annotation: upfront work "theoretical", test-form work "physical".
- Guess points image from previous day's Q&A: left theoretical, right physical (incoming E2E, applications).
- Subscription sketch: `subscribe to` → `ZoomUpdated`, `CanvasCleared` → use case `UpdateCanvasProjection`.

## Q&A items
- **Multiple stereotypes seem correct for one object?** (~L19-30) Normal; objects play many roles; e.g. interfacer + caching → also structurer. Coupling/cohesion call.
- **Designed with no infra/backend — OK?** (~L30-33) Yes; simpler; add later.
- **Window events → coordinator: what stereotype?** (~L40-58) Interfacer/external service; like Express network handler; may switch on event types and push events.
- **Application observer's role?** (~L64-72) Control center; does most work.
- **Who keeps the state? If delta-Y goes to backend, use repository?** (~L80-92) Postpone backend/reconciliation/offline; keep in foreground; small guesses.
- **Camera information holder for coordinates + zoom factor?** (~L92-112) Excellent; like DDD/hexagonal; observable (MobX); later extract value objects via object calisthenics.
- **Why zoom controller generates/notifies `ZoomUpdated`?** (~L125-152) Feature ends there; controller = use case(s) = application service.
- **Is canvas projection update part of zoom or separate?** (~L154-162) Separate feature after vertical slice → temporal decoupling via event.
- **Who subscribes to `ZoomUpdated`?** (~L162-200) Intermediary subscription/event-handler object, not canvas API directly.
- **Canvas API interfacer + controller? Canvas service = service provider?** (~L180-208) Both agreed; service provider stateless math.
- **What next?** (~L208-240) Move to emergent: application-level use-case test on dominant zoom use case; skip subscriptions/coordination for now; Khalil will show how.

## Notable quotes
- "If you cannot approach this from a very granular level... you might be able to get yourself part of the way there."
- "The equivalent of getting down to the first principles as a software developer or designer is going to be responsibility driven design."
- "It's very rare that an object plays exactly one stereotypical role."
- "The real reason we have the complexity we have is because of state management."
- "Lead with the guess, but make small guesses at a time."
- "Let's relax on having certainty on this, because this is all upfront."
- "There is no statically right answer to this... a fun game of coupling and cohesion."
- "Controllers, use cases, they don't normally subscribe to things. They're normally just called upon."
- "I set a quick video. Which is the greatest lie ever told."

## Cross-references
- 94 (Part 1 of this 1-on-1; notes file not yet present in notes/).
- 27 FA²STR; 52 stateless guess point; 74 stateful guess point / state machines; 86 stateful GP intro.
- 16 vertical slicing; 18 temporal decoupling; 20 subject/system verification; 38 RDD; 36 OOP.
- 51 programming by wishful thinking; 10 value creation system.
- 33/90/92 frontend architecture; 84 FDD (Figma-driven design).
- 73 hand-written spies (verifying side effects later).

## Fluff skipped
Greetings, Loom recording self-commentary, Excalidraw tool struggles, sign-off.

## AI-era relevance hint
- Stereotype-labeled role/responsibility maps are precise specs for AI code generation; agents follow explicit roles better than vague "build zoom".
- Application-level Gherkin use-case tests give AI-generated code an objective oracle.
- Small guesses (in-memory first, backend later) keep AI changes reviewable.

## Coverage proof
- Lines read: 244 / 244
- Final line (verbatim): "Good job. I'm going to load it very quickly. I'll hear you. I'll see you. I'm going to hold it."
