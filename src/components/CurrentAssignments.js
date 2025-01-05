import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import AssignmentCard from "./AssignmentCard";

export default function CurrentAssignments({ currentAssignments, onAssignmentAction, classId }) {
    const sortedAssignments = [...currentAssignments].sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateA - dateB;
    });

    return (
        <>
            <Container>
                <h5 className="mb-4 text-center">Current Assignments</h5>
                <Row className={`${currentAssignments.length < 3 ? "justify-content-center" : ""} justify-content-start g-4 mb-5`}>
                    {sortedAssignments.map((assignment, index) => (
                        <Col 
                            key={assignment.id} 
                            xs={12} sm={6} lg={4}
                            className="d-flex justify-content-center align-items-stretch" 
                        >
                            <AssignmentCard 
                                assignment={assignment}
                                onAssignmentAction={onAssignmentAction}
                                classId={classId}  />
                        </Col>
                    ))}

                </Row>
            </Container>
        </>
        
        
    );
}

