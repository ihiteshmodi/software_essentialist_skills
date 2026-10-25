import type { Clock, IdGenerator } from '../../src/shared/clock';

export class FixedClock implements Clock {
  constructor(private current: Date) {}
  now() { return new Date(this.current); }
  set(date: Date) { this.current = date; }
}

export class SequentialIds implements IdGenerator {
  private count = 0;
  next() { return `user-${++this.count}`; }
}
