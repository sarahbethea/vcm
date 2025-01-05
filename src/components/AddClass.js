import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";


export default function AddClass({ handleAddClass }) {
    const [selectedClass, setSelectedClass] = useState("");
    const [allClasses, setAllClasses] = useState([]);
    const API_URL = 'https://676376b517ec5852cae8f972.mockapi.io/vcm'


    useEffect(() => {
        const getClassList = async () => {
            try {
                const response = await fetch(`${API_URL}/classes`);
                const classData = await response.json();
                console.log("Fetched classes:", classData);

                const sortedClassData = classData.sort((a, b) => 
                    a.name.trim().localeCompare(b.name.trim())
                );
    
                setAllClasses(classData);
            } catch (e) {
                console.error("Error fetching classes", e);
            }
        };
    
        getClassList(); 
        console.log("All classes fetched:", allClasses.map((c) => c.id));
        console.log(allClasses);
    }, []);


    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedClass(selectedValue);
        console.log("Selected class: ", selectedValue);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedClass) {
            handleAddClass(selectedClass);
        } else {
            console.error("No class selected")
        }
    };



    return (
        <Container className="addClassForm">
            <Card>
                <Card.Header>Add Class</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Select a Class</Form.Label>
                            <Form.Select 
                                aria-label="Select a class"
                                value={selectedClass}
                                onChange={handleSelectChange} >
                                <option value="">Select a Class</option>
                                
                                {allClasses.map((c) => (
                                    <option key={`dropdown-${c.id}`} value={c.id}>{c.name}</option>
                                ))};
                            </Form.Select>
                            <div className="d-flex justify-content-between mt-4">
                                    <Button variant="primary" type="submit">
                                        Add Class
                                    </Button>
                            </div>

                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );

}