import * as ticketRepository from '@/repositories/ticket-repository';

import { notFoundError, conflictError } from '@/errors';

export async function createTicket(ticket: ticketRepository.Ticket) {
  const existingTicket = await ticketRepository.findTicketByEnrollementId(ticket.enrollementId, ticket.eventId);

  if (existingTicket) {
    return await ticketRepository.updateTicket(existingTicket.id, ticket);
  }

  return await ticketRepository.createTicket(ticket);
}

export async function findTicketByEnrollementId(enrollementId: number, eventId: number) {
  const ticket = await ticketRepository.findTicketByEnrollementId(enrollementId, eventId);

  if (!ticket) throw notFoundError();

  return ticket;
}

export async function payTicket(eventId: number, enrollementId: number) {
  const ticket = await ticketRepository.findTicketByEnrollementId(enrollementId, eventId);

  if (!ticket) throw notFoundError();

  if (ticket.isPaid) throw conflictError('Ticket is already paid');

  return await ticketRepository.payTicket(eventId, enrollementId);
}
