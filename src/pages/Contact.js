import React from "react";
import { Container, Card } from "react-bootstrap";
import "../styles/Card.css"

export default function Contact() {
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center pt-5">
                <Card className="class-card mt-4">
                    <Card.Body>
                        <Card.Title>Contact</Card.Title>
                        <Card.Text>
                            Email: sarahcbethea@gmail.com
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>

        </>
    );
}