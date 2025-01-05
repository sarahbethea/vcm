import { useState, useEffect } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';

export default function CreateAssignmentModal({ classId, handleAddAssignment }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    description: "",
    classId: classId,
  });


  useEffect(() => {
    setFormData((prev) => ({...prev, classId}));
  }, [classId]);


  const handleClose = () => setShow(false);
  const handleShow = () => {
    setFormData({    
      title: "",
      dueDate: "",
      description: "",
      classId
    });
    setShow(true);
  };

  const handleSaveAndClose = () => {
    handleClose();
    handleAddAssignment(formData);
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }


  return (
    <>
        <Container  className="d-flex justify-content-center align-items-center">
            <Button variant="primary" onClick={handleShow}>
                Add Assignment
            </Button>
        </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>

            <Form.Group className="mb-3" controlId="ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ControlInput2">
                <Form.Label>Due Date</Form.Label>
                <Form.Control 
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  as="textarea" rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange} />
            </Form.Group>

            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveAndClose}>
            Add Assignment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

