import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../../src/modules/users/infra/inMemoryUsersRepository';
import { RegisterUser } from '../../../src/modules/users/registration/registerUser';
import { FixedClock, SequentialIds } from '../../doubles/fixedClock';

const CLOSES_AT = new Date('2026-11-01T00:00:00Z');
const BEFORE_CLOSE = new Date('2026-10-05T10:00:00Z');

const setup = (now = BEFORE_CLOSE) => {
  const users = new InMemoryUsersRepository();
  const registerUser = new RegisterUser(users, new FixedClock(now), new SequentialIds(), CLOSES_AT);
  return { users, registerUser };
};

// Level 3: no HTTP, no database, no global time patching. Runs in milliseconds.
describe('RegisterUser', () => {
  it('registers a new attendee and stamps the registration time', async () => {
    const { users, registerUser } = setup();

    const result = await registerUser.execute({ email: 'james@example.com', password: 'S3cure-pass!' });

    expect(result).toEqual({ type: 'Registered', userId: 'user-1' });
    expect((await users.findByEmail('james@example.com'))?.registeredAt).toEqual(BEFORE_CLOSE);
  });

  it('knows an email that is already taken cannot register again', async () => {
    const { registerUser } = setup();
    await registerUser.execute({ email: 'james@example.com', password: 'S3cure-pass!' });

    const result = await registerUser.execute({ email: 'JAMES@example.com', password: 'Other-pass!' });

    expect(result.type).toBe('EmailAlreadyTaken');
  });

  it.each([
    { now: new Date('2026-11-01T00:00:00Z'), label: 'exactly at closing time' },
    { now: new Date('2026-12-24T09:00:00Z'), label: 'weeks after closing' },
  ])('knows registration is closed $label', async ({ now }) => {
    const { registerUser } = setup(now);

    const result = await registerUser.execute({ email: 'late@example.com', password: 'S3cure-pass!' });

    expect(result.type).toBe('RegistrationClosed');
  });

  it.each([
    { input: { email: 'james-at-example', password: 'S3cure-pass!' }, expected: 'InvalidEmail' },
    { input: { email: 'james@example.com', password: 'short' }, expected: 'PasswordTooShort' },
  ])('rejects $input.email / $input.password as $expected', async ({ input, expected }) => {
    const { registerUser } = setup();
    expect((await registerUser.execute(input)).type).toBe(expected);
  });
});
