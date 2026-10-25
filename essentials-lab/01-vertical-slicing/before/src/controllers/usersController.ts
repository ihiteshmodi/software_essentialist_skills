import { UserService } from '../services/userService';

export const usersController = (service: UserService) => ({
  post(body: { email: string; password: string }) {
    const result = service.register(body.email, body.password);
    if (result.error) return { status: 400, body: { error: result.error } };
    return { status: 201, body: { id: result.user!.id } };
  },
});
