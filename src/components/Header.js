import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css"


export default function Header() {
    const { user, logoutUser } = useContext(UserContext);
    const fullName = user ? `${user.firstName} ${user.lastName}` : "Guest";
    const navigate = useNavigate();

    const handleLogout = () => {
      logoutUser();
      setTimeout(() => navigate("/"), 0);
    };

    return (
        <Navbar sticky="top" expand="lg" className="navbar navbar-header">
          <Container fluid>
            <Navbar.Brand className="navbar-brand">VCM</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="mr-3">
                Signed in as: {fullName}
              </Navbar.Text>
              <Nav className="navbar-bold-text">
                {user ? (
                  <>
                    <Nav.Link as={Link} to={user.role === "Teacher" ? `/teacher/${user.id}` : `/student/${user.id}`}>
                      My Dashboard
                    </Nav.Link>
                    <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                  </>
                ) : (
                  <Nav.Link as={Link} to="/">Log In</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );

}