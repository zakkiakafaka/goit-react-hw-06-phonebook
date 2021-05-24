import { createReducer } from "@reduxjs/toolkit";
import { addContact, deleteContact, getAllContacts, filterContacts } from "./contactsAction";

export const contactsReducer = createReducer([], {
  [addContact]: (state, { payload }) => [...state, payload],
  [deleteContact]: (state, { payload }) => [...state.filter(contact => contact.id !== payload)],
  [getAllContacts]: (_, { payload }) => payload
});

export const filterReducer = createReducer("", {
  [filterContacts]: (_, { payload }) => payload
});
