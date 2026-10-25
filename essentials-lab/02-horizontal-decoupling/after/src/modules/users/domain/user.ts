import { Email } from './email';
import { Password } from './password';

export type UserProps = { id: string; email: string; password: string; registeredAt: Date };
export type UserError = 'InvalidEmail' | 'PasswordTooShort';

export class User {
  private constructor(private readonly props: { id: string; email: Email; password: Password; registeredAt: Date }) {}

  static create(input: UserProps): User | UserError {
    const email = Email.create(input.email);
    if (email === 'InvalidEmail') return email;
    const password = Password.create(input.password);
    if (password === 'PasswordTooShort') return password;
    return new User({ id: input.id, email, password, registeredAt: input.registeredAt });
  }

  get id() { return this.props.id; }
  get email() { return this.props.email.value; }
  get registeredAt() { return this.props.registeredAt; }

  toSnapshot(): UserProps {
    return { id: this.id, email: this.email, password: this.props.password.value, registeredAt: this.registeredAt };
  }
}
