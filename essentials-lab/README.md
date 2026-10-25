# Essentials Lab: the 7 Physical Essentials, Before and After

One small, shared domain (a conference ticket shop: register, "James buys three tickets", order placed, email sent). Seven labs, one per physical essential. Each lab has a `before/` that reproduces the smell the course describes and an `after/` that applies the essential. Both have tests that pass. The `before/` tests document the pain; the `after/` tests show what the essential buys you.

| Lab | Essential | Question it answers | Skill that applies it |
|---|---|---|---|
| [01](./01-vertical-slicing/README.md) | Vertical slicing | Can I see the features from the folder tree alone? | `feature-first-structure` |
| [02](./02-horizontal-decoupling/README.md) | Horizontal decoupling | Where does this line of code belong? | `layering-and-composition` |
| [03](./03-temporal-decoupling/README.md) | Temporal decoupling | What happens after, before, only when? | `event-driven-decoupling` |
| [04](./04-composition/README.md) | Composition | How are the parts wired per environment? | `layering-and-composition` |
| [05](./05-subject-system-verification/README.md) | Subject/system verification | What exactly am I verifying? | `test-strategy`, `test-doubles-and-contracts` |
| [06](./06-walking-skeleton/README.md) | Walking skeleton | Can this even deploy and run? | `walking-skeleton-delivery` |
| [07](./07-deployment-delivery/README.md) | Deployment & delivery | Can negative value reach users? | `walking-skeleton-delivery` |

## Run
```bash
npm install
npm test                 # every lab, before and after (fast)
npm run lab:03           # one lab
npm run typecheck
npm run pipeline:local   # lab 07: commit phase → acceptance phase (Docker) → gated deploy
```
Requires Node ≥ 22.13 (uses the built-in `node:sqlite`, no native modules). Docker is optional (labs 06–07).

## How to study a lab
1. Read the lab README's **Smell** section, then open `before/`. Find the smell yourself.
2. Run the lab (`npm run lab:0N`) and read the `before/` tests. Ask what they needed (HTTP? a database? global patches?) to check one rule.
3. Open `after/`. Read the tests first (they are the spec), then the code.
4. Do the exercises. Each one is a small change that shows whether the structure helps or fights you.

The labs build on each other: 02 adds layers to 01's slices, 04 wires 02's layers, 05 tests at every level, 06–07 ship it.
