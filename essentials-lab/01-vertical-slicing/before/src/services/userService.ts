import { UserRepository } from '../repositories/userRepository';
import { generateId, validateEmail } from '../utils/helpers';

export class UserService {
  constructor(private repo: UserRepository) {}

  register(email: string, password: string) {
    if (!validateEmail(email)) return { error: 'invalid email' };
    if (this.repo.findByEmail(email)) return { error: 'email taken' };
    const user = { id: generateId(), email, password };
    this.repo.add(user);
    return { user };
  }

  exists(userId: string) {
    return Boolean(this.repo.findById(userId));
  }
}
