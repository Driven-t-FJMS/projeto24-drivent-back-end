/* eslint-disable no-console */
import { Request, Response } from 'express';

import * as ticketService from '@/services/ticket-service';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const ticket = await ticketService.createTicket({
    ...req.body,
  });

  return res.status(httpStatus.CREATED).send(ticket);
}

export async function findTicketByEnrollementId(req: Request, res: Response) {
  const { enrollementId, eventId } = req.body;

  const ticket = await ticketService.findTicketByEnrollementId(enrollementId, eventId);
  console.log(ticket);
  return res.status(httpStatus.OK).send(ticket);
}

export async function payTicket(req: Request, res: Response) {
  const { enrollementId, eventId } = req.body;

  const ticket = await ticketService.payTicket(eventId, enrollementId);

  return res.status(httpStatus.OK).send(ticket);
}
