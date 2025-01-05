import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SignUpForm({
    onSignUp,
    successMessage,
    errorMessage,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
}) {

    const navigate = useNavigate();
    const [ errors, setErrors ] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        const newErrors = {};

        if (!firstName.trim()) newErrors.firstName = "First name is required.";
        if (!lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!email.trim()) newErrors.email = "Email is required.";
        if (!password.trim()) newErrors.password = "Password is required."

        if (Object.entries(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSignUp(firstName, lastName, role, email, password); // Call the parent function to handle sign-up logic
        navigate("/");
    };

    return (
        <Container className="d-flex justify-content-center align-items-center pt-5 vh-100">
            <Row>
                <Col>
                    <Card className="shadow p-4">
                        <Card.Header>Sign Up</Card.Header>
                        <Card.Body>
                            {successMessage && <p className="text-success">{successMessage}</p>}
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        isInvalid = {!!errors.firstName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.firstName}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        isInvalid = {!!errors.lastName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formRole">
                                    <Form.Label>Account Type</Form.Label>
                                    <Form.Select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="Student">Student</option>
                                        <option value="Teacher">Teacher</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid = {!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid = {!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
