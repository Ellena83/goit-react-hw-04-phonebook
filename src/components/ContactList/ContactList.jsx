import Contact from "./Contact/Contact";
import css from "./ContactList.module.css";
import PropTypes from "prop-types";


const ContactList = ({ contacts, onDeleteContact }) => {

    return (
        <ul className={css.list}>
            {contacts.map(contact => (
                < Contact
                    contact={contact}
                    onDeleteContact={onDeleteContact}
                    key={contact.id} />
            ))}
        </ul>
    )
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
}
export default ContactList;