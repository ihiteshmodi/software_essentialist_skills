# Lesson 90 — August 15th New Q&A Structure + Frontend Architecture 1 of 2
- **Source file:** 90) August 15th New Q&A Structure + Frontend Architecture 1 of 2.txt
- **Category:** qa-live
- **Topics:** qa-format, course-structure, metaphysics, feedback-loop, abstraction, systems-thinking, scalability, three-roles, four-pillars, packaging-by-infrastructure, conceptual-models, patterns, pattern-first, responsibility-first, rdd, object-stereotypes, stereotypical-architecture, frontend-architecture, coupling, contracts, gateway, api-client, cache, observer, coordinator, presenter, view-model, component, component-state, global-state, reactivity, useEffect, controller, use-cases, command-handlers, domain-object, value-objects, shared-validation, repository, read-side, write-side, cqs, high-value-unit-tests, e2e-first, ideal-developer-workflow, strategy, react-query, apollo, redux, mobx, dddforum

## Summary
Khalil opens by announcing a more structured Q&A format. Students propose topics in the office-hours channel, vote at the start, and he prepares material and code for the next session. He restates the core of the course: two foundational mental models, the **feedback loop** and **abstraction**, tied together by **systems thinking**, with the 12 essentials as the skills that move code through the value creation system. The class votes for **frontend architecture** over high-value unit testing. He defines scalability as all three roles (users, customers, developers) achieving their goals, which comes from doing the **four pillars** well. He calls out packaging by infrastructure as bad design and names **coupling** as the main enemy of frontend testability, fixed by inserting **contracts**. He argues that framework "patterns" (Redux store, single-file components) map onto more abstract, stack-agnostic patterns, which in turn derive from the **six RDD object stereotypes** and a **stereotypical architecture** shared by frontend and backend. He then draws the frontend architecture on an iPad. The read side is gateway/API client → cache → observer/coordinator → presenter → view model → component, with `useEffect` binding. The write side is component → controller (use cases) → domain object (validation, possibly shared value objects) → repository/gateway. He closes with strategy. Start with end-to-end tests per the ideal developer workflow, and carve out the pure, testable middle (the home of **high-value unit tests**) only when the complexity justifies the investment.

## Core ideas
- **New Q&A structure:** topics are gathered in the office-hours channel, the group votes, and Khalil prepares slides and code in advance so later sessions are more structured. Q&As stay at about 1h30. Knowing the topic ahead of time lets people decide whether to attend.
  - Example: a previous Q&A covered Osmain's problem. His team felt their high-value unit tests weren't scalable and worried about "mocking into no man's land". The answer there was **contract testing**, originally slated for pattern-first.
  - The two dominant requested topics were **high-value unit tests** and **frontend architectural patterns**. A student asked for more code in Q&As.
- **The two foundational mental models are the feedback loop and abstraction**, "pieced together" with **systems thinking**. "If you understand those things that is the entire course really."
  - Meta point: the way the course is taught is itself the feedback loop plus abstraction. Each iteration makes the important things more evident and abstracts away the less important ones, and it gets a bit better each time.
  - This takes pressure off. You won't get it right the first time, so do it again.
- **A new mindset module is planned:** kill your designs, design it twice, don't get attached to your code, thinking/working backwards. All of these stem from the two mental models plus systems thinking.
- **End goal of the course:** a conceptual model of how code flows from requests into your system, to deployment to the user, to metrics about product use, and back to leadership deciding what to build next. The **12 essentials** are the skills that move code through this value creation system.
- **Goal of (frontend) architecture = scalability.** Students offered: easy to change as features are added, many developers on one codebase, easy to navigate, fewer people needed to maintain it. Khalil's abstraction of all of these: scalability is when the **three roles win**.
  - Users get time back / time enriched.
  - Customers increase and protect revenue.
  - Developers keep the customers and users getting those benefits.
- **Scalability is achieved by using the four pillars well:** strategy, testing, architecture, design. It's lost through bad design, bad architecture, bad testing or bad strategy.
- **Bad design example: packaging by infrastructure.** Top-level folders like `routes/`, `controllers/` say nothing about what the code does, so it's hard to know where to add or change features. Better: structure that "progressively moves inwards" (image shown). The psychology of organizing things is "a big topic".
- **Conceptual models are tools for understanding.** They let you communicate with symbols and ideas instead of tracing through "six, seven, eight, nine, ten levels of abstraction".
- **Patterns are the best conceptual models in programming.** They speed up understanding and problem-solving by letting you piece things together. This is why the pattern-first phase exists.
  - Code-first: can you solve problems with code?
  - Pattern-first: can you solve them so your team understands what you're doing? Patterns have "the 80-20 effect".
- **Where frontend developers usually learn patterns:** React docs and thought leaders (Dan Abramov, Kent C. Dodds). That gets you "pretty far", but Khalil disagrees with some common advice.
  - At Apollo (a developer tooling company where he worked), the advice included putting queries directly inside components, using the state management library for everything, and having React components fetch, display and structure information. "Just too much is happening in one place."
- **Frontend's big problem: massive coupling.** Coupling means one component relies on another. Coupling is "the enemy of testing", and testing requires loose coupling.
  - Fix: insert a **contract** (something "not quite real") between two clumps. One side implements it and the other relies on it. Now you can test one clump without the other. Repeat to isolate smaller clumps. "That is the game that we're playing here."
- **Before doing frontend architecture properly, know the patterns:** what they are, what state management patterns exist, what talks to what, what doesn't, and the rules.
- **Framework patterns vs agnostic patterns:** React-era patterns (Redux store, single-file component) emerged from the technology. They are communication tools whose responsibilities map onto better, more abstract, framework/library/stack-agnostic patterns. Those same patterns are used on the backend.
  - Frontend agnostic patterns named: **DTOs, controllers, presenters, global state (fundamentally an observer), gateway, view model, data model** (the data model "is actually the DTO"; view model and DTO "are different").
- **All patterns derive from the six RDD object stereotypes** (responsibility-driven design). They're "the most abstract general patterns you could possibly ever have", and they show up in the same places in every architecture. Khalil shared an article on them and called it "one of the best things I've ever discovered in this whole field... the final learning block for me".
- **Responsibility-first insight:** you see the "atoms" of software. Frontend, backend, desktop app, Chrome extension all have "the exact same responsibilities". Hence the **stereotypical architecture**.
- **Seeing systems as doings and knowings:** fetch data, cache data, notify when data changed, rebuild the view model when data changed, ask for the view model. For each responsibility, ask which stereotype's role it is, and you know where it lives.
  - Example: "rebuild the view model when data changed" belongs to the presenter. It's doing/coordinating/controlling (application layer), and it also acts like an **interfacer** to the outside world because it gets data ready for the view.
- **Payoff of responsibility-first:** "you understand front-end architecture forever". You can vet new tools ("doesn't have the responsibilities I need") or build the missing responsibilities yourself.
- **Testable surface:** the pure code between infrastructure (gateway/cache) and React (components) can be tested without the backend and without starting React. This is where **high-value unit tests** go, and it's "the core of what [the app] does".
- **Read path vs write path:** "we have a read path and we have a write path". The write path goes through controllers and domain objects, which decide what gets through. It's "about the throughput... a function of moving things through". Knowing where things belong lets you encapsulate a lot of frontend complexity. It also scales to more complex designs, like **pipes and filters**.
  - Example: FL Studio-style software chaining effects and streaming bytes through concepts.
- **Strategy decides how much of this you do.** For small/medium frontends, you often don't need it. Start with end-to-end tests (as in best-practice-first and the ideal developer workflow). Carve out layers only if internal complexity demands it and the investment pays off. "I cannot prescribe to you a single approach."

## Named frameworks / mental models
- **Feedback loop + abstraction + systems thinking**: the foundational mental models. Everything else, including mindsets and the 12 essentials, stems from them.
- **Value creation system**: requests → system → deployment → users → metrics → leadership decides what to build next. The 12 essentials move code through it.
- **Three roles & goals** (users, customers, developers): used here as the definition of scalability.
- **Four pillars** (strategy, testing, architecture, design): how scalability is achieved or lost.
- **Phases of craftship**: code-first → pattern-first → responsibility-first (best-practice-first is also referenced as a phase where the API client was introduced).
- **Contract insertion for decoupling**: a component and its dependency get a contract between them, with one implementing and one relying. Repeat to isolate testable clumps.
- **Six RDD object stereotypes**: the most abstract patterns. They live in the same places in every architecture. Named in this session: **coordinator**, **controller**, **interfacer**. The other three (information holder, structurer, service provider) are from the standard Wirfs-Brock list (inferred, not named here).
- **Stereotypical architecture (frontend instantiation)**
  - Read side: request → **gateway / API client** (infra) → **cache** (infra) → **observer/coordinator** (subscriptions; "this really is what Redux is doing") → **presenter** (subscribes, rebuilds view models) → **view model** → squiggly boundary → **component** (React; just the view).
  - Reactivity binding: the component watches the presenter via `useEffect` (or MobX etc.) to re-render.
  - Write side: component (with **component state**) → **controller** (use cases / command handlers) → **domain object** (validation, decision maker) → **repository** → **gateway/API client** → backend.
  - Responsibilities can move around (e.g., "you could have the repo do it" for notification). Repo and gateway/API client may be the same thing.
- **Doings and knowings**: list responsibilities, map each to a stereotype, and you've located the pattern.
- **Read path / write path**: separate paths. The write path is filtered by controller and domain objects (a throughput view).
- **Guess points applied to frontend testing** (tentative; he said he needs to "structure the guess point way"):
  1. System level, end-to-end: do my API calls work, can I reach the backend, does it translate into the correct interactions on the frontend?
  2. Does the whole app work?
  3. Go deeper: the application-logic layer, where **high-value unit tests** begin. Does creating a to-do add a to-do to be presented? Does creating a user attempt creation and show validation errors?
- **Ideal developer workflow (as applied here)**: get e2e functionality working with a test that covers everything first. Only carve layers when complexity demands it.

## Definitions
- **Scalability** — the state where users, customers and developers are all achieving their goals ("one, two, three are winning"). Achieved via the four pillars.
- **Packaging by infrastructure** — top-level folders named after technical layers (routes, controllers…) rather than what the code does.
- **Conceptual model** — a tool for understanding that enables fast communication via symbols and ideas.
- **Pattern** — a conceptual model that aids understanding and speeds up solving problems by piecing things together.
- **Coupling** — one component relying on another.
- **Contract** — an abstraction inserted between components. One side implements it and the other depends on it, which enables isolated testing.
- **Gateway / API client** — the infrastructural component that sends requests to the backend (e.g., via axios, an HTTP adapter).
- **Cache** — infrastructural storage for fetched data. This is **global/app state**, persisted across screens.
- **Observer / coordinator** — listens to the cache and notifies subscribers on change. "Global state... fundamentally it is an observer". Redux does this.
- **Presenter** — subscribes to changes and builds view models for components. Its API is something like `presenter.load()`.
- **View model** — the data shape a component actually renders from. Built by the presenter.
- **Component** — React code below the boundary. "Just the view", "just the presentation".
- **Component state** — ephemeral, local state (e.g., form input) managed with `useState`. It's gone when you leave the screen and isn't part of the cache.
- **Controller** — handles state-changing operations (use cases). Like a backend **application service**, i.e., a cluster of use cases / **command handlers**. It can also be split per use case (`CreateUserController`, `EditUserController`, `DeleteTodoController`).
- **Domain object (frontend)** — the decision maker that validates input (value objects/entities) and decides whether a request should proceed. Example: `RegistrationForm`.
- **Repository** — receives valid domain objects and calls the gateway/API client.
- **Boundary (squiggly line)** — Khalil's drawing convention for the boundary between code we write and code we don't (React).
- **Solid line** — "uses".

## Rules & heuristics
- To learn what to cover, ask learners directly ("go straight to the source").
- Don't expect to get it right the first time. Iterate (feedback loop), and kill your designs / design it twice.
- Define architecture goals abstractly (three roles winning). It covers every concrete goal people list.
- Package by what the code does, not by infrastructure.
- Learn the patterns and their communication rules before attempting frontend architecture.
- Prefer framework-agnostic patterns. Treat framework patterns as communication tools that map to them.
- When you see a responsibility, ask which stereotype owns it. The location in the architecture follows.
- Keep components as pure views: they get a view model and render it.
- Presenters subscribe to data changes and rebuild view models. Components bind to presenters via a reactivity mechanism (`useEffect`, MobX…).
- Separate ephemeral component state from global/app state (cache).
- Any state-changing command sent to the backend should typically pass through a **domain object** first to decide whether to continue.
- Share value objects/validation between frontend and backend via a **shared package** to avoid duplicating validation logic.
- Put high-value unit tests on the pure middle (controllers, presenters, domain objects), with no backend and no React.
- Start with end-to-end tests. If confidence is high, don't carve out layers. Carve them out only when internal complexity grows and the investment is strategic.
- Use systems thinking and guess points to find where your gaps are before choosing where to test.
- Vet new tools by the responsibilities they cover. If one is missing, compose it yourself.

## Anti-patterns / mistakes called out
- **Packaging by infrastructure** (`routes/`, `controllers/` at top level).
- **Queries directly inside components** (Apollo-era advice).
- **Using the state management library for literally everything.**
- **React components that fetch, display and decide how to structure information**: "too much is happening in one place".
- **Massive coupling** between components, which blocks isolated testing.
- **Mocking into no man's land** (Osmain's team worry, recap; solved with contract testing).
- **Learning architecture only from framework docs/thought leaders**: fine to start, but limited.
- **Duplicating validation logic** on frontend and backend.
- **Over-architecting small/medium apps** without strategic justification.
- **Poor use-case naming**: "submit form" is "not a great name". Prefer "register user", "edit user".
- Khalil's self-critique: his own DDDForum v2 code is messy in places ("forced to use react hooks and I hate it"). He wasn't sure a presenter was done properly in the react-todos example.

## Code discussed
- **DDDForum v2 codebase** (link shared in chat): `src/shared/persistence/global state`, a **global cache** with `subscribe` and notify. It's "pure javascript code", with no React.
- **Menu presenter**: subscribes to the cache. When `users` changes, it rebuilds the view model. Khalil doesn't like how he did it and promises a cleaner version.
- **Component binding**: `useEffect` watches the presenter. When presenter state changes, load new data and set the view model. "That's how you connect your pure code to React."
- **Controller** example: messy because of React hooks.
- **Registration page** view calls `controller.register(...)` on submit.
- **`controller.register(props)`**: tries to create a `RegistrationForm` domain object, which returns the domain object or an error. On success it continues to repository/gateway. On failure it returns the error to fix.
- **`RegistrationForm`**: looks like value objects/entities (first name, last name, username, email). It has no reason to exist on the backend, but its value objects could be imported from a shared package.

```ts
// reconstructed from narration
class GlobalCache {
  private subscribers: Array<() => void> = [];
  subscribe(cb: () => void) { this.subscribers.push(cb); }
  protected notify() { this.subscribers.forEach((cb) => cb()); }
}

class MenuPresenter {
  private viewModel: MenuViewModel;
  constructor(private cache: GlobalCache) {
    // on users change -> rebuild view model
    cache.subscribe(() => { this.viewModel = this.buildViewModel(); });
  }
  load(): MenuViewModel { return this.viewModel; }
}
```

```ts
// reconstructed from narration
function Menu({ presenter }: { presenter: MenuPresenter }) {
  const [viewModel, setViewModel] = useState(presenter.load());
  useEffect(() => { setViewModel(presenter.load()); }, [presenter /* state */]);
  return <MenuView viewModel={viewModel} />;
}
```

```ts
// reconstructed from narration
class RegistrationController {
  constructor(private repo: UsersRepository) {}
  async register(props: RegistrationProps) {
    const formOrError = RegistrationForm.create(props); // FirstName, LastName, Username, Email VOs
    if (formOrError.isError) return formOrError;       // user must fix
    return this.repo.register(formOrError.value);      // repo -> gateway/API client -> backend
  }
}
```

## Diagrams / visual models described
- **"Main ideas of the course" doc**: three roles and goals. Scalability means roles 1-2-3 winning, achieved by the four pillars (strategy, testing, architecture, design).
- **Image of inward-moving folder structure** (good design vs packaging by infrastructure). Also referenced a community folder-structure question (Fernando, on where to put tests).
- **Coupled clumps diagram**: components deeply coupled. Insert a contract so one side implements it and the other relies on it, and a clump becomes testable in isolation. Repeat.
- **Stereotypical architecture** (Khalil's rough notes): requests in → interfacer ... → requests out. The layers and responsibilities are the same in every architecture.
- **iPad frontend architecture drawing** (color-coded: green = infra, another color = coordinator, orange/"should have been yellow" = domain objects):
  - Read side: Gateway/API client → Cache → Observer/Coordinator (subscriptions) → pushes change to Presenter → Presenter builds View Models → [squiggly boundary] → Component uses Presenter (`presenter.load()`) and receives the View Model.
  - Component state (ephemeral, forms) vs app state (cache, global).
  - Write side: Component → uses Controller (use cases/command handlers) → tries to create Domain Object → Repository → Gateway/API client.
  - Highlighted chunk: the pure middle = the high-value unit test zone.
  - Testing levels: system (e2e: backend reachable, API calls translate to correct frontend interactions) → whole app → application logic (high-value unit tests).

## Q&A items
- **Is the new Q&A structure OK?** (L1-L25) Topics are proposed in the office-hours channel and voted on. Khalil prepares slides and code between sessions while finishing course modules. A student (West) asked for code in Q&As, and next time will include structured code.
- **What's happening with the course?** (L25-L50) Khalil is building the metaphysics modules (feedback loop, abstraction, systems thinking, 12 essentials, value creation system) and a new mindset module. He'll add structured deadlines.
- **Vote: frontend architecture vs high-value unit testing** (L50-L60): frontend architecture won.
- **Student questions collected** (L60-L106): what frontend architectures to choose from, how to structure a new project, the best way to do encapsulation, whether it's OK to share models between backend and frontend, state management design and reactive bindings between components and state.
- **What's the goal of (frontend) architecture?** (L106-L120) Scalability, meaning all three roles win, via the four pillars. Bad pillars kill it.
- **Example of bad design?** (L120-L135) Packaging by infrastructure; prefer structure that moves inwards.
- **Where do frontend patterns come from, and why patterns?** (L135-L165) They're conceptual models. Docs and thought leaders get you far, but common advice (e.g., Apollo's) creates coupling. Coupling is the enemy of testing, so decouple with contracts.
- **(Unstated question) Are we talking about React/framework patterns?** (L166-L185) Framework patterns (Redux store, SFC) map to abstract, agnostic patterns (DTO, controller, presenter, observer/global state, gateway, view model, data model). These derive from the six RDD stereotypes and the stereotypical architecture, which is the same on frontend and backend.
- **How does the read side work?** (L185-L230) Gateway → cache → observer → presenter → view model → component. Reactivity via `useEffect`/MobX. See the DDDForum v2 global cache and menu presenter.
- **Do tools like React Query abstract all this?** (L233-L240) Yes. React Query and Apollo Client handle fetching, caching and hooks. Redux does a lot, but you still do a lot. At responsibility-first you see these as doings and knowings, map them to stereotypes, and can vet tools or compose your own.
- **Component state vs app state?** (L252-L262) Component state is ephemeral (forms, `useState`) and separate from global cached app state.
- **How does the write side work?** (L262-L285) Component → controller (use cases, like an application service/command handlers) → validation via domain object → repository/gateway. Registration page code walkthrough.
- **Is it OK to share models between frontend and backend?** (L280-L285) Yes. Value objects and their validation can come from a shared package, which avoids duplicated validation. Frontend-specific domain objects like `RegistrationForm` still exist.
- **Is all this necessary for small/medium companies' frontend apps?** (L294-L310) Often no. Start with e2e tests per the ideal developer workflow. If confident, skip the layering. If internal complexity grows, decouple from infrastructure by controlling the pure middle, where high-value unit tests go. Whether to invest is a strategy decision guided by systems thinking and guess points.
- **Testing levels for the frontend** (L306-L316): system/e2e checks → whole app → application-logic high-value unit tests (e.g., create to-do, create user with validation errors) without testing the view.
- **Unanswered, carried to the next session** (L317-L325): encapsulation and which frontend architectures to choose from. State management design was partially covered. Khalil asked students for suggestions to improve the next Q&A.

## Notable quotes
- "There's two mental models for this whole course it's just the feedback loop and abstraction."
- "You're not going to get whatever it is you're trying to do right the first time around it's going to be a mess but do it again."
- "Scalability is when one two three are winning."
- "Coupling... is the enemy of testing."
- "There's only six patterns you could ever really use in general and we use these six patterns in the exact same places in an architecture."
- "We're doing the exact same things on the front end on the back end."
- "The presenter's whole job is to build the view models."
- "Once you understand this and you understand it very deeply now you understand front end architecture forever."
- "Anytime you intend to perform a state changing command... it must typically pass through a domain object to determine if we should continue with the request or not."
- "This is why I cannot prescribe to you a single approach."

## Cross-references
- Lessons: [07-intro-to-the-metaphysics.md](07-intro-to-the-metaphysics.md), [09-systems-thinking.md](09-systems-thinking.md), [10-value-creation-system.md](10-value-creation-system.md), [11-three-roles-and-goals.md](11-three-roles-and-goals.md), [12-four-pillars.md](12-four-pillars.md), [14-essential-abstraction.md](14-essential-abstraction.md), [15-essential-feedback-loop.md](15-essential-feedback-loop.md), [17-horizontal-decoupling.md](17-horizontal-decoupling.md), [26-ideal-developer-workflow.md](26-ideal-developer-workflow.md), [33-faq-frontend-architecture.md](33-faq-frontend-architecture.md), [35-faq-structure-codebases.md](35-faq-structure-codebases.md), [38-how-to-learn-rdd.md](38-how-to-learn-rdd.md), [75-thinking-backwards.md](75-thinking-backwards.md), [81-qa-walking-skeleton-pipeline-contract-tests.md](81-qa-walking-skeleton-pipeline-contract-tests.md), [85-qa-mastery-foundations-phases-of-craftship.md](85-qa-mastery-foundations-phases-of-craftship.md); Lesson 87 (frontend architecture Q&A); Lesson 92 (Frontend Architecture 2 of 2).
- Concepts: phases of craftship (code-first, best-practice-first, pattern-first, responsibility-first), high-value unit tests, contract testing, package by infrastructure, application service, command handlers, value objects, entities, DTO, pipes and filters, guess points.
- Authors/people: Dan Abramov, Kent C. Dodds, Rebecca Wirfs-Brock (RDD stereotypes article, inferred author), students Osmain, West, Fernando, Eric, Yale.
- Tools: React (`useState`, `useEffect`, `useContext`), Redux, MobX, React Query, Apollo Client, axios, DDDForum v2 repo, iPad drawing tool [try risky], FL Studio (analogy), Figma ("FDD confirmed" joke).

## Fluff skipped
Greetings, screen-share and cursor-visibility fixes, drawing-tool fiddling, timer setting, goodbyes, and trailing garbled "no no no" audio artifacts.

## AI-era relevance hint
- AI tools readily generate "React component does everything" code. The presenter/view-model/controller split gives you a spec for prompting generated code into testable, framework-agnostic layers.
- High-value unit tests on the pure middle are a cheap, fast verification harness for AI-generated frontend logic, with no browser or backend needed.
- Responsibility-first thinking (map doings/knowings to stereotypes) is a durable way to vet the stream of new AI-suggested state libraries.

## Coverage proof
- Lines read: 325 / 325
- Final line (verbatim): "no no no"
