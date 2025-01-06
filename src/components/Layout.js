import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import "../styles/Global.css"; 

export default function Layout() {
    return (
        <div className="page-wrapper">
            <Header />
            <main className="content">
                <Outlet /> 
            </main>
            <Footer />
        </div>
    );
}
