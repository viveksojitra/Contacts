/* eslint-disable react-refresh/only-export-components */
import { Container } from 'react-bootstrap';
import ContactList from '../components/ContactList';
import React from 'react';

const Home = () => {
    return (
        <Container className="home-page w-100 m-0">
            <ContactList />
        </Container>
    );
};

export default React.memo(Home);
