import { Router } from 'express';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
} from '../controllers/contactsController.js';
import {
  checkUserId,
  checkCreateUserData,
  checkUpdateUserData,
} from '../middlewares/contactsMiddleware.js';
import validateBody from '../helpers/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchema.js';

const contactsRouter = Router();

contactsRouter
  .route('/')
  .get(getAllContacts)
  .post(validateBody(createContactSchema), checkCreateUserData, createContact);

contactsRouter.use('/:id', checkUserId);

contactsRouter
  .route('/:id')
  .get(getOneContact)
  .delete(deleteContact)
  .put(validateBody(updateContactSchema), checkUpdateUserData, updateContact);

export default contactsRouter;
