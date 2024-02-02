import { usersService } from '../services/index.js';
import { catchAsync } from '../helpers/index.js';

export const register = catchAsync(async (req, res) => {
  const user = await usersService.register(req.body);

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
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
