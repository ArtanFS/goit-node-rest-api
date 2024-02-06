import { catchAsync, HttpError } from '../helpers/index.js';
import { contactsService } from '../services/index.js';

export const checkContactId = catchAsync(async (req, res, next) => {
  await contactsService.checkContactId(req.params.id);

  next();
});

export const checkCreateContactData = catchAsync(async (req, res, next) => {
  await contactsService.checkContactExists({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });

  next();
});

export const checkUpdateContactData = catchAsync(async (req, res, next) => {
  if (!Object.keys(req.body).length) throw HttpError(400, 'Body must have at least one field');

  await contactsService.checkContactExists({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
    _id: { $ne: req.params.id },
  });

  next();
});
