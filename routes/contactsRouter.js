import { Router } from 'express';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
} from '../controllers/contactsControllers.js';
import { checkUserId } from '../middlewares/contactsMiddleware';

const contactsRouter = Router();

contactsRouter.route('/').get(getAllContacts).post(createContact);

contactsRouter.use('/:id', checkUserId);

contactsRouter
  .route('/:id')
  .get(getOneContact)
  .delete(deleteContact)
  .put(updateContact);

export default contactsRouter;
