import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import CreateClassForm from "../components/CreateClassForm";
import Footer from "../components/Footer";
import ErrorBoundary from "../components/ErrorBoundary";
import { UserContext } from "../UserContext";



export default function TeacherDashboard() {
    const { user, updateUser } = useContext(UserContext);
    const API_URL = 'https://676376b517ec5852cae8f972.mockapi.io/vcm'
    const [enrolledClasses, setEnrolledClasses] = useState([]);

    useEffect(() => {
        const fetchUserClasses = async () => {
            try {
                const response = await fetch(`${API_URL}/classes`);
                const allClasses = await response.json();
    
                const userEnrolledClasses = allClasses.filter((classItem) =>
                    user.enrolledClasses.includes(String(classItem.id))
                );
    
                console.log("Filtered Classes for User:", userEnrolledClasses);
                setEnrolledClasses(userEnrolledClasses);
            } catch (e) {
                console.error("Error fetching user classes:", e);
            }
        };
    
        if (user && user.enrolledClasses?.length > 0) {
            fetchUserClasses();
        }
    }, [user]);


    const handleCreateClass = async (newClass) => {
        try {

            const response = await fetch(`${API_URL}/classes`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: newClass.name,
                        description: newClass.description,
                        teacherId: user.id,
                        students: []
                    }),
                });
            

            if (response.ok) {
                console.log("Created new class successfully");
                const createdClass = await response.json();


                const updatedEnrolledClasses = [ ...user.enrolledClasses, createdClass.id]

                const userResponse = await fetch(`${API_URL}/users/${user.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...user,
                        enrolledClasses: updatedEnrolledClasses,
                    }),
                });

                if (userResponse.ok) {
                    const updatedUser = await userResponse.json();
                    updateUser(updatedUser);    
                }

            } else {
                console.error("Failed to create class", response.status);
            }

        } catch(e) {
            console.error("Error creating class", e);
        }
    }

    const handleEditClass = async (classId, classData) => {
        console.log("Editing class with ID:", classId);
        try {
            const response = await fetch(`${API_URL}/classes/${classId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(classData)
            })

            if (response.ok) {
                console.log("Successfully updated class with ID:", classId);
                const updatedClass = await classData.json();

                setEnrolledClasses((prevUserClasses) => 
                    prevUserClasses.map((c) =>
                        c.id === updatedClass.id
                        ? updatedClass
                        : c));
            }

        } catch(e) {
            console.error("Error editing class")
        }
    };

    const handleDeleteClass = async (classId) => {
        console.log("Deleting class with ID:", classId);
        try {
            const response = await fetch(`${API_URL}/classes/${classId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to delete class with ID: ${classId}`)
            }

            console.log(`Successfully deleted class with ID: ${classId}`);

            // Update teacher's enrolled classes in API

            const updatedEnrolledClasses = user.enrolledClasses.filter(
                (id) => id != classId
            );

            const userResponse = await fetch(`${API_URL}/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...user,
                    enrolledClasses: updatedEnrolledClasses,
                }),
            });

            if (!userResponse.ok) {
                throw new Error("Failed to update user data after deleting class.")
            }

            const updatedUser = await userResponse.json();
            updateUser(updatedUser);

            setEnrolledClasses((prev) => 
                prev.filter((c) => c.id !== classId)
            );
        } catch(e) {
            console.error("Error deleting class", e)
        }
    };


    return (
        <>
            <Dashboard handleEditClass={handleEditClass} handleDeleteClass={handleDeleteClass} enrolledClasses={enrolledClasses}/> 
            <CreateClassForm handleCreateClass={handleCreateClass} />
        </>

    );
}