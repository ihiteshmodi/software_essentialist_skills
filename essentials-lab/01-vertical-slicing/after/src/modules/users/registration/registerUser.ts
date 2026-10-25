import { newId } from '../../../shared/ids';
import { Email } from '../domain/email';
import type { UsersStore } from '../usersStore';

export type RegisterUserResult =
  | { type: 'Registered'; userId: string }
  | { type: 'InvalidEmail' }
  | { type: 'EmailAlreadyTaken' };

export const registerUser =
  (users: UsersStore) =>
  (input: { email: string; password: string }): RegisterUserResult => {
    const email = Email.create(input.email);
    if (email === 'InvalidEmail') return { type: 'InvalidEmail' };
    if (users.findByEmail(email.value)) return { type: 'EmailAlreadyTaken' };

    const userId = newId();
    users.add({ id: userId, email: email.value, password: input.password });
    return { type: 'Registered', userId };
  };
