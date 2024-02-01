import jwt from 'jsonwebtoken';
import { HttpError } from '../helpers/index.js';

export const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

// export const checkToken = (token) => {
//   if (!token) throw new HttpError(401, 'Not logged in..');

//   try {
//     const { id } = jwt.verify(token, serverConfig.jwtSecret);

//     return id;
//   } catch (err) {
//     throw new HttpError(401, 'Not logged in..');
//   }
// };
