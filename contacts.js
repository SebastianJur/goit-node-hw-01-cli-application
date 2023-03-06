const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath);
		console.table(JSON.parse(data));
	} catch (err) {
		console.error(err);
	}
}

async function getContactById(contactId) {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = JSON.parse(data);
		const contact = contacts.find((contact) => contact.id === `${contactId}`);

		if (!contact) {
			console.log('Contact with this ID was not found.');
			return;
		}

		console.table(contact);
	} catch (err) {
		console.error(err);
	}
}

async function removeContact(contactId) {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = JSON.parse(data);

		if (!contacts.find((contact) => contact.id === `${contactId}`)) {
			console.log('Contact with this ID was not found.');
			return;
		}

		const newContacts = contacts.filter(
			(contact) => contact.id !== `${contactId}`
		);
		await fs.writeFile(contactsPath, JSON.stringify(newContacts));
		console.log('Contact was deleted!');
	} catch (err) {
		console.error(err);
	}
}

async function addContact(name, email, phone) {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = JSON.parse(data);
		const newContactIndex = Number(contacts[contacts.length - 1].id) + 1;
		const newContact = { id: `${newContactIndex}`, name, email, phone };
		await fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
		console.log('Contact was added');
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
