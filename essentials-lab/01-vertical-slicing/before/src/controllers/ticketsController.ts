import { TicketService } from '../services/ticketService';

export const ticketsController = (service: TicketService) => ({
  post(body: { userId: string; quantity: number }) {
    const result = service.purchase(body.userId, body.quantity);
    if (result.error) return { status: 400, body: { error: result.error } };
    return { status: 201, body: { id: result.order!.id } };
  },
  get(userId: string) {
    return { status: 200, body: service.list(userId) };
  },
});
