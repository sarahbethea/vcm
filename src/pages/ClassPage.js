import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import CurrentAssignments from "../components/CurrentAssignments"
import PastAssignmentsList from "../components/PastAssignmentsList";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import CreateAssignmentModal from "../components/CreateAssignmentModal"
import { UserContext } from "../UserContext";

export default function ClassPage() {
    const [currentAssignments, setCurrentAssignments] = useState([]);
    const [pastAssignments, setPastAssignments] = useState([]);
    const [className, setClassName] = useState("");
    const API_URL = 'https://676376b517ec5852cae8f972.mockapi.io/vcm';
    const { classId } = useParams();
    const { user } = useContext(UserContext);
    

    const getAssignments = async () => {
        try {
            const response = await fetch(`${API_URL}/assignments`);
            const assignments = await response.json();
            console.log(assignments)

            const now = new Date();
            const currentAssignments = assignments.filter((a) => {
                const dueDate = new Date(a.dueDate);
                return dueDate >= now && a.classId === classId;
            });
            console.log("Current assignments:", currentAssignments);
            setCurrentAssignments(currentAssignments);

            const pastAssignments = assignments.filter((a) => {
                const dueDate = new Date(a.dueDate);
                return dueDate < now && a.classId === classId;
            });
            console.log("Past assignments", pastAssignments);
            setPastAssignments(pastAssignments);

 
        }catch(e){
            console.error("Error fetching assignments:", e)
        }
    }

    const getClassName = async () => {
        try {
            const response = await fetch(`${API_URL}/classes`);
            const allClasses = await response.json();
            const thisClass = allClasses.find((c) => c.id === classId);
            setClassName(thisClass.name);
            console.log(thisClass);

        } catch(e) {
            console.error("Error fetching class name", e);
        }
    }



    useEffect(() => {
        console.log("Class page for class ID:", classId);
        getAssignments();
        getClassName();
    }, []);




    const handleAssignmentAction = async (assignmentId, actionType, assignmentData=null) => {
        try {
            if (actionType === "markComplete") {
                const assignment = currentAssignments.find((a) => a.id === assignmentId);
    
                if (!assignment) {
                    console.log("assignment not found");
                    return;
                }
            
                const isCompleted = assignmentData.isCompleted;
                const updatedCompletedBy = isCompleted
                    ? [...assignment.completedBy, user.id]
                    : assignment.completedBy.filter((id) => id !== user.id);
                
                await fetch(`${API_URL}/assignments/${assignmentId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({completedBy: updatedCompletedBy})
                });

                setCurrentAssignments((prevAssignments) => 
                    prevAssignments.map((a) => 
                        a.id === assignment.id
                        ? {...a, completedBy: updatedCompletedBy}
                        : a)
                );
            }
           

            if (actionType === "editAssignment" && assignmentData) {
                console.log(`Editing assignment with ID: ${assignmentId}`);

                const assignmentsResponse = await fetch(`${API_URL}/assignments/${assignmentId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(assignmentData),
                });

                if (assignmentsResponse.ok) {
                    const updatedAssignment = await assignmentsResponse.json();
                    console.log("Updated assignment", updatedAssignment);

                    setCurrentAssignments((prevAssignments) => 
                        prevAssignments.map((a) =>
                            a.id === updatedAssignment.id 
                            ? updatedAssignment
                            : a
                        ) 
                    );
                }
            }

            if (actionType === "deleteAssignment") {
                console.log(`Deleting assignment with ID: ${assignmentId}`)
                const deleteResponse = await fetch(`${API_URL}/assignments/${assignmentId}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (deleteResponse.ok) {
                    console.log("Successfully deleted. ")
                    setCurrentAssignments((prevAssignments) => 
                        prevAssignments.filter((a) => a.id !== assignmentId));
                } else {
                    console.error("Failed to delete assignment.")
                }

            }

        } catch(e) {
            console.log("Error handling assignment action", e)
        }
    }


    const handleAddAssignment = async (newAssignment) => {
        try {
            const response = await fetch(`${API_URL}/assignments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    classId: classId,
                    title: newAssignment.title,
                    dueDate: newAssignment.dueDate,
                    description: newAssignment.description,
                    completedBy: []
                })
            });

            if (response.ok) {
                console.log("Successfully created assignment with class id: ", classId)
                const createdAssignment = await response.json()

                setCurrentAssignments((prevAssignments) => [...prevAssignments, createdAssignment]);
            } else {
                console.error("Failed to create assignment.")
            }

        } catch(e) {
            console.log("Error creating assignment", e)
        }
    }







    return (
        <>
            <Container className="d-flex justify-content-center align-items-center pt-5"><h3>{className}</h3></Container>
            <CurrentAssignments 
                currentAssignments={currentAssignments}
                classId={classId}
                onAssignmentAction={handleAssignmentAction} />

            {user.role === "Teacher" && <CreateAssignmentModal handleAddAssignment={handleAddAssignment} classId={classId}/>}
            
            {pastAssignments.length > 0 && <PastAssignmentsList pastAssignments={pastAssignments} />}
            
    
        </>

    );
}