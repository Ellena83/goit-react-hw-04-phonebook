
import PropTypes from "prop-types";

function Notification({ text }) {
    return (
        <div>
            <p >{text}</p>
        </div>
    )
}
Notification.propTypes = {
    text: PropTypes.string.isRequired,
}
export default Notification;