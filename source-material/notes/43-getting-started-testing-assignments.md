# Lesson 43 — How to Get Started with Testing Assignments
- **Source file:** 43) How to Get Started w Testing Assignments.txt
- **Category:** workflow
- **Topics:** git branching, assignments, iterations, feedback, FizzBuzz, TDD setup

## Summary
Create a **new git branch for each attempt** of an assignment. This lets you redo the assignment several times and gives reviewers a single branch URL to look at and comment on. The naming pattern is project name + date + iteration number, e.g., FizzBuzz, March 17, 1. Once on the branch you start TDDing.

## Core ideas
- One branch per assignment attempt. This:
  1. lets you do the assignment **several times** (even several times on the same day)
  2. makes feedback easy, because you share one branch URL
- FizzBuzz is the first and "perhaps the easiest" assignment.

## Named frameworks / mental models
- **Branch naming pattern**: `<project>-<date>-<iteration>`. Use it for every new attempt of a kata/assignment.

## Definitions
None

## Rules & heuristics
- Create a fresh branch before starting each attempt.
- Increment the iteration number for repeats.

## Anti-patterns / mistakes called out
None

## Code discussed
```bash
# reconstructed from narration (separator style inferred)
git checkout -b fizzbuzz-march-17-1
```
- The terminal prompt refreshes to show the current branch after `clear`.

## Diagrams / visual models described
None

## Notable quotes
- "Create a new branch for each version of the assignment that you're going to do."
- "You're going to have a specific branch that you could just share the URL to."
- "So that we can go and start TDDing, feedback looping, and writing the tests."

## Cross-references
- Lesson 41 (reviewing via PRs), Lesson 44 (commit discipline), Lesson 45 (Demo FizzBuzz)

## Fluff skipped
Sign-off.

## AI-era relevance hint
- A branch per attempt fits well with comparing multiple AI-generated or AI-assisted solutions side by side.
- Repeating the same kata on a fresh branch builds fluency that you can't get from delegating it.

## Coverage proof
- Lines read: 12 / 12
- Final line (verbatim): "that we can go and start TDDing, feedback looping, and writing the tests. Okay. See you in the next one."
