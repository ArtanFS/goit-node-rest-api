import { jwtService, usersService } from '../services/index.js';
import { catchAsync, HttpError } from '../helpers/index.js';

export const checkRegisterData = catchAsync(async (req, res, next) => {
  await usersService.checkUserExists({ email: req.body.email });

  next();
});

export const protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
  const userId = jwtService.checkToken(token);

  if (!userId) throw HttpError(401, 'Not authorized');

  const currentUser = await usersService.getUserById(userId);

  if (!currentUser || !currentUser.token || currentUser.token !== token) {
    throw HttpError(401, 'Not authorized');
  }

  req.user = currentUser;

  next();
});
