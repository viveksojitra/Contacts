/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactPostAsync, contactSelectAsync, contactUpdateAsync, uploadFile } from '../store/actions/contactActions';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import getImageUrl from '../services/getImgURL';

const UpdateForm = () => {
    const { id } = useParams();
    const { contact } = useSelector(state => state.contactReducer);

    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const [profile, setProfile] = useState(null);

    const [input, setInput] = useState({
        id: '',
        profile: '',
        name: '',
        email: '',
        contactNumber: '',
        address: '',
        notes: '',
    });

    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        setProfile(file);
        setInput({
            ...input,
            profile: file,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let updatedInput = { ...input };

            if (profile && typeof profile !== 'string') {
                const uploadedFile = await dispatch(uploadFile(profile, updatedInput));
                updatedInput = {
                    ...updatedInput,
                    profile: uploadedFile.url,
                };
            }

            if (id) {
                dispatch(contactUpdateAsync(updatedInput));
            } else {
                dispatch(contactPostAsync(updatedInput));
            }

            setIsSubmit(true);
        } catch (error) {
            console.error("Error creating or updating contact:", error);
        }
    };

    // useEffect(() => {
    //     if (contact) {
    //         setInput(contact);
    //     }
    // }, [contact]);

    useEffect(() => {
        if (id) {
            dispatch(contactSelectAsync(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (contact) {
            setInput(contact);
            if (contact.profile) {
                setProfile(contact.profile);
            }
        }
    }, [contact]);

    useEffect(() => {
        if (isSubmit) {
            navigateTo('/');
        }
    }, [isSubmit, navigateTo]);

    if (!contact) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="create-contact">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Form.Control className="input" type="text" name='id' value={input.id} onChange={handleChange} hidden />
                    <h2>Update Contact</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formProfilePicture" className="mb-3">
                            <Form.Label>Profile Picture</Form.Label>
                            {
                                getImageUrl(input.profile) && (
                                    <div className="mt-3">
                                        <img className='profile-Update mb-3 rounded' src={getImageUrl(input.profile)} alt="Profile" />
                                    </div>
                                )
                            }
                            <Form.Control
                                type="file"
                                name="profile"
                                onChange={handleProfileChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={handleChange}
                                placeholder="Enter name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formContactNumber" className="mb-3">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="contactNumber"
                                value={input.contactNumber}
                                onChange={handleChange}
                                placeholder="Enter contact number"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formAddress" className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={input.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formNotes" className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="notes"
                                value={input.notes}
                                onChange={handleChange}
                                placeholder="Enter notes"
                            />
                        </Form.Group>

                        <Button variant="success" type="submit">
                            Update Contact
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default React.memo(UpdateForm);
