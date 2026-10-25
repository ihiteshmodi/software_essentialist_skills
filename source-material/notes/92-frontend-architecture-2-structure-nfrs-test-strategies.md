# Lesson 92 — Frontend Architecture 2 (Aug 30th, 2023): Feature-Driven Structure, Choosing Architectures & Test Strategies
- **Source file:** 92) Frontend Architecture 2 - Aug 30th, 2023.txt
- **Category:** frontend
- **Topics:** frontend-architecture, project-structure, organize-by-feature, abstraction-prism, outside-in, customer-boundary, application-boundary, key-developer-use-cases, discoverability, cohesion, modules-vs-shared, essential-vs-accidental-complexity, application-interface-pattern, stereotypical-architecture, pattern-catalog, state-management, phases-of-craftship, architecture-guess-point, non-functional-requirements, rdd, crc-cards, ssr, pre-rendering, seo, stop-the-bleeding, e2e-tests, four-tier-e2e, page-objects, high-value-unit-tests, incoming-tests, contract-tests, high-value-integration-tests, test-strategy, value-first

## Summary
This is part 2 of the frontend architecture Q&A. Khalil first gives a quick status update on the course. The structure is now metaphysics → five phases → three roles → four pillars → 12 essentials → guess points → ideal developer workflow → problem-solving model. He then revises his earlier advice about project structure: **organize by feature, not by pages/components**. Features are the abstraction-prism level where all three roles collaborate. Work should be driven **outside-in** from the customer boundary with E2E tests. He demos "discoverability" on DDDForum and argues folder structure is about language, cohesion and constant philosophizing. Essential complexity goes in `modules/` and accidental complexity goes in `shared/` or `core/`. He lays out goals for the phases of craftship: a frontend/backend **pattern catalog** in pattern-first, custom abstractions in responsibility-first, and testing strategy in value-first. He explains that choosing a frontend architecture happens at the **architecture guess point**, driven mostly by **non-functional requirements** (speed, SEO, security, availability) and RDD decomposition. The Q&A covers "stop the bleeding" with E2E tests (the tailor analogy), getting team buy-in, and how junior devs build value-first judgment through reps. It ends with two test strategies: **E2E + high-value unit tests** versus **incoming (contract) tests + high-value integration tests**. He explains incoming tests using the **application interface pattern**.

## Core ideas
- **Course structure status (L13-L28):** the new section is "the meat" of the course. Its order is: metaphysics (closer mental models of reality lead to better decisions and strategies, and more scalable code) → five phases → three roles → four pillars → 12 essentials (with before/after images) → guess points → ideal developer workflow → final problem-solving mental model. That final model combines the guess points, FA²STR, and "flipping" [unclear], with the 12 essentials as the tools that keep you on track. Slideshows let him convey ideas faster.
- **Revised advice: organize by feature, not pages/components (L35-L50).** Khalil had earlier advised pages and components, but now says that "misses the mark a little bit". Features are the right level of abstraction because they are what all three roles collaborate on in the abstraction prism. They are "something valuable to the user" that must "find its way into our code base". Pages still matter, but features are "a level higher up".
  - DDDForum v2 E2E tests already do this: a `features` folder, then story, then scenario, then acceptance criteria. "We have the abstraction prism right here in front of us". You can draw lines from it to folder structure and to how features are driven.
  - "I think this is where stuff should begin becoming code… from this level of the feature."
- **Inside-out vs outside-in (L50-L68):** starting a new project by building and composing little functions, or a reusable component library first, is "a fundamentally flawed approach". Drive code **outside-in**.
  - The boundaries are the **customer boundary**, the developer boundary, the system (E2E) boundary where work begins, and the **application boundary**. "That's why we don't begin our work there, but we do a lot of work here nonetheless".
  - Reason: in the three roles and goals, "it's the customer that decides what we're building". E2E tests kick things off.
  - On "requirements are always changing": he understands the struggle. But if you don't work outside-in, you end up with code that doesn't scale because it isn't aligned to reality.
- **Three north-star points for project structure (L68-L76):**
  1. Understand that there are **key developer use cases**.
  2. **Customers decide.** Their decisions drive what we do.
  3. **Discoverability and understanding** is the hardest part. When you open a codebase, you should see within one or two seconds how to get to doing those use cases.
  - Also recommended: keep separate folders, and share things between frontend and backend.
- **Feature → module → sub-module mapping (L77-L104):** a student summarized it as "use cases define features, which define modules, which define sub-modules". Khalil: "that's precisely it."
  - Both `src/` and `tests/` should make the feature (e.g., registration) visible. He recommends the book *BDD in Action* for this.
  - He uses `modules/` + `shared/` on all projects. "It's almost like this modules folder is for the customer. And this [shared] folder is like for the developer."
  - `shared/` holds cross-cutting concerns and more broadly "accidental complexity… what is required". Examples: a use-case base class and entity base classes, possibly in `shared/core/`.
  - Inside `modules/registration/` you could put the controller, use case, and input/output. Adding a sibling like reset password raises cohesion questions. Is it a feature or just a use case? "Account management" is probably the feature, and registration and reset password are use cases.
- **Why structure is hard (L101-L104):** "it's about language. And it's about cohesion and it's about design and it's not precise… It requires constant scrutiny and philosophizing." Principles aren't precise. They give clarity across many cases.
- **Modules as mini-applications (L104-L113):** a student suggested each module could be its own application with well-defined interface points. Khalil connects this to the **application interface pattern**, where the whole app is an API (`app.users`, `app.jobs`). Is `jobs` a feature, a module, or a bounded context? Student: "It's both a module and the feature." Khalil: "It's tricky stuff."
- **Discoverability demo on DDDForum (L114-L150).** Khalil walks in as if new to the codebase, with the task "add create post" on the backend.
  - The README "is not helping". It should have a table of contents like *how to add a feature* or *how to test features*. "I need to see immediately how I can get to doing the thing I need to do like in a second or two."
  - `src/` and `tests/` are **knowledge in the world**, a common convention everyone understands. `packages/` is not common, so the README should call it out.
  - Path taken: `packages/` → backend → `tests/` (test-first) → `acceptance/` ("what is that?") → `users/`. Should he add `posts/` next to it? Is that at the same level of cohesion as `users`? Maybe `forum/` is the right module and **posting** is the feature. "It's philosophizing every, every step of the way through and trying to keep things cohesive, but also… not getting lost."
  - Process: go through all the developer use cases starting at the README, and make each one clearer.
- **Every line creates new abstractions (L153-L157):** each time, ask whether the new thing is related to the problem itself (**essential complexity**, so `modules/`) or is **accidental complexity**, like a RESTful API driver (so `shared/`).
- **Controller granularity (L159-L166):** under `users/` (better named after what you actually do), with sub-folders `registration/`, `login/`, `edit/`, a single `UsersController` next to them implies it serves all three, because of cohesion ("everything I'm looking at has to be related"). Splitting into `EditUserController`, `LoginController`, `RegistrationController` is also fine. "That's why it's not perfect."
- **Folder structure ↔ slices (L166-L169, Osman):** yes, it maps. `users` = feature/module (could be called "account management"), and the sub-folders are the **vertical slices / use cases**.
- **Folder structure vs network of objects (L169-L181):** the structure is a tree ("from theoretical to physical and it becomes physical by the feature, by the module"). **Inside** a module, the network of objects follows the **stereotypical architecture**. Objects always interact the same way on frontend or backend: an incoming infrastructural adapter (on the frontend, the component) → something acting as a controller → … Khalil notes his earlier diagram was missing the **observer** and will redraw it.
- **Pattern-first goal (L184-L196):** "I know what the patterns are on the front end… on the backend… I can use these patterns to build. Pattern first phase of craftship done."
  - He is building a **pattern catalog**: the buckets things go in, how patterns collaborate and interact, and how to test each pattern "if you care to test it".
  - It also covers **state management**, i.e. the types of state: global, domain objects, view models, component.
  - Main lesson of best-practice-first: drive code from the customer boundary with E2E tests.
  - Main lesson of pattern-first: when you need to carve in and test deeper, move things around to get isolation, and patterns help you do that.
- **Responsibility-first & value-first (L196-L206):** Khalil's own journey went patterns → testing → RDD. In responsibility-first you make **custom abstractions** and learn to "glue things together properly". Likely assignments: build a custom router or a chess game, "outside of just the common patterns". This gives confidence you "could design anything, any time". Value-first then focuses on the best testing strategies and using patterns more effectively and efficiently.
- **Choosing a frontend architecture (L206-L245):** first learn to break down the problem of selecting one, at the **architecture guess point**.
  - Guess-point image: the abstraction prism plus the feedback loop, hopping to the next thing each time. Before writing code, have clarity on problem, solution (concrete examples) and architecture.
  - Full treatment is deferred until after responsibility-first, because "y'all are not really quite going to get it" before then.
  - Method: list all **functional and non-functional requirements (NFRs)**. Decompose responsibilities with RDD, assign them to roles, design collaborations, then find the architectural tools that implement those roles.
  - "It's always going to be based on… it depends". Knowing which NFRs to look for moves you in the right direction. Then gather concrete examples and choose.
- **Multiplayer game example (L217-L226):** "start game / join new game" is functionally easy: an API call, data into a DB, "just a slice". The **non-functional** part (how the system does it for players worldwide) is "where the real complexity lies". That raises questions about web sockets, where responsibilities go, which roles, and which architectural components. "Really hardcore systems design stuff."
- **Common frontend NFRs (L229-L243):**
  - **Speed / bundle size:** don't ship a 200 MB build to the client. Khalil cites a Google stat he couldn't recall exactly about a large number of users dropping off when a page takes more than ~3 seconds to load.
  - **SEO:** will user-generated content drive traffic? Ask the customer. "It's not really a slice, but it is related to what surrounds the slice."
  - **Security:** front vs back. For solidbook, he should use **server-side rendering** and not even send the page to unauthenticated users.
  - **Availability**, etc.
- **The driver is moving responsibilities around (L239-L243):** how much security is on the front vs the back, and how much rendering is on the client vs the server. Code-first returned JSON. Templating engines are the fastest way to return HTML. He shared an article comparing rendering approaches.
- **Pre-rendering (L243-L245):** the first request is rendered and returned, and later navigation is client-side. It's a quick way to get SEO working. He used it back in his "end of jobs" [likely Univjobs (inferred)] days, and the tooling is better now.
- **Student struggles → roadmap (L247-L255):** students asked for the frontend pattern catalog (it goes in pattern-first) and for domain modeling. Pattern-first covers frontend then backend. Frontend comes first because it's "considerably easier" and most of the community comes from frontend.
- **Incrementally improving a messy codebase (L256-L266):** first question is "do the features that need to work right now work?" "Just **stop the bleeding**." The fastest way is E2E tests that "wrap the whole thing".
  - **Tailor analogy:** a tailor first puts pins in the clothes and checks you like the fit, then goes deeper. Don't do "crazy pattern-first stuff" until the features that must work are known to work. This is why "stop the bleeding" is in best-practice-first.
- **Team buy-in (L266-L281):** one student's company pays an outside firm for manual testing. That's "not ideal" but valid if it ships to users and the customer knows the alternatives. "Ultimately it is a customer decision… not a developer decision." Dave Farley and others always frame automated testing as an **investment**.
  - Anecdote: a senior-dev friend at a medium-sized company uses a **four-tier E2E approach** with reusable **page objects**. Building new features became "plug and play": "go from requirement to implement it with just mixing together a couple of page objects".
- **Junior dev in a messy codebase without seniors (L282-L299):** very common. "You can't completely do what's best from a value first perspective because you haven't experienced it."
  - "You're structuring your consciousness now." Theory alone isn't enough; you need practice. It goes faster on your own project.
  - Student Luigi, a laid-off frontend dev, learned backend by iterating on one project: killing his design, redoing it, restructuring, until he had a "felt experience". He got hired about a month before this session.
  - "Expect the next L… how can I get to the next L faster?"
- **Are E2E tests the most important? (L299-L311):** "E2E tests, they suck… they take a lot of time and energy". But they're important for the customer, so you need at least a few. The real measure is **confidence**: that the app works, the customer gets what they asked for, and users won't hit bugs. If another way achieves that, great, "but there's very little that's going to be as good as E2E tests".
- **Two testing strategies (L311-L322, L345-L352):**
  - **Strategy A:** E2E (whole thing, touches DB) + carve inward with **high-value unit tests** (no DB).
  - **Strategy B:** **Incoming tests** + **high-value integration tests**, shown on the backend but applicable to any app with an interface.
  - Goal either way: "cover everything with some sort of test as a part of a strategy".
- **Choosing a strategy is value-first / the strategy pillar (L353-L373):** "Which one's better? It's really hard to say… It's just your level of confidence in your code base."
  - Logic-heavy apps: spend lots of time on the application/domain layer, maybe hundreds of examples.
  - Simpler apps: most value comes from checking that major architectural components work together (Stripe connection, etc.).
  - Many clients: incoming/contract tests become more relevant (inferred from context).
  - For most people building **task-based UI apps**, E2E is the best way to begin carving in and gives the greatest certainty. Write one or two; "you're [not] going to have to write a ton of them" (the negation is inferred; the literal STT says "you're going to have to write a ton of them", which contradicts "just write one or two"). Later you could drop E2E and move to strategy B, since E2E verifies whole-system input/output.
  - Mixing is fine: "You don't have to have a perfect parity."
- **Student remark (L351):** "High value are usually hard to get if the code is not decoupled. So the E2E test is a faster feedback." Khalil: "Yeah, that's great… both strategies are great."
- **Next focus (L398-L405):** pattern-first intro modules and frontend patterns, including best-practice-first lessons (e.g., the frontend E2E testing lesson, not yet published). Stubbing and mocking still need to be taught properly. Osman already knows **outgoing** contract testing and "now know[s] how to do the incoming too".

## Named frameworks / mental models
- **Abstraction prism → project structure:** feature → story → scenario → acceptance criteria. This maps to folder structure, E2E test organization, and how features are driven. Use it when deciding the top-level organization of `src/` and `tests/`.
- **Outside-in development / boundaries:** customer boundary (the customer decides), system/E2E boundary (where work begins), application boundary (lots of work happens here, but not first). Use it when starting any new project or feature.
- **Three north stars of structure:** key developer use cases, customers decide, discoverability & understanding (1-2 seconds to find how to do a use case).
- **`modules/` vs `shared/` (customer vs developer):** essential complexity (feature/problem code) goes in `modules/`. Accidental complexity (base classes, drivers, cross-cutting) goes in `shared/` (and `shared/core/`). Ask this for every new abstraction.
- **Design of Everyday Things tools (Don Norman):** affordances, signifiers, constraints, mappings, feedback, conceptual models. Design patterns = conceptual models, i.e. understanding building blocks and what they're for. Discoverability & understanding is part of the **feedback loop** metaphysical essential.
- **Knowledge in the world:** common conventions (`src/`, `tests/`) that need no explanation. Uncommon ones (`packages/`) must be called out in the README.
- **Application interface pattern:** express the whole app as one API (`app.users.{create, edit, getById, register}`, `app.jobs…`). The concrete app implements it, and delivery adapters (REST, GraphQL) get the app injected. Enables incoming/contract tests with a fake app.
- **Stereotypical architecture:** governs the network of objects *inside* a module. Same on frontend and backend: incoming adapter (component) → controller → … (observer was missing from the shown diagram). See Lesson 90.
- **Phases of craftship, per-phase lessons:**
  - Best-practice-first: drive from the customer boundary with E2E, stop the bleeding.
  - Pattern-first: know the frontend/backend pattern catalog and carve for isolation.
  - Responsibility-first: custom abstractions (router, chess game).
  - Value-first: testing strategy and efficiency.
- **Architecture guess point (for selecting a frontend architecture):** list functional + NFRs → decompose responsibilities (RDD; CRC-card style, cards optional) → assign to roles → design collaborations → pick architectural tools that implement the roles → validate with concrete examples.
- **Stop the bleeding / tailor analogy:** pin (E2E) the whole thing before any invasive refactor.
- **Four-tier E2E with page objects:** reusable page objects make new features "plug and play". The four tiers aren't enumerated here. Likely Dave Farley's acceptance-test layers (inferred).
- **Two test strategies:** (A) E2E + high-value unit tests; (B) incoming (contract) tests + high-value integration tests. Selection is driven by confidence, logic density, and number of clients.

## Definitions
- **Feature**: an abstract but correct-level unit of value to the user. It groups use cases cohesively and is where "stuff should begin becoming code".
- **Use case / slice**: a sub-folder under a feature/module (registration, login, edit user).
- **Module**: the physical home of a feature. It may also coincide with a bounded context. The student's answer "both a module and the feature" was accepted as reasonable.
- **Customer boundary**: the outermost boundary. The customer decides what's built.
- **Application boundary**: the inner boundary around application logic. Work isn't started here, but much of it happens here.
- **Essential complexity**: code related to the problem itself (goes in `modules/`).
- **Accidental complexity**: code required to build it but not about the problem, e.g. a RESTful API driver or a use-case base class (goes in `shared/`/`core/`).
- **Non-functional requirements**: *how* the system does a slice (speed, SEO, security, availability, real-time). They surround the slice rather than being one.
- **Pre-rendering**: render the first requested page server-side and return it, then run client-side afterward. Used for quick SEO.
- **Incoming test (incoming contract test)**: verifies that when the API interface/controller is called, it extracts and validates the request and then invokes the correct use case on the application interface correctly. The app is mocked, so no use cases execute. It checks that "this contract still work[s]… didn't break the clients".
- **High-value integration test**: the controller is called and execution goes "all the way to the database". It's not an E2E test, but it verifies real integration.
- **Outgoing contract test**: the counterpart on the outside/outgoing side (mentioned, not detailed).
- **Pattern catalog**: an upcoming pattern-first artifact. For each frontend/backend pattern it covers the bucket, collaborations, interactions, how to test it, and the state types.

## Rules & heuristics
- Organize `src/` and `tests/` by **feature**, not by pages/components. Pages still exist below that level.
- Never start a project inside-out (tiny functions or a reusable component library first). Start from the customer boundary with an E2E test.
- Aim for 1-2 second discoverability of every key developer use case, starting from the README (add a TOC such as "how to add a feature" / "how to test features").
- For each new abstraction, ask: essential (`modules/`) or accidental (`shared/`)?
- Keep siblings at the same level of cohesion. Test candidate names (`posts` vs `forum` → posting).
- One controller per feature folder implies it serves all sibling use cases. Splitting per use case is equally valid.
- Folder tree = features/modules/slices. Object network inside = stereotypical architecture.
- Selecting a frontend architecture: get very clear on the NFRs first, then concrete examples, then choose. There is no one-and-done best architecture.
- Decide rendering and security placement (client vs server) from NFRs. Don't send protected pages to unauthenticated users (SSR).
- In a messy codebase: stop the bleeding with E2E first, then go deeper with patterns.
- Test strategy is judged by **confidence**, not dogma. Mix strategies freely.
- For typical task-based UI apps, start with a few E2E tests, then carve inward.
- Automated testing is an **investment**, and the customer decides whether to make it.
- Build value-first judgment through reps: iterate on your own project, kill designs, redo.

## Anti-patterns / mistakes called out
- Organizing primarily by pages and components. Khalil retracts his own earlier advice ("missing the mark").
- Inside-out development: composing small functions or building a component library before any feature works ("fundamentally flawed").
- Blaming changing requirements while not driving work from the customer.
- READMEs that don't help you do a developer use case. Uncommon top-level folders (`packages/`) left unexplained.
- Mixing cohesion levels among sibling folders (e.g., `users` next to `posts` when `forum/posting` is the real concept).
- Doing heavy pattern-first refactors before core features are pinned with tests.
- Shipping huge bundles (e.g., 200 MB) to the client. Doing auth/security purely client-side when server-side is appropriate.
- Expecting to reach value-first judgment from theory alone.
- Khalil's own diagram error: the stereotypical architecture drawing was missing the observer.

## Code discussed
**1. Folder structure (whiteboard + DDDForum):** before, organized by pages/components or infrastructure. After:
```text
src/                         tests/
  modules/        (customer)   features/ (DDDForum v2 E2E: feature → story → scenario → acceptance criteria)
    users/  (feature/module; maybe "account-management")
      registration/   (use case / slice: controller, use case, input/output)
      login/
      edit/
      usersController  (serves all three by cohesion — or split per use case)
    forum/
      posting/        (DDDForum "create post" — instead of top-level posts/)
  shared/         (developer: accidental complexity, cross-cutting)
    core/         (UseCase base class, Entity, ...)
```
DDDForum path walked: `packages/` → `backend/` → `tests/` → `acceptance/` → `users/`.

**2. Application interface pattern** (whiteboard). The app is expressed as one API. REST and GraphQL adapters receive the app instance.
```ts
// reconstructed from narration
interface UsersAPI {
  register(input: RegisterInput): Promise<RegisterResult>;
  create(input: CreateUserInput): Promise<User>;
  edit(input: EditUserInput): Promise<User>;
  getById(id: string): Promise<User | null>;
}
interface JobsAPI { /* job use cases */ }

interface ApplicationAPI {
  users: UsersAPI;
  jobs: JobsAPI;
}

// Real app implements the interface; each use case connects to infrastructure.
class App implements ApplicationAPI {
  constructor(public users: UsersAPI, public jobs: JobsAPI) {}
}
```

**3. Incoming controller + Express setup** (whiteboard sketch: `express`, set up routes with controllers, `.listen`).
```ts
// reconstructed from narration
class UsersController {
  constructor(private app: ApplicationAPI) {}

  async register(req: Request, res: Response) {
    // Everything before the app call is what the incoming test verifies:
    const { email, username, password } = req.body; // extraction
    if (!email || !username || !password) return res.status(400).json({ error: 'ValidationError' });
    const result = await this.app.users.register({ email, username, password });
    return res.status(201).json(result);
  }
}

const app: ApplicationAPI = compose(); // real use cases + infra
const server = express();
server.use(express.json());
setupRoutes(server, { users: new UsersController(app) }); // e.g. POST /users/register
server.listen(3000);
```

**4. Incoming (contract) test**: the app is mocked, so use cases don't run. It verifies that the request reaches `this.app.users.register` with the right arguments. Test tooling (jest/supertest) is (inferred).
```ts
// reconstructed from narration
test('POST /users/register invokes app.users.register with extracted input', async () => {
  const fakeApp = {
    users: { register: jest.fn().mockResolvedValue({ id: '1' }) },
    jobs: {},
  } as unknown as ApplicationAPI;

  const server = buildServer(fakeApp); // express + routes, no infra
  await request(server).post('/users/register')
    .send({ email: 'a@b.com', username: 'a', password: 'pw' });

  expect(fakeApp.users.register).toHaveBeenCalledWith({
    email: 'a@b.com', username: 'a', password: 'pw',
  });
});
```
Rationale: the framework (Express) is "a whole ass framework" with lots of uncertainty (e.g., "CRS" = likely CORS config (inferred)), and we want to minimize that uncertainty. A **high-value integration test** uses the same entry but with the real app, all the way to the DB.

## Diagrams / visual models described
- **Course section outline slide** (L16-L28): metaphysics → 5 phases → 3 roles → 4 pillars → 12 essentials (before/after images) → guess points → ideal developer workflow → problem-solving model.
- **Abstraction prism next to DDDForum v2 E2E `features/` folder** (L43-L50): feature → story → scenario → acceptance criteria. Lines could be drawn to folder structure.
- **Boundaries drawing** (L57-L63): whole system, customer boundary, developer boundary, system/E2E boundary (start here), application boundary.
- **Whiteboard folder tree** (L81-L104): `src`/`tests` → `modules` (customer) / `shared` → `core` (UseCase, Entity), `registration`, `reset password`, and the application interface (`app` → users API, jobs API → create/edit/getById).
- **Design of Everyday Things / discoverability & understanding diagram** (L120-L127): affordances, signifiers, constraints, mappings, feedback, conceptual models.
- **Stereotypical architecture by responsibility** (L174-L181): incoming adapter (component) → controller → …. The observer was missing, and Khalil promised to redraw the "frontend architecture one" diagram.
- **Guess points image** (L210-L213): abstraction prism + feedback loop, hopping between problem → solution (concrete examples) → architecture.
- **Four-tier E2E / incoming boundary iPad drawing** (L322-L345): the client/API-client boundary. Inside, controller (incoming) → application interface ← REST/GraphQL adapters (injected with the app) → use cases → infrastructure. The incoming-test boundary wraps the controller with a mocked app. The high-value integration boundary extends to the DB.
- **Strategy comparison sketch** (L311-L322): frontend/backend columns. Strategy 1 = E2E + high-value unit. Strategy 2 = incoming + high-value integration.
- **Rough "cloud" sketch** (L380-L392): express → `UsersController.register(req, res)` → `this.app.users.register(...)`, with the verified region = everything before the app call.

## Q&A items
- **What frontend architectures are you using / familiar with?** (L28-L50)
  - Students' answers included separating by components and pages. Khalil revises this to organize by **feature**, a level higher, per the abstraction prism and DDDForum v2 E2E `features/`.
- **How does outside-in relate to project structure?** (L50-L76)
  - Drive from the customer boundary with E2E. The north stars are key developer use cases, customers decide, and discoverability & understanding.
- **Final idea of project structure: use cases → features → modules → sub-modules?** (L77-L104)
  - Yes, "precisely it". Use `src/` and `tests/` mirroring features, `modules/` (customer) vs `shared/`/`core/` (developer, accidental). Feature vs use case naming requires philosophizing about cohesion.
- **Could each module be its own application with well-defined interfaces?** (L104-L113)
  - Yes, via the application interface pattern (`app.users`, `app.jobs`). Whether `jobs` is a feature, module, or bounded context is ambiguous. "Both a module and the feature."
- **Demo the 1-2 second discoverability process on DDDForum for a new use case.** (L113-L152)
  - README should have a TOC for adding/testing features. Rely on knowledge in the world (`src`/`tests`) and explain uncommon folders (`packages`). Walk `backend/tests/acceptance/users`, then question cohesion: `forum/posting` vs `posts`.
- **Does folder structure map to vertical/horizontal slices? (Osman)** (L166-L169)
  - Yes. `users` = feature/module, and its sub-folders = slices/use cases.
- **Folder structure is guided by features, but what about the network of objects?** (L169-L181)
  - The tree becomes physical per feature/module. Inside it, objects follow the stereotypical architecture, the same on frontend and backend.
- **Where can we find that diagram?** (L181-L184)
  - The frontend architecture diagram isn't quite correct (missing observer). Khalil will redraw it.
- **What are the frontend architectures to choose from, and which should we choose?** (L206-L245)
  - Decide at the architecture guess point. List functional requirements and NFRs, decompose with RDD, assign roles, design collaborations, and pick tools. Key NFRs are speed, SEO, security, and availability. The main lever is moving responsibilities between client and server (SSR, templating, pre-rendering). "It depends."
- **What is everyone struggling with most?** (L245-L256)
  - Students named downloading the frontend patterns and domain modeling. The frontend pattern catalog will come first in pattern-first.
- **How to incrementally improve a codebase?** (L256-L266)
  - Stop the bleeding with E2E that wraps everything (tailor pins), then go deeper with patterns.
- **Blocker: convincing the team E2E is worth the time; company pays for manual testing.** (L266-L281)
  - Manual testing by a paid firm is valid if it ships and the customer understands the alternatives. It's a customer decision. Automated tests are an investment (Dave Farley). The four-tier E2E + page objects anecdote showed the payoff: features become "plug and play".
- **Junior dev, no seniors, messy adopted codebase: how to do what's best value-first?** (L281-L299)
  - You can't fully yet, because it requires experience. Build it through reps, ideally on your own project (Luigi's story). Expect Ls, and aim to reach the next L faster.
- **Aren't integration/unit tests of business logic more important than E2E? We do clean architecture + DDD.** (L299-L398)
  - E2E tests are painful but important for customer confidence, and "very little" matches them. There are two valid strategies: E2E + high-value unit, or incoming (contract) + high-value integration.
  - Incoming tests mock the app behind the application interface and verify that the controller extracts/validates the request and calls the correct use case.
  - The choice depends on logic density, integration surface, number of clients, and confidence. Mixing is fine. For task-based UI apps, start with E2E.

## Notable quotes
- "Instead of pages and components… I think organizing by feature is probably the, the better way to think about it."
- "We should drive code outside in… It's the customer that decides what we're building."
- "It's almost like this modules folder is for the customer. And this folder is like for the developer."
- "It's about language. And it's about cohesion and it's about design and it's not precise… It requires constant scrutiny and philosophizing."
- "I need to see immediately how I can get to doing the thing I need to do like in a second or two."
- "The non-functional part, it's how the system does that. And that's where the real complexity lies."
- "Just stop the bleeding… It's the end to end test, man."
- "Ultimately it is a customer decision at the end of the day. It's not a developer decision."
- "You're structuring your consciousness now."
- "E2E tests, they suck, right?… But there's very little that's going to be as good as E2E tests."

## Cross-references
- Lesson 90 (Frontend Architecture 1 of 2): stereotypical frontend architecture read/write paths, contracts, and RDD stereotypes. This lesson adds structure, NFRs, and test strategies.
- Lesson 14 (Essential Abstraction / abstraction prism). Lesson 15 (Feedback Loop): discoverability & understanding.
- Lesson 11 (Three roles & goals). Lesson 12 (Four pillars): strategy pillar.
- Lesson 16 (Vertical slicing). Lesson 17 (Horizontal decoupling): folders ↔ slices.
- Lesson 26 (Ideal developer workflow). Lesson 24 (Walking skeleton): outside-in, E2E first.
- Lesson 35 (FAQ structure codebases). Lesson 33 (FAQ frontend architecture). Lesson 37 (clean/layered architecture).
- Lesson 71 (Architecture guess point). Lesson 38 (RDD).
- Lesson 64 (Value-first testing strategies for integration testing). Lesson 73 (hand-written spies): incoming/outgoing verification.
- Lesson 23 (Strategic design): bounded contexts vs modules.
- External: *BDD in Action* (John Ferguson Smart), *The Design of Everyday Things* (Don Norman), Dave Farley (tests as investment, four-layer acceptance tests (inferred)), solidbook "Humans & Code / organizing things" chapter, and a shared article on rendering approaches (not named).

## Fluff skipped
Screen-sharing fumbles, cursor/marker issues, chat reading, goodbyes (Eric), a repeated STT loop ("go back to the back" ×5), and garbled student fragments ("still in a strangle", "big and ready to strip up this").

## AI-era relevance hint
- Feature-first folders plus a README TOC ("how to add a feature") are exactly what lets AI coding agents find the right place in 1-2 "hops". Discoverability now serves agents as well as humans.
- The application interface pattern plus incoming contract tests give AI-generated adapters (REST/GraphQL/MCP) a cheap, deterministic check that they call the right use cases.
- NFR-driven architecture selection stays a human judgment call. AI can list options (SSR, pre-rendering, websockets), but the customer's NFRs decide.

## Coverage proof
- Lines read: 405 / 405
- Final line (verbatim): "chat soon."
