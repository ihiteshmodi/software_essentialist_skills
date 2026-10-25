import type { PurchaseTicketsResult } from './modules/tickets/purchaseTickets';
import type { RegisterUserResult } from './modules/users/registerUser';

// Everything the app can do, independent of HTTP, CLI or tests.
export interface ApplicationAPI {
  users: { register(input: { email: string }): Promise<RegisterUserResult> };
  tickets: { purchase(input: { userId: string; quantity: number }): Promise<PurchaseTicketsResult> };
}
