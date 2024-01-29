import HttpError from '../helpers/HttpError.js';
import catchAsync from '../helpers/catchAsync.js';
import contactsService from '../services/contactsService.js';

export const checkUserId = catchAsync(async (req, res, next) => {
  await contactsService.checkUserId(req.params.id);
  next();
});

export const checkCreateUserData = catchAsync(async (req, res, next) => {
  await contactsService.checkUserExists({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  next();
});

export const checkUpdateUserData = catchAsync(async (req, res, next) => {
  if (!Object.keys(req.body).length) throw HttpError(400, 'Body must have at least one field');

  await contactsService.checkUserExists({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
    _id: { $ne: req.params.id },
  });
  next();
});
