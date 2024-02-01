import { User } from '../models/usersModel.js';
import { HttpError } from '../helpers/index.js';
import * as jwtService from './jwtService.js';

export const register = async (userData) => {
  const newUser = await User.create(userData);
  newUser.password = undefined;

  return newUser;
};

// export const login = async ({ email, password }) => {
//   const user = await User.findOne({ email }).select('+password');

//   if (!user) throw HttpError(401, 'Not authorized..');

//   const isPasswordValid = await user.checkPassword(password, user.password);

//   if (!isPasswordValid) throw HttpError(401, 'Not authorized..');

//   user.password = undefined;

//   const token = jwtService.signToken(user.id);

//   return { user, token };
// };
//
//
//
//
// const token = jwtService.signToken(newUser.id);
//
//
//
//

export const checkUserExists = async (filter) => {
  const userExists = await User.exists(filter);
  if (userExists) throw HttpError(409, 'Email in use');
};
