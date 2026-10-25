export const MIN_PASSWORD_LENGTH = 8;

export class Password {
  private constructor(readonly value: string) {}

  static create(raw: string): Password | 'PasswordTooShort' {
    if (raw.length < MIN_PASSWORD_LENGTH) return 'PasswordTooShort';
    return new Password(raw);
  }
}
