export type UserRecord = { id: string; email: string; password: string };

export class UsersStore {
  private users: UserRecord[] = [];

  add(user: UserRecord) { this.users.push(user); }
  findByEmail(email: string) { return this.users.find((u) => u.email === email) ?? null; }
  exists(id: string) { return this.users.some((u) => u.id === id); }
}
