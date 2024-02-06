import jwt from 'jsonwebtoken';
import { HttpError } from '../helpers/index.js';

export const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

export const checkToken = (token) => {
  if (!token) throw HttpError(401, 'Not authorized');

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    return id;
  } catch (err) {
    throw HttpError(401, 'Not authorized');
  }
};
