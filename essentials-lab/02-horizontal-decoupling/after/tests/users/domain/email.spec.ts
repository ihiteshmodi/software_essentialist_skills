import { describe, expect, it } from 'vitest';
import { Email } from '../../../src/modules/users/domain/email';

describe('Email', () => {
  it.each([
    { raw: 'james@example.com', expected: 'james@example.com' },
    { raw: '  JAMES@Example.com ', expected: 'james@example.com' },
  ])('knows "$raw" is valid and normalises it', ({ raw, expected }) => {
    expect((Email.create(raw) as Email).value).toBe(expected);
  });

  it.each(['james-at-example', 'james@', '@example.com', 'james @example.com'])('knows "%s" is invalid', (raw) => {
    expect(Email.create(raw)).toBe('InvalidEmail');
  });
});
