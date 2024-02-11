import multer from 'multer';
import path from 'path';
import { v4 } from 'uuid';
import { HttpError } from '../helpers/index.js';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('tmp'));
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split('/')[1];
    cb(null, `${v4()}.${extension}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(HttpError(400, 'Please, upload images only'), false);
};

export const uploadAvatar = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
}).single('avatar');
