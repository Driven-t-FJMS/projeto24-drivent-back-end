import joi from 'joi';

export const createReservationSchema = joi.object({
	name: joi.string().required(),
	number: joi.number().required(),
	selectedVacancy: joi.number().required()
});

export const modificateReservationSchema = joi.object({
	name: joi.string().required(),
	number: joi.number().required(),
	selectedVacancy: joi.number().required()
});