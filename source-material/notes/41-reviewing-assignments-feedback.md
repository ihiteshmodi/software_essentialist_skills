# Lesson 41 — How & Why to Provide Helpful Feedback on Assignments & Exercises
- **Source file:** 41) How & Why to Provide Helpful Feedback on Assignments & Exercises.txt
- **Category:** workflow
- **Topics:** peer review, pull requests, grading checklist, commit-by-commit review, community, assignments

## Summary
Reviewing other students' assignments is mandatory, because it mirrors real-world work: reviewing each other's PRs. It also prepares you for the "bridging the gap" section, where you build projects with others. The process: after submitting your own work, filter assignments by level/theme (e.g., FizzBuzz), sort by date to find the oldest unreviewed one, open its PR, and step through the commits one at a time "like a story" while checking the grading checklist. Leave comments/questions, then note on the community post that you reviewed it.

## Core ideas
- **Why**: it mirrors reviewing PRs at work, prepares for the collaborative "bridging the gap" section, and sharpens your skills and awareness by seeing how others solved the problem.
- Submissions now happen as **PRs**. (The old way was sharing commits in a branch.)
- Grading checklists are designed so **anyone at any skill level** can check whether each item was done.

## Named frameworks / mental models
- **Peer review workflow** (steps):
  1. Submit your own assignment first.
  2. In the community, select the level/theme (e.g., FizzBuzz).
  3. Sort by date posted and find the **oldest** one that hasn't been reviewed.
  4. Open the PR. **Files changed** shows the end result, so take a quick peek.
  5. Open the **first commit** and click **next** through each commit, reading the work like a story.
  6. Keep the **grading checklist** open and verify each item.
  7. Leave comments or questions inline. They show in the PR **conversation** area.
  8. Return to the community post and comment (e.g., "just left some comments / reviewed this"). This signals it has been reviewed.
  9. Optionally, redo your own assignment using what you learned.
- **Commit-by-commit reading**: review the process, not just the final diff.

## Definitions
None

## Rules & heuristics
- Prioritize the oldest unreviewed submissions.
- Review against the checklist rather than personal taste.
- Always mark the post as reviewed so work isn't duplicated.

## Anti-patterns / mistakes called out
None

## Code discussed
- Example PR: **Lucas's tic-tac-toe assignment** (stateful guess point). Used to demonstrate the Files changed view and commit-by-commit navigation. No code specifics are discussed.

## Diagrams / visual models described
None

## Notable quotes
- "It's very similar to what you're going to be doing in the real world, which is working with others and reviewing each other's work within the context of PRs."
- "If I want to move through this, like a story and actually get a sense of the way that Lucas actually moved through this assignment."
- "Everyone, regardless of your skill level, should be able to compare what's been done with what's in the checklist."

## Cross-references
- Lesson 43 (branch per assignment), Lesson 44 (readable commits)
- "Bridging the gap" course section; stateful guess point (tic-tac-toe)

## Fluff skipped
Greeting, search for an old FizzBuzz, sign-off.

## AI-era relevance hint
- Reviewing code against a checklist is a core skill when agents produce most PRs, and it can be taught at any skill level.
- Reading commit-by-commit shows whether the process (TDD steps) was followed, not just whether the result compiles. This is useful for auditing agent runs too.

## Coverage proof
- Lines read: 24 / 24
- Final line (verbatim): "always, to mastery."
