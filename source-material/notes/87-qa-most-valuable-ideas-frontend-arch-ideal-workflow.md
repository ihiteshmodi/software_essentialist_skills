# Lesson 87 — May 5th, 2023: The Most Valuable Ideas In This Course, Frontend Architecture & The Ideal Developer Workflow
- **Source file:** 87) May 5th, 2023 The Most Valuable Ideas In This Course, Frontend Architecture & The Ideal Developer Workflow.txt
- **Category:** qa-live
- **Topics:** front-loading-value, stereotypically-testable-architecture, frontend-architecture, presenter, controller, coordination-and-control, react-as-framework, ideal-developer-workflow, goos, double-loop-tdd, acceptance-tests, e2e, high-value-unit-tests, application-guess-point, walking-skeleton, tracer-bullets, vertical-slicing, deployment-first, dependency-rule, object-stereotypes, rdd, redux, ngrx, selectors, state-management, global-vs-component-state, view-models, cqrs, frontend-domain-logic, verification-types, indirect-inputs-outputs, spies, handwritten-mocks, contract-tests, in-memory-repos, builders, read-write-separation, event-storming

## Summary
Khalil wants to **front-load the value** of the course, meaning show the "game-changing" ideas early instead of making students wait for them. The biggest one is the **stereotypically testable architecture**. Its layers are the same on frontend, backend, desktop or a Chrome extension; only the terminology changes. Once you know it, you can place any tool (Next.js, Nest.js, Remix, Redux, NgRx) by asking what responsibility it handles. The second is the **ideal developer workflow**, taken from *Growing Object-Oriented Software, Guided by Tests* (GOOS). Up front you do Find → Architect → Automate: build the testable architecture as a walking skeleton and deploy one tiny vertical slice. After that, every feature starts with a failing E2E acceptance test, moves in to a failing **high-value use-case test** at the application layer (level 3, where ~80% of the work happens), then outward to adapters and UI components. On the frontend this means React must not do the coordinating and controlling. A **Presenter** and a **Controller** are plain objects that can be tested as the whole app without React or the API. The Q&A covers vertical slicing vs walking skeleton vs tracer bullets, verifying email at E2E vs application level, and where Redux and selectors fit. It also covers global vs component state and domain logic on the frontend. The session ends on how the three verification types map to the guess points, indirect inputs/outputs, **contract tests** that keep fakes in sync with real repos, handwritten spies, builders, and keeping read paths separate from domain objects.

## Core ideas
- **The most valuable ideas in the course** (the "front-loaded value"):
  1. **There is one stereotypically testable architecture.** The same underlying laws apply on frontend, backend and desktop. "If you could master this on the front end or the back end... you've effectively mastered it everywhere." Only the language differs.
  2. **Map tools onto the stereotype.** For any tool (Next.js, Nest.js, Remix, Redux, NgRx), ask "what type of concern is this handling? What responsibilities... with respect to the stereotypical architecture?"
  3. **Find problem points by measuring the gap.** Compare the ideal testable architecture with where your codebase currently is.
  4. **The physical guess points exist to let you write tests strategically.** "The guess points... is really just to carve out your ability to write tests strategically."
  5. **Ideal developer workflow** (from GOOS): a consistent way to approach work "95% of the time", frontend or backend.
  6. **Don't let React (or any view library) coordinate and control.** Features and their specs must be separate from the UI, libraries and APIs.
  7. **The application guess point (level 3)** is where ~80% of the work happens. It's pure core code with fast tests, full control and easy edge cases. It's Khalil's favorite guess point and "quite literally life-changing".
  8. **Walking skeleton + deploy first.** Build and deploy a tiny end-to-end slice before any feature work.
  9. **One acceptance test per feature, shared by all platforms.** Frontend, backend, mobile and desktop teams all take the same spec (Dave Farley).
  10. **Testing strategy over single-level testing.** E2E does result verification only. Communication verification happens at the application level. Contract tests keep fakes honest.
  11. **Think in responsibilities (RDD / object stereotypes), not pattern-first.** SoC and SRP "make no sense at all" unless you know the stereotypical single responsibilities.
- **Guess points listed:** stateless (1), stateful (2), application (3, favorite), outgoing adapter (4), system/E2E (5). Incoming adapters are mentioned alongside outgoing adapters as "four and six". Incoming-adapter tests matter less on the frontend.
- **Terminology differs across the stack, but the concepts are the same.** A frontend **presenter** plays roughly the role a backend repository dealing with read models plays. DTOs exist on both sides, but on the frontend they're usually handled by GraphQL or just cached.
- **Source of the stereotypical architecture:** the book *Object Design* (Wirfs-Brock). It "pulls together everything... in DDD, hexagonal architecture", just more granular. Layer mapping from the drawing:
  - Data, rules, processes, relationships → level 1 and level 2 work.
  - Application → level 3.
  - Outgoing and incoming adapters → "four and six".
  - End-to-end → system level (level 5).
- **Why testing is so hard to learn:**
  - The knowledge is "tucked away within books".
  - Testing, design, architecture and strategy are linked, so you must learn them all at once while "really not knowing what's going on".
  - "You can't really get good at testing without getting good at object oriented design and also understanding architecture... for you to test means you need a testable architecture."
- **Most devs lack a solid starting point** for what an architecture should look like. The physical section will build it 4–5 times (backend, frontend, desktop, even a Chrome extension) to show it's "the same stuff over and over".
- **Coordination and control:**
  - When your app starts, someone is "running the show". If you have to start React to test your features, React is doing the coordination.
  - A library becomes a framework "when you write your code within the view layer library"; "it becomes a framework when you let [it] do the coordinating and controlling", which means your use cases.
  - You're "in really good shape" if you can go from requirement to coded feature without touching or mentioning React.
- **Feature = one success case + many failure cases.** Create user has "usually one success case" and "five, six, seven, eight, nine" failure cases. Each is a spec/scenario.
- **A pure object describes the whole app.** On the frontend the key ones are the **Presenter** and the **Controller**. It's systems thinking: a stateful input-output system (repositories and caches may hold state). You can test the entire app "as if it's just a regular JavaScript object".
- **How the UI hooks up:** components get state from the presenter and tell the controller what to do. That boundary lets you swap React for another view library.
- **Deploy early:**
  - Value creation system: push value all the way to the end. "Start at the end / think backwards."
  - If you build for a month and then deploying turns out to be hard, "that's a very bad situation to be in."
  - Build deployment architecture ASAP so you can ship as soon as a feature is done.
- **Stereotypical + known extras.** Start from the well-understood stereotype, but also bring in things you already know you'll need, such as offline caching or a canvas library.
- **FA²STR in the workflow:** the letters Find + Architect (the "two A's" are architect and automate) plus **Automate** make up "pretty much all of the upfront design we need to do". After that comes emergent design and feature work.
- **Customers drive feature work** ("creator-created"; essentialism). Code you can't connect back to a customer-requested feature, functional or non-functional, is waste. Exception: developers must make some decisions customers don't know about, like keeping the architecture testable.
- **Why E2E-only or unit-only strategies fail.** You can't sensibly assert "I should get an email" at E2E. Would you automate logging into Gmail? "Respect the complexity" of validating that the system works.
- **The application guess point is "the heart, the core"** of what makes your app special. It gives "crystal clear clarity on the way that our system is interacting with libraries, APIs, and also how it's being called".
- **Frontend architects earn their money** by carving out a consistent way to work: upfront design, walking skeleton, processes, testing strategy (including how to test React components afterward), a few E2E tests, and deploying with confidence that it works.
- **Ideal vs real:** it's "ideal" because working this way gives the fewest bugs and least negative value. In reality you face legacy code and cut corners, but you should work *toward* it.
- **Frontend state organization:**
  - The frontend "database" is a cache in the API client. Axios or GraphQL ("GraphQL is like MySQL for front end") fetches data and stores it in one place.
  - That stored data becomes global state, which is transformed into **domain models** and **view models**.
  - Components subscribe to view models and get their *initial* state. After that, component state (forms, toggles) changes independently.
  - "It's either it's global and it gets translated into domain and view or it's component state."
  - Interactions go component → controller. The controller is "effectively the exact same thing as a backend use case". The request goes out, the cache updates, and everything flows back down reactively.
- **Read/write separation (CQRS/CQS)** on the frontend: separating the code paths means you can reason about architecture and data flowing in one direction. Get reactivity working in the walking skeleton.
- **Domain logic on the frontend is real.** Khalil used to say DDD doesn't belong on the frontend and that frontend models should be "dumb / mostly presentation". But apps with lots of decision-making logic need proper domain models. Examples:
  - A digital audio workstation.
  - A drag-and-drop call-flow app ("one of the scariest things I've ever worked on").
  - Nodes that can't be dropped in certain places, plugin compatibility, a guitar pedal board chain.
  - Simple apps (to-dos) still need shape and validation, such as name length.
  - A student adds: front-load logic to speed up feedback, with no network round trip needed to know whether something is valid. Khalil agrees.

## Named frameworks / mental models
- **Stereotypically testable architecture**
  - Purpose: a universal reference architecture for any platform.
  - Components: domain (data, rules, processes, relationships; levels 1–2), application (level 3), outgoing and incoming adapters, end-to-end/system (level 5), plus the infrastructure line (core code vs infra code).
  - When to use: to understand any codebase ("slot me down in any project"), to place new tools, and to find problem points by the gap with where you are.
- **Ideal developer workflow** (GOOS double loop)
  - Purpose: a consistent way to work 95% of the time on any platform.
  - Upfront (once per project; FA²STR Find/Architect/Automate):
    1. Build the testable architecture.
    2. Deploy a tiny slice of functionality that cuts across all the main architectural components (the walking skeleton). On the frontend that's UI + app + API/test server, e.g. "get some data and display it".
  - Per feature (emergent):
    1. Write a **failing E2E acceptance test** (system boundary, level 5) in the user's language, even mentioning pages or things that don't exist yet. Written from the user's perspective, for the customer.
    2. Move in one level to the developer boundary and write a **failing use-case test** ("high-value unit test", level 3, for the developer). ~80% of the time is spent here.
    3. Loop over every scenario (success plus failures). Mention things that don't exist yet and carve them out, recursing into smaller objects and then back up.
    4. The remaining ~20%: make the E2E test pass by filling in the other guess points (outgoing adapter tests, incoming adapter tests), then hook up the view: React components plus component tests.
    5. Connect everything, and the feature is done.
  - Outer loop = customer/acceptance loop. Inner loop = developer loop.
- **Presenter / Controller pair** (frontend application layer)
  - Presenter: holds and prepares view data in the right shape (the "read" side), and hosts selectors.
  - Controller: receives commands from components (the "write" side) and acts like a backend use case.
  - Tested together as the whole app, with no React and no real API.
- **Coordination & control test.** "If you need to start React [to test your features], then React is doing the coordination."
- **Vertical slice vs walking skeleton vs tracer bullets**
  - Vertical slice: a unit of functionality, a feature, that cuts across the architecture from layer 5 down to layer 1. Features are vertical slices that need to get deployed.
  - Walking skeleton (one of the essentials): build out the whole system so you can do all your feature work. It needn't be the first real feature; "can I just talk to the backend... get some data out of the database and show it on the screen?"
  - Tracer bullets (*The Pragmatic Programmer*): the technique for getting there. Make sure cache, event DB, relational DB and so on can talk to each other as early as possible.
- **The game / value creation system.** Score points by getting value across the system as fast as possible: ideate, broad-stroke architecture, jump to setup and deployment, then build out the middle.
- **Dependency rule.** Nothing in an inner layer may know about something in an outer layer. Value objects and entities must not know about repositories or repository adapters. React components must not talk to the cache directly.
- **Stereotypical collaborations.** Knowing what is allowed to talk to what settles "it depends" design debates and enables tool conversations like "we'll use this part of Redux, swap this out for that".
- **Tool-mapping method** (worked example on Redux):
  1. Read the docs looking for what the tool does (doings vs knowings).
  2. Identify its responsibilities.
  3. Map them to an object stereotype and a layer.
  4. Decide where it goes and what stays out.
- **Frontend state model:** API client cache → global state → domain models + view models → component initial state → local component state. Interactions go through the controller back to the cache, then flow down reactively.
- **Verification types → guess points**
  - Stateless (level 1): result verification only (data in, data out). Also used for utility classes and data transforms/validation.
  - Stateful (level 2): state verification. State "hangs out / loiters", so you inquire into it (e.g., chess `game.getState()`, a student entity's name).
  - Application (level 3): a mixture, but the one that gets added is **communication verification**. Per Khalil this is the only guess point where you do communication verification.
  - E2E (level 5): result verification only, treating the system as a black box. Doing the other types at E2E is "bad practice"; it conflates concerns and makes tests messy.
- **Direct vs indirect inputs/outputs**
  - Direct: passed in or returned (palindrome string, student props).
  - Indirect inputs: the state of injected dependencies. A user repo seeded with an existing user changes the use case's behavior.
  - Indirect outputs: commands issued to dependencies (`save` called, `cache.hasItem` called).
  - A repo can be both an indirect input and an indirect output.
- **Contract tests** (outgoing adapter guess point, 4)
  - Define the contract (e.g., `UserRepo`: `save`, `getById`).
  - Run the *same* tests against every implementation (in-memory/fake and Firebase) in one loop.
  - Keeps them in parity so you can swap fake for real with confidence. This is the answer to "stop mocking".

## Definitions
- **Stereotypically testable architecture**: the recurring layered structure (domain, application, adapters, system) with fixed rules about what may talk to what. It makes any app testable, on any platform.
- **Coordination and control**: the responsibility of running the show and orchestrating use cases. It belongs to your application layer, not to React.
- **Framework (vs library)**: a view library "becomes a framework" once you write your code inside it and let it coordinate and control.
- **Spec / scenario**: one test case for a feature (a success case or one of the many failure cases).
- **Acceptance test**: the E2E/system-level test written in the user's language. It is the one spec shared by all platforms and teams.
- **High-value unit test / use-case test / controller test / application test / developer test**: names for the level-3 test at the developer boundary.
- **Vertical slice**: a feature viewed as a cut through the architecture from layer 5 to layer 1.
- **Walking skeleton**: the minimal deployed end-to-end system that connects all main components before feature work begins.
- **Tracer bullets**: the *Pragmatic Programmer* idea of firing a thin path through all components early to confirm they integrate.
- **Characterization / approval tests**: named by a student (Daniel) as the tests you typically start with on legacy code, i.e. testing after the fact. Khalil wasn't sure whether they differ.
- **No-op**: "no operation". Sometimes the right E2E treatment for things you can't verify at that level (like email).
- **Presenter**: an object responsible for preparing data "to be in the correct shape for the component". It holds selectors. Khalil calls "facade" a "conflated term" for this.
- **Reducer (Redux)**: effectively the cache/gateway. It sits on the infrastructure side, as an interface responsibility.
- **Selectors (Redux)**: "developing reactivity to key parts of the cache so that I could keep my view models in sync". They behave like a repository query.
- **Spy / handwritten mock**: Khalil's term for a mock you write by hand. "Mocks" = ones made with a library such as Jest.
- **Contract test**: one test suite run against all implementations of an interface to keep them in parity.
- **In-memory repo**: Khalil's preferred name for a fake repo, which sidesteps the "category theory around fakes, spies, stubs, mocks". Implemented as an array.

## Rules & heuristics
- Before learning another tool, learn the stereotypical architecture. Then just "splay those tools onto the stereotype".
- To find problem points in a codebase, measure the gap from the ideal testable architecture.
- If testing a feature requires starting React, move coordination out of React.
- Keep features and their specs separate from the UI/view, libraries and APIs.
- Build the testable architecture and **deploy** a thin slice before any feature work.
- Include known non-stereotypical needs (offline caching, canvas) in the upfront architecture.
- Every feature starts from a failing E2E acceptance test in the user's language. Then move in one level.
- Spend ~80% of your time at the application layer (level 3) and ~20% on adapters, E2E pass and UI hookup.
- Write **one** acceptance test per feature. Never rewrite it per environment. Teams may *validate* it differently.
- E2E tests do result verification only. Push email, cache and similar checks down to the application level with spies (communication verification).
- Don't use an email-service sandbox at E2E to validate delivery. At most it saves money per run.
- Keep tests "as simple as possible". Prefer a layered testing strategy over complex E2E rigs (SMTP servers, Docker request interception).
- Components: mostly stateless (level-1-style tests). Stateful components resemble state machines (level-2 tests).
- Components must not know about the cache/store. Don't put selectors in the same file as components; selecting belongs in the presenter.
- Components shouldn't take on the job of preparing data to be seen. They should just get the data to be seen.
- State lives in two places only: global (→ domain/view models) or component. Don't hoist toggle state into global state.
- Separate read and write code paths so data flows one way.
- Use proper domain models on the frontend when there's real decision-making logic.
- Use controllable mocks (in-memory repos) as indirect inputs to set up "the state of the world" for each edge case: user exists, banned, email taken, username taken.
- Every fake must be backed by contract tests against the real implementation.
- Prefer handwritten spies in their own files over mocks written inline in test files, which leads to duplication. Library mocks are fine only if they "yell at you" when the contract grows.
- Turn in-memory repos into **builders** (e.g., seed N random users) so tests stay domain-driven and readable.
- In-memory repos should store plain objects. Use a mapper if needed to keep parity with the real store.
- Domain objects are for **writes only**. Reads/queries should go straight to the data store and return the simplest possible shape, not load a domain object and then reshape it.
- Use event storming or process modeling to find the *minimum essential input data* for a command and the *minimum essential output data* for a query/view.

## Anti-patterns / mistakes called out
- Writing all of your code inside React so that React coordinates and controls. This turns a library into a framework.
- Waiting a month and only then finding out deployment is hard.
- Mixing feature development with architecture setup. It's "a lot cognitively". Discovering DB or MySQL issues mid-feature.
- Testing only through E2E, or only through tiny low-level unit tests. "You're always going to fail."
- Using state or communication verification at the E2E level. It conflates things and makes tests messy.
- Building SMTP servers or intercepting network requests in Docker to prove emails were sent. "All of that stuff is a mess."
- Selectors or cache access inside component files, which breaks the dependency rule.
- Pattern-first thinking ("it looks like this thing talks to that... I've just seen it do that") instead of responsibility-first thinking.
- Loading domain objects for reads and mapping them into view shapes ("mapper hell").
- ORM/Active Record objects used as domain objects. The dependency has to be inverted and plain domain objects carved out.
- Duplicated inline mocks across test files.
- "Don't mock" dogma without contract tests. You *have* to mock like this, so you have to keep the mocks in sync.
- The older belief (Khalil's own) that DDD/domain models don't belong on the frontend.

## Code discussed
**1. To-do app tests: Presenter + Controller as the whole app (shown on screen).**
Scenarios: "creating a new to-do when none exists" means calling the controller to create one, then the presenter gets all to-dos and sees exactly one. "Adding a to-do to an existing list" means setting up app state first, creating one, then checking the read side: the new to-do is at the bottom of the list.
```ts
// reconstructed from narration
describe('todos', () => {
  it('creates a new todo when none exists', async () => {
    const { presenter, controller } = createApp(); // no React, no real API
    await controller.createTodo('Buy milk');
    expect(presenter.getAllTodos()).toHaveLength(1);
  });

  it('adds a todo to an existing list', async () => {
    const { presenter, controller } = createApp(/* initial todos */);
    await controller.createTodo('New one');
    const todos = presenter.getAllTodos();
    expect(todos[todos.length - 1].title).toBe('New one');
  });
});
```
Hookup afterward: components read from the presenter and call the controller.

**2. E2E acceptance test (narrated, given/when/then)**: "Given I am a user without an account, when I enter valid details, then I should get an email." On the frontend, the "then" part might only be checked as a "check your email" page, which doesn't prove the email was sent.

**3. Create user use-case test with spies (communication verification).**
Before: trying to verify email at E2E. After: application-level test with an injected email spy, user repo and cache. The result is modelled as `Result` success/failure.
```ts
// reconstructed from narration
const emailSpy = new EmailServiceSpy();
const cacheSpy = new CacheSpy();
const userRepo = new InMemoryUserRepo();
const createUser = new CreateUser(userRepo, cacheSpy, emailSpy); // dependency injection

const result = await createUser.execute(validDetails);

expect(result.isSuccess()).toBe(true);                 // then read the success object
expect(cacheSpy.getCalls('hasItem')).toHaveLength(1); // cache miss: user never existed
expect(userRepo.getCalls('save')).toHaveLength(1);    // indirect output
expect(emailSpy.getCalls()).toHaveLength(1);
// also check emailSpy was called with the correct arguments
```
- API invented via programming by wishful thinking.
- Khalil got pedantic about the categories: `result.isSuccess` plus reaching into the success object is closer to state verification on the result. The spy call assertions are communication verification.
- The user repo is an **indirect input**: seed it with the user's ID and the same use case must fail ("user already exists").

**4. Contract test across repo implementations (outgoing adapter guess point).**
```ts
// reconstructed from narration
const userRepos: UserRepo[] = [new InMemoryUserRepo(), new FirebaseUserRepo(/* config */)];

userRepos.forEach((repo) => {
  it(`can save a user (${repo.constructor.name})`, async () => {
    await repo.save(user);
    expect(await repo.getById(user.id)).toEqual(user);
  });
});
```
It's expensive because it hits the real backend, but it keeps the fake and the real repo in parity.

**5. In-memory user repo + builder.** Shown briefly on screen ("fake user repo... implements [UserRepo]"): an array-backed implementation that becomes a builder for seeding indirect inputs.
```ts
// reconstructed from narration
class InMemoryUserRepo implements UserRepo {
  private users: User[] = [];
  async save(user: User) { this.users.push(user); }
  async getById(id: string) { return this.users.find((u) => u.id === id) ?? null; }
}
// builder idea: new UserRepoBuilder().withRandomUsers(10).build()
```

**6. Redux/NgRx walk-through (docs, live).** Mapping: store/reducer = cache/gateway (infrastructure interface); `subscribe` = reactivity; `dispatch` = updating the store; selectors (`createSelector`) = reactive queries that keep view models in sync. Conclusion: Redux has "nothing to do with features". Its responsibilities are global state, reactivity, changing state and querying state, so use-case tests never mention it. Cache hydration is tested separately as an outgoing adapter test.

## Diagrams / visual models described
- **Stereotypically testable architecture** (Figma image, also posted on Twitter): layers labelled with guess-point levels. Domain (data/rules/processes/relationships) = 1–2, application = 3, outgoing/incoming adapters = "4 and 6", E2E = 5. Khalil planned to redraw it with the guess points on top.
- **Feature box with specs**: one feature with several specs (1 success, many failures), drawn separate from UI/view, libraries and APIs.
- **Vertical slice line**: a cut through all layers, standing for the E2E test and a feature.
- **Core code vs infra code** columns: the application code (pure, no IO, fast) sits in the core column. The high-value unit test covers the core and its outgoing interactions; the E2E test crosses everything but only checks what comes back at the boundary.
- **GOOS double-loop diagram**: outer customer/acceptance loop (failing acceptance test) around an inner developer loop (failing use-case test → pass → refactor). Deploy a small piece first; the upfront part is separated from feature work. (STT around L185–L188 is garbled.)
- **Value creation system**: push value from left to right. Deployment is set up at the far end first, then the middle is built.
- **Frontend state flow**: API client/cache → global state → domain models + view models → components (initial state) → component state; component → controller → request → cache → reactive flow back down. It resembles CQRS read/write paths.
- **Application-level system with indirect I/O**: a create-user box with direct input/output, and injected mail service, database/user repo and cache drawn as extra inputs/outputs in different colors.

## Q&A items
- **Common frontend pain points** (L8–L20): how to become a better frontend architect, "libraries of families" [unclear], event management, how to identify problem points, not knowing where to start. Khalil says frontend architecture will get the most attention from him, even after the course.
- **How do I identify problem points in my frontend?** (L50–L54)
  - Measure the differential between where you are and the ideal stereotypically testable architecture.
- **Is vertical slicing = deploying a slice that touches all main components?** (Tim, L210–L232)
  - A vertical slice is a unit of functionality (a feature) cutting through the architecture from layer 5 to 1. Cutting only at the application level technically counts too.
  - The most useful framing: features are vertical slices you want to deploy. This holds on any platform, because the architecture and its rules (e.g., the dependency rule) are stereotypical.
- **Does the first deployed slice have to be the first feature?** (Tim, L232–L256)
  - No. That's the walking skeleton (via tracer bullets, *Pragmatic Programmer*). It can be as simple as fetching DB data and showing it.
  - The goal is tying components together and deploying, so infrastructure issues surface before feature work.
  - Side note from Daniel: characterization/approval tests are for legacy code.
- **How do you handle the email part of an E2E test when frontend and backend are deployed separately?** (Daryl, L256–L322)
  - There is one acceptance test, handed to both frontend and backend (and mobile/desktop, as in the Slack example). Each validates it in its own way.
  - E2E does result verification only, e.g. checking the 201 response. Email may be a no-op at that level.
  - Verify email at the application level with an email spy (communication verification).
  - An email-provider sandbox only avoids cost; it doesn't validate delivery. Khalil doesn't love it.
- **Worry: developing use cases without knowing how the frontend library will use them?** (Daniel, L336–L340)
  - Handled by the E2E test and the walking skeleton. Hook everything up early, even with a "shitty component".
  - Also get reactivity working in the skeleton.
- **Where does state go on the frontend / global state / how to test it?** (L345–L360)
  - Cache → global → domain/view models → component initial state. Local component state is separate.
  - Interactions go through the controller.
- **Does DDD belong on the frontend?** (L360–L378)
  - Yes, for logic-heavy apps (DAW, drag-and-drop call flows, pedal boards). Daryl adds that it speeds up feedback because there's no network round trip.
- **How do you do controller/use-case tests with Redux/NgRx?** (L388–L442)
  - Read the tool's docs and classify its responsibilities: reducer/store = cache/gateway; subscribe = reactivity; selectors = reactive queries that keep view models in sync.
  - Selectors belong in the presenter, never in component files (dependency rule).
  - Use-case tests don't know Redux exists. Test cache hydration separately as an outgoing adapter test. "Keep them separate."
  - Getting a to-do by ID from the cache via Redux was deferred to a later session.
- **Is a presenter a facade?** (L412–L418)
  - "Facade" is conflated. The presenter prepares and protects data in the correct shape for the component.
- **How do the verification types map to the guess points?** (L442–L476)
  - Not a strict mapping, but the predominant ones are: stateless → result; stateful → state (entities, value objects, chess game); application → mixture, adding communication verification (only here); E2E → result (black box).
- **Is it better to change the indirect input or mock the response?** (L505–L520)
  - These *are* mock objects you control. Controlling indirect inputs lets you run through every edge case.
  - Real-dependency parity is ensured by contract tests at guess point 4. Khalil wasn't sure he fully understood the question.
- **How would the mock be implemented? Just an array?** (L535–L548)
  - Yes. Handwritten spies/in-memory repos are preferred because adding to the contract forces implementation. Avoid inline test-file mocks. Turn the fake into a builder for the application guess point challenges.
- **In-memory repos make queries (getUserById) painful. Store plain objects?** (L560–L582)
  - Yes, plain objects; use a mapper to keep parity.
  - If domain objects are ORM/Active Record, invert the dependency and carve out plain domain objects.
  - Queries return the simplest shapes, straight from the data store. Domain objects are only for writes.
  - Event storming or process modeling exposes the minimum input for commands and the minimum output for views.
- **Course logistics** (L585–L596): the frontend and backend projects are being planned; Khalil asks what students want to see on the frontend. **Auth** will be covered on both frontend and backend.

## Notable quotes
- "The architecture you do on the front end that you do on the back end, you do on desktop, pretty much anywhere. It is exactly the same."
- "When I learned this was such a superpower because it gave me the confidence to just know, oh, I'm good... you could slot me down in any project."
- "The guess points... is really just to carve out your ability to write tests strategically."
- "If you want to test your features, if you need to start react, then react is doing the coordination."
- "It becomes a framework when you let [it] do the coordinating and controlling."
- "You can't really get good at testing without getting good at object oriented design and also understanding architecture."
- "Features are vertical slices that need to get deployed."
- "You only ever have one acceptance test. You don't switch the test for different environments."
- "Separation of concerns. Single responsibility principle. All of these things make no sense at all, unless you have an understanding of what is stereotypically a single responsibility." (lightly normalized)
- "When people say, stop mocking. Don't mock... You got a mock like this. You have to make sure they stay in sync... contract tests are the key."

## Cross-references
- Books:
  - *Growing Object-Oriented Software, Guided by Tests* (Freeman & Pryce): the ideal developer workflow and double loop.
  - *Object Design* (Wirfs-Brock & McKean): object stereotypes, RDD, the source of the stereotypical architecture.
  - *The Pragmatic Programmer*: tracer bullets.
- People: Dave Farley (one acceptance test across channels); David Khourshid (XState/Stately visualizer; transcribed "David Piano").
- An article on "the three [whos?] to solve most design problems" [unclear title], which Khalil named as one of his favorite articles.
- Tools: React, Next.js, Nest.js, Remix, Redux, Redux thunks, NgRx, RTK Query (mentioned, unfamiliar to Khalil), GraphQL, Axios, XState, Jest, Firebase, MySQL, Docker, SMTP, Figma, Loom.
- Concepts: hexagonal architecture, DDD, CQRS/CQS, dependency rule, SoC, SRP, characterization/approval tests (legacy), state machines, event storming (big picture vs process modelling), programming by wishful thinking, builders, contract tests, creator-created/essentialism (Khalil's philosophy).
- Course lessons:
  - Lesson 10 (value creation system); Lesson 9 (systems thinking)
  - Lessons 16 (vertical slicing), 17 (horizontal decoupling), 20 and 53 (verification types)
  - Lessons 24 (walking skeleton), 25 (deployment), 26 (ideal developer workflow), 27 (FA²STR)
  - Lesson 33 (frontend architecture FAQ), 38 (RDD)
  - Lesson 51 (wishful thinking), 73 (handwritten spies), 74 (stateful guess point/state machines), 78 (builders/fixtures)
  - Lessons 90 and 92 (Frontend Architecture 1 & 2)

## Fluff skipped
Greetings and roll call, CommitAction productivity-coaching aside, laggy computer/camera, Figma drawing mishaps, recording file size (8 GB / 60 GB landing video), time zones, Community Crafters meeting, sign-off.

## AI-era relevance hint
- A presenter/controller core with no React makes AI-generated features verifiable. Agents can drive fast level-3 tests without a browser, and UI generation becomes a thin, replaceable layer.
- The "map the tool to the stereotype" method is a strong prompt pattern for judging AI-suggested libraries. Ask which responsibility the tool owns before letting it into the codebase.
- Contract tests plus handwritten in-memory fakes guard against a common agent failure: fakes quietly drifting from real adapters while tests stay green.

## Coverage proof
- Lines read: 596 / 596
- Final line (verbatim): "you soon. Peace, lads."
