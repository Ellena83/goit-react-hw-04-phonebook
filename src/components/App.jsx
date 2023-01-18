import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import Notification from "./Notification";
import { Report } from 'notiflix/build/notiflix-report-aio';
import css from "./App.module.css";
import { nanoid } from "nanoid";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };
    contacts.some(contact => contact.name === name) ?
      Report.warning(`${name}`, 'This user is already in the contact list', 'OK')
      : setContacts(prevContacts => [newContact, ...prevContacts]);
  }

  const searchContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter))
  }

  const deleteContact = (id) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id),
    )
  }

  const changeFilter = (evt) => {
    setFilter(evt.currentTarget.value)
  }

  return (
    <div className={css.container}>

      <h1 className={css.title}>Phone
        <span className={css.titleSpan}>book</span>
      </h1>

      <ContactForm
        onSubmit={addContact} />

      <h2 className={css.subtitle}>Contacts</h2>

      <Filter
        value={filter}
        onChange={changeFilter} />

      {contacts.length > 0 ?
        (<ContactList
          contacts={searchContacts()}
          onDeleteContact={deleteContact} />
        )
        : (<Notification text='Contact list is empty.' />)
      }

    </div>
  );
}

