import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  const result = await contactsService.listContacts();
  Array.isArray(result)
    ? res.status(200).json(result)
    : next(HttpError(500, result));
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (typeof result === "object")
    !result ? next(HttpError(404, "Not found")) : res.status(200).json(result);
  else next(HttpError(500, result));
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (typeof result === "object")
    !result ? next(HttpError(404, "Not found")) : res.status(200).json(result);
  else next(HttpError(500, result));
};

export const createContact = async (req, res, next) => {
  const { value, error } = createContactSchema.validate(req.body);
  if (error) {
    next(HttpError(400, error.message));
  }
  const { name, email, phone } = value;
  const result = await contactsService.addContact(name, email, phone);
  typeof result === "object"
    ? res.status(201).json(result)
    : next(HttpError(500, result));
};

export const updateContact = async (req, res, next) => {
  const { value, error } = updateContactSchema.validate(req.body);
  if (error) return next(HttpError(400, error.message));
  if (Object.keys(value).length === 0)
    return next(HttpError(400, "Body must have at least one field"));
  const { id } = req.params;
  const result = await contactsService.updateContact(id, value);
  if (typeof result === "object")
    !result ? next(HttpError(404, "Not found")) : res.status(200).json(result);
  else next(HttpError(500, result));
};
