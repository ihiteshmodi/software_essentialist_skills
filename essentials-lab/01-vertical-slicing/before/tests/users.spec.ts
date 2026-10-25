import { describe, expect, it } from 'vitest';
import { UserRepository } from '../src/repositories/userRepository';
import { UserService } from '../src/services/userService';

describe('user service', () => {
  it('works', () => {
    const service = new UserService(new UserRepository());
    const result = service.register('james@example.com', 'secret');
    expect(result.user).toBeDefined();
    expect(service.register('james@example.com', 'secret').error).toBe('email taken');
    expect(service.register('not-an-email', 'secret').error).toBe('invalid email');
  });
});
