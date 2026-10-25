import { randomUUID } from 'node:crypto';
import type { Clock, IdGenerator } from '../clock';

export class SystemClock implements Clock {
  now() { return new Date(); }
}

export class RandomIdGenerator implements IdGenerator {
  next() { return randomUUID(); }
}
