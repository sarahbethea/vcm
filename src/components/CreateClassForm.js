import React, { useState } from "react";
import { Button, Form, Container, Card, Row, Col } from "react-bootstrap";

export default function CreateClassForm({ teacherId, handleCreateClass }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        teacherId: teacherId,
        students: []
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        

    }
  
    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateClass(formData);
        setFormData({name: "", description: "", teacherId, students: []}) 
    }



    return (
        <Container className="addClassForm mb-5 pt-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={8}>
                    <Card>
                        <Card.Header>Create New Class</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Class Name</Form.Label>
                                    <Form.Control 
                                        type="name" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Class Name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control 
                                        as="textarea" rows={3}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Class Name" />
                                </Form.Group>
                                <Button type="submit">Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}