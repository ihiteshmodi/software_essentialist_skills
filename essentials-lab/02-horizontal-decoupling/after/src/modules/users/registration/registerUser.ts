import { User } from '../domain/user';
import type { UsersRepository } from '../usersRepository';
import type { Clock, IdGenerator } from '../../../shared/clock';

export type RegisterUserInput = { email: string; password: string };
export type RegisterUserResult =
  | { type: 'Registered'; userId: string }
  | { type: 'RegistrationClosed' }
  | { type: 'EmailAlreadyTaken' }
  | { type: 'InvalidEmail' }
  | { type: 'PasswordTooShort' };

// Application layer: coordinates the domain and the contracts. No Express, no SQL, no new Date().
export class RegisterUser {
  constructor(
    private readonly users: UsersRepository,
    private readonly clock: Clock,
    private readonly ids: IdGenerator,
    private readonly closesAt: Date,
  ) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserResult> {
    const now = this.clock.now();
    if (now >= this.closesAt) return { type: 'RegistrationClosed' };

    const userOrError = User.create({ id: this.ids.next(), email: input.email, password: input.password, registeredAt: now });
    if (typeof userOrError === 'string') return { type: userOrError };

    if (await this.users.findByEmail(userOrError.email)) return { type: 'EmailAlreadyTaken' };

    await this.users.save(userOrError);
    return { type: 'Registered', userId: userOrError.id };
  }
}
