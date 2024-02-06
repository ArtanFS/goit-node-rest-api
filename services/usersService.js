import { User } from '../models/usersModel.js';
import { HttpError } from '../helpers/index.js';
import * as jwtService from './jwtService.js';

export const register = async (userData) => {
  const newUser = await User.create(userData);

  newUser.password = undefined;

  return newUser;
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) throw HttpError(401, 'Email or password is wrong');

  const isPasswordValid = await user.checkPassword(password, user.password);

  if (!isPasswordValid) throw HttpError(401, 'Email or password is wrong');

  user.password = undefined;

  const token = jwtService.signToken(user.id);

  await User.findByIdAndUpdate(user._id, { token });

  return { user, token };
};

export const logout = (id) => User.findByIdAndUpdate(id, { token: '' });

export const checkUserExists = async (filter) => {
  const userExists = await User.exists(filter);

  if (userExists) throw HttpError(409, 'Email in use');
};

export const getUserById = (userId) => User.findById(userId);
