import { Types } from 'mongoose';
import { Contact } from '../models/contactsModel.js';
import { HttpError } from '../helpers/index.js';

export const listContacts = async (query, currentUser) => {
  const filter = query.favorite ? { favorite: query.favorite } : {};
  const page = query.page ? +query.page : 1;
  const limit = query.limit ? +query.limit : 100;
  const contactsToSkip = (page - 1) * limit;

  filter.owner = currentUser;

  const contactsQuery = Contact.find(filter)
    .populate({ path: 'owner', select: 'email' })
    .sort('name')
    .skip(contactsToSkip)
    .limit(limit);

  const contacts = await contactsQuery;
  const total = await Contact.countDocuments(filter);
  return { contacts, total };
};

export const getContactById = async (contactId, currentUser) => {
  const contact = await Contact.findOne({ _id: contactId, owner: currentUser });

  if (!contact) throw HttpError(404);

  return contact;
};

export const removeContact = async (contactId, currentUser) => {
  const contact = await Contact.findOne({ _id: contactId, owner: currentUser });

  if (!contact) throw HttpError(404);

  return Contact.findByIdAndDelete(contactId);
};

export const addContact = (contactData, owner) => Contact.create({ ...contactData, owner });

export const updateContact = async (contactId, contactData, currentUser) => {
  const contact = await Contact.findOne({ _id: contactId, owner: currentUser });

  if (!contact) throw HttpError(404);

  return Contact.findByIdAndUpdate(contactId, contactData, {
    new: true,
  });
};

export const checkContactId = async (contactId) => {
  const isIdValid = Types.ObjectId.isValid(contactId);

  if (!isIdValid) throw HttpError(404);

  const contactExists = await Contact.exists({ _id: contactId });

  if (!contactExists) throw HttpError(404);
};

export const checkContactExists = async (filter) => {
  const contactExists = await Contact.exists(filter);

  if (contactExists) throw HttpError(409, 'Email or phone in use');
};
