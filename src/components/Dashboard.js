import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ClassCard from "./ClassCard";
import { UserContext } from "../UserContext";

export default function Dashboard({ handleUnenroll, enrolledClasses, handleEditClass, handleDeleteClass }) {
    const [userClasses, setUserClasses] = useState([]);
    const { user } = useContext(UserContext);

    return (
        <Container className="mt-2 mb-5 pt-5 dashboard-container">
            <h1 className="text-center mb-4">Enrolled Classes</h1>
            <Row className={`${enrolledClasses.length < 3 ? "justify-content-center" : ""} dashboard-row justify-content-start align-items-stretch g-4 mb-5`}>
                {enrolledClasses.map((classItem) => (
                    <Col 
                        key={classItem.id} 
                        xs={12} sm={6} lg={4}
                        className="d-flex justify-content-center align-items-stretch" 
                    >
                        <ClassCard 
                            classId={classItem.id} 
                            handleDeleteClass={handleDeleteClass}
                            handleEditClass={handleEditClass}
                            handleUnenroll={handleUnenroll}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
