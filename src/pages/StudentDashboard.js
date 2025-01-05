import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../components/Dashboard";
import AddClass from "../components/AddClass";
import { UserContext } from "../UserContext";

export default function StudentDashboard({ selectedClass }) {
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const { user, updateUser } = useContext(UserContext);
    const API_URL = 'https://676376b517ec5852cae8f972.mockapi.io/vcm'

    useEffect(() => {
        const fetchEnrolledClasses = async () => {
            try {
                const userResponse = await fetch(`${API_URL}/users/${user.id}`);
                if (!userResponse.ok) {
                    throw new Error("Failed to fetch user details");
                }
                const userData = await userResponse.json();

                const classData = await Promise.all(
                    userData.enrolledClasses.map(async (classId) => {
                        const response = await fetch(`${API_URL}/classes/${classId}`);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch class with ID: ${classId}`);
                        }
                        return await response.json();
                    })
                );

                setEnrolledClasses(classData);
            } catch (e) {
                console.error("Error fetching enrolled classes:", e);
            }
        };

        if (user?.enrolledClasses?.length > 0) {
            fetchEnrolledClasses();
        } else {
            setEnrolledClasses([]);
        }
    }, [user]);

    const handleAddClass = async (selectedClass) => {
        if (!selectedClass) {
            console.error("No class selected.");
            return;
        }

        try {
            const userResponse = await fetch(`${API_URL}/users/${user.id}`);
            if (!userResponse.ok) {
                throw new Error("Failed to fetch user details");
            }
            
            const userData = await userResponse.json();

            if (userData.enrolledClasses.includes(selectedClass)) {
                console.warn("Student is already enrolled in this class.");
                return;
            }

            const updatedEnrolledClasses = [...userData.enrolledClasses, selectedClass];

            const updateResponse = await fetch(`${API_URL}/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...userData,
                    enrolledClasses: updatedEnrolledClasses
                })
            });

            if (updateResponse.ok) {
                const updatedUser = await updateResponse.json();
                updateUser(updatedUser);
                console.log(updatedUser);
                console.log("updated user context ")
            } else {
                throw new Error("Error updating user data")
            }

            setEnrolledClasses(updatedEnrolledClasses);
            console.log("Successfully added class:", selectedClass);


            const classResponse = await fetch(`${API_URL}/classes/${selectedClass}`)

            if (!classResponse.ok) {
                console.error("Failed to fetch class details")
            }

            const classData = await classResponse.json();
            const updatedClassStudents = [...classData.students, user.id];

            const updateClassResponse = await fetch(`${API_URL}/classes/${selectedClass}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...classData,
                    students: updatedClassStudents,
                }),
            });

            if (updateClassResponse.ok) {
                const updatedClass = await updateClassResponse.json();
                console.log(updateClassResponse);
            }



        } catch(e) {
            console.error("Error updating enrolled classes:", e)
        }
        

    }

    const handleUnenroll = async (classId) => {
        try {
            // Fetch current user data
            const userResponse = await fetch(`${API_URL}/users/${user.id}`);
            if (!userResponse.ok) {
                throw new Error("Failed to fetch user details");
            }

            const userData = await userResponse.json();

            // Filter out the class to unenroll
            const updatedEnrolledClasses = userData.enrolledClasses.filter(
                (id) => id !== classId
            );

            // Update the user's enrolled classes in the API
            const updateUserResponse = await fetch(`${API_URL}/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...userData,
                    enrolledClasses: updatedEnrolledClasses,
                }),
            });

            if (!updateUserResponse.ok) {
                throw new Error("Failed to update user data");
            }

            const updatedUser = await updateUserResponse.json();
            updateUser(updatedUser);

            // Optionally update the class's `students` array
            const classResponse = await fetch(`${API_URL}/classes/${classId}`);
            if (classResponse.ok) {
                const classData = await classResponse.json();
                const updatedClassStudents = classData.students.filter(
                    (studentId) => studentId !== user.id
                );

                await fetch(`${API_URL}/classes/${classId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...classData,
                        students: updatedClassStudents,
                    }),
                });
            }


            // Update local state
            setEnrolledClasses((prev) =>
                prev.filter((classItem) => classItem.id !== classId)
            );

            console.log(`Successfully unenrolled from class with ID: ${classId}`);
        } catch (e) {
            console.error("Error unenrolling from class:", e);
        }
    };





    return (
        <>
            <Dashboard enrolledClasses={enrolledClasses} handleUnenroll={handleUnenroll} />
            <AddClass handleAddClass={handleAddClass} />
        </> 
    );
}