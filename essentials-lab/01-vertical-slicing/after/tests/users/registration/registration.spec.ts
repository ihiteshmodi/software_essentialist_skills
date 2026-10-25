import { fileURLToPath } from 'node:url';
import { describeFeature, loadFeature } from '@amiceli/vitest-cucumber';
import { expect } from 'vitest';
import { registerUser, type RegisterUserResult } from '../../../src/modules/users/registration/registerUser';
import { UsersStore } from '../../../src/modules/users/usersStore';

const feature = await loadFeature(fileURLToPath(new URL('./registration.feature', import.meta.url)));

describeFeature(feature, ({ Scenario }) => {
  Scenario('James registers with a valid email', ({ Given, When, Then }) => {
    const register = registerUser(new UsersStore());
    let result: RegisterUserResult;

    Given('nobody has registered with "james@example.com"', () => {});
    When('James registers with "james@example.com"', () => {
      result = register({ email: 'james@example.com', password: 'S3cure-pass!' });
    });
    Then('James should be registered', () => {
      expect(result.type).toBe('Registered');
    });
  });

  Scenario('Registration fails for an email that is already taken', ({ Given, When, Then }) => {
    const register = registerUser(new UsersStore());
    let result: RegisterUserResult;

    Given('someone has registered with "james@example.com"', () => {
      register({ email: 'james@example.com', password: 'S3cure-pass!' });
    });
    When('James registers with "JAMES@example.com"', () => {
      result = register({ email: 'JAMES@example.com', password: 'Other-pass!' });
    });
    Then('he should be told the email is already taken', () => {
      expect(result.type).toBe('EmailAlreadyTaken');
    });
  });

  Scenario('Registration fails for an invalid email', ({ When, Then }) => {
    const register = registerUser(new UsersStore());
    let result: RegisterUserResult;

    When('James registers with "james-at-example"', () => {
      result = register({ email: 'james-at-example', password: 'S3cure-pass!' });
    });
    Then('he should be told the email is invalid', () => {
      expect(result.type).toBe('InvalidEmail');
    });
  });
});
