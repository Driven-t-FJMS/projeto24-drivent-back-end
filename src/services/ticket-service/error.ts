import { ApplicationError } from '@/protocols';

export function duplicatedTicketError(): ApplicationError {
  return {
    name: 'DuplicatedTicketError',
    message: 'User already has a ticket for this event',
  };
}
