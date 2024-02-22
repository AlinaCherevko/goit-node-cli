import * as contactService from "./contacts.js";

import { program } from "commander";

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data = await contactService.getAllContacts();
      console.table(data);
      break;

    case "get":
      const result = await contactService.getContactById(id);
      console.log(result);
      break;

    case "add":
      const contacts = await contactService.addNewContact({
        name,
        email,
        phone,
      });
      console.log(contacts);
      break;

    case "remove":
      const removedMovie = await contactService.removeContact(id);
      console.log(removedMovie);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
invokeAction(options);
