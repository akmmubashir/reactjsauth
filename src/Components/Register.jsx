import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [enterall, setenterall] = useState(false);
  const [userexist, setuserexist] = useState(false);
  const [usercreated, setusercreated] = useState(false);

  const navto = useNavigate();

  const handleRegistration = () => {
    if (email && username && password) {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const userExists = existingUsers.some(
        (user) => user.email === email || user.username === username
      );
      if (userExists) {
        setuserexist(true);
        setTimeout(() => {
          setUsername("")
          setEmail("")
          setPassword("")
          setuserexist(false);

        }, 2000);
      } else {
        const newUser = { email, username, password };
        existingUsers.push(newUser);
        setusercreated(true);
        setTimeout(() => {
          setusercreated(false);
          localStorage.setItem("users", JSON.stringify(existingUsers));
          localStorage.setItem("exist", JSON.stringify(newUser));
        }, 2000);
      }
    } else {
      setenterall(true);
      setTimeout(() => {
        setenterall(false);
      }, 2000);
    }
  };
  useEffect(() => {
    const exist = JSON.parse(localStorage.getItem("exist"));
    if (exist) {
      navto("/dashboard");
    }
  });

  return (
    <>
      <Form className="container p-0">
        <h1 className="head">Register</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button onClick={handleRegistration}>Register</Button>
      </Form>
      <Modal show={enterall} centered>
        <Modal.Body className="bg-warning">
          <p className="text-black m-0">Enter all field!</p>
        </Modal.Body>
      </Modal>
      <Modal show={usercreated} centered>
        <Modal.Body className="bg-success">
          <p className="text-white m-0">User created successfully</p>
        </Modal.Body>
      </Modal>

      <Modal show={userexist} centered>
        <Modal.Body className="bg-danger">
          <p className="text-white m-0">Username and email already exists</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Register;
