import { Router } from 'express';
import { authMiddleware, userMiddleware } from '../middlewares/index.js';
import { authController, userController } from '../controllers/index.js';
import { validateBody } from '../helpers/index.js';
import { usersSchema } from '../schemas/index.js';

export const router = Router();

router.post(
  '/register',
  validateBody(usersSchema.registerUserSchema),
  authMiddleware.checkRegisterData,
  authController.register
);
router.post('/login', validateBody(usersSchema.registerUserSchema), authController.login);
router.use(authMiddleware.protect);
router.post('/logout', authController.logout);
router.get('/current', authController.currentUser);
router.patch('/avatars', userMiddleware.uploadAvatar, userController.updateUserAvatar);
