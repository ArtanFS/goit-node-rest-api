import { Router } from 'express';
import { contactsController } from '../controllers/index.js';
import { contactsMiddleware } from '../middlewares/index.js';
import { validateBody } from '../helpers/index.js';
import { contactsSchema } from '../schemas/index.js';

export const router = Router();

router
  .route('/')
  .get(contactsController.getAllContacts)
  .post(
    validateBody(contactsSchema.createContactSchema),
    contactsMiddleware.checkCreateContactData,
    contactsController.createContact
  );

router.use('/:id', contactsMiddleware.checkContactId);

router
  .route('/:id')
  .get(contactsController.getOneContact)
  .delete(contactsController.deleteContact)
  .put(
    validateBody(contactsSchema.updateContactSchema),
    contactsMiddleware.checkUpdateContactData,
    contactsController.updateContact
  );

router
  .route('/:id/favorite')
  .patch(validateBody(contactsSchema.updateStatusSchema), contactsController.updateContact);
