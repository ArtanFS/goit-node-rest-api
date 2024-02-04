import { Types } from 'mongoose';
import { Contact } from '../models/contactsModel.js';
import { HttpError } from '../helpers/index.js';

export const listContacts = async (query, currentUser) => {
  const filter = query.favorite ? { favorite: query.favorite } : {};
  const page = query.page ? +query.page : 1;
  const limit = query.limit ? +query.limit : 100;
  const contactsToSkip = (page - 1) * limit;

  // filter.owner = currentUser;

  const contactsQuery = Contact.find(filter)
    .populate({ path: 'owner', select: 'email' })
    .sort('name')
    .skip(contactsToSkip)
    .limit(limit);

  const contacts = await contactsQuery;
  const total = await Contact.countDocuments(filter);

  return { contacts, total };
};

export const getContactById = (contactId) => Contact.findById(contactId);

export const removeContact = (contactId) => Contact.findByIdAndDelete(contactId);

export const addContact = (contactData, owner) => Contact.create({ ...contactData, owner });

export const updateContact = async (contactId, contactData) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, contactData, {
    new: true,
  });

  return updatedContact;
};

export const checkContactId = async (contactId) => {
  const isIdValid = Types.ObjectId.isValid(contactId);

  if (!isIdValid) throw HttpError(404, 'Not found');

  const contactExists = await Contact.exists({ _id: contactId });

  if (!contactExists) throw HttpError(404, 'Not found');
};

export const checkContactExists = async (filter) => {
  const contactExists = await Contact.exists(filter);

  if (contactExists) throw HttpError(409, 'Email or phone in use');
};
