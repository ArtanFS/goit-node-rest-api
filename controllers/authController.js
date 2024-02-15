import { usersService } from '../services/index.js';
import { catchAsync } from '../helpers/index.js';

export const register = catchAsync(async (req, res) => {
  const { email, subscription, avatarURL } = await usersService.register(req.body);

  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
});

export const verifyEmail = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;
  await usersService.verifyEmail(verificationToken);

  res.status(200).json({ message: 'Verification successful' });
});

export const resendVerifyEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  await usersService.resendVerifyEmail(email);

  res.status(200).json({ message: 'Verification email sent' });
});

export const login = catchAsync(async (req, res) => {
  const { user, token } = await usersService.login(req.body);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

export const logout = catchAsync(async (req, res) => {
  const { _id } = req.user;

  await usersService.logout(_id);

  res.sendStatus(204);
});

export const currentUser = (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};
