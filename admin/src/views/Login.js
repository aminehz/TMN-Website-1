import React, { useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button
} from "shards-react";

import "../shards-dashboard/styles/Login.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName] = useState("");
  
  const history = useHistory();

  async function loginFunction() {
    const bodylogin = { name:name,email: email, password: password };
    await axios
      .post("http://localhost:3000/api/admin/login", bodylogin)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);

        //alert("login successful\ntoken="+token);
        history.push("/blog-posts");
      })
      .catch((error) => {
        let errors = Object.keys(error.response.data);
        errors.forEach((element) => {
          if(element=="name"){
            setName(error.response.data.name);
          }
          else if (element === "email") {
            setEmail(error.response.data.email);
          } else if (element === "password") {
            setPassword(error.response.data.password);
          }
        });
        if(!errors.includes("name")){
          setName("");
        }
        else if (!errors.includes("email")) {
          setEmail("");
        }
        if (!errors.includes("password")) {
          setPassword("");
        }
      });
  }

  return (
    <div className="log">
      <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: "250px" }}
                src={require("../images/TMN_inverted.jpg")}
                alt="Shards Dashboard"
              />
    <ListGroup flush>
    <ListGroupItem className="p-3">
      <Row>
        <Col>
          
            <Row form>
            <Col md="6" className="form-group">
                <label htmlFor="feEmailAddress">Name</label>
                <FormInput
                  id="feEmailAddress"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="feEmailAddress">Email</label>
                <FormInput
                  id="feEmailAddress"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col md="6">
                <label htmlFor="fePassword">Password</label>
                <FormInput
                  id="fePassword"
                  type="password"
                  placeholder="Password"
                  value={password}
            onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Row>
            <br></br>
            
            <Button type="submit" size="sm" theme="dark" className="mb-2 mr-1" onClick={loginFunction}>
        Sign In
      </Button>
      
          
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
  </div>
  );
}