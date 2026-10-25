import type { User } from '../models/user';

export class UserRepository {
  private users: User[] = [];

  add(user: User) { this.users.push(user); }
  findByEmail(email: string) { return this.users.find((u) => u.email === email); }
  findById(id: string) { return this.users.find((u) => u.id === id); }
}
