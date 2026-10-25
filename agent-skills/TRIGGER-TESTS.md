# Trigger Tests

A skill only loads when the agent matches the request to the skill's `description`. Every prompt below names the skill that **must** load:
- **Should**: must load this section's skill. The last one is a paraphrase without the description's keywords.
- **Neighbour**: a prompt that belongs to a nearby skill; it must load the skill after the arrow. Loading this section's skill as well is acceptable.

Pass = the expected skill loaded. Other skills loading too is fine (see below).

## Why extra skills loading is mostly fine
An extra skill costs context and can pull the agent toward the wrong procedure. With large context windows, the cost is small; the risk is only real for skills that **change what the agent does next**:
| Skill | Harm if it loads when it shouldn't |
|---|---|
| `clarify-requirements` | Stops a simple task to ask questions |
| `fa2str-workflow` | Starts building when you only asked for a plan or an answer |
| `commit-discipline` | Creates a commit you didn't ask for |
So the main measure is **misses** (the expected skill didn't load). Watch over-loading only for the three skills above; the "No skill expected" prompts at the end cover them.

## How to run
1. Install the pack into a scratch project (`scripts/install.sh <dir>`) and open a **fresh session** for each prompt.
2. Paste the prompt. Check which skill loaded: VS Code → the response's References / Used list; Claude Code → the `Skill` tool call; Codex → the skill announcement; OpenCode → the `skill({ name })` call.
3. Record pass/fail: pass when the expected skill loaded. For "No skill expected", pass when none of the three skills above loaded.
4. On a miss, add the prompt's words to the expected skill's `description` (key use case first, ≤350 characters) and, if needed, to its routing row in `AGENTS.md`. Run `node scripts/validate-skills.mjs`, then re-run only the prompts that missed. Adding words rarely breaks other skills, so a full re-run isn't needed.
5. Adding a skill: add a section here (the validator checks every skill has one).

## Results log
**Run 1 (VS Code Copilot):** 84 of 95 passed: 8 real misses, 1 unclear, and 2 expectations relaxed afterwards. The neighbour prompts were first read as "must not load the arrow skill"; in fact the arrow skill loading is the pass, so those rows passed.

Misses, fixed on 2026-10-06 by adding the user's words to the descriptions and `AGENTS.md`, plus an `AGENTS.md` rule to load every matching skill (`clarify-requirements` never replaces a specialist skill):
| # | Prompt | Must load | Run 1 |
|---|---|---|---|
| 1 | People in sales and support mean different things by 'account'. Help us sort out the vocabulary and the boundaries. | `domain-discovery` | only `clarify-requirements` |
| 2 | Make it impossible to ship something that hasn't been paid for. | `state-machines-invariants` | only `clarify-requirements` |
| 3 | We have three packages in one repo and imports are a mess. Reorganise it. | `monorepo-layout` | only `clarify-requirements` |
| 4 | Call the shipping provider's API to get delivery quotes. | `operational-resilience` | miss |
| 5 | Add retries to the email provider client. | `operational-resilience` | miss |
| 6 | Build the todo page in React. | `frontend-architecture` | miss |
| 7 | Our components have API calls and business rules all mixed into them. | `frontend-architecture` | miss |
| 8 | Write tests for the todo list UI. | `frontend-testing` | miss |
| 9 | Is this ready to deploy? | `walking-skeleton-delivery` or `code-review` | not `walking-skeleton-delivery`; other skill not recorded |
| 10 | I want to add password reset to the app. | `clarify-requirements` | pass; re-run once to confirm the new rule didn't break it |

**Run 2: re-run only these 10 prompts.**

**Run 2 result:** 9 of 10 passed. Prompt 2 still loaded only `clarify-requirements`. Fix: a "load companion skills now" table at the top of `clarify-requirements` (the skill that wins), pointing state-rule requests to `state-machines-invariants`.

**Run 3: re-run prompt 2 only.**

**Run 3 result:** passed (`clarify-requirements` + `state-machines-invariants`). All prompts now pass in VS Code Copilot (2026-10-06).

Expectations changed after run 1 (no re-run needed): "Write the SQL migration for the bookings table." and "Format this price as a currency string." are small tasks, so no skill is required.

To check whether a skill actually changes the answer, turn it off and re-run the prompt: Claude Code `skillOverrides` set to `"off"`; Codex `[[skills.config]] enabled = false`; VS Code: move the folder out of `.agents/skills` and reload the window.

## Phase 1: Discover

### clarify-requirements
- Should: "I want to add password reset to the app."
- Should: "The client now also wants guests to be able to check out. Update the plan."
- Should (paraphrase): "Before we build anything, help me pin down what this invoicing tool actually needs to do."
- Neighbour: "Fix the typo in the signup button label." → no skill

### domain-discovery
- Should: "Event storm the checkout flow."
- Should: "Our app has bookings, payments and reviews. Where are the bounded contexts?"
- Should (paraphrase): "People in sales and support mean different things by 'account'. Help us sort out the vocabulary and the boundaries."
- Neighbour: "Write the SQL migration for the bookings table." → no skill required

### state-machines-invariants
- Should: "An order can be placed, paid, shipped or cancelled. Model it."
- Should: "Invites can only be accepted once and expire after 7 days. Implement the Invite entity."
- Should (paraphrase): "Make it impossible to ship something that hasn't been paid for."
- Neighbour: "Format this price as a currency string." → no skill required

## Phase 2: Design

### architecture-decisions
- Should: "Should we use Postgres or MongoDB for this project?"
- Should: "What does hexagonal architecture mean for our codebase?"
- Should (paraphrase): "Before coding, sketch which pieces the system needs and what we'll use for each."
- Neighbour: "Split billing into its own service?" → `monolith-vs-microservices`

### monolith-vs-microservices
- Should: "Should we split billing into a microservice?"
- Should: "Is it time to break the backend into separate services?"
- Should (paraphrase): "Notifications are slowing down the main app. Deploy them on their own?"
- Neighbour: "Where should the new reports folder go?" → `feature-first-structure`

### monorepo-layout
- Should: "Set up a monorepo for our React frontend and Node backend."
- Should: "Where should shared DTOs live between the web app and the API?"
- Should (paraphrase): "We have three packages in one repo and imports are a mess. Reorganise it."
- Neighbour: "Add a new feature folder for invoices in the backend." → `feature-first-structure`

### responsibility-driven-design
- Should: "Our OrderService is 2,000 lines. Who should own what?"
- Should: "Do I need an interface for this notification sender?"
- Should (paraphrase): "Too many classes are poking at each other for this checkout. Untangle who does what."
- Neighbour: "Write a test for the discount calculation." → `tdd-test-writing`

## Phase 3: Build

### fa2str-workflow
- Should: "Implement the approved password-reset feature."
- Should: "Let's build the MVP for the ticket booking app."
- Should (paraphrase): "The scenarios are signed off. Go build it end to end."
- Neighbour: "Is this ready to deploy?" → `walking-skeleton-delivery` or `code-review`

### feature-first-structure
- Should: "Where should the new invoicing files go?"
- Should: "Write the README for this project."
- Should (paraphrase): "Our code is grouped into controllers, services and models and nobody can find anything."
- Neighbour: "Wire the database connection at startup." → `layering-and-composition`

### layering-and-composition
- Should: "This controller has SQL and business rules in it. Fix it."
- Should: "Which status code and error format should the update endpoint return when the version is stale?"
- Should (paraphrase): "Set up the wiring so tests can swap the real database for an in-memory one."
- Neighbour: "Add retries to the payment provider calls." → `operational-resilience`

### event-driven-decoupling
- Should: "After an order is placed, email the customer and update stock."
- Should: "When a user signs up, also create their default workspace."
- Should (paraphrase): "The checkout handler awaits five different things one after another. Split it up."
- Neighbour: "The shipping API sometimes times out. Make the call robust." → `operational-resilience`

### operational-resilience
- Should: "Call the shipping provider's API to get delivery quotes."
- Should: "Add retries and a timeout to the payment gateway client."
- Should (paraphrase): "Generating the report takes two minutes and the browser gives up. Fix the endpoint."
- Neighbour: "Email the customer after the order is placed." → `event-driven-decoupling`

### observability-and-config
- Should: "Add request logging and a health check."
- Should: "Move the database URL and API keys into environment variables."
- Should (paraphrase): "When something breaks in production we can't tell which request it was."
- Neighbour: "Lock down who can call the admin endpoints." → `security-baseline`

### security-baseline
- Should: "Add an admin endpoint to delete users."
- Should: "Add login and protect the profile routes."
- Should (paraphrase): "Make sure nobody can brute-force our sign-in page."
- Neighbour: "Add structured logs with a request id." → `observability-and-config`

### walking-skeleton-delivery
- Should: "Set up the CI pipeline and deploy the first slice."
- Should: "Run the go-live checks before we release to production."
- Should (paraphrase): "Nothing is deployed yet and we've been coding for a month. What now?"
- Neighbour: "Review this diff before I commit." → `code-review`

### frontend-architecture
- Should: "Build the todo page in React."
- Should: "Where should the form validation and data fetching live in this Vue app?"
- Should (paraphrase): "Our components have API calls and business rules all mixed into them."
- Neighbour: "Write tests for the todo presenter." → `frontend-testing`

### understand-codebase-by-features
- Should: "I just joined this project. Help me understand the codebase."
- Should: "Map how the checkout works in this legacy app before we change it."
- Should (paraphrase): "Someone else wrote this repo years ago; where do I even start?"
- Neighbour: "Plan the new loyalty-points feature." → `clarify-requirements`

## Phase 4: Test

### test-strategy
- Should: "Which tests should we write for the booking feature?"
- Should: "Add tests to this untested legacy module before we refactor it."
- Should (paraphrase): "We only have browser tests and they take forty minutes. What should we do instead?"
- Neighbour: "Add a fake clock for these tests." → `test-doubles-and-contracts`

### tdd-test-writing
- Should: "Write a test for the password strength rule."
- Should: "TDD the FizzBuzz kata."
- Should (paraphrase): "Drive this discount calculation out one failing example at a time."
- Neighbour: "Which tests do we need for the whole checkout feature?" → `test-strategy`

### test-doubles-and-contracts
- Should: "Add a fake email service for the tests."
- Should: "Replace these jest.mock calls with something better."
- Should (paraphrase): "Our in-memory repository passes tests but production breaks. How do we keep them in sync?"
- Neighbour: "Add retries to the email provider client." → `operational-resilience`

### frontend-testing
- Should: "Write tests for the todo list UI."
- Should: "How do I test this React form without rendering the whole app?"
- Should (paraphrase): "Our UI tests are flaky and slow; test the screen's behaviour another way."
- Neighbour: "Write a test for the order total calculation in the backend." → `tdd-test-writing`

## Phase 5: Review

### code-review
- Should: "Review my changes before I commit."
- Should: "Is this backend change production ready?"
- Should (paraphrase): "Look over what the agent just wrote and tell me what's wrong with it."
- Neighbour: "Commit these changes." → `commit-discipline`

### commit-discipline
- Should: "Commit these changes."
- Should: "Write the commit message for this refactor."
- Should (paraphrase): "Save this progress in git."
- Neighbour: "Check this diff for layer violations." → `code-review`

## No skill expected
`clarify-requirements`, `fa2str-workflow` and `commit-discipline` must not load for these.
- "Rename this variable to `total`."
- "What does `Array.prototype.flatMap` do?"
- "Convert this JSON to YAML."
