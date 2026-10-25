# Lesson 88 — May 25th, 2023 Office Hours: Decoupling From Infra, The Theoretical & Stateful Domain Modelling Guess Points
- **Source file:** 88) May 25th, 2023 Office Hours Decoupling From Infra, The Theoretical & Stateful Domain Modelling Guess Points.txt
- **Category:** qa-live
- **Topics:** office-hours, stereotypical-architecture, decoupling-from-infrastructure, dependency-inversion, ports-and-adapters, fakes, in-memory-repository, application-interface, composition, incoming-adapter-tests, ideal-developer-workflow, nth-looping, double-loop-tdd, stateful-guess-point, stateful-domain-modelling-guess-point, domain-layer-concerns, domain-services, entities, value-objects, state-verification, domain-events, object-calisthenics, object-stereotypes, fixtures, builders, aggregates, aggregate-design, temporal-decoupling, transaction-script, process-modeling, event-storming, event-modeling, state-machines, class-diagrams, subdomains, core-supporting-generic, build-vs-buy, theoretical-guess-points, value-creation-system, systems-thinking, frontend-domain-layer, decoupling-from-time, clock-abstraction, rdd, course-structure, storytelling

## Summary
This is the first "office hours" session. Khalil switches from pre-scripted content to teaching live with tight feedback loops. He opens with a story: a student built a naive `createUser` in Express, and Khalil then "ripped it apart" to show the missed concerns and the absence of a domain model. That is the motivation for the **stateful domain modelling guess point**. Answering Talib's slide on test structure, he draws how to **decouple from infrastructure**. Dependency inversion on persistence (repository) and external services (a fake `PaymentService` instead of Stripe) lets the tests use fakes. An **application interface** (all use cases composed into one pure object) removes the web server from the picture. **Incoming adapter tests** only check that endpoints call the correct use cases with the correct parameters. He then walks the planned stateful section: stereotypical architecture; process modeling + class diagrams + state machines; "Nth looping" (level 2 entity → level 1 value objects) with state verification and domain events; tic-tac-toe with object calisthenics and the six object stereotypes; fixtures with builders; domain services (a Notion ↔ Google Calendar sync plan); and full RDD domain modelling. A long segment on **aggregates** defines them as the minimum data needed to perform a command. It shows how a `User` aggregate bloats, and uses a "make purchase" transaction script to motivate temporal decoupling, process modeling, and subdomain boundaries. He closes by restating the order of guess points (theoretical before physical), explaining domain services (recommendations), frontend domain layers (React Router has one), and decoupling from time with a clock abstraction.

## Core ideas
- **Office hours = tightest feedback loop.** Teaching live surfaces the essential questions and missing knowledge, which then feed back into the content. New format: teaching session + assignment → students try → Q&A → refine content.
- **The naive `createUser`** (async DB call inside an Express handler, "functional JavaScript-y", callback-hell style) is where everyone starts, frontend devs included. It "looks kind of elegant" but has "a lot of missed concerns" and "no domain model".
- The stateful guess point is renamed the **Stateful Domain Modeling Guess Point**: "where the heart of your software really goes."
- **One stereotypical architecture.** Hexagonal, onion, ports & adapters, even event-driven are all "one stereotypical architecture", found on frontend, backend and desktop. Once you're aware of its layers and their concerns, "you can't unsee it". You always know when a concern is missing and how to encapsulate it.
- **FA²STR is fundamentally a decomposition tool** and the main tool of the course. If you know how to break problems into the correct guess points/slices and what to do at each one, it's easy to flow into the work.
- **Course purpose:** "give you all the clarity to flow into your work and then the confidence to know... I also have the tools to do that."
- The 12 essentials (macro-level principles) make the stateful work manageable; the job is slotting them into FA²STR.
- **RDD:** "three steps to design everything". If you can domain model it, all that's left is connecting it to the real world with a vertical slice. Khalil's conceptual model of the domain layer: "Building this little world and just connecting to it using infrastructure."
- **Two big problems in a naive backend:**
  1. **E2E tests don't scale.** Every feature test has to go through the whole app to the DB. Setting up DB state (fixtures) each time is complex and slow. The granularity is wrong.
  2. **Controller + app logic + business logic are fused** (e.g. Express handler), so even with a fake DB you still have to go through the controller.
  - A third problem, raised later for section 1, is **lack of encapsulation**. Pulling a validation function into a separate file to test it leaves data and related behavior apart. The fix is encapsulation with classes or functionally.
- **Fix #1: dependency inversion.** Describe persistence as a contract. The backend "uses / relies on" the abstraction; the DB "is a / plays the role of" it. A fake in-memory DB also plays that role, so you can set up world state and test business logic directly.
- **Fix #2: application interface.** Define an API describing all inputs to your system. The app implements it (pure); the web server uses it. The application and domain logic can then be tested without a real DB or a real web server.
- The public API should **also** become a contract so everyone can reliably depend on it (mentioned, not drawn).
- **Persistence = repository**, but you might also rely on a cache or on external services. Example: Stripe for billing. Depend on a `PaymentService` concept. Use a fake in level-3 tests, then plug in Stripe, PayPal, or both when testing the whole system.
- **Interfaces as roles:** "We think of interfaces as... roles." Concretions *play* the role. That is the most first-principles way to think about design (responsibility-driven).
- **Incoming adapter tests** (Khalil: "I believe this is like... level six") validate the guess that UIs/other clients call the right API endpoints and that **endpoints map to the correct use cases with the correct parameters**. They don't need to execute the use cases. This explains the "it works in tests but not when deployed" experience (e.g. CORS).
- The application interface is an instance of the **composition** essential: clump all use cases into "one big object", one pure object. Incoming adapter tests then don't need to configure every real use case.
- Daniel (chat): without the application interface abstraction, "you end up building your app within your framework." Khalil agrees and mentions **control styles** as a related topic he loves but defers.
- **Domain layer concerns (4):** data, rules, relationships between data, processes.
- **Three tactical tools** for those concerns. One has already been learned in its stereotypical form: the **service provider** stereotype from level-1 stateless I/O work. It maps to the DDD **domain service**. (The other two aren't named here; inferred: entities and value objects.)
- **Hard example, Notion ↔ Google Calendar two-way sync** (Khalil built one for himself). The hardest parts are setting up tests and writing the sync logic without coupling the two worlds, then putting it in the domain layer. Solution shape: a domain service (level-1-like I/O) takes a tasks list entity and a calendar entity (both level 2, preloaded with state) and outputs a **sync plan** (adds, updates, removes). The application layer then tells repositories/external services what to do.
- "If you know how to domain model, then you know how to solve almost all of the really hard problems": find responsibilities (doings & knowings), assign them to the six object stereotypes, model the domain, connect it to infra.
- **Call-flow editor example** (frontend drag-and-drop nodes: telephone, operator, switch that splits into two paths). Rules like "can't drop a telephone node where there's no operator after" are challenging. They become manageable once expressed in a domain model with the three tactical tools.
- **Course design needs storytelling:** know where you start and the problem from your current perspective → new perspective → how to use it → why it's good → demo → collect learnings → next topic. Khalil admits the course lacked this early on and aims to fix it in V2.
- New content philosophy: decide the main capabilities students should have at each point, then **work backwards** to just those.
- **Visualization assignments** (updated from "just state machines"). Model tic-tac-toe, traffic light and a blog post with process modeling, class diagrams and state machines. Each gives a different kind of clarity (see frameworks).
- **Process modeling** is where data and behavior come from. Chart the events in sequence, put the command that creates each event in front of it, and identify the command's input data. It also reveals **data-behavior namespaces**.
- "You could pretty much assemble everything... about building information systems into data behavior namespaces." The challenge is knowing which data/behavior belongs in which namespace and not mixing concerns (e.g. not talking about Discord inside pet-store code).
- The visualization work is still **theoretical** (understanding the solution space). Domain model implementation comes after.
- **Nth looping** (renamed from double looping, because there are many layers where you write guesses). You usually start at layer 5 (system boundary) or layer 3 (developer boundary, with edge cases, business logic and app logic). In the stateful section it goes level 2 → level 1.
- **Student entity example:** build `Student` (level 2, entity) → need value objects `FirstName`, `LastName` (also level 2, stateful). Rule: if the student has never been created, auto-create a student email from first + last name. Validating a first name is a level-1 I/O question (valid or not).
- **Subject verification at level 2 = state verification.** Level 1 uses result verification (inputs → outputs). Stateful objects need APIs to reach in and check the correct state and whether it changes correctly. That leads back to state machines.
- Students will also **save domain events on entities** as they change, to confirm they change *for the correct reason*. They'll also learn about results and mutability.
- **Tic-tac-toe** is one of the hardest challenges so far (alongside Boolean calculator). It uses **object calisthenics** plus the **six object stereotypes** ("I could box every single abstraction to being one of these six"), with rules to keep objects cohesive and each one conforming to at least one stereotype.
- **Fixtures (initial state) are one of the hardest problems.** You don't need to implement `createUser` to test `editUser`; you only need to create the state of the world in code. Your system is a sequence of state changes (event modeling), so you can start a test at any point in the timeline and test the next command.
- **Domain services** handle complex processing involving entities. **RBAC** was considered as an assignment but is probably too much; it may be a demo instead.
- The final part of the stateful section: take a problem, break responsibilities into doings and knowings, and model a whole domain. The **role-goal** concept at the next guess point then helps design aggregates, because you don't want to carve out huge entities. Watch their size and how they come to be.
- **Aggregates** (details in Q&A): minimum data required to perform a command; keep them small; if you can't find the boundary you're probably doing too much in one command → temporal decoupling.
- **You understand an entire domain by looking at its events.** Each event has a command in front of it and an aggregate the command acts against. Systems are event-based; subdomains trigger each other via events.
- **Order of work (via the value creation system):** never make physical guesses until theoretical guesses are sorted. Problem → solution space (domains; core/supporting/generic) → architecture (build vs buy, tools) → physical. Physical follows the ideal developer workflow.
- **Systems thinking brings order to chaos:** understand inputs, outputs and the processes in the middle, recursing into sub-systems (real-estate loan → down to the "system of money/value"), then climb back up.
- The smallest software system is the stateless guess point. The next is the stateful one. **Input to the stateful guess point: vertical slices, i.e. a unit of functionality, a command.**
- **The 12 essentials apply differently at each guess point.** Horizontal decoupling at level 2 differs from level 5. Vertical slicing isn't really used at level 2.
- Clarity analogy: a dam. Without clarity you feel blocked and creativity can't flow; with clarity "the dam just like bursts open".
- Even for problems Khalil can't answer, knowing the **level** at which a problem should be solved lets you kick it off and do emergent design as it emerges.
- **Frontend:** complex frontend behavior means building a whole domain model. The frontend very likely has several domains. React Router has a domain layer (domain/app/adapter/infra) that you choose to install rather than build. "Your app is just a bunch of... domains connected to each other", some built, some installed. If it feels hard, "it should feel hard" (imagine D3.js's domain layer).
- **Decoupling from time:** the domain model must be pure. No system time (`new Date`), no random number generator (`Math.random`), no `setTimeout`. Those break encapsulation of core code and force tests to wait (e.g. 30 s for a traffic light). The answer is a **clock abstraction**; this is deferred to a "decoupling from time" section.
- Domain-model implementation techniques still to teach: result pattern, guards, "results are just unions", immutability, protecting invariants, encapsulation with classes and with functions.
- **Event storming is non-negotiable.** There are two forms: big picture (existing project) and process modeling (one feature).
- **Actors and roles belong to the application guess point.** Actors play roles, and those roles give meaning to features and input data. Skip them at the stateful guess point.

## Named frameworks / mental models
- **Stereotypical architecture**: the single underlying architecture behind hexagonal/onion/ports-adapters/event-driven.
  - Layers: domain → app → adapter → infrastructure.
  - Domain concerns: data, rules, relationships, processes.
  - "Laws" Khalil plans to cover (listed in the frontend answer): one-way flow split into reads and writes; event-based; horizontal decoupling from infrastructure; domains.
  - Use: to spot missing concerns and know where to encapsulate them, on any platform.
- **Dependency inversion for infra ("is a / plays the role of" vs "uses / relies on")**
  - Components: core code → uses → contract (Persistence/Repository, PaymentService); real DB, Stripe, PayPal, fake in-memory → play the role.
  - Purpose: test business logic without a DB; swap implementations.
  - Law stated: in-memory is always faster and easier to manipulate than disk.
- **Application interface** (composition essential): all use cases composed into one pure object that the app implements and the web server uses. It removes the controller from level-3 tests and simplifies incoming adapter tests.
- **Test levels as used in this session** (numbering as spoken):
  - Level 1: stateless I/O (value-object validation, domain services), result verification.
  - Level 2: stateful (entities, value objects), state verification + domain events.
  - Level 3: application (developer boundary; the majority of tests; edge cases; fakes).
  - Level 5: system boundary (E2E, production-like).
  - Level 6 (tentative, "I believe"): incoming adapters.
- **Ideal developer workflow** (restated twice):
  1. Theoretical guesses → architecture.
  2. Build a small piece of functionality and deploy it.
  3. One real E2E test through web server → DB (production-like).
  4. Move in two layers to level 3 application tests and write the majority there (edge cases, true functionality).
  5. Spend ~20% of time filling in infrastructure tests.
- **Nth looping** (formerly double looping): outer test at a higher level drives inner tests at lower levels, across N layers. Example: Student (L2) → FirstName/LastName (L2) → validation (L1).
- **Subject verification** (Khalil wants to return to the term "subject" rather than "system"). Draw a boundary around the tiny component under test.
  - Result verification: level 1.
  - State verification: level 2, via query APIs plus domain events.
- **Three visualizations for domain understanding**
  - Process modeling (event storming form): events in sequence → commands → input data → names; gives data, behavior and namespaces.
  - Class diagram: entities and the relationships between them.
  - State machines: rules (when entities can/cannot change, under what conditions, and the resulting new state).
- **Data-behavior namespaces**: information systems are assemblies of namespaces. The challenge is assigning data/behavior to the right one and not mixing concerns.
- **Six object stereotypes**: building blocks every abstraction can be boxed into. Used with object calisthenics in tic-tac-toe. (The names aren't listed in this session.)
- **RDD modelling method**: find responsibilities (doings, knowings) → assign to the correct object stereotypes → domain model → connect to infra via vertical slice.
- **Domain service as input → output**: stateful entities in, a plan/decision out (sync plan; recommendations). The application layer executes the plan against repositories/external services.
- **Aggregate = minimum data to perform a command**, plus design rules (see Rules).
- **Event-first domain understanding**: events → commands in front → aggregates → boundaries around subdomains. This is prerequisite work for small aggregates.
- **Stateful/theoretical guess-point order via the value creation system**:
  - Problem: domain experts, big-picture modelling, event storm → understanding.
  - Solution space: domains, and which are core/supporting/generic.
  - Architecture: which domains to build vs buy, and which libraries/frameworks/tools per subdomain (the plan).
  - Physical guess points.
- **Two forms of event storming**
  - Big picture: joining an existing project to gain clarity on how things are done there. Planned for the "bridging the gap" section.
  - Process modeling: one feature → find the essential subdomains immediately. Good at the start of new projects/features.
- **Course storytelling arc**: problem from the current perspective → new perspective → usage → why good → demo → collect learnings → next.
- **Systems-thinking learning method**: understand inputs/outputs/processes, recurse into sub-systems down to the smallest, then climb back up (real estate / loans example).

## Definitions
- **Stateful Domain Modeling Guess Point**: the new name for the stateful guess point, where you encapsulate the heart/core code of your software (the domain layer).
- **Fixtures**: setting up the state of the world so you can test the functionality you want.
- **Dependency inversion**: create a contract describing a dependency (e.g. persistence) and rely on the abstraction, not on the concrete DB.
- **Application interface**: an object/API that says "everything that your app can do"; the app implements it and delivery mechanisms (web server) use it. Pure.
- **Incoming adapter**: a thing that needs to use your system (web frontend, desktop, mobile, external system via webhooks; REST/GraphQL/SOAP).
- **Repository**: the "persistence" contract in this context.
- **Domain service**: the DDD pattern corresponding to the service-provider stereotype. An input → output system that works against entities and handles complex, domain-specific processing (sync plans, weighting recommendations).
- **Aggregate**: "the minimum amount of information required for you to perform a command". The absolute minimum data required to execute the command and evaluate its rules, which is then saved into an event. It isn't necessarily the input data.
- **Command**: the thing performed against an aggregate that produces an event (e.g. `createUser` → `UserCreated`).
- **Transaction script**: putting all steps of a feature in one procedural call (e.g. `makePurchase`). Sometimes needed for speed, but risky.
- **Idempotency** (as Khalil introduces it, mis-transcribed "Iden potency"): used in the context of partial failure mid-request. Khalil's point is that you want "either this whole thing works or none of it works". Strictly, that describes atomicity/transactions (inferred).
- **Core domain**: the most important domain to the business (for essentialist.dev: education).
- **Generic subdomain**: something you can download/integrate (identity & access management/auth, email sending).
- **Big ball of mud**: a codebase whose team doesn't know its core domain, so it's a mess and can't be changed.
- **Object calisthenics**: a set of coding rules (Google it) used in the tic-tac-toe assignment to enforce cohesive objects.
- **Builders**: a technique for encapsulating/simplifying initial-state (fixture) creation; see GOOS.
- **Clock abstraction**: an abstraction of time injected into the domain so it never touches system time.

## Rules & heuristics
- Always know when a concern is missing: map code onto the stereotypical architecture.
- Don't rely on real infrastructure in core code. Depend on the contract (role) and let concretions play the role.
- Use a fake in-memory repository and fake external services (e.g. `PaymentService`) for level-3 tests.
- Write the majority of tests at level 3 (application). Keep a single production-like E2E test; spend ~20% on infra tests.
- Incoming adapter tests: only validate that endpoints call the correct use cases with the correct parameters. Don't execute the use cases.
- Compose use cases into an application interface so adapters don't depend on each concrete use case.
- Avoid the word "integration" in testing; it "means so many different things to so many different people."
- Avoid package-by-infrastructure ("I hate packaged by infrastructure like this").
- First step for anyone who has never done backend: build `createUser` end to end and just get it to work. Then carve out the domain layers properly.
- Put an application concern like "if the user already exists, return an error" in the application layer; it needs the repository.
- At level 2 use state verification. Record domain events on entities to verify they change for the correct reason.
- Every abstraction should conform to at least one of the six object stereotypes.
- To test `editUser` you don't need `createUser`; construct the world state directly (builders).
- **Aggregates:** keep them as small as possible and include only the data needed to execute the command and its rules. E.g. for edit user, the password isn't needed.
- Introduce new abstractions only when necessary (**rule of three**). Command-specific aggregates (`UserForEditUser`, `UserForCreateUser`) will eventually refactor into a common abstract `User` holding the shared parts.
- Can't find the aggregate boundary? You're probably doing too much in one command → apply **temporal decoupling** (split into event-linked steps).
- You want requests to be all-or-nothing. Never leave "billed the customer but inventory not updated".
- Model the success scenario first, then imagine failure scenarios (billing fails → email, wait, cancel after 3 days, release inventory).
- Never make physical guesses unless the theoretical guesses are sorted. Know the core domain before touching code.
- Don't build IAM/auth or run your own SMTP server; integrate generic subdomains (e.g. MailChimp for email).
- The domain model must be pure: no `new Date()`, `Math.random()` or `setTimeout` inside it. Inject a clock.
- Examples are "huge" for learning; assignments need concrete examples.
- Keep office hours course-related; Khalil will steer questions back to course tools.

## Anti-patterns / mistakes called out
- **Callback-hell / "functional JavaScript-y" `createUser`** with an async DB call inside the Express handler: missed concerns, no domain model.
- **Scaling E2E tests** as the only testing strategy: DB setup each time, slow, wrong granularity. Talib's E2E suite "getting bigger and bigger" and unable to cover edge cases.
- **Controller + app logic + business logic in one place**: you still have to go through the web server to test.
- **Package by infrastructure.**
- **Lack of encapsulation**: pulling validation into a random function in another file to test it, so data and behavior live apart.
- **Ever-growing `User` aggregate**: each new command (edit role, add role, change role, account spending...) adds fields. A simple edit has to load "9,000 other things", with memory cost and expensive queries.
- **Transaction script `makePurchase`** doing everything: get cart items, check inventory, bill card/token, update inventory, send email. A crash between billing and the inventory update leaves an invalid state. Khalil did this on the solidbook website and suffered, including serverless **cold starts** cutting requests.
- **Not knowing the core domain** → big ball of mud.
- **Mixing namespaces** (talking about Discord inside pet-store code).
- **Building generic subdomains yourself** (auth, SMTP).
- **Using system time/randomness/timers in the domain model**: breaks encapsulation and makes tests wait.
- Khalil's own: insufficient storytelling/structure early in the course, making it feel "black box"; a traffic-light assignment referencing annotated transitions/actors & roles before students were equipped for them.

## Code discussed
**1. Student's naive `createUser` (shown on screen).** It queries the DB for an existing email and returns an error if the user already exists, all inside the Express route, with package-by-infrastructure structure. The only way to test it is an E2E call from outside.

```ts
// reconstructed from narration
app.post('/users', async (req, res) => {
  const { email, password } = req.body;
  const existing = await db.users.findOne({ where: { email } });
  if (existing) return res.status(409).json({ error: 'User already exists' });
  const user = await db.users.create({ data: { email, password } });
  return res.status(201).json(user);
});
```

**After (as drawn on the whiteboard):** contracts for persistence and external services, fakes for tests, and an application interface used by the web server.

```ts
// reconstructed from narration
interface UsersRepository { findByEmail(email: string): Promise<User | null>; save(user: User): Promise<void>; }
interface PaymentService { charge(/* ... */): Promise<void>; }        // Stripe / PayPal / Fake play this role

class InMemoryUsersRepository implements UsersRepository { /* fake: plays the role of a database */ }
class FakePaymentService implements PaymentService { /* used in level-3 application tests */ }

interface Application {                                                // "everything that your app can do" — pure
  users: { createUser(input: { email: string; password: string }): Promise<Result<User>> };
}

// Web server (Express) uses Application; incoming-adapter tests check route -> correct use case + params
```

**2. Aggregate evolution for `User`** (FigJam event-storming template):
- `createUser` → `UserCreated`. Data: email, password (or a social sign-on key). Rules: email is unique (not taken), password is valid. Validated in the application layer.
- `editUser` → `UserEdited`. Data: id, user details (first name, last name, email). Password isn't needed. New rule: not allowed to edit unless the account is verified → email becomes a value object with value + status (verified / not verified).

```ts
// reconstructed from narration
class Email { constructor(readonly value: string, readonly status: 'verified' | 'not-verified') {} }
class UserForCreateUser { email: Email; password: Password; }
class UserForEditUser { id: UserId; firstName: FirstName; lastName: LastName; email: Email; }
// after rule of three: abstract class User { /* common parts pulled up */ }
```

**3. Sync-plan domain service** (planned assignment): input `TasksList` + `Calendar` entities preloaded with state → output `SyncPlan { adds, updates, removes }` → the application layer applies it via repositories/external services.

**4. Student entity** (planned Nth-looping assignment): `Student` with `FirstName`/`LastName` value objects; auto-generated student email on first creation; level-1 name validation.

**5. Traffic light**: model the transitions and design the API to move the light forward; skip time for now. Later, use a clock abstraction instead of `new Date`/`setTimeout`.

## Diagrams / visual models described
- **Talib's slide:** acceptance tests (unit-fast) + domain tests (entities, aggregate roots). Diamonds mark swappable/testable boundaries; no third-party knowledge; DB replaceable; interface could be a CLI.
- **Incoming side drawing:** frontend app, mobile app, and an external system (e.g. webhooks; Khalil's Discord ↔ Kajabi integration) all inbound to the app.
- **Dependency-inversion diagram:** backend code —uses→ Persistence contract ←is a / plays the role of— Database and Fake In-Memory DB. Extended with a `PaymentService` role played by Stripe, PayPal and Fake.
- **Application-interface diagram:** web server —uses→ Application Interface ←implements— app (application + domain), with the database behind a contract. The API contract is noted but not drawn.
- **Ideal developer workflow:** one E2E arrow from web server through to DB, then "move in two layers" to level 3.
- **Slack incoming adapters:** frontend, desktop and mobile apps calling Slack's API → endpoints → use cases.
- **Stereotypical architecture sketch:** concentric domain / app / adapter / infrastructure, with domain concerns (data, rules, relationships, processes) in the middle.
- **Call-flow editor:** a canvas graph with draggable node types (telephone, operator, switch splitting into two paths).
- **Stateful section plan** (Khalil's content outline on screen), sections 1-7 as described in Core ideas.
- **Aggregate event storm** (FigJam): `createUser` / `editUser` commands, input-data sticky notes, rules stickies, `User` aggregate, then `UserForEditUser` / `UserForCreateUser` → abstract `User`.
- **Make-purchase process model** (success scenario, time left → right):
  - Item Added To Cart [e-commerce] → Order Placed [orders] → Customer Billed [billing] → Email Sent [emails] → Shopping Cart Emptied [e-commerce] → Inventory Updated [inventory].
  - Boundaries were drawn around each subdomain; each thing (cart, order, payment method, email) is its own state machine interacting via events.
- **Value creation system / guess-point roadmap** (from the website): problem → solution space → architecture → physical guess points, with the ideal developer workflow inserted after architecture.
- **Essentialist.dev domains:** e-commerce, education (core), billing, orders, email.
- **App as connected domains:** blobs 1-2-3, some built, some installed (React Router).

## Q&A items
- **Office hours scope?** → Keep it course-related (design problems, architecture, testing, frontend); answered with course tools. (L68-L79)
- **Talib: is my test structure right (acceptance tests on business logic, decoupled from infra, double-loop TDD, test controllers calling business layer)?** (L80-L149)
  - Mostly yes. Avoid the word "integration".
  - Two problems: E2E doesn't scale (fixtures, slowness) → dependency inversion + fakes; controller fused with logic → application interface.
  - Then the ideal developer workflow: one E2E test, majority at level 3.
- **Is "persistence" the same as a repository?** → Yes. You may also rely on a cache or external services, e.g. a fake `PaymentService` instead of Stripe; later Stripe/PayPal. Concretions "are / play the role of" the interface. (L168-L185)
- **Can the web server depend on use cases directly (Go dependency), or should there be an abstraction?** (L186-L234)
  - Explains incoming adapter tests: validate that endpoints map to the correct use cases with the correct params, without executing them (the CORS-style "doesn't even get into the app" failure).
  - Recommends an application interface (composition essential) so tests don't configure every use case.
- **Daniel: without the app-interface abstraction you build your app within your framework** → Agreed. Control styles is a related topic, deferred. (L235-L245)
- **Notes/SOLID book chapters to move forward on the stateful guess point before content lands?** (L249-L360)
  - Khalil walks the planned section: stereotypical architecture + problems; process modeling/class diagrams/state machines for tic-tac-toe, traffic light, blog post; Nth looping (Student); tic-tac-toe with object calisthenics + six stereotypes; fixtures with builders (read GOOS); domain services (sync, call-flow rules; RBAC maybe demoed); full RDD domain modelling; role-goal next for aggregates.
- **"Everything feels very black box"** → Acknowledged. The course needs a stronger storytelling arc; V2 will fix the flow. (L277-L286)
- **How to use aggregate roots properly / design aggregates?** (L361-L493)
  - Aggregate = minimum data to perform a command (User create/edit example).
  - Command-specific aggregates plus rule of three.
  - If the boundary is unclear you're doing too much → temporal decoupling.
  - `makePurchase` transaction script vs event-based subdomains.
  - Event storming is prerequisite work for small aggregates.
- **Leo Max: aggregate root with a list property (playlist has many tracks), reorder tracks?** → "You might be missing a concept"; moved to a course-chat thread. (L494-L499)
- **How do you keep track of the whole process and do the right steps in the right order?** (L503-L560)
  - Value creation system: theoretical before physical. Problem → solution space (core/supporting/generic) → architecture (build vs buy) → physical via the ideal developer workflow.
  - Systems thinking (real-estate example).
  - Input to the stateful guess point = vertical slice/command.
- **Student comment: the structure helps set context and communicate with coworkers** → That's the first skill. Clarity is like a dam bursting; the 12 essentials are executed differently at each guess point. (L560-L577)
- **How will we be introduced to domain services?** → In the stateful guess point with concrete problems. Examples: Facebook friend recommendation weighting (collaborative filtering), blog "recommended posts" (what are the inputs/outputs?). (L577-L590)
- **Front end: complex behavior is rare / leaning into stateful testing on frontend** (L595-L611)
  - When the frontend has complex behavior, build a domain model. Planned "laws of the stereotypical architecture" (one-way reads/writes, event-based, horizontal decoupling, domains).
  - React Router has its own domain layer; an app is connected domains, some installed.
- **What do you need to do the stateful assignments?** (L620-L650)
  - Students asked for examples, and noted confusion about actors/roles and annotated transitions.
  - Khalil: actors & roles belong to the application guess point, so skip them. Skip process modeling until content lands if comfortable with state machines.
  - Traffic light: skip time; you'll need a clock abstraction and a pure domain. Next: entity → value objects.
- **Request: event storming session** → "Non-negotiable". Big-picture vs process modeling. Plan: a live session doing process modeling on the three examples, then turning it into code. (L663-L677)

## Notable quotes
- "Once you're aware of the stereotypical architecture and the layers and the concerns within those layers, you can't unsee it."
- "If I was to put, just summarize the purpose of this whole course, it's to give you all the clarity to flow into your work and then the confidence to know, okay, I also have the tools to do that."
- "Building this little world and just connecting to it using infrastructure."
- "There's a law here where it's always way faster and easier to manipulate something in memory rather than in disk."
- "We think of interfaces as... roles."
- "An aggregate is the minimum amount of information required for you to perform a command."
- "You're probably trying to do too much in one command."
- "You can understand an entire domain just by looking at the events."
- "You never want to be making physical guesses unless you have your theoretical guesses sorted."
- "The domain model needs to be super pure. It's not allowed to know about system time."

## Cross-references
- Lessons: 7-8 (metaphysics/mental models), 9 (systems thinking), 10 (value creation system), 15 (feedback loop / guess points), 16 (vertical slicing), 17 (horizontal decoupling), 18 (temporal decoupling), 19 (composition), 20 & 53 (subject/system verification; result/state/communication), 26 (ideal developer workflow), 27 (FA²STR), 38 (RDD), 42 (first milestone backend API), 65 (theoretical guess points), 69-70 (event storming/process modeling), 71 (architecture guess point), 73 (hand-written spies), 74 & 76 (state machines, stateful guess point), 77 (domain object implementation), 78 (fixtures w/ builders), 86 (intro to stateful guess point), 89 (next office hours: aggregates, state machines).
- Concepts: stereotypical architecture, hexagonal/onion/ports & adapters, dependency inversion, fakes, repository, application interface, incoming adapters, control styles, Nth/double-loop TDD, object stereotypes (6), object calisthenics, domain services, entities, value objects, aggregates, domain events, result pattern, guards, immutability, invariants, transaction script, idempotency/atomicity, temporal decoupling, event storming (big picture / process modeling), event modeling, state machines, class diagrams, core/supporting/generic subdomains, big ball of mud, role-goal, RBAC, rule of three, clock abstraction.
- Books: *Growing Object-Oriented Software, Guided by Tests* (Freeman & Pryce), "definitely my top five", for builders; *solidbook* (Khalil's; Talib is reading it).
- Tools/systems: Express, Stripe, PayPal, Slack, Discord, Kajabi, FigJam, Stately (state machines), React Router, D3.js, MailChimp, Notion, Google Calendar, serverless.

## Fluff skipped
Greetings, mic/screen-share logistics, vitamins/SoundCloud banter, girlfriend anecdote, timer fumbling, 15 GB recording joke, goodbyes.

## AI-era relevance hint
- AI assistants readily generate the naive "Express handler + DB call" `createUser`. The stereotypical-architecture lens is how you spot the missing domain layer and ask for ports, fakes and an application interface instead.
- Pure domain models (no time, randomness or I/O) plus level-3 tests with fakes give AI-generated code fast, deterministic verification. That's the feedback loop that makes AI changes safe.
- Process modeling (events → commands → aggregates → subdomains) is a strong upfront spec to give an AI agent, preventing transaction-script sprawl.

## Coverage proof
- Lines read: 685 / 685
- Final line (verbatim): "Bye. Bye. Bye."
