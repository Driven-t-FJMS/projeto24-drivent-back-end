import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

export interface Ticket {
    eventId: number;
    enrollementId: number;
    isPresential: boolean;
    hasHotel: boolean;
}

export async function createTicket(ticket: Ticket) {
    return await prisma.ticket.create({
        data: ticket,
    });
}

export async function updateTicket(id: number, ticket: Ticket) {
    return await prisma.ticket.update({
        where: { 
            id,
        },
        data: ticket,
    });
}

export async function findTicketByEnrollementId(enrollementId: number, eventId: number) {
    return await prisma.ticket.findFirst({
        where: {
            enrollementId,
            eventId,
        },
    });
}

export async function payTicket(eventId: number, enrollementId: number) {
    return await prisma.ticket.updateMany({
        where: {
            enrollementId,
            eventId,
        },
        data: {
            isPaid: true,
        },
    });
}