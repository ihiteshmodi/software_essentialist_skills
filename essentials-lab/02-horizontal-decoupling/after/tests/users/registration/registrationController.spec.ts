import express from 'express';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { registrationRouter } from '../../../src/modules/users/registration/registrationController';

const serverWith = (registerUser: Parameters<typeof registrationRouter>[0]) =>
  express().use(express.json()).use(registrationRouter(registerUser));

// Level 6: the controller extracts input, calls the use case, maps the result. Nothing else runs.
describe('POST /users', () => {
  it('passes the request body to the use case', async () => {
    const registerUser = vi.fn().mockResolvedValue({ type: 'Registered', userId: 'user-1' });

    await request(serverWith(registerUser)).post('/users').send({ email: 'james@example.com', password: 'S3cure-pass!' });

    expect(registerUser).toHaveBeenCalledWith({ email: 'james@example.com', password: 'S3cure-pass!' });
  });

  it.each([
    { type: 'Registered', status: 201 },
    { type: 'EmailAlreadyTaken', status: 409 },
    { type: 'RegistrationClosed', status: 403 },
    { type: 'InvalidEmail', status: 400 },
  ])('maps $type to HTTP $status', async ({ type, status }) => {
    const res = await request(serverWith(vi.fn().mockResolvedValue({ type }))).post('/users').send({});
    expect(res.status).toBe(status);
  });
});
