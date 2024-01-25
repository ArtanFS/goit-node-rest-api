import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 } from 'uuid';

const contactsPath = join(process.cwd(), 'db', 'contacts.json');

async function listContacts() {
  try {
    const readData = await readFile(contactsPath);
    return await JSON.parse(readData);
  } catch (err) {
    return err.message;
  }
}

async function getContactById(contactId) {
  try {
    const readData = await readFile(contactsPath);
    const dataArr = await JSON.parse(readData);
    const contact = dataArr.find(contact => contact.id === contactId);
    return contact || null;
  } catch (err) {
    return err.message;
  }
}

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

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
