import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext.js";
import LoginForm from '../components/LoginForm.js';
import { useNavigate } from "react-router-dom";
import LoginHeader from "../components/LoginHeader.js";
import Footer from "../components/Footer.js";

export default function Login() {
    const API_URL = 'https://676376b517ec5852cae8f972.mockapi.io/vcm'
    const [loginError, setLoginError] = useState("");
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin =  async (email, password, staySignedIn) => {
        try {
            const response = await fetch(`${API_URL}/users`);

            if (!response.ok) {
                throw new Error("Error fetching users.");
            }
        
            const users = await response.json();
            const user = users.find((u) => u.email === email && u.password === password);

            if (user) {
                console.log("Logged in successfully", user);
                setLoginError("");

                loginUser(user, staySignedIn)

                if (user.role === "Teacher") {
                    navigate(`/teacher/${user.id}`);
                } else {
                    navigate(`/student/${user.id}`);
                }
            } else {
                setLoginError("Invalid email or password")
            }
        } catch (e) {
            console.error("Error logging in:", e);
        }

    }

    return (
        <div>
            <LoginHeader />
            {loginError && <p className="text-danger">{loginError}</p>}
            <LoginForm onLogin={handleLogin} />

            <Footer />

        </div>

    );
}