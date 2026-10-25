import type { User } from './domain/user';

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
