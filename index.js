const { program } = require('commander');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require('./contacts.js');

program
  .option('-a, --action <type>')
  .option('-i, --id <type>')
  .option('-n, --name <type>')
  .option('-p, --phone <type>')
  .option('-e, --email <type>');

program.parse(process.argv);
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const contactById = await getContactById(id);
      console.log(contactById);
      break;

    case 'add':
      const addedContact = await addContact(name, email, phone);
      console.log(addedContact);
      break;

    case 'remove':
      const removedContact = await removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
