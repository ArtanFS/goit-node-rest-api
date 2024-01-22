import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.route("/").get(getAllContacts).post(createContact);

contactsRouter
  .route("/:id")
  .get(getOneContact)
  .delete(deleteContact)
  .put(updateContact);

export default contactsRouter;
