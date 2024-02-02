import { jwtService, usersService } from '../services/index.js';
import { catchAsync, HttpError, validateBody } from '../helpers/index.js';
import { usersSchema } from '../schemas/index.js';

export const checkRegisterData = catchAsync(async (req, res, next) => {
  await usersService.checkUserExists({ email: req.body.email });

  next();
});

// export const protect = catchAsync(async (req, res, next) => {
//   const token =
//     req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
//   const userId = jwtService.checkToken(token);

//   if (!userId) throw new HttpError(401, 'Not logged in..');

//   const currentUser = await userService.getUserById(userId);

//   if (!currentUser) throw new HttpError(401, 'Not logged in..');

//   req.user = currentUser;

//   next();
// });

// // roles guard
// // must be used only after 'protect' middleware
// // allowFor('user', 'admin')
// export const allowFor =
//   (...roles) =>
//   (req, res, next) => {
//     // roles === ['user', 'admin']
//     if (roles.includes(req.user.role)) return next();

//     next(new HttpError(403, 'You are not allowed to perform this action..'));
//   };
