import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";


async function registerUser(details) {
    return fetch('http://localhost:7010/user/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
      .then(data =>data.json())
       .then(res => {return res})
   }
export default function Registration() {
    const history = useHistory();
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  function handleClick() {
    history.push("/");
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const result = await registerUser({
       firstname,
       lastname,
       email,
       password
      });
      if(result.statusCode == 200 && result.status == 'success'){
        history.push("/");
      }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
      <div class="imgcontainer">
    <h2>Registration</h2>
  </div>
      <div class="containers">
      <Form.Group size="lg" controlId="firstname">
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="lastname">
          <Form.Label>LastName</Form.Label>
          <Form.Control
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" className="loginbtn" disabled={!validateForm()}>
          Register
        </Button>
        <Button block size="lg" type="button" className="signbtn" onClick={handleClick}>
          Login here
        </Button>
        </div>
      </Form>
    </div>
  );
}
