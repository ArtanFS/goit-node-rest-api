import HttpError from '../helpers/HttpError.js';
import { catchAsync } from '../helpers/catchAsync.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';
import contactsService from '../services/contactsServices.js';
import { Contact } from '../models/contactModel.js';

export const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
});

export const getOneContact = catchAsync(async (req, res) => {
  const contact = await contactsService.getContactById(req.params.id);
  res.status(200).json(contact);
});

// export const getOneContact = async (req, res, next) => {
//   const contact = await Contact.findById(req.params.id);

//   // const { id } = req.params;
//   // const result = await contactsService.getContactById(id);

//   if (typeof result !== 'object') next(HttpError(500, 'Server error'));
//   // !result ? next(HttpError(404, 'Not found')) : res.status(200).json(result);
//   res.status(200).json(contact);
//   // else next(HttpError(500, result));
// };

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);

  if (typeof result === 'object')
    // !result ? throw new HttpError(404, 'Not found') : res.status(200).json(result);
    // else throw new HttpError(500, result);
    console.log(result);
};

export const createContact = async (req, res, next) => {
  const { value, error } = createContactSchema.validate(req.body);

  // if (error) return next(HttpError(400, error.message));

  const { name, email, phone } = value;
  const result = await contactsService.addContact(name, email, phone);

  typeof result === 'object'
    ? res.status(201).json(result)
    : // : next(HttpError(500, result));
      5;
};

export const updateContact = async (req, res, next) => {
  const { value, error } = updateContactSchema.validate(req.body);

  // if (error) return next(HttpError(400, error.message));

  if (Object.keys(value).length === 0) 5;
  // return next(HttpError(400, 'Body must have at least one field'));

  const { id } = req.params;
  const result = await contactsService.updateContact(id, value);

  if (typeof result === 'object') 5;
  // !result ? next(HttpError(404, 'Not found')) : res.status(200).json(result);
  // else next(HttpError(500, result));
};
