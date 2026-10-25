# Lesson 94 — Part 1 1-on-1: Category Theory, Frontend Architecture, Metaphysics & RDD
- **Source file:** 94) Part 1 1-on-1 Category Theory, Frontend Architecture, Metaphysics & RDD.txt
- **Category:** qa-live
- **Topics:** frontend-architecture, canvas-app, excalidraw, figma, metaphysics, essence, purpose, form, actor-role-goal, phases-of-craftship, code-first, pattern-first, first-principles, responsibility-driven-design, responsibilities, doing-knowing, object-stereotypes, coordinator, controller, interfacer, information-holder, structurer, service-provider, control-center, category-theory, dominant-role, sequence-selection-iteration, state-a-to-state-b, events, event-sourcing, cqrs, namespacing, abstraction, three-roles, fa2str, concrete-example, vagueness-does-not-compile, guess-points, upfront-design, decouple-from-react, global-state-vs-delegated, value-creation-system, strategic-testing

## Summary
A student asks how to apply the course ideas to a complex frontend app: a canvas drawing tool like Excalidraw ("SkyDraw") or Figma. His canvas object ends up passed around and changed by many other objects. Khalil says the real problem is clarity and overwhelm: the student's building blocks ("camera service") are too big and too vague. He introduces the **phases of craftship** (code-first → pattern-first → first principles) and says the way into first principles is **Responsibility-Driven Design**, where the smallest building blocks are responsibilities (doing and knowing). He then covers the **metaphysics**: essence, actor/role/goal, purpose and form, using a mug and a stone. From there he derives what software is. Computing solves problems. The essential forms are sequence, selection and iteration. A problem is a move from state A to state B. Transitions are behavior, the fact that a transition happened is an event, data is initial state plus events, and namespacing (abstraction) exists for understanding. Next he runs FA²STR on the student's "zoom in/zoom out" feature: concrete example → list responsibilities → assign them to roles via **object stereotypes** (interfacer, coordinator, controller, information holder, structurer). He introduces the **control center** (coordinator + controller) and argues that taking it back from React lets you test ~90% of use cases without starting React. The session ends with the frontend-specific concerns (view data, model data, re-render triggers) and the choice between a centralized global data model (Redux-like) and state delegated to objects.

## Core ideas
- **Student's problem:** in canvas apps, the canvas object gets "spread around" many classes and many roles manipulate the canvas stage. He knows a lot of theory but can't link it together, and doesn't know how to use TDD in this kind of app or what role the canvas plays.
- **Khalil's diagnosis:** the challenge is **clarity**, i.e. overwhelm. "How do we piece all this together in a cohesive way that makes sense?"
- **Starting point for any design:** understand the **responsibilities** at play. Get all the puzzle pieces in front of you, **organize them into categories**, then work out how the categories work together. This is category theory applied to design (categorization → cohesion → composition/collaboration) (inferred framing).
- The student's first design: a **camera service** that does the graphics transformations for zoom and pan. The camera uses the canvas: it reads the canvas region/frame and cursor events (e.g., Ctrl + mouse wheel), works out how much to zoom, and repositions the camera's view of the canvas.
- The student's definition of a service: "an encapsulated set of responsibilities" that clients use, like an external API. Khalil hears it as "a container for everything related to this type of behavior". That's a fine start, but it doesn't **descend granularly enough** in categorization. "Service" is too broad and too general.
- **Everyone calls everything a service**, especially in the inner layers (application, domain). They don't break things down far enough to follow the **rules that apply in any architecture** (frontend, backend, desktop), "the laws of software design".
- The student then reframes camera as an **entity** because it has business rules. Khalil says the service idea isn't "completely wrong". Parts of it are correct, but it will be broken into smaller parts (entity plus others) that link together by **stereotypical rules**.
- **Why this matters:** we want confidence that our code works → tests → code must be **testable** → decompose the app into objects in a testable way. The other goal is to extend and add features fast.
- **Phases of craftship** (how developers see code; Khalil will make content on it):
  1. **Code-first:** "React + Firebase, hook it all up, done." Blocky and technology-focused ("I need to make an API call"), with very little design. It gets you a job. He estimates ~60% of students are here.
  2. **Pattern-first** (DDD-first / paradigm- or methodology-first): services, entities, repos, aggregates, factories. The building blocks are smaller and more granular, so it's better than code-first. But you get stuck asking which building blocks to use, how to piece them together, how this works with a team and with other concepts, and you end up overwhelmed.
  3. **First principles:** let go of DDD, clean architecture and other methodologies. They're "just different lenses on the first principles". **Scott Bellware** gave Khalil this idea. The gateway to it is **RDD**.
- **Responsibilities are the smallest building blocks**: something we **do** or something we **know**.
- The student compares this to divide and conquer / the feedback loop: break top-down into the smallest blocks, then build bottom-up. Khalil: "Precisely." The feedback loop comes later, through this.
- **Metaphysics** = first principles of reality. Descartes ("I think, therefore I am"). Sartre and the existentialists: first you exist, then you realize you exist. Starting point: "We're here. You and I are talking. We're real." The goal is to *understand* rather than just "use the formulas".
- The three metaphysical points needed are **essence, purpose, form** (plus actors/roles).
- **Essence (mug):** its properties are ceramic, has a hole, handle, rounded, has a base, print/**printable**. "Printable" already sounds like programming (Serializable, XYZ-able), so this is where OOP should start, since we're discussing an object.
- **Actor/role/goal:** the actor is who you are (Khalil). The roles he plays: programmer, entrepreneur, writer. Goal: get work done efficiently. State B: modules uploaded and students doing them. Sub-goal: drink coffee for energy.
- **Purpose starts from the actor playing a role.** The goal gives the object its reason to exist. The purpose then decides which properties are **essential**, and that set is the **form**. For drinking coffee the essential one is the hole. Handle and ceramic are good but not essential, and printable doesn't matter. "This doesn't even have to be a mug… this could be my hands", unless the coffee is hot.
- The student adds that essential attributes depend on the **actor** too: a young kid may need the handle for safety. Khalil agrees, but it still depends on their purpose/goal.
- **Many hows for one goal:** to have energy you could exercise, drink coffee or sleep. Choosing "drink coffee" is choosing the *how*, and only then does the mug's purpose matter.
- **This critical-thinking process should run every time you design an abstraction.**
- **Where code/features come from:** "you should be writing no code unless you're very clear on who plays what role and why do they need that." Role-goal → feature/use case → essential properties. That's how you write the minimal amount of code. "We just saw the birth of features."
- **Creator decides purpose:** a stone is a skipping toy to a kid, a weapon to a warrior, a tool for food to a hunter. Essence = what the thing is. Role-goal → purpose → essential properties = **form**. "Based on who is using it and what they're trying to do, the stone is going to turn into something else."
- **The essence of software:**
  - Purpose of computing: **solve problems**.
  - The student lists automation, math and abstraction as properties of computing. Khalil: abstraction's purpose is understanding, and you don't strictly need understanding to compute (old low-level languages). The student counters that even reading high/low voltage as binary is already abstraction. Khalil: "Good point." While building the course he realized there are **three metaphysical essentials**, and **abstraction is the first**. "Maybe the essence of everything really is… understanding. And the way we do that is abstraction."
  - Math and automation aren't necessary to solve a problem. The essential forms of computing are **sequence, selection, iteration**. Directions to Shoppers Drug Mart use all three.
  - Essence of a problem: an **undesirable state A** and a **desirable state B**.
  - The **transition** A → B is **behavior**. The **fact** that it happened is an **event**. Real work is usually many small steps, and each step is both a transition and an event.
  - **Data** = initial state + events. Behavior acts on state, which becomes version 2, then 3, then 4 of the data. Events carry what changed.
  - **Namespacing** encapsulates data and behavior: an event concept, a transition, or a bounded context. Its purpose is **understanding**, "so really, this is abstraction. This is where abstraction comes from."
- The student links this to storing events rather than mutating state. He mentions DynamoDB (likely mistaken; this describes event stores). Khalil: "That's exactly what event sourcing is", and CQRS "at the deepest level", which strip away everything that isn't the essence of computing.
- **A feature/use case**: data comes in → **validation rules** (how data can come in) and **application rules** (what may happen to the data) → out come **state changes and events**. Its purpose is only to decide whether data may change and to keep things consistent.
- He has covered the essence of software but not the essence of **software development**, which comes later.
- **"The correct architecture is the event-based one."** To keep adding value to users without making the code unmaintainable, design with an event-based architecture and **work with the grain of reality**. Reality is event-based. Building CRUD-shaped solutions (transcript: "Frud based") for event-shaped problems doesn't fit. Those too-large blocky pieces are what the code-first approach produces: "It's come full circle."
- **Three roles and goals** (recap): **user** wants no bugs and a correct solution to the actual problem. **Customer** wants fast builds that cost less. **Developer** wants to build effectively and maintain the code. Customer and user can be the same actor.
- **Solution to "services" overwhelm = RDD.** When a design is stuck because the blocks are too big, go deeper and start from the right blocks (responsibilities). Eventually you'll use object stereotypes directly.
- **FA²STR is a system** (systems thinking: input → model → output). Analogy with a business: leadership (the leader's health and clear head, the idea for value) → marketing → sales → operations (the developer makes "the thing that does the thing") → finance (subscriptions).
- **Upfront vs emergent:** in the session they can only do the upfront design. Emergent design happens later in code with tests, which is "pretty much the exact same thing as red, green, refactor".
- **Choose the guess point / feedback loop first:** the zoom feature could be tested end-to-end, at the application level, or component-by-component as integration tests. The choice shapes the rest of the design. Here it's most likely **guess point 3 (application level)** because it involves coordination, collaboration and control. The earlier TDD katas were at the **stateless guess point** (level 1), where the system under test is always a function or a class with a static method, and examples are enough without responsibilities.
- **Output of the architect step:** a clear understanding of the system under test and its components, i.e. **roles, responsibilities, collaborations** ("that's RDD right there").
- **Object stereotypes:** "six stereotypical objects that pretty much encompass every single object we will ever make." Every object is at least one of them.
- **Control center** = **coordinator** + **controller**, "the key place where all of the main decision making logic happens". It may be spread out: Express does part of it and your controllers do the rest, or you take full ownership.
- **React as control center problem:** if you write everything inside React, React *is* the control center and you have none of your own. Testing then goes through React's "mystery" behind the scenes. Fix: **decouple from React**, push it out to the infrastructure layer, and **take back ownership of the control center**.
- **Payoff:** "you can actually test out 90% of the core use cases without ever even starting react." You can add React "way later" and build the frontend "as if you're writing backend code", with no page refreshes. Pages can be modeled as objects: a page may be a **controller**, and page switching may be a **coordinator**. There are several coordinators and controllers of different types, not one of each.
- **Should you always do this? It depends on the product stage.** An entrepreneur who needs to ship fast can write everything in React. Once you're delivering value, turn defensive (tests, scalability). It's a game, like basketball, so be strategic. "There's no right tests always." Build fast until the theoretical guesses (people want it) are validated, then add physical-level tests.
- The TDD-always vs never-test arguments come from ignoring this strategy. The student's analogy: it isn't a bakery recipe ("put the eggs now, mix it").
- **Big picture:** software development is a **value creation system** of theoretical and physical guesses. Any guess can be wrong, and wrong physical guesses mean negative value (bugs). Tests are how you check your guesses.
- **Upfront design is a guess.** "The more work we do here, the better our guess is probably going to be down here" and the less you restart from scratch. Don't get hung up. "Good enough" can feel uncomfortable because it isn't certain.
- **Non-linear discovery:** new objects (e.g., mouse event) show up during role assignment, and responsibilities get reworded and generalized as you go ("sometimes it's not right the first time").
- **Frontend-inherent concerns** are still functional responsibilities (not non-functional) and need objects: view data (knowing), model data (knowing), updating view data, getting model data, triggering a re-render (doing).
- **Two state approaches for frontend:** (a) OO/delegated: data and behavior live on the related objects (aggregates etc.) and you watch specific objects for changes, like the backend. (b) Centralized: one **application data model** (Redux-like global state) that everything subscribes to. Both have trade-offs, you decide per app, and there's "probably a best of both worlds in the middle". Khalil built a chess app with the delegated approach and has seldom worked on centralized ones.
- **Closing process:** clarity → elimination → execution. "We got a lot of clarity. Now you need to weed out what you don't need. And then you can just go and build."

## Named frameworks / mental models
- **Phases of craftship** — how developers view code.
  - Code-first (tools and wiring) → pattern-first (DDD/patterns/methodologies as building blocks) → first principles (responsibilities via RDD).
  - Use it to find where you (or a student) are stuck and what the next step is.
- **Metaphysics chain: Essence → Actor/Role/Goal → Purpose → Form**
  - Essence: every property of the thing. Actor plays a role with a goal. Goal + chosen *how* give the thing a purpose. Purpose filters the essential properties, and those are its form.
  - Run it every time you design an abstraction, feature or use case.
- **Role-goal → feature**: actor → role → goal → feature/use case → minimal essential properties.
- **Essence of software**
  - Purpose: solve problems. Forms: sequence, selection, iteration.
  - Problem = state A (undesirable) → state B (desirable). Transition = behavior. Fact of transition = event. Data = initial state + events. Namespacing/abstraction = encapsulating data and behavior so we can understand it.
- **Three metaphysical essentials**: abstraction is the first. The other two aren't named here; the Feedback Loop is inferred to be one (see notes 14–15).
- **Feature/use case anatomy**: input data → validation rules + application rules → state changes + events. Its purpose is consistency.
- **Three roles & goals**: user (correct, no bugs, solves the real problem), customer (fast, cheap), developer (builds effectively, maintainable).
- **FA²STR as a system**: each step is input → process → output.
  1. Input problem statement → output **concrete example(s)**, broken into responsibilities. Decide which guess point/feedback loop (E2E, application, integration, stateless).
  2. **Architect a broad upfront design**: input responsibilities/examples → output the system under test and its components (roles, responsibilities, collaborations).
  3. Walk the example through the design and imagine how it works.
  4. Write test code, and the real design **emerges** (red-green-refactor).
- **RDD 3-step process (as done in session)**: (1) list responsibilities (doing/knowing) for the feature; (2) assign them to **roles** using object stereotypes, leaning on the **dominant role**; (3) wire up **collaborations** last ("I like to do that, that last part of collaboration last").
- **Object stereotypes** (six in total; the ones named here):
  - **Interfacer**: the crossover point to infrastructure/outside world (Express, GraphQL, repositories, Stripe/mail APIs, network, file system, human peripherals). Canvas = mostly an interfacer, "like a bridge".
  - **Coordinator**: listens to events and lets others subscribe (observer, Redux-like, Express router, web server, event listeners). "Maybe 10 lines of code."
  - **Controller**: tells other objects to do work and makes decisions. It usually doesn't perform the state change itself.
  - **Information holder**: just holds data (e.g., MouseEvent).
  - **Structurer**: holds the essential data and rules that say how something may or may not change. "Pretty much your aggregate."
  - **Service provider**: mentioned. Candidate for "something that does math" (the camera computation).
- **Control center** = coordinator + controller. It can be **centralized** or **delegated**. Own it instead of letting the framework own it.
- **Category theory / dominant role**: an object can play several roles, but lean into its **dominant role** and "categorize as hard as possible". If an object plays two roles, it could possibly be split into two objects.
- **Value creation system / strategic testing**: theoretical → physical guesses. Test coverage depends on how validated the value is.
- **Clarity → elimination → execution**.

## Definitions
- **Responsibility** — the smallest building block in programming: something an object **does** or **knows**.
- **Service** (student's definition) — an encapsulated set of responsibilities that clients use without building it themselves. Khalil: too broad, "a container for everything related to this type of behavior".
- **Metaphysics** — the first principles of reality.
- **Essence** — what a thing is: all of its properties/attributes.
- **Actor** — who you are (e.g., Khalil). **Role** — what the actor plays (programmer, entrepreneur, writer). **Goal** — what the actor in that role wants (the desired state B).
- **Purpose** — why an object is used. It comes from the actor/role/goal, and "it's always up to the actor to decide what the purpose of something is."
- **Form** — the essential properties needed for the purpose.
- **Problem** — being in an undesirable state (A) and wanting a desirable state (B).
- **Transition** — the behavior that moves state A → B.
- **Event** — the fact that a transition happened.
- **Data** — initial state plus events. Each transition produces a new version of the data.
- **Namespacing** — encapsulating a set of data and behavior (an event concept, a transition, a bounded context). Its purpose is understanding, so it's abstraction.
- **Feature / use case** — data in, validation and application rules applied, state changes and events out, so that data changes only when allowed and stays consistent.
- **Control center** — the coordinator + controller objects where the main decision-making logic lives.
- **Interfacer** — an object that crosses over to infrastructure and the outside world.
- **Coordinator** — an object that lets others subscribe to events and notifies subscribers.
- **Controller** — an object that tells other objects to do work (e.g., subscribes to MouseScrolled and asks the camera to update).
- **Information holder** — an object that only holds data.
- **Structurer** — an object holding essential data and change rules. ≈ aggregate.
- **Event sourcing** — saving events instead of overwriting state. Current state is derived from the events.

## Rules & heuristics
- Write no code until it's clear who plays what role and why they need it.
- Get all responsibilities (puzzle pieces) on the table first, then categorize, then work out collaborations.
- If you're stuck because the building blocks feel too big ("service"), go deeper to responsibilities.
- Categorize "as hard as possible". Find each object's **dominant role**, and consider splitting objects that play two roles.
- Name responsibilities generally: "allows objects to subscribe to events / notifies subscribers" rather than "subscribing to the mouse scrolled event".
- "Anytime I hear state change or updating something to me, that tells me controller", or a controller talking to an interfacer/stateful object.
- Controllers delegate the actual state change to lower-layer objects (post-comment example: controller gets the post, creates the comment, adds it to the post, and the **repo** (interfacer) saves). "Camera repo" shows the repo idea outside a database context.
- Anything talking to peripherals, network, file system or third-party APIs is an interfacer.
- Rules about how something may change (e.g., how far the camera may move) belong in information holders or a structurer (aggregate).
- Do collaboration last.
- **Vagueness does not compile.** Always start from a concrete example of real people.
- Decide the guess point / test level before designing, because it dictates the rest.
- Upfront design is a good-enough guess. Don't get hung up on it, and let tests produce the real design.
- Take ownership of the control center from the framework (React) so you can test core use cases without it.
- Match rigor to product stage: build fast before value is validated, go defensive once users rely on it. No dogma about test-first.
- Design with an event-based architecture and work with the grain of reality.
- Frontend view/model data and re-render triggers are real responsibilities and must be put on objects.
- Choose centralized (global data model) or delegated (per-object watching) state knowingly. Both have trade-offs.
- After gaining clarity, eliminate what you don't need, then execute.

## Anti-patterns / mistakes called out
- **Calling everything a service**: too broad, doesn't respect the layer rules, and leads to "passing references around" and overwhelm.
- **Canvas object spread across many classes**, with many roles manipulating the canvas stage.
- **Code-first blockiness**: large, technology-focused pieces and little design.
- **Getting stuck in pattern-first**: knowing the patterns but not how to fit them together.
- **Letting React be the control center**: you end up with no control center of your own and must test through React's hidden behavior.
- **CRUD-shaped solutions for event-shaped reality**: they go against the grain.
- **Designing without a concrete example** (vague).
- **Dogma about tests**: "always test first" vs "never write tests" and then buggy code. Both ignore strategy.
- **Using formulas without understanding** (the school-math analogy).

## Code discussed
No code was written. The design artifacts (FigJam) for the **Zoom in / Zoom out** feature on a canvas app:

Concrete example: "Currently zoomed out and want to read [small] text. So I zoom in."

Responsibilities brainstormed (unordered; the student noted the order was off and Khalil said they were only jotting everything down):
- Detect mouse scroll.
- Pass the event to some place to be acted upon.
- Trigger the event.
- Object responsible for zooming / doing the work.
- Know when the work is done / subscribe to the work being done.
- Subscribe to the mouse-scrolled event.
- Adjust the camera's view of the canvas.

Role assignment reached:
- **Canvas → Interfacer**: generates the MouseScrolled event and is the bridge to the human/peripherals. It may also provide coordinates.
- **MouseEvent → Information holder**: knows type (mouse event), angle/amount, "other stuff".
- **Application observer / "app events" → Coordinator**: allows objects to subscribe to events and notifies subscribers. It gets given mouse events somehow.
- **Camera controller → Controller**: subscribes to MouseScrolled on the coordinator and tells lower-layer objects to compute and update the camera position. It doesn't do the change itself.
- **Something that does math → possibly service provider**: computes the new camera position.
- **"Something that updates the camera"** → a stateful camera interfacer / "camera repo" that performs the update.
- **Camera → Structurer (≈ aggregate)**: knows current position and holds the rules on how the camera may or may not change (e.g., how far it may go). Observers may subscribe to its data.
- **Open question:** what sits between Canvas and Coordinator to forward canvas events? "There does need to be something here between them." Not resolved in Part 1.
- **Frontend concerns to place:** view data, model data, updating view data, getting model data, triggering re-render. Either delegate them to the objects or centralize them in an application data model (Redux-style).

```ts
// reconstructed from narration
interface MouseEvent { type: 'mouse'; angle: number /* amount scrolled; "other stuff" */ }

class AppEventsObserver {            // Coordinator
  subscribe(eventName: string, handler: (e: MouseEvent) => void): void {}
  notify(eventName: string, e: MouseEvent): void {}
}

class CanvasInterfacer {             // Interfacer: bridge to user peripherals
  constructor(private events: AppEventsObserver) {}
  // generates the MouseScrolled event
}

class CameraController {             // Controller: decides, delegates the change
  constructor(events: AppEventsObserver, private cameraRepo: CameraRepo) {
    events.subscribe('MouseScrolled', (e) => this.cameraRepo.update(/* computed position */));
  }
}

class Camera { /* Structurer ~ aggregate: current position + movement rules */ }
interface CameraRepo { update(position: unknown): void }  // stateful updater
```

## Diagrams / visual models described
- **Camera → uses → Canvas** box drawn for the student's first design.
- **Phases of craftship**: code-first (DB + frontend + backend blocks) → pattern-first (services, entities, repos, aggregates, factories) → first principles (responsibilities: doing/knowing).
- **Mug essence circle**: properties (ceramic, hole, handle, print/printable, color), then filtered by purpose (drink coffee) down to the essential ones (hole; handle/ceramic optional).
- **Actor → roles → goal** tree: Khalil/Lucas as programmers. Goal "have energy" with the hows exercise, drink coffee, sleep.
- **Stone**: kid/warrior/hunter → different purposes → different forms.
- **Computing essence**: automation, math, abstraction, then forms sequence/selection/iteration.
- **State A → state B**, split into small steps, each labeled transition (behavior) + event (fact). Data versions 1 → 2 → 3 → 4. Namespace boxes around events/transitions/bounded contexts.
- **Feature box**: data in → validation + application rules → state changes + events out.
- **Problem shape vs CRUD solution shape** overlay: mismatch, "not with the grain of reality".
- **Three roles** (developer, customer, user) with goals.
- **FA²STR system image** (new image shared in chat): steps as input/output systems.
- **Business as a system**: leadership → marketing → sales → operations → finance.
- **Layered architecture image** (from Khalil's Twitter/rough notes): infrastructure / application / domain, with coordinator and controller at the application layer and React pushed to infrastructure.
- **Control center image**: centralized vs delegated variations.
- **Zoom feature RDD board**: Canvas (interfacer) → [missing link] → App events observer (coordinator) → Camera controller (controller) → math/service provider + camera updater → Camera (structurer).
- **Frontend concerns list**: view data, model data (knowings), update view data, get model data, trigger re-render (doings). Delegated vs centralized "application data model".

## Q&A items
- **How do I use the course ideas to design a canvas app like Excalidraw/Figma? My canvas object ends up everywhere.** (L1-L20)
  - The core problem is clarity and overwhelm. Start with responsibilities, categorize them, then work out how they fit together.
- **How would you normally approach it? (Khalil asks)** (L43-L66)
  - The student designs a camera service that uses the canvas (region, cursor events) to compute zoom/pan. Khalil hears a too-broad "service" container.
- **Is camera an entity instead of a service?** (L80-L95)
  - Partly right. Camera has rules, but the "service" breaks into several smaller objects that follow stereotypical linking rules. The goal is testability and fast extension.
- **Is this like divide and conquer / the feedback loop (top-down, then bottom-up)?** (L119-L123)
  - "Precisely." The feedback loop comes later, through responsibilities.
- **Don't essential attributes also depend on the actor (a kid needs a handle)?** (L155-L158)
  - Yes, but it ultimately depends on their purpose/goal.
- **How does an event fit the metaphysics? Is it an output of a feature?** (L206-L213, answered to ~L270)
  - Software transforms state A → B. The transition is behavior, the fact it happened is the event, data is initial state + events, and a feature outputs state changes and events.
- **Isn't abstraction essential to computing, since even binary voltage is abstraction?** (L221-L230)
  - Good point. Abstraction is the first of three metaphysical essentials, and understanding may be the essence of everything.
- **So data as initial state + events is like DB paradigms that store only events?** (L255-L260)
  - Yes, that's event sourcing, and CQRS at its deepest: keep only the essence of computing.
- **What was confusing?** (L268-L270)
  - Events and "seed data + events → new state" aren't obvious. Khalil: that's why the correct architecture is event-based and works with the grain of reality.
- **What detects the mouse scroll / what type of object?** (L400-L430)
  - The student guesses coordinator (mouse event). It turns into MouseEvent = information holder, app events observer = coordinator, and canvas = interfacer (dominant role: bridge to the outside world).
- **Is the camera responsible for doing the math or for updating the view?** (L436-L439)
  - State change/update means controller (or controller + interfacer). The controller subscribes to MouseScrolled and delegates to the objects that compute and update.
- **Does the controller make the change itself?** (L446-L453)
  - Usually not. Post-comment analogy: the controller orchestrates and the repo (interfacer) saves, so there's a "camera repo" updater.
- **How does the event get from canvas to coordinator?** (L456-L461)
  - Something in between is needed. Unresolved in Part 1.
- **Where do camera rules go? Is camera an aggregate?** (L468-L474)
  - Yes. Information holders / a structurer (≈ aggregate) hold the change rules and current position.
- **How do you subscribe to data in a frontend framework?** (L476-L494)
  - Delegated (watch specific objects, OO/backend-like) vs centralized (application data model / global state, Redux-like). Trade-offs, pick per app.

## Notable quotes
- "The issue is we are not quite descending granularly enough to a level of categorization that we need. This idea of service is too broad."
- "These are all just like different lenses on the first principles of what we're actually trying to do here."
- "The smallest, most granular units of building blocks we can use are responsibilities… something that we do or something that we know."
- "You should be writing no code unless you're very clear on who plays what role and why do they need that."
- "It's always up to the actor to decide what the purpose of something is."
- "We have the behavior, which is the transition. And we have the event, which is the fact that a transition happened."
- "Vagueness does not compile."
- "We want to lean into the dominant role because this is the category theory here. We're trying to categorize as hard as possible."
- "You can actually test out 90% of the core use cases without ever even starting react."
- "Clarity, then elimination, and then execution."

## Cross-references
- Part 2 of this session: Lesson 95 (Reviewing The Upfront Design & Next Steps).
- Metaphysics: notes 07 (intro to metaphysics), 08 (mental models), 14 (essential abstraction), 15 (feedback loop / guess points).
- Three roles: note 11. Value creation system: note 10. Systems thinking: note 09.
- FA²STR: notes 27, 52 (stateless guess point upfront/emergent).
- RDD: note 38 (how to learn RDD). OOP amount: note 36. Layered/clean architecture: note 37.
- Frontend architecture: notes 33, 87, 90, 92.
- Category theory & cohesion: Lesson 67 (bounded contexts, cohesion & category theory).
- State machines / transitions / events: Lesson 74.
- Book: Rebecca Wirfs-Brock's *Object Design* (the "blue book", hard to find; she may have put a free ebook on her site). Garbled in transcript as "OBShack design blue book".
- People: Scott Bellware (moved Khalil past pattern-first), Descartes, Jean-Paul Sartre.

## Fluff skipped
Greetings, Zoom transcription setup, FigJam tool fumbling, energy-level check, sharing permission, and a long garbled "bye" loop at the end.

## AI-era relevance hint
- Responsibility lists and stereotype labels (interfacer/coordinator/controller/structurer) make precise prompts for AI code generation and keep generated code from collapsing into giant "services".
- Owning the control center outside React lets AI-generated UI stay swappable while core use cases stay test-covered without a browser.
- Actor/role/goal → minimal essential properties is a good check against AI's habit of over-generating features and fields.

## Coverage proof
- Lines read: 505 / 505
- Final line (verbatim): "man. Bye, mine, bye, shi. Bye, bye. Bye, bye."
