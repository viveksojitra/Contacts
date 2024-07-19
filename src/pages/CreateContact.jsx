/* eslint-disable react-refresh/only-export-components */
import { Container } from 'react-bootstrap';
import ContactForm from '../components/ContactForm';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const CreateContact = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/');
    };

    return (
        <Container className="create-contact-page">
            <ContactForm onClose={handleClose} />
        </Container>
    );
};

export default React.memo(CreateContact);
