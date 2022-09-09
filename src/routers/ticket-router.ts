import { Router } from 'express';

import { authenticateToken, validateBody } from '@/middlewares';
import * as ticketController from '@/controllers/ticket-controller';
import { ticketSchema, updateTicketSchema } from '@/schemas/tickets-schemas';

const ticketRouter = Router();

ticketRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(ticketSchema), ticketController.createTicket)
  .patch('/', validateBody(updateTicketSchema), ticketController.findTicketByEnrollementId)
  .put('/', validateBody(updateTicketSchema), ticketController.payTicket);

export { ticketRouter };
