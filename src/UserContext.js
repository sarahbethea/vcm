import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

function UserContextProvider({ children }) {
    const [user, setUser] = useState(null); //defaults to null
    const [loading, setLoading] = useState(true);

    const loginUser = (userData, staySignedIn) => {
        const storage = staySignedIn ? localStorage : sessionStorage;
        storage.setItem("currentUser", JSON.stringify(userData));

        setUser(userData);
    }

    const logoutUser = () => {
        sessionStorage.removeItem("currentUser");
        localStorage.removeItem("currentUser");
        setUser(null);
    }


    const updateUser = (updatedUserData) => {
        setUser(updatedUserData);
        const storage = 
            localStorage.getItem("currentUser") ? localStorage : sessionStorage;
        storage.setItem("currentUser", JSON.stringify(updatedUserData))

    }



    useEffect(() => {
        const localUser = localStorage.getItem("currentUser");
        const sessionUser = sessionStorage.getItem("currentUser");
        
        const savedUser = localUser ? JSON.parse(localUser) : sessionUser ? JSON.parse(sessionUser) : null;
    
        if (savedUser) {
            setUser(savedUser);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading spinner or placeholder
    }


    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, updateUser }}>
            {children}
        </UserContext.Provider>
    )




}


export { UserContext, UserContextProvider };