import { fileURLToPath } from 'node:url';
import { describeFeature, loadFeature } from '@amiceli/vitest-cucumber';
import { expect } from 'vitest';
import type { RegistrationDriver } from '../../drivers/registrationDriver';

const feature = await loadFeature(fileURLToPath(new URL('./registration.feature', import.meta.url)));

// Layers 2–3 · the runner binds the .feature file (layer 1) to steps that read like the scenario.
// Defined once; each environment only supplies a driver. Result verification only.
export function registrationAcceptance(makeDriver: () => RegistrationDriver) {
  describeFeature(feature, ({ Scenario }) => {
    Scenario('James registers and his account is saved', ({ Given, When, Then }) => {
      let driver: RegistrationDriver;
      const james = `james+${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`;

      Given('James has not registered yet', async () => {
        driver = makeDriver();
        expect(await driver.findRegistration(james)).toBeNull();
      });
      When('James registers with his email', async () => {
        expect((await driver.register(james)).type).toBe('Registered');
      });
      Then('James should be able to find his registration', async () => {
        expect((await driver.findRegistration(james))?.email).toBe(james);
      });
    });

    Scenario('Registering twice with the same email is refused', ({ Given, When, Then }) => {
      let driver: RegistrationDriver;
      const james = `james+${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`;
      let result: { type: string };

      Given('James has registered', async () => {
        driver = makeDriver();
        await driver.register(james);
      });
      When('James registers again with the same email', async () => { result = await driver.register(james.toUpperCase()); });
      Then('he should be told the email is already taken', () => { expect(result.type).toBe('EmailAlreadyTaken'); });
    });
  });
}
