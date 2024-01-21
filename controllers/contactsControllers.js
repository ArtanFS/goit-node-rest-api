import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.status(200).json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  !result
    ? res.status(404).json({ message: "Not found" })
    : //next()
      res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  !result
    ? res.status(404).json({ message: "Not found" })
    : //next()
      res.status(200).json(result);
};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
