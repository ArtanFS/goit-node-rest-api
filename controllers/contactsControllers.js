import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.status(200).json(result);
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  console.log(result);
  !result
    ? next() // res.status(404).json({ message: "Not found" })
    : //
      res.status(200).json(result);
};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
