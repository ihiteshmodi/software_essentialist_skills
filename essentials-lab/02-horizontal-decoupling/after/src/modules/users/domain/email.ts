export class Email {
  private constructor(readonly value: string) {}

  static create(raw: string): Email | 'InvalidEmail' {
    const value = raw.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return 'InvalidEmail';
    return new Email(value);
  }
}
