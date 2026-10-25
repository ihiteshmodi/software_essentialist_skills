import { User } from '../domain/user';
import type { UsersRepository } from '../usersRepository';
import type { UserProps } from '../domain/user';

// Stores plain snapshots, like the real database does, so it behaves the same.
export class InMemoryUsersRepository implements UsersRepository {
  private rows = new Map<string, UserProps>();

  async findByEmail(email: string) {
    const row = [...this.rows.values()].find((r) => r.email === email);
    return row ? (User.create(row) as User) : null;
  }

  async save(user: User) {
    this.rows.set(user.id, user.toSnapshot());
  }
}
