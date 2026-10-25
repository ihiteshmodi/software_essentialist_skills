import type { IdGenerator } from '../../shared/ports';
import type { UsersRepository } from './usersRepository';

export type RegisterUserResult = { type: 'Registered'; userId: string } | { type: 'EmailAlreadyTaken' };

export class RegisterUser {
  constructor(private readonly users: UsersRepository, private readonly ids: IdGenerator) {}

  async execute(input: { email: string }): Promise<RegisterUserResult> {
    const email = input.email.trim().toLowerCase();
    if (await this.users.getByEmail(email)) return { type: 'EmailAlreadyTaken' };
    const user = { id: this.ids.next(), email };
    await this.users.save(user);
    return { type: 'Registered', userId: user.id };
  }
}
