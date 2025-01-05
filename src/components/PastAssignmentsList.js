import Accordion from 'react-bootstrap/Accordion';
import { Card, Container, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

export default function PastAssignmentsList({ pastAssignments }) {

  const sortedAssignments = [...pastAssignments].sort((a,b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA - dateB;
  });

  return (
    <>          
     <Container className="mt-4 mb-5 pt-5 dashboard-container">
        <h5>Past Assignments</h5>
        <Row className="dashboard-row justify-content-center align-items-stretch g-4 mb-5">
                <Accordion defaultActiveKey="0">
                {sortedAssignments.map((assignment) => (
                  <Accordion.Item eventKey={assignment.id} key={assignment.id}>
                    <Accordion.Header>{`${assignment.title}.   Due date: ${assignment.dueDate}`}</Accordion.Header>
                    <Accordion.Body>
                      {assignment.description}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
                </Accordion>
        </Row>
    </Container>
    

    </>
  );
}

