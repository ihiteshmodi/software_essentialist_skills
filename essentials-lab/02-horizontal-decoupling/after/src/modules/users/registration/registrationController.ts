import { Router } from 'express';
import type { RegisterUserInput, RegisterUserResult } from './registerUser';

const STATUS: Record<RegisterUserResult['type'], number> = {
  Registered: 201,
  RegistrationClosed: 403,
  EmailAlreadyTaken: 409,
  InvalidEmail: 400,
  PasswordTooShort: 400,
};

// Incoming adapter: parse → delegate → map. No rules, no repository.
export const registrationRouter = (registerUser: (input: RegisterUserInput) => Promise<RegisterUserResult>) =>
  Router().post('/users', async (req, res) => {
    const result = await registerUser({ email: String(req.body?.email ?? ''), password: String(req.body?.password ?? '') });
    res.status(STATUS[result.type]).json(result);
  });
