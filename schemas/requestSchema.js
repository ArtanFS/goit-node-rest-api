import Joi from 'joi';

export const requestParamsSchema = Joi.object({
  page: Joi.number(),
  limit: Joi.number(),
  favorite: Joi.boolean(),
}).options({ abortEarly: false });
