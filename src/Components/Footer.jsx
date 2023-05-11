import React from "react";
import { Nav, Navbar } from "react-bootstrap";

function Footer() {
  return (
    <Navbar fixed="bottom"  expand="lg" className="px-lg-5 px-4 py-lg-3 py-md-3 py-2 bg-none-f">
      <Nav className="m-lg-0 m-auto">
        <p className="m-0">
          Created by{" "}
          <a
            href="https://mubi-on.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            Mubi
          </a>
        </p>
      </Nav>
      <Nav className="ms-auto nav-menu">
        <Nav.Link href="/">Support</Nav.Link>
        <Nav.Link href="/">Privacy Policy</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Footer;
