import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 } from 'uuid';
import { Contact } from '../models/contactModel.js';
import { Types } from 'mongoose';
import HttpError from '../helpers/HttpError.js';

const contactsPath = join(process.cwd(), 'db', 'contacts.json');

const listContacts = () => Contact.find();

const getContactById = contactId => Contact.findById(contactId) || null;

// async function getContactById(contactId) {
//   try {
//     const readData = await readFile(contactsPath);
//     const dataArr = await JSON.parse(readData);
//     const contact = dataArr.find(contact => contact.id === contactId);
//     return contact || null;
//   } catch (err) {
//     return err.message;
//   }
// }

async function removeContact(contactId) {
  try {
    const readData = await readFile(contactsPath);
    const dataArr = await JSON.parse(readData);
    const contactIdx = dataArr.findIndex(contact => contact.id === contactId);
    if (contactIdx >= 0) {
      const contact = dataArr[contactIdx];
      dataArr.splice(contactIdx, 1);
      await writeFile(contactsPath, JSON.stringify(dataArr));
      return contact;
    }
    return null;
  } catch (err) {
    return err.message;
  }
}

async function addContact(name, email, phone) {
  try {
    const readData = await readFile(contactsPath);
    const dataArr = await JSON.parse(readData);
    const contact = {
      id: v4(),
      name,
      email,
      phone,
    };
    dataArr.push(contact);
    await writeFile(contactsPath, JSON.stringify(dataArr));
    return contact;
  } catch (err) {
    return err.message;
  }
}

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

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  checkUserId,
};
