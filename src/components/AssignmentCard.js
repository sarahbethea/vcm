import React, { useState, useContext, useEffect } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import { UserContext } from "../UserContext";


export default function AssignmentCard({ assignment, onAssignmentAction, classId }) {
    const [show, setShow] = useState(false);
    const [updatedAssignment, setUpdatedAssignment] = useState({
      title: "",
      dueDate: "",
      description: "",
      classId: classId,
    });
    const [isCompleted, setIsCompleted] = useState(false);



    const handleClose = () => setShow(false);
    const handleShow = () => {
      setUpdatedAssignment({
        title: assignment.title || "",
        dueDate: assignment.dueDate || "",
        description: assignment.description || "",
        classId: classId,
      });
      setShow(true);
    };
      
    const { user } = useContext(UserContext); 

    useEffect(() => {
      if (assignment) {
        setIsCompleted(assignment.completedBy.includes(user.id));
      }
    }, [assignment, user.id]);

    const handleMarkComplete = () => {
      const updatedCompletion = !isCompleted;
      setIsCompleted(updatedCompletion);
      onAssignmentAction(assignment.id, "markComplete", { isCompleted: updatedCompletion }); 
    };

    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setUpdatedAssignment((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleFormSubmit = (e) => {
      e.preventDefault(); 
      onAssignmentAction(assignment.id, "editAssignment", updatedAssignment); 
      handleClose();
    };

    const handleDelete = () => {
      onAssignmentAction(assignment.id, "deleteAssignment")
    };



    return (
      <>
        <Card className="class-card">
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <Card.Title className="class-card-title">{assignment.title || "Loading..."}</Card.Title>
            <Card.Text className="class-card-text">
              {`Due date: ${assignment.dueDate}`}
            </Card.Text>
            <Card.Text className="class-card-text">
              {assignment.description}
            </Card.Text>

            {user.role === "Student" ? (
                <Form.Check
                    type="checkbox"
                    id={`mark-complete-${assignment.id}`}
                    label="Mark as Complete"
                    checked={isCompleted} 
                    onChange={handleMarkComplete}
                />
            ) : (
                <>
                  <Button
                      className="class-card-btn mb-2 mt-2"
                      variant="primary"
                      onClick={handleShow}
                  >
                      Edit Assignment
                  </Button>
                  <Button
                      className="class-card-btn"
                      variant="secondary"
                      onClick={handleDelete}
                  >
                      Delete
                  </Button>
                </>
            )}

          </Card.Body>
        </Card>


        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Assignment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  type="text"
                  name="title"
                  value={updatedAssignment.title}
                  onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Due Date</Form.Label>
                <Form.Control 
                type="date"
                name="dueDate"
                value={updatedAssignment.dueDate}
                onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  as="textarea" rows={3}
                  name="description"
                  value={updatedAssignment.description}
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