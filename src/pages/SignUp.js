import React, { useState } from "react";
import LoginHeader from "../components/LoginHeader";
import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("Student");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const API_URL = "https://676376b517ec5852cae8f972.mockapi.io/vcm";

    const handleSignUp = async () => {
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, role, email, password }),
            });

            if (response.ok) {
                console.log("Sign-up successful");
                setSuccessMessage("Success! Profile created");
                setErrorMessage("");
                // Reset form fields
                setEmail("");
                setFirstName("");
                setLastName("");
                setPassword("");
                setRole("Student");
            } else {
                console.log("Failed to create profile. Response:", response);
                setErrorMessage("Error. Could not create profile.");
                setSuccessMessage("");
            }
        } catch (e) {
            console.error("Error creating profile:", e);
            setErrorMessage("An error occurred. Try again.");
            setSuccessMessage("");
        }
    };

    return (
        <>
            <LoginHeader />
            <SignUpForm
                onSignUp={handleSignUp}
                successMessage={successMessage}
                errorMessage={errorMessage}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                role={role}
                setRole={setRole}
            />
        </>
    );
}
