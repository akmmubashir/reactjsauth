import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminsuccess, setadminsuccess] = useState(false);
  const [loginfailed, setloginfailed] = useState(false);
  const [loginsuccess, setloginsuccess] = useState(false);
  const [enterall, setenterall] = useState(false);

  const navto = useNavigate();

  useEffect(() => {
    const exist = JSON.parse(localStorage.getItem("exist"));
    if (exist) {
      navto("/dashboard");
    }
  }, [navto]);
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      navto("/userlist");
    }
  });

  const handleLogin = () => {
    if (username && password) {
      if (username === "admin" && password === "admin") {
        const newUser = { username, password };
        setadminsuccess(true);
        setTimeout(() => {
          setadminsuccess(false);
          localStorage.setItem("admin", JSON.stringify(newUser));
        }, 2000);
      } else {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = existingUsers.find(
          (user) => user.username === username && user.password === password
        );
        if (user) {
          setloginsuccess(true);
          setTimeout(() => {
            setloginsuccess(false);
            localStorage.setItem("exist", JSON.stringify(user));
          }, 2000);
        } else {
          setloginfailed(true);
          setTimeout(() => {
            setUsername("");
            setPassword("");
            setloginfailed(false);
          }, 2000);
        }
      }
    } else {
      setenterall(true);
      setTimeout(() => {
        setenterall(false);
      }, 2000);
    }
  };

  return (
    <>
      <Form className="container p-0">
        <h1 className="head">Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button onClick={handleLogin}>Login</Button>
      </Form>
      <Modal show={enterall} centered>
        <Modal.Body className="bg-warning">
          <p className="text-black m-0">Enter all field!</p>
        </Modal.Body>
      </Modal>
      <Modal show={adminsuccess} centered>
        <Modal.Body className="bg-success">
          <p className="text-white m-0">Admin logged in successfully</p>
        </Modal.Body>
      </Modal>
      <Modal show={loginsuccess} centered>
        <Modal.Body className="bg-success">
          <p className="text-white m-0">User logged in successfully</p>
        </Modal.Body>
      </Modal>
      <Modal show={loginfailed} centered>
        <Modal.Body className="bg-danger">
          <p className="text-white m-0">User logged in failed</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
