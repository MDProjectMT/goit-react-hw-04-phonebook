import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';

export default function ContactsBook() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const addedConstats = localStorage.getItem('contacts');
    if (addedConstats) {
      setContacts(JSON.parse(addedConstats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function handleChange(ev) {
    setFilter(ev.currentTarget.value);
  }

  function handleSubmit(name, number) {
    const filtered = contacts.filter(
      item =>
        item.name.toLowerCase() === name.toLowerCase() && item.number === number
    );

    if (filtered.length > 0) {
      window.alert(JSON.stringify(`${name} is already in contacts`));
      return;
    }
    setContacts(prevContacts => [
      ...prevContacts,
      {
        id: nanoid(),
        name: name,
        number: number,
      },
    ]);
  }

  function handleDelete(id) {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  }

  return (
    <div>
      <h2 style={{ marginLeft: '30px' }}>Phonebook</h2>
      <ContactForm onSubmit={handleSubmit} />
      <h2 style={{ margin: '30px 0 0 30px' }}>Contacts</h2>
      <Filter filter={filter} onChange={handleChange} />
      <ContactList
        filter={filter}
        contacts={contacts}
        onDelete={handleDelete}
      />
    </div>
  );
}
