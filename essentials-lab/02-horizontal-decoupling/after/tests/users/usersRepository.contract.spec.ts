import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it } from 'vitest';
import { User } from '../../src/modules/users/domain/user';
import { InMemoryUsersRepository } from '../../src/modules/users/infra/inMemoryUsersRepository';
import { SqliteUsersRepository } from '../../src/modules/users/infra/sqliteUsersRepository';
import type { UsersRepository } from '../../src/modules/users/usersRepository';

const implementations: Array<[string, () => UsersRepository]> = [
  ['in-memory', () => new InMemoryUsersRepository()],
  ['sqlite', () => new SqliteUsersRepository(new DatabaseSync(':memory:'))],
];

const aUser = (email: string) =>
  User.create({ id: `id-${email}`, email, password: 'S3cure-pass!', registeredAt: new Date('2026-10-05T10:00:00Z') }) as User;

// Level 4: one spec, every implementation. If the fake drifts from the real store, this fails.
describe.each(implementations)('UsersRepository contract (%s)', (_name, makeRepo) => {
  it('can save a user and find it by email', async () => {
    const repo = makeRepo();
    await repo.save(aUser('james@example.com'));

    const found = await repo.findByEmail('james@example.com');

    expect(found?.id).toBe('id-james@example.com');
    expect(found?.registeredAt).toEqual(new Date('2026-10-05T10:00:00Z'));
  });

  it('knows an unknown email finds nothing', async () => {
    expect(await makeRepo().findByEmail('nobody@example.com')).toBeNull();
  });
});
