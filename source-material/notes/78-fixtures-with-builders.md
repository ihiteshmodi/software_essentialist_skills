# Lesson 78 — Discussion: Encapsulating Initial State (Fixtures) with Builders
- **Source file:** 78) Discussion Encapsulating Initial State (Fixtures) w Builders.txt
- **Category:** testing-practice
- **Topics:** fixtures, initial-state, builder-pattern, test-setup, stateful-guess-point, chess, arrange-act-assert-backwards, programming-by-wishful-thinking, api-design, naming, figma-driven-design

## Summary
Khalil demystifies fixtures: a fixture is simply the initial state. Using a chess example (detecting checkmate — Scholar's/Fool's mate), he acts out a sequence of `game.move(...)` calls, then asserts the end state using programming by wishful thinking to carve out the API. When the setup becomes a long sequence of moves, that setup should be encapsulated as the initial state for the test via a builder (e.g. `GameBuilder.fromCommonGameState(...)`). He emphasizes ideating at the highest level of abstraction — code as a paintbrush — and figuring out implementation later.

## Core ideas
- Fixtures confuse people; **fixture = initial state**.
- Chess scenario: test that the game can **detect a checkmate** at game end. Relevant to the **stateful** guess point (not stateless) because it depends on a sequence of state changes.
- Known quick checkmates: **Scholar's mate**, **Fool's mate** — domain-known names can be used as named states if well known in the domain.
- Act = the sequence of moves: `game.move(player1, piece, position)` repeated.
- Assert with **programming by wishful thinking** (carving the API backwards):
  - `game.getGameState()` → should be `end` (game over).
  - Also detect **checkmate** as the reason; verify deeper: reason type = `checkmate`.
  - Ideally also which pieces were affected, why, and whose — "describe the state of the universe" at game end.
- Password validator assignment forces working backwards like this; see "Arrange-Act-Assert Backwards & Program by Wishful Thinking."
- With a much more complex game (many moves), don't put all that in the test: it's **setup code** that changes state → make it the **initial state** → encapsulate with a **builder**.
- Builder design by wishful thinking ("Figma-driven design" — it doesn't exist yet):
  - `GameBuilder` with `fromCommonGameState(...)`; moves could even be saved in a file; start naming commonly known game states.
  - Naming helper: considered "game test util" — "terrible name"; settled on `GameStates` for now ("naming is a process").
  - Named state: "the most brutal game ever" — something well known to you and your team.
  - `GameStates` class takes in the game, applies the moves, returns the game — "not the best design… but it works."
  - End with `.build()` → returns a `Game`; then do the same asserts.
- "Treating your code as your paintbrush" — think at the highest level of abstraction; "we'll figure out how to make it happen later."

## Named frameworks / mental models
- **Fixture = initial state** — purpose: separate state setup from the behavior under test.
- **Builder for fixtures** — steps: identify long state-changing setup → name the resulting state → encapsulate in builder → `build()` → act/assert. When: stateful tests whose arrange step is long or reused.
- **Programming by wishful thinking / AAA backwards** — write the assertion API you wish existed, then implement.
- **Code as paintbrush / highest level of abstraction** — express intent first, implementation later.

## Definitions
- **Fixture** — the initial state for a test.
- **Builder (in tests)** — an object that encapsulates setting up an initial state so tests stay clean.

## Rules & heuristics
- If arrange/act lines are just getting the system into a state, move them into a builder as the fixture.
- Name well-known states after domain/team vocabulary (Scholar's mate, "most brutal game ever").
- Design test APIs backwards from the assertions.
- Accept imperfect names temporarily; naming is iterative.

## Anti-patterns / mistakes called out
- Cluttering tests with long sequences of state-setup moves.
- Poor helper names like "game test util" (Khalil's own rejected name).

## Code discussed
- Before: moves acted out inline, then assertions.
- After: builder provides initial state.
```ts
// reconstructed from narration (argument types and exact method names partly inferred)
// BEFORE — setup inline
it('can detect a checkmate', () => {
  const game = new Game();
  game.move(Player.One, piece, position);
  game.move(Player.Two, piece, position);
  game.move(Player.One, piece, position);
  // ...more moves

  expect(game.getGameState()).toBe('end');
  expect(game.getReason().type).toBe('checkmate'); // (inferred accessor)
  // + which pieces were affected, why, whose (not specified)
});

// AFTER — initial state (fixture) encapsulated in a builder
it('can detect a checkmate', () => {
  const game = GameBuilder
    .fromCommonGameState(GameStates.mostBrutalGameEver)
    .build();

  expect(game.getGameState()).toBe('end');
  expect(game.getReason().type).toBe('checkmate');
});

// "not the best design, but it works"
class GameStates {
  static mostBrutalGameEver(game: Game): Game {
    // apply the sequence of moves to the game
    return game;
  }
}
```

## Diagrams / visual models described
- Game timeline: game started (left) → sequence of moves → game ended in checkmate (right); moves 1..n mapped to act lines.

## Notable quotes
- "What is a fixture really? … It means the initial state."
- "Initial state is equivalent to fixture."
- "I'm doing Figma-driven design right now."
- "Naming is a process."
- "Treating your code as your paintbrush."
- "Think about what it is you want to have happen. … We'll figure out how to make it happen later."

## Cross-references
- Lesson 51 (AAA Backwards & Program by Wishful Thinking), Lessons 54–57 (Password Validator).
- Lesson 74 (stateful guess point), Lesson 75 (Thinking Backwards).
- Lesson 53 (state verification).

## Fluff skipped
Forgetting "checkmate"/"pool" tangent, Aristotelian metaphysics joke, scholar/fool mate banter.

## AI-era relevance hint
- Named fixtures/builders make agent-written tests readable and let you review intent instead of 50 lines of setup.
- Wishful-thinking API design is a strong way to hand agents an interface to fill in.

## Coverage proof
- Lines read: 49 / 49
- Final line (verbatim): "the initial state. There's a fixture. Is that clear? Okay, cool. So these are some of the things I want you to start practicing."
