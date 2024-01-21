import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
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

export const createContact = async (req, res, next) => {
  const { value, error } = createContactSchema.validate(req.body);
  if (error) {
    next(HttpError(400, error.message));
  }
  const { name, email, phone } = value;
  const result = await contactsService.addContact(name, email, phone);
  res.status(200).json(result);
};

export const updateContact = async (req, res, next) => {
  const { value, error } = updateContactSchema.validate(req.body);
  if (error) {
    next(HttpError(400, error.message));
  }
  const { id } = req.params;
  const result = await contactsService.updateContact(id, value);
  res.status(200).json(result);
};
