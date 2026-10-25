# Lesson 81 — The Walking Skeleton, Questions Q&A (July 27th, 2023)
- **Source file:** 81) The Walking Skeleton, Questions Q&A July 27th, 2023.txt
- **Category:** qa-live
- **Topics:** walking-skeleton, tracer-bullet, e2e-testing, characterization-tests, acceptance-tests, four-layers-e2e, protocol-driver, gherkin, course-structure, code-first, best-practice-first, pattern-first, testing-basics, programming-by-wishful-thinking, abstraction, feedback-loop, guess-points, execution-guess-point, value-creation-system, deployment-pipeline, ci-cd, commit-phase, acceptance-phase, husky, github-actions, core-code, 80-percent-confidence, ideal-developer-workflow, roles-and-goals, four-pillars, seven-principles-of-design, monorepo, npm-workspaces, test-levels, vertical-slicing, contract-tests, test-parity, indirect-inputs, result-verification, state-verification, mocks-vs-fakes, parameterized-tests, observer-pattern, react-hooks, frontend-architecture

## Summary
This live Q&A is mostly Khalil explaining how the course is being restructured and why, and it ends with a deep answer on mocking and contract tests. The DDD Forum front-end and back-end assignments become optional. Instead, students should apply the 4-layer E2E test setup to their own work, either as a **characterization test** around existing messy code or on a **new feature**, since improving features and adding features are the two things developers really do. The new flow is: code-first (end-to-end feature, frontend to backend) → testing basics (stateless, programming by wishful thinking) → best practices (E2E backend and frontend, deploy a **walking skeleton**, set up a minimal deployment pipeline, then improve the design) → pattern-first. Khalil places the walking skeleton inside the value creation system and guess points, and adds the **execution guess point** (KPIs), which closes the feedback loop. He sketches a CI/CD pipeline: a commit phase that lints, builds and unit-tests (about 80% confidence from core code), then an acceptance phase that deploys to staging and runs E2E tests, then production. He recaps roles and goals, the four pillars and the ideal developer workflow, and maps the test types onto six levels using systems thinking and vertical slicing. The final Q&A says "we're only testing our mocks" is a symptom of missing **contract tests**. Run one integration spec against *all* implementations of a repo interface (fake and prod) so you get test parity.

## Core ideas
- **Course change:** few devs were doing the evolved DDD Forum front-end and back-end assignments. Khalil wants people to watch the E2E videos and "start applying this to your work tomorrow". Building-the-project assignments become optional for those without time.
- **Two main developer use cases:** (1) improve existing features and (2) add new features. The E2E test infrastructure works for either, and you can do it independently at any time.
- **Improving existing code, step 1:** a **characterization test**, meaning a test written after the fact that describes what the code currently does. You treat the whole system as a black box and check that the same inputs give the same outputs. Don't rewrite from scratch ("that's not the point").
- Once end-to-end behavior is locked in, "move in a layer" and do more invasive testing and restructuring: **refactoring to patterns**, also called **distillation** (Eric Evans, DDD book), which distills domain language into the code.
- **Why connect frontend to backend in code-first:** the point of information systems is that a user interacts with a screen and a backend manages state and "gives back time or enriches time". Learn to build a feature end to end, however messily (React Context, Redux, whatever you use now), so you have a baseline to improve on.
- **Testing basics** (FizzBuzz, palindrome, emergent design, getting started with tests) moves before best practices. Guess points "level 1" may be introduced earlier. The earlier heavy guess-point/feedback-level vocabulary was overwhelming for newcomers.
- The **two most important mental models** of the whole course are **abstraction** and **the feedback loop**. The mindset module stays.
- **Programming by wishful thinking** means applying abstraction: specify *what*, not *how*. That's the same as "tell, don't ask" and the same as declarative. "The number one skill" is realizing that it's all problem decomposition.
- **Best-practices module plan:** E2E testing on the backend (Docker to encapsulate infra) → E2E on the frontend to create a **walking skeleton** → deploy the walking skeleton → minimal deployment pipeline → clean up the code and improve the design (monorepo, where things belong, shared package).
- **Walking skeleton** = tracer bullet (*The Pragmatic Programmer*). It's the most bare-bones version of something valuable, shipped in front of someone. The goal is working software in front of users, so make sure you can get across the goal line first.
- **Khalil's mistake:** he used to write all of the pure application-layer code first (fun, lots of edge cases), then try to deploy. Connecting to infrastructure broke everything ("all these weird CORS errors"). Deploy as early as possible.
- **About 80% of your time in pattern-first** will be spent in the application layer, in pure code with no DB or web server.
- **Value creation system:** earlier steps are more *theoretical* (clarify the problem), later steps are more *physical* (code, implementation). The crossover from theoretical to physical, from *what* to *how*, is the **acceptance test**.
- The mini-systems along the path are **guess points**: problem ("is this even valuable?"), architecture ("will these tools even work?"), down to deployed and working in production.
- **Execution guess point:** after users use the code, ask "are we getting the KPIs we want?" (usage, sales, whatever you measure). That flows back full circle and clarifies what to do next. "It's all just systems and systems thinking and it's one big feedback loop."
- **Working software means software void of bugs.** So even the walking skeleton needs a minimal deployment pipeline with a guard phase before deploy.
- **Unit tests in the commit phase must give about 80% confidence.** That's only possible with a testing strategy and decoupling from infrastructure. Core code (application + domain) has to be "super pure".
- **Minimum pipeline, in Khalil's opinion:** if you can deploy, and the E2E tests run, "you're good". Improve from there. The course will definitely build deploy + the commit phase, and maybe a staging environment later.
- **Applying the two mental models to pipeline size:** (1) abstraction never ends, since you can always add more layers or steps, which makes each more focused and cohesive but possibly more complex. (2) Feedback loop: get to the goal once, feed forward, get feedback, refine.
- **Design quality check:** to tell whether you're too abstract or not abstract enough, "always come back to what does the developer want to accomplish?" and whether they can do it adequately. Developer use cases: add, change, discover, understand, extend, maintain.
- **Roles and goals recap:** customers → increase and protect revenue. Users → enrich time / get back time (also "state A to state B", "do tasks efficiently"). Developers → write code so the other two roles' goals are achieved.
- **Vicious cycle:** code that works but can't be changed makes new features take longer. That costs developer money, which hurts customers' revenue goal.
- **Four tools (pillars)** keep users and customers in benefit: architecture, testing, design, strategy. No tests → broken code that doesn't enrich time. No architecture → can't write tests and devs can't reason about where things go. No design → devs don't understand the conceptual models (which pattern goes where) and can't work effectively.
- Once you've deployed the walking skeleton you'll have "made a pretty big mess". So the rest of best practices is spent improving the design, so that pattern-first work is effective. Main tool: the **ideal developer workflow**.
- **Architecture step is for developer understanding:** everyone needs clarity on the patterns, tools, the roles they play and their responsibilities. Dropping into a DDD codebase (value objects, entities, aggregates) or a frontend with view models, controllers and domain objects is confusing without that shared conceptual model ("why can't I just use React hooks?").
- **Core is where the value is.** Infra is "annoying stuff we need to do in order to get our code to work with the real world". You write exponentially more tests at the core than at the outer levels.
- **Monorepo** (from Kirill's exploration): minimal, simple design. Shared code goes in a shared package via NPM workspaces, which is useful for sharing DTOs and even domain objects between frontend and backend.
- **Frontend global state without Redux or React Context:** use the plain **observer pattern**. Khalil designed it by programming by wishful thinking.
- **React hooks "really force you to completely mangle your code."** Khalil would extract a routing service instead of using the router hook. A student added that controllers are harder to test when hooks live inside them. Khalil: "hooks are just the worst… Don't tell me I need to name things with `use` in front of it."
- **Course design as abstraction:** organize content so learners can "Ctrl-F and find it", like package by feature vs component vs infra, even if that means more modules or videos.

## Named frameworks / mental models
- **4-layer E2E test architecture (for non-flaky E2E tests)**
  - Layers named here: acceptance test (Gherkin: given/when/then) → executable specification (actual test code) → protocol driver (e.g., Puppeteer, which Khalil likes, or Cypress on the frontend) → system under test. Khalil counts "one, two, three layers" of test infra, then "that last layer" is the feature being tested.
  - Use: characterization tests on existing features, or E2E tests for new features.
- **Characterization test → distillation:** lock end-to-end I/O behavior first, then move inward with more invasive testing and refactoring to patterns.
- **Walking skeleton / tracer bullet:** the most minimal end-to-end, deployed, valuable slice (UI → DB → minimal deployment pipeline). Other ways to see it: "minimum automated use case", "least amount of framework to get it going", "most bare-bones pipeline from local dev to production" (DevOps view).
- **Value creation system with guess points:** start → problem guess point → … → architecture guess point → … → deploy → **execution guess point** (KPIs) → loops back. Theoretical on the left, physical on the right, with the acceptance test as the crossover.
- **Deployment pipeline (CI/CD):**
  1. Devs merge into source control.
  2. **Commit phase:** lint, build, unit test (about 80% confidence), package the artifact for later phases.
  3. **Acceptance phase:** deploy to staging, run E2E tests.
  4. Deploy to production (manual or automatic).
  - Optional extras in between: checks, performance testing, etc.
- **Ideal developer workflow (recap):**
  1. Understand the problem → solution (theoretical, for users and customers).
  2. Architecture: shared clarity on patterns, tools, roles and responsibilities (for developers).
  3. Set up test infra and the first acceptance test. Fail it, then move in a layer.
  4. High-value unit tests on core code (fail/pass/refactor). This is 80% of the work and gives 80% confidence, covering all edge cases.
  5. Acceptance test passes → done → deploy.
  6. (Added "four") Tidy up and write **infrastructure tests**: database "databasing", service connections working (incoming/outgoing adapter tests, a.k.a. contract tests or driver tests).
  - Applies to new and existing features, and makes work consistent.
- **Six test levels via systems thinking:**
  - L6 incoming (API/incoming adapter/driver tests)
  - L5 system (end to end)
  - L4 outgoing (outgoing adapter/contract tests)
  - L3 app (use cases)
  - L2 stateful
  - L1 stateless
  - "It is just all inputs and outputs… It's feature decomposition."
- **Vertical slicing:** a feature (e.g., Facebook: register → send friend request → accept friend request → get notification) is the high-level *what*. Each use case is a vertical slice through web server/API at the top, domain in the middle and database at the bottom (the *hows*). Feedback loop at each step: "will the web server even get it?… that's why we test."
- **Seven fundamental principles of design** (named and shown as an image, list not read out). It starts with *what you want to accomplish*, as in the hotel-room coffee-maker example: is there coffee, what are my options, go over, it looks weird, don't understand it. Applied to developers' goals with code.
- **Roles & goals:** users (enrich/get back time), customers (increase/protect revenue), developers (enable both via code).
- **Four pillars:** architecture, testing, design, strategy.
- **Three types of verification:** result, state, communication.
- **Contract testing for test parity:** run the same spec against every implementation of an interface (fake/in-memory, prod, MongoDB, …). "You're testing the contract, not the implementation."

## Definitions
- **Characterization test** — "writing a test after the fact… to characterize what it is that our code is doing". A black-box test of existing untested code.
- **Distillation** — refactoring to patterns and distilling domain language into the code (Eric Evans, DDD).
- **Walking skeleton** — the most bare-bones valuable version of something, deployed and shipped in front of someone. The same as a tracer bullet.
- **Commit phase** — the first pipeline phase after merge: lint, build, unit test, package.
- **Acceptance phase** — the pipeline phase that deploys to staging and runs E2E tests.
- **Core code** — the application and domain layers, "the heart of your app". Pure, and where the value is.
- **Execution guess point** — the post-deployment check on whether KPIs (usage, sales, etc.) are being hit.
- **Direct input/output** — data passed straight in and out of a pure function (palindrome: string in, boolean out).
- **Indirect inputs/outputs** — dependencies injected into a use case (e.g., a repo) whose state affects the outcome and which receive side effects.
- **Test parity** — the fake and prod implementations are verified against the same contract, so tests using the fake reflect prod.
- **Contract test** — an integration test of an interface's behavior run across all its implementations. Also related to incoming/outgoing adapter tests.
- **Incoming adapter test** — also "API test" or "driver test". Verifies routes and allowed request shapes haven't changed.
- **Outgoing adapter test** — verifies external infra (e.g., a DB still returns data in the expected shape, a React drag-and-drop library works).

## Rules & heuristics
- Don't rewrite legacy code from scratch. Characterize I/O end to end first, then refactor inward.
- Deploy as early as possible. Don't build core logic in a silo and connect infra last.
- Put tests in the CI pipeline (e.g., GitHub Actions) rather than relying on local pre-commit hooks (Husky). Devs can turn hooks off and push broken code.
- A student heuristic Khalil endorsed: run fast things pre-commit and slow things in CI. Running E2E tests on every pre-commit was "so painful… everyone would just turn it off".
- If a full pipeline is hard to build, at minimum try to run *some* tests in a pipeline.
- Minimum viable pipeline: can deploy + E2E tests run. Improve from there.
- Unit tests of core code should give about 80% confidence. That requires decoupling from infrastructure.
- Write exponentially more tests at the core than at the infra edges.
- E2E: happy path plus one or two sad paths (check that error messages show up on screen effectively). Then about 12–20 high-value acceptance (unit) tests.
- Use concrete examples in unit tests, then **parameterize** to add "20 more units of data" cheaply. They run fast because they're pure.
- Only use library mocks for tiny stubs whose behavior doesn't matter (e.g., "this thing needs a logger… here, just take this"). For anything involving state change, use fakes covered by contract tests.
- For use cases, verify success and failure results (result verification) **and** that state changes did or didn't happen on the repo (state/communication).
- For complex repo queries (filters/aggregations): (1) find the concrete use cases you actually need. (2) Pull complex filtering logic out into its own abstraction or subdomain (e.g., "search") and test it independently. (3) If the heavy lifting is delegated to the DB, test the contract and "let the external tool do the external tooling". Raise the level of abstraction: test "the concept of the user repo", not MongoDB.
- Kirill's tip: devs often try to build a filter that satisfies all possible use cases. Instead, build on existing in-memory implementations that support filters, and extend until the contracts are covered.
- Branching (commit per passing test, push when?): one option is a feature branch that you keep pushing to, with commit tests running there, then merge to trunk. Several strategies exist.
- Judge design by whether developers can accomplish what they want (add, change, discover, understand, extend, maintain).
- Apply the roles/goals lens deliberately. "Don't apply this to your entire life… Try to create a container around this."

## Anti-patterns / mistakes called out
- Doing ceremonious assignments when real feature work would be more valuable.
- Rewriting legacy features from scratch instead of characterizing them.
- Writing all the pure core code first, then discovering deployment and infra breakage at the end (CORS errors etc.).
- Working in frontend or backend silos without an end-to-end slice.
- Running E2E tests in a pre-commit hook: slow, and everyone disables it.
- Relying on local hooks as the only gate, which can be bypassed and lets broken code deploy.
- Code that works but can't be changed → slower features → higher cost → hurts customers.
- Heavy use of library mocks for stateful dependencies, which leads to "we feel that we're not testing anything, we're just testing what we make into the tests".
- Testing use cases with a fake repo while testing the prod repo separately, with no shared contract (no test parity).
- React hooks leaking into controllers or components, which mangles code and makes controllers hard to test.
- Trying to build a fake filter implementation that satisfies every conceivable use case.

## Code discussed
- **Contract test for user repos** (drawn in Figma, jokingly called "Figma-driven development"). File suffix `.ispec.ts` for integration tests (inferred from "this file is .ispec… .ts"). It has a `describe` block and a test "can save users". Save a user, then fetch it with `.get`, then expect equality. The single repo is then replaced with a loop over `allUserRepos` so each implementation runs the same spec.

```ts
// reconstructed from narration
// userRepo.ispec.ts
describe('user repo', () => {
  const allUserRepos: UserRepo[] = [
    new InMemoryUserRepo(),
    new ProductionUserRepo(/* ... */),
    // could also be a MongoDB one, etc.
  ];

  allUserRepos.forEach((userRepo) => {
    it('can save users', async () => {
      const user = { /* fill in user data */ };
      await userRepo.save(user);

      const fetchedUser = await userRepo.get(/* id / email */);

      expect(user).toEqual(fetchedUser);
    });
  });
});
```

- **Decoupling structure drawn:** app layer + domain depend on a `UserRepo` interface. Implementations: fake/in-memory, prod, possibly MongoDB or others. The use case is injected with the repo (dependency inversion).
- **CreateUser use case verification (described, not coded):** "Given a user was already created, when we try to create that user, I should see an already-created response and the repo should not have been attempted to have been saved."

```ts
// reconstructed from narration
it('returns AlreadyCreated and does not save when user exists', async () => {
  const userRepo = new InMemoryUserRepo(); // fake, covered by the contract test
  await userRepo.save(existingUser);
  const createUser = new CreateUser(userRepo);

  const result = await createUser.execute(existingUserInput);

  expect(result.type).toBe('AlreadyCreated');
  // plus: verify no save attempt was made on the repo
});
```

- **DDD Forum frontend code (monorepo, shown on screen):**
  - `RegistrationForm` is a frontend **domain object**, used to decide whether an operation should be performed.
  - The frontend `UserRepo` is where the work is done, "synonymous to a use case" on the backend. It takes a registration form, creates a DTO, sends it to the backend, then saves to the cache. Validation isn't done there currently.
  - Global state/persistence lives in the shared area: a small hand-written store using the **observer pattern**, with no Redux and no React Context.
  - Khalil wants to remove a routing hook and extract a **routing service**.
  - Shared package via NPM workspaces for DTOs and possibly domain objects.

## Diagrams / visual models described
- **E2E test stack:** Gherkin acceptance test → executable spec → protocol driver (Puppeteer/Cypress) → system (frontend ↔ backend). "Create user"/"add post" interactions should give the same result every time, and the boundary lets you move in a layer.
- **Two developer use cases:** improve (characterize, then distill) vs add a new feature (E2E it properly).
- **Course structure:** code-first (backend feature + connect frontend) → testing basics (stateless, guess points L1, wishful thinking) → best practices (E2E backend w/ Docker → E2E frontend → walking skeleton → deploy → minimal pipeline → improve design) → pattern-first.
- **Value creation system line:** start → steps (problem guess point, architecture guess point…) → acceptance test crossover (theoretical/what → physical/how) → deploy → users happy → execution guess point loops back.
- **CI/CD pipeline:** devs 1–5 → source control → commit phase (lint/build/unit test/package) → acceptance phase (deploy staging → E2E) → production.
- **Backend layers:** an outer infra ring (web server, DB) around core code (application + domain) that gives about 80% confidence, with the E2E test covering everything.
- **Roles/goals + four tools** diagram, and the cycle of "works but can't change → slower → costs money".
- **Ideal developer workflow drawing:** problem/solution → architecture → acceptance test (fail) → many core unit tests (fail/pass/refactor) → acceptance passes → deploy → infra tests.
- **Systems-thinking image** (one of Khalil's favorites): feature levels, with a boundary drawn around core code as "where all the value is".
- **Vertical slicing diagram:** the Facebook feature steps across the top, use-case columns cutting through web server/API → domain (yellow) → database.
- **Use case as a system:** direct input/output (palindrome) vs indirect inputs (injected repo).
- **Fake vs prod abstraction:** both reach the same goal/output. Prod goes through "tons of stuff down here" (e.g., Firebase-specific). Suggestion: cut the complex part out into its own subdomain (e.g., search) with its own contract.
- **Seven fundamental principles of design** image (the contents weren't read aloud).

## Q&A items
- **Q: What is a walking skeleton and why deploy it right away? (L76–L100)**
  - Student answers accepted: "minimum automated use case", "least amount of framework to get it going", same as a tracer bullet (*The Pragmatic Programmer*), "most bare-bones pipeline from local dev to production".
  - Khalil: get the most bare-bones valuable thing in front of users. Deploying early avoids late infra breakage.
- **Q: Do these tests run on the dev's local machine, or with Husky or similar? (L131–L145)**
  - It's an option, but devs can turn it off and push broken code. Better to run in the pipeline (GitHub Actions).
  - Student: "what runs fast, pre-commit; what takes time, CI". Khalil agreed. E2E in pre-commit was painful and got disabled.
  - The minimum is deploy + E2E tests run. If using Husky, make sure the E2E tests still run.
- **Q: What are the users' main goals? (L170–L180)**
  - Enrich time / get back time. Equivalent phrasings: state A → state B, do tasks efficiently. Think about why you bought socks, Taylor Swift tickets, Notion.
- **Q: We commit when each test passes. Do we push once the feature is done? (L265–L270)**
  - Several strategies. For example, push continually to a feature branch running the commit tests, then merge to trunk. Kirill uses a similar approach.
- **Q: Strategy: E2E for the happy path, high-value acceptance tests for everything else? (L270–L280)**
  - Good. Add one or two sad paths to E2E (error messages shown to users), then about 12–20 high-value tests with concrete examples and parameterization. Fast because pure.
- **Q: Will parameterization be covered? (L280–L285)**
  - It was a tip in (probably) the emergent design module. Khalil will make it more visible so content is easy to find.
- **Comment: harder to test controllers when hooks live inside them (L292–L294)**
  - Agreed. Hooks are "the worst". Extract services instead.
- **Q: When we mock the use case's dependencies (repo, infra) in high-value tests, devs feel "we're not testing anything, just what we put into the tests". What's the argument? (L294–L360)**
  - One test type doesn't cover everything. A strategy combines test types.
  - A use case is a system with indirect inputs (the injected repo). Verify success and failure results (result verification) and whether a state change was or wasn't attempted.
  - The "not testing anything real" feeling comes from missing **contracts**. The fake and prod repos lack test parity.
  - Fix: one integration spec run over all repo implementations, so if one breaks they all break. You test the contract, not the implementation. The student noted this handles "what if my mock is mistaken".
  - Only use library mocks for trivial stubs (e.g., a logger). Stateful dependencies are indirect inputs whose state affects results, so set them up properly.
- **Q: What if a repo has complex find methods with filters/aggregations that are hard to fake? (L360–L388)**
  - Pull the complex filtering out into its own abstraction or subdomain (e.g., search) and test it independently.
  - Kirill: don't build a do-everything filter. Use existing in-memory implementations that support filters, and extend until the contracts are covered.
  - Student clarified that the filtering is delegated to the DB. Khalil: then test the contract and let the external tool do its job. Focus on the high-level input → output. The internals of the fake and prod models don't matter if the outputs match. Add more examples.
  - Student summary, which Khalil endorsed: the contract concept is the key. Don't test MongoDB itself. Domain-ish logic should be abstracted and tested in isolation. "Raise the level of abstraction of what it is you're looking at to test."

## Notable quotes
- "You don't want to go and rewrite these things from scratch."
- "It's exactly the same thing as a tracer bullet."
- "We want to get the most bare bones version of something that is valuable to somebody out shipped in front of them."
- "This really, truly is when we make that crossover from what to how."
- "It's all just systems and systems thinking and it's one big feedback loop."
- "All we got to do is just get to the goal once, feed forward, get the feedback, and then we'll just refine."
- "If you could deploy, and if you can run the E2E tests, and the E2E tests run, you're good."
- "Hooks are just the worst… Don't tell me I need to name things with use in front of it."
- "You're testing the contract, not the implementation."
- "Raise the level of abstraction of what it is you're looking at to test."

## Cross-references
- Lessons: 24 (Walking Skeleton), 25 (Deployment & Delivery), 26 (Ideal Developer Workflow), 10 (Value Creation System), 11 (Three Roles & Goals), 12 (Four Pillars), 15 (Feedback Loop/Guess Points), 14 (Abstraction), 9 (Systems Thinking), 16 (Vertical Slicing), 17 (Horizontal Decoupling), 20 (Subject/System Verification), 51 (Wishful Thinking/AAA Backwards), 53 (Three Types of Verification), 73 (Hand-written Spies), 64 (Value-First Integration Testing), 45/49 (FizzBuzz/Palindrome), 82 (Code-First to Best-Practice First Q&A).
- Books/authors: *The Pragmatic Programmer* (tracer bullet); Eric Evans, *Domain-Driven Design* (distillation); refactoring to patterns.
- Tools: Puppeteer, Cypress, Gherkin, Docker, GitHub Actions, Husky, NPM workspaces, React (hooks, Context), Redux, Firebase, MongoDB, Figma.
- Concepts: characterization tests, contract tests, test parity, dependency inversion, observer pattern, parameterized tests, DTOs, monorepo, CI/CD commit and acceptance phases, execution guess point, seven principles of design.
- People: Kirill (monorepo/design exploration, in-memory filter tip), Dragino (question about the many files in DDD Forum).

## Fluff skipped
Greetings, drawing-tool fumbling ("that's terribly written", "I believe in myself"), chat-name shout-outs, closing sign-off.

## AI-era relevance hint
- Characterization tests plus 4-layer E2E are a strong safety net before letting AI agents refactor legacy code. Lock I/O first, then let the agent "distill".
- Contract tests across fake and prod implementations make AI-generated fakes trustworthy. A hallucinated fake that diverges from prod fails the shared spec immediately.
- A walking skeleton with a CI gate (lint/build/test → staging E2E) is the minimal harness that turns fast AI code generation into safely deployable software.

## Coverage proof
- Lines read: 392 / 392
- Final line (verbatim): "gents"
