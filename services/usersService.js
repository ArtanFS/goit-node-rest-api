import Jimp from 'jimp';
import path from 'path';
import fs from 'fs/promises';
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

  if (!isPasswordValid) throw HttpError(400, 'Email or password is wrong');

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

export const updateUser = async (user, file) => {
  if (!file) throw HttpError(400, 'Please, select image file');

  const uploadFilePath = path.join(process.cwd(), file.path);
  const avatarPath = path.join('avatars', user.id, file.filename);
  const fullDownloadFilePath = path.join(process.cwd(), 'public', avatarPath);

  const avatar = await Jimp.read(uploadFilePath);
  await avatar.cover(250, 250).quality(90).writeAsync(fullDownloadFilePath);

  await fs.unlink(uploadFilePath);

  user.avatarURL = avatarPath;

  return user.save();
};
