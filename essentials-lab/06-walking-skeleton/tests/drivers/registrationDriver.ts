// Layer 4 · protocol driver: the only code that knows HTTP. Swap it for a browser page object without touching the spec.
export interface RegistrationDriver {
  register(email: string): Promise<{ type: string }>;
  findRegistration(email: string): Promise<{ email: string } | null>;
}

export class RegistrationApiDriver implements RegistrationDriver {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async register(email: string) {
    const res = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return (await res.json()) as { type: string };
  }

  async findRegistration(email: string) {
    const res = await fetch(`${this.baseUrl}/users?email=${encodeURIComponent(email)}`);
    return res.ok ? ((await res.json()) as { email: string }) : null;
  }
}
