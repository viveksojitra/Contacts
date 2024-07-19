import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ContactItem.css';

const ContactItem = ({ contact, onDelete, onUpdate }) => {
    return (
        <tr>
            <td><img src={contact.profile} alt="profile" className="contact-image" /></td>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>{contact.contactNumber}</td>
            <td>{contact.address}</td>
            <td>{contact.notes}</td>
            <td>
                <Button variant="secondary" className="me-2" onClick={() => onUpdate(contact.id)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                </Button>
                <Button variant="danger" onClick={() => onDelete(contact.id)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>
            </td>
        </tr>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
        contactNumber: PropTypes.string,
        address: PropTypes.string,
        notes: PropTypes.string,
        profile: PropTypes.any,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default ContactItem;
