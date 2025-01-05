import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ClassCard from "../components/ClassCard";
import { UserContext } from "../UserContext";
import "../styles/Dashboard.css";

export default function Dashboard() {
    const API_URL = 'https://676376b517ec5852cae8f972.mockapi.io/vcm';
    const [classes, setClasses] = useState([]);  
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const { user } = useContext(UserContext);

    const fetchEnrolledClasses = async () => {
        try {
            const response = await fetch(`${API_URL}/classes`);
            if (!response.ok) {
                throw new Error("Failed to fetch classes.");
            }

            const allClasses = await response.json();
            console.log("All classes:", allClasses)

            
            const userClasses = [];
            for (const classItem of allClasses) {
                if (user.enrolledClasses.includes(classItem.id)) {
                    userClasses.push(classItem);
                }
            }

            console.log("Filtered classes for user:", userClasses);
            setClasses(userClasses);
        } catch (e) {
            console.error("Error fetching classes:", e);
            setError("Unable to load classes. Please try again later.");
        } finally {
            setLoading(false); 
        }
    };

    console.log("Dashboard rendering. User:", user);

    useEffect(() => {
        if (user && user.enrolledClasses?.length > 0) {
            console.log("Calling fetchEnrolledClasses");
            fetchEnrolledClasses();
        }
    }, [user]); 

    console.log("Filtered classes for user:", classes);
    console.log("!! User enrolled classes:", user.enrolledClasses)

    
    if (loading) {
        return <div>Loading classes...</div>;
    }

 
    if (error) {
        return <div className="text-danger">{error}</div>;
    }

    
    if (!classes.length) {
        return <div>No enrolled classes found.</div>;
    }

    return (
        <Container className="mt-4 mb-5 pt-5 dashboard-container">
            <h1 className="text-center mb-4">Enrolled Classes</h1>
            <Row className="dashboard-row justify-content-center align-items-stretch g-4 mb-5">
                {classes.map((classItem) => (
                    <Col 
                        key={classItem.id} 
                        xs={12} sm={6} lg={4}
                        className="d-flex justify-content-center align-items-stretch" 
                    >
                        <ClassCard 
                            classId={classItem.id} 
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
