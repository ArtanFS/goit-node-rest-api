import { catchAsync } from '../helpers/index.js';
import { usersService } from '../services/index.js';

export const updateUserAvatar = catchAsync(async (req, res) => {
  const { avatarURL } = await usersService.updateUser(req.user, req.file);

  res.status(200).json({ avatarURL });
});
