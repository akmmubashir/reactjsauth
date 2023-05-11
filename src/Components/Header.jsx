import React, { useState } from "react";
import { Button, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { CgMenuGridR } from "react-icons/cg";

function Header() {
  const navto = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Logout = () => {
    const exist = localStorage.removeItem("exist");
    navto(exist ? "/" : "/");
    const admin = localStorage.removeItem("admin");
    navto(admin ? "/" : "/");
  };
  return (
    <Navbar
      fixed="top"
      expand="lg"
      className="px-lg-5 px-4 py-lg-4 py-md-4 py-2 bg-none align-items-center"
    >
      <Navbar.Brand href="/" className="me-auto logo">
        ReactJs
      </Navbar.Brand>
      <Nav className="nav-menu">
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/userlist">Userlist</Nav.Link>
        <Button className="ms-2 logout" onClick={Logout}>
          Logout
          <span className="ms-2">
            <FiLogOut />
          </span>
        </Button>
      </Nav>
      <Nav className="mob-menu">
        <Button onClick={Logout}>
          <FiLogOut />
        </Button>
      </Nav>
      <Nav className="mob-menu">
        <Button className="ms-3" onClick={handleShow}>
          <CgMenuGridR />
        </Button>
        <Offcanvas show={show} onHide={handleClose} placement="top">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="logo">ReactJs</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul type="none" className="p-0">
              <li>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              </li>
              <li>
                <Nav.Link href="/userlist">Userlist</Nav.Link>
              </li>
              <li>
                <Nav.Link href="/">Privacy Policy</Nav.Link>
              </li>
              <li>
                <Nav.Link href="/">Terms & Conditions</Nav.Link>
              </li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </Nav>
    </Navbar>
  );
}

export default Header;
