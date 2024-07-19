/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactDeleteAsync, contactGetAsync, contactSelectAsync } from '../store/actions/contactActions';
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ContactList = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const { contacts } = useSelector((state) => state.contactReducer);

    const handleUpdate = (id) => {
        dispatch(contactSelectAsync(id));
        navigateTo(`/update/${id}`);

    };

    const handleDelete = (id) => {
        dispatch(contactDeleteAsync(id));
    };

    useEffect(() => {
        dispatch(contactGetAsync());
    }, [dispatch]);

    if (!contacts) {
        return <div>Loading...</div>;
    }

    return (
        <div className="contacts-list w-100">
            <h2 className="mb-4">Contacts</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td><img src={contact.profile} alt="profile" className="contact-image" /></td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.contactNumber}</td>
                                <td>{contact.address}</td>
                                <td>{contact.notes}</td>
                                <td>
                                    <Button variant="secondary" className="me-2" onClick={() => handleUpdate(contact.id)}>
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(contact.id)}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(ContactList);
