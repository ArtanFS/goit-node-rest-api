import { Types } from 'mongoose';
import { Contact } from '../models/contactsModel.js';
import { HttpError } from '../helpers/index.js';

export const listContacts = async (query, currentUser) => {
  // const contacts = await Contact.find()
  //   .populate({ path: 'owner', select: 'email' })
  //   .sort('name')
  //   .skip(3)
  //   .limit(5);

  const filter = query.favorite ? { favorite: query.favorite } : {};

  // if (currentUser.role === userRoles.USER) {
  //   if (query.search) {
  //     for (const findOption of findOptions.$or) {
  //       findOption.owner = currentUser;
  //     }
  //   }

  // if (!query.search) findOptions.owner = currentUser;
  // }

  // INIT DB QUERY ========================
  const contactsQuery = Contact.find(filter).populate({ path: 'owner', select: 'email' });

  const contacts = await contactsQuery;

  const total = contacts.length;

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
