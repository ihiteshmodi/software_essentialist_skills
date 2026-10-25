# Lesson 46 — Discussion: FizzBuzz Review #1
- **Source file:** 46) Discussion FizzBuzz Review #1.txt
- **Category:** kata-review
- **Topics:** code-review, fizzbuzz, pull-requests, commit-granularity, requirements-reading, stateless-system, input-output, systems-thinking

## Summary
Khalil reviews an older FizzBuzz submission hosted on GitLab and finds three problems. It was not submitted as a PR, all the code landed in a single commit, and the student misread the assignment by building a generator for 1–100 instead of an input→output function. He ties the misreading back to systems thinking: the stateless guess point is "data in, data out", and a function with no input that only returns values is a generator, not what was asked for.

## Core ideas
- Submit work as **pull requests** so feedback can be left inline and the conversation is tracked.
- Avoid putting lots of code in one commit. Follow red-green-refactor and commit on each phase shift.
- Commit cadence depends on the section:
  - Emergent-design section: commit every time you shift between red, green and refactor.
  - Other sections: commit per example, once you reach green.
- Read the assignment carefully. "Describe a function that **takes** numbers from 1 to 100" means it takes an input. It does not mean it generates numbers.
- The stateless guess point is the simplest system, input at one end and output at the other. The whole course decomposes guess points down to this one.

## Named frameworks / mental models
- **Systems thinking, stateless system** — purpose: frame a unit as input → processing → output. Components: input (one number, 1–100), output (a string). When: first guess point, used to check whether your solution's shape matches the problem.

## Definitions
- **Stateless system (stateless guess point)** — a system where data goes in one end and comes out the other, with no state.
- **Generator (as used here)** — a function with nothing going in that produces its values internally, which is the wrong shape for this assignment.

## Rules & heuristics
- Open a PR for feedback.
- In the emergent section, commit on every red/green/refactor shift. Elsewhere, commit per example on green.
- Map the problem statement onto input → output before coding.

## Anti-patterns / mistakes called out
- Submitting outside a PR (GitLab repo, no inline review possible).
- One large commit containing everything.
- Misreading "takes numbers from 1 to 100" as "generates numbers from 1 to 100". The result was a function that iterates FizzBuzz up to 100 with no input.

## Code discussed
- Student commits/labels seen: "FizzBuzz returns the string", "generate sequence", "FizzBuzz logic", all in one commit.
- Student implementation had a helper that iterated FizzBuzz for keys up to 100 ("iterate FizzBuzz"). Tests asserted on the generated sequence.
- Khalil's feedback: the shape should be `fizzBuzz(n: number) => string`. One number goes in and one string comes out.

```ts
// reconstructed from narration
// Wrong shape (student): nothing in, sequence out
function iterateFizzBuzz(): string[] { /* loops 1..100 */ return []; }

// Expected shape: one number in, one string out
function fizzBuzz(num: number): string { /* ... */ return ""; }
```

## Diagrams / visual models described
- Referenced the systems-thinking picture: a stateless system with input on one end and output on the other.
- Showed the "feedback loop" review area, where Khalil filters by the "stateless" button and searches "Fizz".

## Notable quotes
- "It's an input output system. And that's the idea."
- "Here it appears like we're actually generating all of those values from within the system. And that's not what we want to do."
- "A good example of how important it is to read the descriptions and really have it solidly understood."
- "As you can see, there's nothing going in there. And however, there is something coming out."

## Cross-references
- Lesson 9 (Systems thinking)
- Lesson 44 (When to commit in red-green-refactor)
- Lesson 41 (Providing feedback on assignments)
- Lesson 45 (FizzBuzz demo)

## Fluff skipped
Greeting, navigating the review list, sign-off.

## AI-era relevance hint
- AI agents readily produce plausible code for a misread spec. Checking a solution's input/output shape against the problem statement catches this early.
- Small, PR-based commits keep AI output reviewable inline.

## Coverage proof
- Lines read: 23 / 23
- Final line (verbatim): "going to jump into the next one. All right. See you in there."
