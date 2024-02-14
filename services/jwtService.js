import jwt from 'jsonwebtoken';
import { HttpError } from '../helpers/index.js';
import { serverConfig } from '../configs/index.js';

export const signToken = (id) =>
  jwt.sign({ id }, serverConfig.jwtSecret, {
    expiresIn: serverConfig.jwtExpiresIn,
  });

export const checkToken = (token) => {
  if (!token) throw HttpError(401, 'Not authorized');

  try {
    const { id } = jwt.verify(token, serverConfig.jwtSecret);

    return id;
  } catch (err) {
    throw HttpError(401, 'Not authorized');
  }
};
