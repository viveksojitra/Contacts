/* eslint-disable react-refresh/only-export-components */
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Sidebar = () => {
    return (
        <Nav className="flex-column bg-light border-end vh-100 p-3 sidebar-container">
            <LinkContainer to="/create">
                <Nav.Link className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Create contact
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
                <Nav.Link className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faAddressBook} className="me-2" />
                    Contacts
                </Nav.Link>
            </LinkContainer>
        </Nav>
    );
};

export default React.memo(Sidebar);