import { Router } from 'express';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
} from '../controllers/contactsController.js';
import {
  checkContactId,
  checkCreateContactData,
  checkUpdateContactData,
} from '../middlewares/contactsMiddleware.js';
import { validateBody } from '../helpers/index.js';
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from '../schemas/contactsSchema.js';

export const router = Router();

router
  .route('/')
  .get(getAllContacts)
  .post(validateBody(createContactSchema), checkCreateContactData, createContact);

router.use('/:id', checkContactId);

router
  .route('/:id')
  .get(getOneContact)
  .delete(deleteContact)
  .put(validateBody(updateContactSchema), checkUpdateContactData, updateContact);

router.route('/:id/favorite').patch(validateBody(updateStatusSchema), updateContact);
