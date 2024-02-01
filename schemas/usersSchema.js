import Joi from 'joi';
import { PASSWD_REGEX } from '../constans/index.js';

export const registerUserSchema = Joi.object({
  password: Joi.string().regex(PASSWD_REGEX).required(),
  email: Joi.string().email().required(),
}).options({ abortEarly: false });

// const loginValidator = joiValidator((data) =>
//   Joi.object()
//     .options({ abortEarly: false })
//     .keys({
//       email: Joi.string().email().required(),
//       password: Joi.string().regex(PASSWD_REGEX).required(),
//     })
//     .validate(data)
// );
