import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/),
});
