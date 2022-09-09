import Joi from 'joi';

export const registerActivitySchema = Joi.object({
  enrollementId: Joi.number().required(),
  activityId: Joi.number().required(),
});

export const getUserActivitiesSchema = Joi.object({
  enrollementId: Joi.number().required(),
  eventId: Joi.number().required(),
});
