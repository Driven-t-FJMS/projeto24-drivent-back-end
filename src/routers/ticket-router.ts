import { Router } from 'express';

import { authenticateToken, validateBody } from '@/middlewares';
import * as ticketController from '@/controllers/ticket-controller';
import ticketSchema from '@/schemas/tickets-schemas';

const ticketRouter = Router();

ticketRouter
    .all('/*', authenticateToken)
    .post('/', validateBody(ticketSchema), ticketController.createTicket)
    .get('/', ticketController.findTicketByEnrollementId)
    .put('/', ticketController.payTicket);

export { ticketRouter };