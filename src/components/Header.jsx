/* eslint-disable react-refresh/only-export-components */
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" className="border-bottom header-container sticky-header">
            <div className="container-fluid">
                <Navbar.Brand href="#" className="d-flex align-items-center">
                    <button className="btn btn-link d-lg-none"><FontAwesomeIcon icon={faBars} /></button>
                    Contacts
                </Navbar.Brand>
                <Form className="d-flex ms-auto">
                    <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
                    <Button variant="outline-success"><FontAwesomeIcon icon={faSearch} /></Button>
                </Form>
            </div>
        </Navbar>
    );
};

export default React.memo(Header);
