import { Router } from 'express';
import { authMiddleware } from '../middlewares/index.js';
import { authController } from '../controllers/index.js';
import { validateBody } from '../helpers/index.js';
import { usersSchema } from '../schemas/index.js';

export const router = Router();

router.post(
  '/register',
  validateBody(usersSchema.registerUserSchema),
  authMiddleware.checkRegisterData,
  authController.register
);
router.post('/login');
router.post('/logout');
router.post('/current');
