# Lesson 89 — June 7th, 2023 Office Hours: The Theoretical Guess Points, Aggregates, State Machines
- **Source file:** 89) June 7th, 2023 Office Hours The Theoretical Guess Points, Aggregates, State Machines.txt
- **Category:** qa-live
- **Topics:** what-before-how, abstraction, clarity, theoretical-guess-points, event-storming, process-modeling, state-machines, inputs-outputs, one-state-change-at-a-time, event-driven-architecture, branching-events, aggregates, invariants, transaction-boundary, entities, value-objects, identifiers, eventual-consistency, playlist-reordering, domain-services, feedback-loop-levels, level-2, level-3, level-5, decoupling-from-time, clock, fake-clock, contract-tests, mock-parity, traffic-light, fa2str, systems-thinking, ai, walking-skeleton, feature-slicing, feature-flags, migrations, user-story-mapping, chores-vs-stories

## Summary
Office hours after the theoretical content (problem, solution and architecture spaces). Khalil's opening theme: the hard part of programming is working out the **what**, not the **how**. That takes clarity and close attention to language, and anxiety at work signals a lack of clarity. His core model is that **information systems are state machines**: inputs and outputs between states, with one state change at a time within a context. That's why he prefers "required input" to the word "aggregate" when event storming. Events can branch across contexts in an event-driven design, but you shouldn't branch within the same namespace. He defines an aggregate as a **transaction/consistency boundary**, an application-level (feedback loop level 3) concept, while entities and value objects are level 2. He models relationships with identifiers and uses a linked-list playlist to keep a reorder within one small transaction, with eventual consistency for the rest. He demos **decoupling from time** with an abstract `Clock`, a `SystemClock` and a `FakeClock`, verified by a level-4 contract test that loops over both implementations to keep fake and real in parity. The session ends with thoughts on AI, the walking skeleton, and a discussion with Laurent on value slicing, feature flags, incremental migrations, and user story mapping vs event storming.

## Core ideas
- The theoretical videos (subdomains, bounded contexts, process modeling, architecture) compress "a massive portion" of the red book and blue book. The path goes from the problem space up to the architecture point, so you know which screens, views, commands, features and API calls you need, which folders/modules you'll need, and what is core vs not core (L1-L12).
- The **architecture space** is the part that most needs fleshing out. For now it's about turning theoretical learnings into the project's modules (L3-L6).
- **The hard part of programming is determining the "what"**, not the programming ("that's the easy part"). It's philosophical and all about **language** (L13-L17).
- **Anxiety = lack of clarity.** Khalil's own course production got less stressful once he wrote more, meditated, and wrote a detailed process document before doing anything. Then implementation "just feels like typing" (L20-L37).
- Clarity **excludes**: getting clear on what realistically needs to happen ("developers need to try something hard and gain self-confidence by doing it themselves") eliminates thousands of other options (L27-L31).
- This is why the course has theoretical before physical and upfront before emergent: it's all abstraction, what before how (L31-L33).
- **Information systems are just state machines.** One state machine emits an event, which may create or trigger another state machine, and so on. Follow the inputs, outputs and flow of data. That shows what's needed for the modeling underneath (L45-L53).
- **One state change at a time, within the current context.** Keep state changes as small as possible. Sometimes that means splitting what you thought your aggregate was (L58-L60, L98-L103).
- After the process model, with infrastructure/architecture already in place, the wise move is the ideal developer workflow. You can skip the level-5 system tests and **drop straight into level 3** (use cases), using the required inputs to create the needed entities and value objects (L53-L58).
- **Events can branch** (event-driven architecture). When you cross a boundary you cross into another domain/context. Don't split into two paths **in the same namespace** (L60-L90).
- A command's input data is effectively the **DTO** that invokes the command, and output events follow (L94-L96).
- The domain layer models data, behaviors, rules and processes, but really it models **one state machine and how it transitions** (feedback loop level 2). Work involving **two state machines** leads to **domain services**, e.g. syncing a tasks list with a calendar (L114-L120).
- **Relationships are modeled with identifiers.** Loading an entire related object (e.g. an Author with 30 feedback cycles) on every request is bad and may crash things (L121-L130).
- For **lists**, avoid loading the whole list. Think about the worst case (L130-L133).
- An **aggregate is an application-level thing**: a consistency/transaction boundary. Entities and value objects are level 2 (L143-L165).
- **Applications force purposefulness.** Without an app you could model an infinite world of entities (dog → owner → house → city...). Every entity and value object must have a purpose, and you enforce that by working from **level 3 (developer boundary)** or **level 5 (customer boundary)** (L165-L175).
- The course teaches in reverse (inside-out) because there's a lot to learn. The projects section will go top to bottom (L173-L175).
- **Aggregates are "more of a philosophical thing"**, a logical boundary around what must happen together. They may or may not be a real construct in code (L203-L210).
- **Time is an application concern, not a domain (level 2) concern.** State machines hold and protect data and change correctly when told to. *Knowing when* to tell them (e.g. a command after an event, after N seconds) belongs to the application. The application layer handles anything to do with the outside world, reality, external services, and incoming requests (L215-L224).
- **Decouple from time** with a Clock role plus a fake, so tests can check temporal correctness without really waiting (L224-L268).
- **Time lives in its own context/folder** (e.g. a `time` context next to a `traffic light` context) (L278-L279).
- **Why use case (level 3) testing is hard:** in FA²STR's *find* step at level 3 you must find every responsibility at that level: time, repositories, inputs, saving transactions, pulling events out of aggregates, cross-cutting concerns like auth. This is why so few people write the high-value use case tests, and why the course teaches inside-out (level 2 first) (L285-L292).
- Jumping straight to a feature is more emotionally motivating. Khalil considered a simpler path: skip entities, build success/failure cases, then discover you need entities. He's keeping the current path for now (L292-L297).
- **The main ideas of the course, distilled:** (1) abstraction, what before how. (2) How do we know the what? **Systems thinking**: inputs, outputs, environments, processes in the middle. All our work can be framed as systems (L297-L300).
- **A business is a system**: value creation → marketing → sales → dev picks up the ball → theoretical guesses → physical guesses (incoming adapter, system, outgoing adapter, application, stateful domain modeling, unit), plus deployability (L301-L304).
- **On AI:** clarity on what matters means new tools (e.g. no-code AI app courses) aren't a threat. "If you don't have clarity on what matters, everything's gonna seem like a threat." (L305-L310)
- **AI's role, in Khalil's view:** it "crunches down and minimizes some of the state changes / decision-making logic" you'd otherwise write, sometimes drastically. The skill is knowing the inputs/outputs you plug it into and the goalpost. It still has to connect to everything else in the process model (L310-L318).
- The same system-finding approach works anywhere, e.g. a **Chrome extension**: what's its incoming adapter, what's its system-level test? Apply FA²STR (L334-L339).
- **A slice is a slice of value**, not a technical slice: the smallest result that solves part of the problem, can be developed incrementally, shipped to production, and seen/used by a stakeholder (Laurent) (L375-L385).
- **User story mapping** is probably the right tool for slicing out units of value (product view). **Event storming** is good for developers. The course hasn't covered user story mapping yet and may add it (L392-L398).

## Named frameworks / mental models
- **What before how (abstraction)**
  - Purpose: remove overwhelm and anxiety by getting clarity before acting.
  - Components: the theoretical before the physical, upfront before emergent, a written process doc before execution.
  - When: always. Programming, course production, job hunting (L13-L44).
- **Information systems = state machines**
  - Components: state machines; commands with input data (DTO); output events; other contexts subscribing to events and creating or triggering further state machines.
  - Rule: one state change at a time within a context. Keep changes small.
  - When: process modeling/event storming, and deciding aggregate boundaries (L45-L60, L94-L103).
- **Command → input data → output events (Solidbook image)**: triggering event → input data (effectively the DTO) → command → output events → subscribers in other contexts (L90-L98).
- **Event-driven branching**: one event may fan out into several contexts (billing charge, email). Don't branch within one namespace (L60-L90).
- **Context-grid process visualization** (tool by "Adam", "another fellow [cannot]", possibly "fellow Canadian", inferred): event storming "on steroids". Contexts form a grid at the bottom, you can see which context emits each event, and flows move up and down between contexts. Drawback: commands aren't placed in the context they belong to (L76-L86).
- **Aggregate as transaction/consistency boundary**
  - "The essential amount of data required that's going to change all together in one transaction."
  - Test: walk through the state-change code line by line. If the system dies midway and restarts inconsistent (half a transaction done), the boundary is wrong.
  - Level: 3 (application). Entities and value objects: level 2 (L143-L165).
- **Feedback loop levels referenced**
  - Level 2: domain model (entities, value objects, one state machine's transitions).
  - Level 3: use case / application, the **developer boundary**. Aggregates, time and other application concerns live here.
  - Level 4: integration/contract tests (e.g. the Clock contract test).
  - Level 5: system tests, the **customer boundary**.
  - Level 7 is mentioned in passing next to deployments/feature flags ("level 5 and level 3... and then level 7") (L165-L175, L240-L242, L346-L347).
- **Data-for-command slices ("aspects of the order")** (attributed to "[Bogart] or someone like that"): each command (place, update, cancel order) gets a slim object with just the slice of order data it needs, e.g. "data from the order for place order". The overall `Order` concept may become abstract (L184-L199).
- **Three ways to model aggregates** (as discussed): (1) OO: just an `Order` class. (2) Per-command data slices. (3) Functional: pure inputs → transaction → outputs, no classes. Khalil won't give "solid statements" on which is right (L199-L207).
- **Decoupling from time (Clock role)**: abstract role `Clock` (`getCurrentTime`, `tickForward(seconds)`) with a real `SystemClock` (infra) and a `FakeClock` (no infra, time can be manipulated). Verify parity with a contract test (L224-L268).
- **Mock parity via contract tests**: run the same contract test over every implementation of a role, real and fake, so they stay in sync. "It's okay to mock... just make sure you mock correctly." (L253-L257)
- **FA²STR find step at level 3**: enumerate all responsibilities at the current feedback loop level (time, repositories, inputs, transactions, events from aggregates, cross-cutting concerns) (L285-L290).
- **Business as a system (value creation system)**: marketing → sales → dev → theoretical guesses → physical guesses → deploy (L301-L304).
- **User stories vs chores** (Laurent's team): user stories are value. Chores are technical enablers (e.g. starting to publish events to move toward microservices). Khalil maps chores to the "how" and everything before them to the "what" (L385-L391).
- **Eating the elephant in pieces**: slice value (backend + frontend for a part) and ship incrementally (L391-L393).

## Definitions
- **Aggregate** (Khalil): a boundary, specifically a **transaction boundary**. It's the data needed to perform a transaction so the app stays consistent. Either the state change happens or it doesn't. Also "a logical boundary around what needs to happen", possibly not a real code construct (L143-L152, L203-L207).
- **Aggregate** (student view, accepted as "fair enough"): objects that enforce invariants (L143-L146, L152).
- **Invariant**: a rule about which states your domain concepts are allowed to be in. Example: a washing machine can't be "off" while it also has settings currently selected (L152-L155).
- **DTO**: "data in a certain shape". It just carries data and has no behavior. Not the same as an aggregate (L155-L159, L210-L211).
- **Entity / value object**: level-2 domain concepts (L159-L160).
- **Domain service**: the concept introduced when work spans two state machines, e.g. syncing a tasks list and a calendar (L117-L120).
- **Eventual consistency**: secondary updates (sequence numbers, track list IDs) done later rather than in the same request (L137-L139).
- **Application concern**: anything dealing with the outside world/reality, external services, receiving requests, and *when* to call level-2 concepts (including time) (L218-L222).
- **Contract test**: a level-4 integration test that verifies a role's contract against all its implementations (L241-L253).
- **Slice (of value)**: the smallest result that solves part of the problem, is developed incrementally, reaches production, and is seen/used by stakeholders (L377-L381).
- **Chore**: a technical enabler task, as opposed to a user story (L385-L389).

## Rules & heuristics
- If you feel anxious or overwhelmed, get more clarity before doing more work (L20-L22).
- Write the process down in detail before executing, so doing it "feels like typing" (L33-L37).
- When event storming, look for the **required inputs and outputs** rather than trying to name "aggregates" (L46-L50).
- One state change at a time **within a context**. Keep state changes as small as possible, and split an aggregate if needed (L58-L60, L98-L101).
- Branch events across contexts freely. Avoid two branches in the same namespace (L86-L88).
- Reference other aggregates/entities **by ID**, not by loading the whole object (L127-L130).
- For list operations, design for the worst case. Constrain the work done in a single request (L131-L137).
- Push non-essential follow-up updates to eventual consistency (L137-L139).
- Don't create concrete base classes (e.g. `AggregateRoot`) until you absolutely need them. Name it `Order` and let the structure emerge across features (L178-L182).
- Start level-3 work from one feature: create a use case, go through all success and failure scenarios, and let the needed concepts emerge (L175-L180).
- Forget "aggregate" at first. Ask what goes in, what must come out, and what must change all at once (L187-L191).
- Keep time out of level-2 domain objects. Put it in the application and in its own context (L215-L224, L278-L279).
- Never really wait in fast tests. Inject a fake clock to simulate hours (L230-L236, L257-L266).
- Loop contract tests over all implementations of a role to keep fakes honest (L253-L257).
- Do the course modules **in sequence**: theoretical → level 2 → level 3 (L268-L272).
- With a familiar standard architecture, Khalil often plans, clarifies inputs/outputs, process-models, then jumps straight to level 3 to avoid setting up infra (L281-L285).
- Use user story mapping for value slicing and event storming for developer process modeling (L394-L396).
- Feedback loop essential: make the loop as tight as possible. Khalil applies it to teaching by doing more live sessions before restructuring content (L369-L373).

## Anti-patterns / mistakes called out
- Diving into the "how" without clarity on the "what" (L13-L17).
- Making aggregates way too big. Khalil admits "I've been known to create some pretty large nasty aggregates" (L110-L112).
- Loading an entire related aggregate (e.g. an Author with 30 feedback cycles) to do a command, which may crash the code (L124-L127).
- Reordering a playlist by updating every item between the old and new position (e.g. moving position 3 to 50) in one request (L133-L136).
- Two state changes in the same transaction/context. If the system dies between them, the system is inconsistent (the Feedbook refactor) (L101-L103, L361-L364).
- Branching into two paths within the same namespace (L86-L88).
- OO modeling spree: modeling dogs → owners → houses → cities forever without an application purpose (L161-L166).
- Tests that really wait one second (or one hour) for time to pass (L232-L236, L258-L262).
- Mocks that drift from the real implementation. The fix is parity, not "don't mock" (L253-L257).
- Jumping ahead in module order (L268-L272).
- Seeing new AI tools as threats because you lack clarity on what matters (L308-L310).

## Code discussed
**1. Relationships by identifier (Feedbook)** (L121-L130)
- Before: `FeedbackCycle` references a full `Author`, and `Author` has many feedback cycles. Loading one loads all.
- After: reference by ID (`feedbackCycleId`, author ID) so neither side needs the other loaded.

**2. Playlist reordering (Leo Max's thread)** (L130-L139)
- Before: items with a sequence number. Moving an item forces updates to every item in between.
- After: a linked list. Each `PlaylistItem` has `previous` and `next` IDs. A reorder only adjusts previous/next pointers in one request. Sequence numbers and track list IDs are updated later (eventual consistency).
```ts
// reconstructed from narration
class PlaylistItem {
  constructor(
    public readonly id: string,
    public previous: string | null, // id of previous item
    public next: string | null      // id of next item
  ) {}
}
```

**3. Data for a command / aspects of an order** (L184-L199)
- Features `placeOrder`, `updateOrder`, `cancelOrder` each use a slim input slice ("data from the order for place order"). `Order` may become abstract.

**4. Feedback cycle command (whiteboard)** (L94-L98)
- Start feedback cycle: input data is the reader ID, maybe a start date, plus optional details → `FeedbackCycleCreated` → another context subscribes (e.g. email/notify pre-reader).

**5. Clock / time decoupling (Khalil's teaching repo, traffic light solution)** (L236-L268)
- Test file named with an "ISpec" suffix (integration spec; exact file name not shown).
- Level-4 contract test over `SystemClock` and `FakeClock`: get the current time, tick forward 4 seconds, get the time again, assert the time between is 4 seconds. Running it takes 4 real seconds because the system clock is included.
- `SystemClock`: real infra. `tickForward` really waits (a second per tick; setTimeout/setInterval in production), and `getCurrentTime` uses `new Date()` (machine clock/time zone).
- `FakeClock`: no infra, time can be manipulated.
- Traffic light use case plan: fast-forward the fake clock one hour, then inspect the traffic light's events.
```ts
// reconstructed from narration
export abstract class Clock {
  abstract getCurrentTime(): Date;
  abstract tickForward(seconds: number): Promise<void>;
}

export class SystemClock extends Clock {
  getCurrentTime() { return new Date(); }
  async tickForward(seconds: number) {
    await new Promise((r) => setTimeout(r, seconds * 1000));
  }
}

export class FakeClock extends Clock {
  private now = new Date();
  getCurrentTime() { return new Date(this.now); }
  async tickForward(seconds: number) {
    this.now = new Date(this.now.getTime() + seconds * 1000);
  }
}

describe('clock contract', () => {
  for (const clock of [new SystemClock(), new FakeClock()]) {
    it('can tick forward 4 seconds', async () => {
      const start = clock.getCurrentTime();
      await clock.tickForward(4);
      const end = clock.getCurrentTime();
      expect((end.getTime() - start.getTime()) / 1000).toBeGreaterThanOrEqual(4);
    });
  }
});
```

## Diagrams / visual models described
- **Chain of state machines**: state machine → event → new state machine → event → another state machine reacting (L50-L53).
- **E-commerce order flow**: `OrderPlaced` → fans out to billing (`CustomerCharged`) and email (`EmailSent`, generic context). `CustomerCharged` → another `EmailSent`. This explains why you get "order placed" then "you've been charged" emails seconds apart (L65-L76).
- **Context-grid event storming tool** (Adam's): contexts as rows/grid at the bottom, events plotted per context, flows moving up and down (L76-L86).
- **Solidbook image**: triggering event → input data (DTO) → command → output events (L90-L96).
- **Feedbook feedback cycle**: input (reader ID, start date) → Feedback Cycle → `FeedbackCycleCreated` → Email context (L94-L98).
- **Author ↔ FeedbackCycle** relationship replaced with an ID reference (L121-L130).
- **Tasks list ↔ calendar** as two state machines bridged by a domain service (L117-L120).
- **Place/Update/Cancel order** boxes, each with a "data for X" slice pointing to an abstract Order (L184-L199).
- A feedback-loop-levels visualization image was shared in course chat. Khalil admits it's not his favorite and promised to prioritize a full drawing of all levels near the start of the course (L292-L297).

## Q&A items
- **Is finding the aggregate per event always a good approach? (Lucas)** (L44-L60)
  - It's the best way to find the **required input**. Khalil avoids "aggregate" because there are so many ways to model it.
  - Look for the inputs and outputs. Information systems are state machines.
  - After the process model, drop into level 3 and let the inputs drive the entities and value objects.
  - One state change at a time. Split the aggregate if needed and keep changes small.
- **Can an event generate two branch events, or should it be linear?** (L60-L90)
  - Yes, it can branch. It's event-driven, and crossing a boundary means entering another domain. Example: order placed → billing + email.
  - Avoid two paths in the same namespace, because state changes should be managed step by step.
- **Where are the inputs in the drawing?** (L90-L98)
  - Every state machine needs input data, effectively the command's DTO. For the feedback cycle: reader ID, start date, etc. → `FeedbackCycleCreated` → subscribers (email).
- **Aggregate sizing: the playlist problem (Leo Max)** (L108-L140)
  - Use identifiers for relationships. For lists, use previous/next pointers and eventual consistency. Syncing two state machines is a domain-service problem.
- **What is an aggregate?** (L140-L165)
  - Student: objects that enforce invariants. Khalil: a transaction boundary, the minimal data that must change together.
  - Application-level (level 3). Entities and value objects are level 2.
- **Is it the same as a DTO?** (L155-L159, L210-L211)
  - No. A DTO is data in a shape with no behavior. Aggregates are level 3, alongside things to do with time.
- **In terms of stereotypical roles, is an aggregate composed of information holders and structurers?** (L182-L210)
  - Many ways to design it: an OO `Order`, per-command data slices, or functional inputs/outputs.
  - Khalil prefers to skip the aggregate conversation and focus on inputs, outputs, and what changes at once.
  - He calls it philosophical, possibly not a real construct, and promised to revisit it with better mental models.
- **How do I handle time in stateful assignments (Pomodoro, traffic light)?** (L211-L268)
  - Time is an application concern. Use a Clock role with system and fake implementations and a contract test. For now, focus on state changes, since time comes later.
- **Should we jump the module order?** (L268-L272)
  - No. Do everything in sequence: theoretical → level 2 → level 3.
- **Is the repo on GitHub?** (L272-L277)
  - It's in Khalil's teaching repo, and he may make parts public (the traffic light solution).
- **Why not go from theoretical straight to level 3?** (L279-L297)
  - Khalil does that in practice, but level 3 has too many responsibilities to find (FA²STR find step), so the course teaches inside-out. He's considering a faster path later.
- **Is there a visualization of the levels?** (L292-L297)
  - A partial image was shared. A full drawing is coming near the start of the course.
- **Has anyone used the new AI tools?** (L310-L322)
  - Students: generating state machines from natural language, code examples ("make it worse" to get bad examples), classification for metrics, a Jarvis-style assistant.
  - Khalil: AI minimizes decision-making/state-change logic. You still need the inputs/outputs and the goalpost.
- **What would you like fleshed out? (walking skeleton)** (L322-L345)
  - Khalil considered going from the theoretical straight to a walking skeleton top to bottom, but decided to do that for real in the backend and frontend projects. Possibly a Chrome extension project too.
- **Laurent: iterative slicing, feature flags, deployments** (L345-L375)
  - Legacy → microservices: first send messages behind a feature flag, then create a consumer on the other service, then move code over.
  - Unfinished features still have to be deployed and merged to main.
  - Playbooks exist for failing builds.
  - Incremental migrations: add optional/default or nullable column → later migration makes it required. Rollback is just a `git revert`.
  - Khalil links this to state machines: one step at a time, so a failure never leaves the system inconsistent.
- **What is a feature/slice?** (L373-L398)
  - Khalil asks if a slice is a command-event pair. Laurent: no, it's a slice of value that's shippable and usable, not a technical slice.
  - Technical enablers are chores. User story mapping is the tool for value slices, event storming for developers.

## Notable quotes
- "What makes programming really hard is not the programming part. That's the easy part."
- "If you're experiencing a lot of anxiety when you're doing your work, it's because you don't have enough clarity."
- "Information systems are just state machines."
- "You only want one state change to happen at a time... within the current context you're working in."
- "An aggregate to me is just... it's a boundary... it's a transaction boundary."
- "Level 3 is the developer boundary and level 5 is the customer boundary."
- "It's okay to mock... but just make sure you mock correctly... You want to create parity between what's real and fake."
- "If you don't have clarity on what matters, everything's gonna seem like a threat."
- "I don't even like to give things concrete base classes until I absolutely need them."

## Cross-references
- Lessons: 26 (Ideal Developer Workflow), 15 (Feedback Loop), 24 (Walking Skeleton), 27 (FA²STR), 65-72 (theoretical guess points, Feedbook), 74 (state machines/invariants), 76-77 (visualizing state machines, PreReaderInvite), 88 (previous office hours: decoupling from infra), 10 (Value Creation System), 9 (Systems Thinking).
- Concepts: aggregates, invariants, entities, value objects, domain services, eventual consistency, event-driven architecture, event storming, event modeling, user story mapping, feature flags, contract tests, test doubles/fakes.
- Books: the "red book" (Vaughn Vernon, *Implementing Domain-Driven Design*, inferred) and the "blue book" (Eric Evans, *Domain-Driven Design*, inferred). User story mapping "by the book" (likely Jeff Patton's *User Story Mapping*, inferred).
- People/tools: Solidbook (Khalil's book), Adam's context-grid process modeling tool, "[Bogart]" (source of the per-command data idea, uncertain), Leo Max's playlist thread, Laurent (feature slicing), Rohan, Lucas, Daniel.
- Assignments mentioned: Boolean calculator, Pomodoro, Traffic Light, Feedbook feedback cycle.

## Fluff skipped
Greetings, computer lag and tab-closing, coffee/Starbucks talk, mic muting, attendance shout-outs, scheduling, course-production morale, Stoic chit-chat, and goodbyes.

## AI-era relevance hint
- The "information systems = state machines, one state change per context" framing works well as a spec for AI codegen: describe inputs, outputs and invariants, and have the model fill in the transition logic. That matches Khalil's view that AI "minimizes decision-making logic".
- Contract tests that loop over real and fake implementations are a cheap guardrail when AI generates fakes or adapters, because they catch drift automatically.
- Clarity on the "what" (value slices via user story mapping) becomes the scarce skill as the "how" gets commoditized.

## Coverage proof
- Lines read: 416 / 416
- Final line (verbatim): "See you... Later..."
