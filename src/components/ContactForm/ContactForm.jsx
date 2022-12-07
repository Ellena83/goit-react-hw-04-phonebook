import { Component } from 'react';
import css from "./ContactForm.module.css";
import PropTypes from "prop-types";

class ContactForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    }

    state = {
        name: '',
        number: '',
    }
    handleChange = evt => {
        const { name, value } = evt.currentTarget;
        this.setState({ [name]: value });
    }
    reset = () => {
        this.setState({ name: '', number: '' })
    }

    handleSubmit = evt => {
        evt.preventDefault();
        const { onSubmit } = this.props;
        onSubmit(this.state);
        this.reset();
    }

    render() {
        const { name, number } = this.state;
        return (
            <form className={css.form}
                onSubmit={this.handleSubmit}
            >

                <label className={css.label}>
                    <span className={css.title}>Name</span>
                    <input
                        className={css.input}
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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


}

export default ContactForm;