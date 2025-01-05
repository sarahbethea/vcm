import React, { useState, useEffect, useContext } from "react";
import { Modal, Card, Form, Button } from "react-bootstrap";
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../UserContext";

export default function ClassCard({ classId, handleDeleteClass, handleEditClass, handleUnenroll }) {
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const API_URL = 'https://676376b517ec5852cae8f972.mockapi.io/vcm';
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [updatedClass, setUpdatedClass] = useState({
    name: "",
    description: "",
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getClassDetails = async () => {
      try {
        // Fetch the specific class directly
        const classResponse = await fetch(`${API_URL}/classes/${classId}`);
        if (!classResponse.ok) {
          console.error("Class not found");
          return;
        }

        const myClass = await classResponse.json();
        setClassName(myClass.name || "No name provided");
        setClassDescription(myClass.description || "No description available");

        // Fetch teacher details
        const teacherResponse = await fetch(`${API_URL}/users/${myClass.teacherId}`);
        if (teacherResponse.ok) {
          const teacherData = await teacherResponse.json();
          setTeacherName(`${teacherData.firstName || "Unknown"} ${teacherData.lastName || ""}`);
        } else {
          console.warn("Failed to fetch teacher data");
          setTeacherName("Unknown");
        }
      } catch (e) {
        console.error("Error fetching class details:", e);
      }
    };

    if (classId) {
      getClassDetails();
    }
  }, [classId]);

  const handleDetailsClick = () => {
    navigate(`/classes/${classId}`);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setUpdatedClass({
      name: className || "",
      description: classDescription || "",
    });
    setShow(true);
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUpdatedClass((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleEditClass(classId, updatedClass);
    handleClose(); // Close the modal
    setClassName(updatedClass.name);
    setClassDescription(updatedClass.description);
  };



  return (
    <>
      <Card className="class-card">
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Card.Title className="class-card-title">{className}</Card.Title>
          <Card.Text className="class-card-text">
            {classDescription}
          </Card.Text>
          <Card.Text className="class-card-text">
            {`Instructor: ${teacherName}`}
          </Card.Text>
          <Button className="class-card-btn mb-2 mt-2" variant="primary" onClick={handleDetailsClick}>
            Details
          </Button>

          {user.role === "Teacher" ? 
            <Button className="class-card-btn" variant="secondary" onClick={() => handleDeleteClass(classId)}>
              Delete Class
            </Button>
            : 
            <Button className="class-card-btn" variant="secondary" onClick={() => handleUnenroll(classId)}>
              Remove
            </Button>
          }
          
 
          {user.role === "Teacher" && <Button className="class-card-btn mt-2" variant="secondary" onClick={handleShow}>Edit details</Button>}

          
        </Card.Body>
      </Card>


      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Class Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text"
                name="name"
                value={updatedClass.name}
                onChange={handleInputChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" rows={3}
                name="description"
                value={updatedClass.description}
                onChange={handleInputChange} />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>

      </Modal.Body>
      </Modal>
    </>
  );
}
