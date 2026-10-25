# Lesson 19 — Physical Essential: Composition
- **Source file:** 19) Physical Essential Composition.txt
- **Category:** essential-physical
- **Topics:** composition, dependency-injection, composition-root, polymorphism, environments, circular-dependencies, directionality, plugin-architecture, dependency-inversion-containers, testability, frontend-testing

## Summary
Composition is more than "prefer composition over inheritance" — it's an essential: consciously linking together the parts of software by passing in required dependencies (and their dependencies, like Russian dolls). Khalil frames it via two truths: (1) software is made of many parts, and how you wire them determines understandability, testability, and whether cyclical dependencies appear; (2) software must run in different environments (dev, test, CI, staging, production), which requires polymorphism. Doing this consciously lets you encapsulate all wiring and environment checks in one object — the composition root — giving dynamic, plugin-like behavior (VS Code extensions, game weapons, DAW audio nodes). It's used heavily at the application guess point for swapping dependencies in tests, and in deployment pipelines.

## Core ideas
- Composition is an essential practice, not just a passing design principle ("prefer composition over inheritance").
- **Truth 1 — software is made of many parts.** Code-first devs wire parts unconsciously: copy from docs/Stack Overflow/ChatGPT, paste, plug together until it works; they think of design only as folder structure.
- How dependencies are linked is "incredibly important."
- Directionality (from vertical slicing/horizontal layers): infrastructure → application → domain → database → back up. **Outer-layer concerns rely on inner-layer ones.**
- To create an operation/command such as `createUser` (callable, does work, writes to DB), you must link together lower-level parts — pass in the required dependencies, and their required dependencies, and so on.
- Doing this unconsciously → circular/cyclical dependencies; hard to understand, maintain, and most critically test.
- Without consistent structure/directionality, horizontal decoupling isn't easy.
- Many front-end developers just link things together without awareness of the abstractions/patterns at play and where they belong → the only way to test is full E2E.
- Goal: e.g. test an entire front-end feature without starting React or installing/setting up Redux — valuable for complex front ends with lots of logic.
- **Truth 2 — software runs in different environments**: dev (local, dev DB/services), test, CI, staging, production. Some things toggle per environment (e.g. Redux dev tools on in development, off in production).
- Handling this unconsciously makes running in different environments complex and confusing. The concept that handles it is **polymorphism** — code taking on different shapes.
- Code to avoid: environment checks littered throughout the code base ("We've all done it").
- Step 1: get clear on how everything is linked; trace dependencies all the way up to the web server. Composition "forces you to really have a tight awareness of how you're linking up your code base."
- Step 2: encapsulate the wiring into one object — the **composition root** — co-locating environment checks there; this yields dynamic behavior.
- Dynamic/composable behavior → plugin architectures: VS Code extensions; video games (new weapons a character must use); digital audio workstation (audio nodes/components linking together).

## Named frameworks / mental models
- **Composition (physical essential)**
  - Purpose: consciously wire dependencies to enable testability, environment switching, and dynamic behavior.
  - Components: passing dependencies in (recursively), respecting directionality, polymorphism, composition root, optionally DI containers.
  - When to use: always when running in multiple environments ("1000% will have to use it"); swapping dependencies for tests (application guess point; also system and incoming adapter guess points); deployment pipelines; plugin-style problems.
- **Two truths of software**: (1) made of many parts; (2) runs in different environments.
- **Russian doll / onion model**: dependencies nested inside dependencies — "this complex network of pieces and parts."
- **Composition root**: single place where all linking and environment decisions happen.

## Definitions
- **Composition** — consciously (not unconsciously) linking together lower-level parts; passing in required dependencies and those dependencies' dependencies.
- **Polymorphism** — "the ability for your code to take on different shapes."
- **Composition root** — the object that encapsulates the work of linking everything together (transcript: "[composition route]").
- **Circular/cyclical dependencies** — result of unconscious linking (not defined further).

## Rules & heuristics
- Wire dependencies consciously; pass them in rather than grabbing them inline.
- Outer layers depend on inner layers, never the reverse.
- Trace your dependency graph up to the web server to understand it.
- Co-locate environment checks in the composition root instead of scattering `if (env === ...)` checks.
- Design so features can be tested without the full framework (React/Redux) when needed.
- Make code composable up front so it can run through a deployment pipeline in multiple environments.

## Anti-patterns / mistakes called out
- Copy-paste-plug-until-it-works wiring (docs, Stack Overflow, ChatGPT).
- Treating design as only folder structure.
- Cyclical dependencies from unconscious linking.
- Front-end code only testable via E2E because abstractions aren't known/placed.
- Environment checks littered throughout the code base.

## Code discussed
On-screen example (not read aloud) of environment checks scattered around the code base, then a traced dependency graph up to the web server, then a composition root. Only `createUser`, the environments, the web server, and the composition root are named in narration; class names below are inferred placeholders:
```ts
// reconstructed from narration
// Before: env checks littered everywhere
class UserService {
  async createUser(dto) {
    const db = process.env.NODE_ENV === 'production' ? prodDb : devDb;
    // ...
  }
}

// After: dependencies passed in; env decided once in the composition root
class CreateUser {
  constructor(private userRepo: UserRepo) {}
  execute(dto) { /* ... */ }
}

class CompositionRoot {
  static build(env: 'dev' | 'test' | 'ci' | 'staging' | 'production') {
    const db = env === 'production' ? new ProdDatabase() : new DevDatabase();
    const userRepo = new UserRepo(db);
    const createUser = new CreateUser(userRepo);
    const controller = new UserController(createUser);
    return new WebServer(controller);
  }
}
```

## Diagrams / visual models described
- Operation directionality: infrastructure → application → domain → database → response back up.
- Dependency trace diagram linking all abstractions up to the web server.
- Russian doll / nested dependency tree.

## Notable quotes
- "Composition is more than just a passing design principle. It is one of our essentials."
- "The way in which we link together our dependencies is incredibly important."
- "Outer layer concerns rely on the inner layer ones."
- "It forces you to really have a tight awareness of how you're linking up your code base."
- "We 1000% will have to use it when we are running our code in different environments."
- "It's about creating dynamic behavior and that we need to link things together almost like a Russian doll."

## Cross-references
- Lesson 16 (Vertical Slicing), Lesson 17 (Horizontal Decoupling — directionality, dependency inversion).
- Lesson 20 (Subject/System Verification — Russian dolls, indirect inputs/outputs).
- Lesson 25 (Deployment & Delivery — pipelines, inferred).
- "Prefer composition over inheritance" principle; dependency inversion containers; Redux dev tools; VS Code plugin architecture.
- Phases: Best Practice First (main place — refactoring Code First work using composition), guess points (application, system, incoming adapter).

## Fluff skipped
Greeting, reassurance ("don't worry, we've all done it"), sign-off ("[Tood Mastery]" = "to mastery").

## AI-era relevance hint
- AI-generated code is the modern "paste from Stack Overflow" — it often instantiates dependencies inline and sprinkles env checks; enforcing constructor injection + a single composition root keeps the graph auditable.
- Swappable dependencies let you run fast, deterministic tests on agent-written logic with fakes, instead of relying on slow E2E runs.

## Coverage proof
- Lines read: 56 / 56
- Final line (verbatim): "with that being said, I'll leave the video right here. See you in the next one. And as always, Tood Mastery."
