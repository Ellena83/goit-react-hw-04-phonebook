import css from "./Contact.module.css";
import PropTypes from "prop-types";

const Contact = ({ contact, onDeleteContact }) => {
    return (
        <li className={css.item}>
            <p className={css.name}>{contact.name}</p>
            <a href={`tel:${contact.number}`} className={css.phoneNumber}>{contact.number}</a>
            <button className={css.button}
                type='button'
                onClick={() => onDeleteContact(contact.id)}>Delete</button>
        </li>
    )
}
Contact.propTypes = {
    contact: PropTypes.object.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
}
export default Contact;