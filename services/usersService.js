import Jimp from 'jimp';
import path from 'path';
import fs from 'fs/promises';
import { User } from '../models/usersModel.js';
import { HttpError } from '../helpers/index.js';
import { signToken } from './jwtService.js';
import { sendEmail } from './emailService.js';
import { serverConfig } from '../configs/index.js';

export const register = async (userData) => {
  const newUser = await User.create(userData);

  const { email, verificationToken } = newUser;
  const { baseUrl, port } = serverConfig;

  newUser.password = undefined;

  const verificationEmail = {
    to: email,
    subject: 'Verification message',
    text: `Go ${baseUrl}${port}/api/users/verify/${verificationToken} to verify email`,
    html: `<a href="${baseUrl}${port}/api/users/verify/${verificationToken}" target"_blank">Click to verify email</a>`,
  };

  await sendEmail(verificationEmail);

  return newUser;
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) throw HttpError(401, 'Email or password is wrong');

  if (!user.verify) throw HttpError(401, 'Email not verified');

  const isPasswordValid = await user.checkPassword(password, user.password);

  if (!isPasswordValid) throw HttpError(400, 'Email or password is wrong');

  user.password = undefined;

  const token = signToken(user.id);

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

export const verifyEmail = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  if (!user) throw HttpError(404, 'User not found');

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
};
