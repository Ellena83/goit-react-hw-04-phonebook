import { useState } from 'react';
import css from "./ContactForm.module.css";
import PropTypes from "prop-types";

function ContactForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const onChangeName = evt => {
        setName(evt.currentTarget.value);
    }
    const onChangeNumber = evt => {
        setNumber(evt.currentTarget.value);
    }

    const reset = () => {
        setName('');
        setNumber('');
    }

    const handleSubmitForm = evt => {
        evt.preventDefault();
        onSubmit({ name, number });
        reset();
    }

    return (
        <form className={css.form}
            onSubmit={handleSubmitForm}>

            <label className={css.label}>
                <span className={css.title}>Name</span>
                <input
                    className={css.input}
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChangeName}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />

            </label>
            <label className={css.label}>
                <span className={css.title}>Number</span>
                <input
                    type="tel"
                    name="number"
                    className={css.input}
                    value={number}
                    onChange={onChangeNumber}
                    pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
                    title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
                    required
                />
            </label>

            <div className="buttonWrapper">
                <button className={css.button}
                    type='submit'>Add contact</button>
            </div>

        </form>
    )
}
ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default ContactForm;
