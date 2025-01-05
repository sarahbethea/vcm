import React from "react";
import { Container, Card } from "react-bootstrap";
import "../styles/Card.css"

export default function About() {
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center pt-5">
                <Card className="class-card mt-4">
                    <Card.Body>
                        <Card.Title>About</Card.Title>
                        <Card.Text>
                            This web app is designed to assist students and teachers in keeping track of class assignments. 
                            It was created as a final project for my frontend coding bootcamp with Promineo tech. Future improvements to this app could include:
                            adding a notification section to student dashboards about upcoming assignments for all their enrolled classes, including input fields to upload assignments,
                            functionality for teachers to update student grades and student to access their grades, and better security practices for passwords. 
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>

        </>
    );
}