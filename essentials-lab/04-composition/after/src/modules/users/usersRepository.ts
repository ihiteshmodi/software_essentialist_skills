export type User = { id: string; email: string };

export interface UsersRepository {
  save(user: User): Promise<void>;
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
}
