import { Types } from 'mongoose';
import { Contact } from '../models/contactsModel.js';
import HttpError from '../helpers/HttpError.js';

const listContacts = () => Contact.find();

const getContactById = (contactId) => Contact.findById(contactId);

const removeContact = (contactId) => Contact.findByIdAndDelete(contactId);

const addContact = (contactData) => Contact.create(contactData);

const updateContact = async (contactId, contactData) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, contactData, {
    new: true,
  });
  return updatedContact;
};

const checkUserId = async (contactId) => {
  const isIdValid = Types.ObjectId.isValid(contactId);
  if (!isIdValid) throw HttpError(404, 'Not found');

  const contactExists = await Contact.exists({ _id: contactId });
  if (!contactExists) throw HttpError(404, 'Not found');
};

const checkUserExists = async (filter) => {
  const contactExists = await Contact.exists(filter);
  if (contactExists) throw HttpError(409, 'User already exists');
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  checkUserId,
  checkUserExists,
};
