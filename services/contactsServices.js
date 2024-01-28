import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { Types } from 'mongoose';
import { Contact } from '../models/contactModel.js';
import { HttpError } from '../helpers/HttpError.js';

const contactsPath = join(process.cwd(), 'db', 'contacts.json');

const listContacts = () => Contact.find();

const getContactById = contactId => Contact.findById(contactId);

const removeContact = contactId => Contact.findByIdAndDelete(contactId);

const addContact = contactData => Contact.create(contactData);

async function updateContact(contactId, updContact) {
  try {
    const readData = await readFile(contactsPath);
    const dataArr = await JSON.parse(readData);
    const contactIdx = dataArr.findIndex(contact => contact.id === contactId);
    if (contactIdx >= 0) {
      dataArr[contactIdx].name = updContact.name || dataArr[contactIdx].name;
      dataArr[contactIdx].email = updContact.email || dataArr[contactIdx].email;
      dataArr[contactIdx].phone = updContact.phone || dataArr[contactIdx].phone;
      await writeFile(contactsPath, JSON.stringify(dataArr));
      return dataArr[contactIdx];
    }
    return null;
  } catch (err) {
    return err.message;
  }
}

const checkUserId = async contactId => {
  const isIdValid = Types.ObjectId.isValid(contactId);

  if (!isIdValid) throw new HttpError(404, 'Not found');

  const contactExists = await Contact.exists({ _id: contactId });

  if (!contactExists) throw new HttpError(404, 'Not found');
};

const checkUserExists = async filter => {
  const contactExists = await Contact.exists(filter);

  if (contactExists) throw new HttpError(409, 'User already exists');
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
