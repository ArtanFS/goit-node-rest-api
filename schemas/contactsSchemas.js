import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Z\s]+$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .trim()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
}).options({ abortEarly: false });

export const updateContactSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Z\s]+$/),
  email: Joi.string().email(),
  phone: Joi.string()
    .trim()
    .length(10)
    .pattern(/^[0-9]+$/),
}).options({ abortEarly: false });
