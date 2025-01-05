import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card, Modal } from "react-bootstrap";

export default function LoginForm({ onLogin, loginError }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [staySignedIn, setStaySignedIn] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password, staySignedIn);

    };


    return (
        <Container className="d-flex justify-content-center align-items-center pt-5 vh-100">
            <Row>
                <Col>
                    <Card className="shadow p-4">
                        <Card.Header>
                            Sign In
                        </Card.Header>
                     
                        <Card.Body>
                            {loginError && <p className="text-danger">{loginError}</p>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter email"
                                        onChange={(e) => setEmail(e.target.value)} />
                                    <Form.Text className="text-mited">
                                        We'll never share your email with anyone. 
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Enter password"
                                        onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Stay Signed In"
                                        checked={staySignedIn}
                                        onChange={(e) => setStaySignedIn(e.target.checked)} />
                                </Form.Group>

                                <div className="d-flex justify-content-between">
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                    <Button variant="link" onClick={() => setShow(true)}>Forgot Password?</Button>
                                </div>
                           </Form>
                        </Card.Body>
                    </Card>

                    <Modal show={show} onHide={handleClose} className="pt-5 mt-5">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Forgot password?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter Email</Form.Label>
                                <Form.Control 
                                as="textarea" rows={1}
                                name="description" />
                            </Form.Group>
                        </Form>
                        <p>Note: this feature is for demo purposes only.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>Send reset link</Button>
                    </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
    );
}