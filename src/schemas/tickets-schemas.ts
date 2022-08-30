import Joi from 'joi';

const ticketSchema = Joi.object({
    eventId: Joi.number().required(),
    enrollementId: Joi.number().required(),
    isPresential: Joi.boolean().required(),
    haveHotel: Joi.boolean().required(),
    ispaid: Joi.boolean()
});

export default ticketSchema;