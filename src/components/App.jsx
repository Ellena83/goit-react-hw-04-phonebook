import { Component } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import Notification from "./Notification";
import { Report } from 'notiflix/build/notiflix-report-aio';
import css from "./App.module.css";
import { nanoid } from "nanoid";

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }

  }
  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const newContact = { id: nanoid(), name, number };
    contacts.some(contact => contact.name === name) ?
      Report.warning(`${name}`, 'This user is already in the contact list', 'OK')
      : this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
  }
  searchContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter))
  }

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }))
  }
  changeFilter = (evt) => {
    this.setState({ filter: evt.currentTarget.value });
  }
  render() {
    const { filter } = this.state;
    const addContact = this.addContact;
    const searchContact = this.searchContacts();
    const deleteContact = this.deleteContact;
    const changeFilter = this.changeFilter;
    const lenght = this.state.contacts.length;

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phone
          <span className={css.titleSpan}>book</span>
        </h1>
        <ContactForm
          onSubmit={addContact}
        />

        <h2 className={css.subtitle}>Contacts</h2>
        <Filter
          value={filter}
          onChange={changeFilter} />

        {lenght > 0 ?
          (<ContactList
            contacts={searchContact}
            onDeleteContact={deleteContact} />)
          : (<Notification text='Contact list is empty.' />
          )}
      </div>
    );
  }

}
