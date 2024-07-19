import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { contactPostAsync, uploadFile } from '../store/actions/contactActions';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const CreateContact = () => {
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

            if (profile) {
                const uploadedFile = await dispatch(uploadFile(profile, input));
                updatedInput = {
                    ...input,
                    profile: uploadedFile.url,
                };
            }

            dispatch(contactPostAsync(updatedInput));
        } catch (error) {
            console.error("Error creating contact:", error);
        }
        setIsSubmit(true);
    };


    useEffect(() => {
        if (isSubmit) {
            navigateTo('/');
        }
    }, [isSubmit, navigateTo]);

    return (
        <Container className="create-contact">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Form.Control className="input" type="text" name='id' value={input.id} onChange={handleChange} hidden />
                    <h2>Create New Contact</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formProfilePicture" className="mb-3">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control
                                type="file"
                                name="profile"
                                onChange={handleProfileChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                className='text-capitalize'
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
                                type="number"
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

                        <Button variant="primary" type="submit">
                            Save Contact
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateContact;
