import Joi from 'joi';

export const ticketSchema = Joi.object({
    eventId: Joi.number().required(),
    enrollementId: Joi.number().required(),
    isPresential: Joi.boolean().required(),
    hasHotel: Joi.boolean().required(),
});

export const updateTicketSchema = Joi.object({
    eventId: Joi.number().required(),
    enrollementId: Joi.number().required(),
});

