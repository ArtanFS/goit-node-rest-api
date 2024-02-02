import { catchAsync } from '../helpers/index.js';
import { contactsService } from '../services/index.js';

export const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await contactsService.listContacts();

  res.status(200).json(contacts);
});

export const getOneContact = catchAsync(async (req, res) => {
  const contact = await contactsService.getContactById(req.params.id);

  res.status(200).json(contact);
});

export const deleteContact = catchAsync(async (req, res) => {
  const deletedContact = await contactsService.removeContact(req.params.id);

  res.status(200).json(deletedContact);
});

export const createContact = catchAsync(async (req, res) => {
  const newContact = await contactsService.addContact(req.body);

  res.status(201).json(newContact);
});

export const updateContact = catchAsync(async (req, res) => {
  const updatedContact = await contactsService.updateContact(req.params.id, req.body);

  res.status(200).json(updatedContact);
});
