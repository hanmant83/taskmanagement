import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import "./Login.css";
import {
useHistory
  } from "react-router-dom";
  async function loginUser(credentials) {
    return fetch('http://localhost:7010/user/checklogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data =>data.json())
       .then(res => {return res.token})
   }
export default function Login({ setToken }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  function handleClick() {
    history.push("/register");
  }
  const handleSubmit = async event => {
    event.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
    if(token){
        history.push("/dashboard"); 
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
      <div class="imgcontainer">
    <h2>Login</h2>
  </div>
      <div class="containers">
        <Form.Group size="lg" controlId="email" name="Uname">
          <Form.Label>Email </Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password" name="psw">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="loginbtn" type="submit" id="log" disabled={!validateForm()} onClick={handleSubmit}>
          Login
        </Button>
        <Button type="button" className="signbtn" onClick={handleClick}>
      Reghister here
    </Button>
    </div>
      </Form>
    </div>
  );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };
