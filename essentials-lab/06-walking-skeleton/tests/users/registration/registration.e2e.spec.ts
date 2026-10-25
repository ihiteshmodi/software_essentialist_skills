import { RegistrationApiDriver } from '../../drivers/registrationDriver';
import { registrationAcceptance } from './registration.acceptance';

// Same acceptance spec, run against the deployed (or docker-compose) environment.
const baseUrl = process.env.APP_URL ?? 'http://localhost:3000';

registrationAcceptance(() => new RegistrationApiDriver(baseUrl));
