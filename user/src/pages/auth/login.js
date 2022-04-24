import React, { useState, useEffect } from "react";
import {
  Center,
  Button,
  Text,
  Space,
  Group,
  TextInput,
  PasswordInput,
  MediaQuery,
} from "@mantine/core";
import EmailIcon from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useHistory } from "react-router";
import NavBar from "../../components/navbar";

function Login() {
  const [mail, setMail] = useState();
  const [pass, setPass] = useState();
  const [mailerr, setMailerr] = useState();
  const [passerr, setPasserr] = useState();

  useEffect(()=>{
    document.title = "login"
  })

  const hide = { display: "none" };
  const history = useHistory();
  async function loginFunction() {
    const bodylogin = { email: mail, password: pass };
    await axios
      .post("http://localhost:3000/api/auth/login", bodylogin)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", mail);

        //alert("login successful\ntoken="+token);
        history.push("/welcome");
      })
      .catch((error) => {
        let errors = Object.keys(error.response.data);
        errors.forEach((element) => {
          if (element === "email") {
            setMailerr(error.response.data.email);
          } else if (element === "password") {
            setPasserr(error.response.data.password);
          }
        });
        if (!errors.includes("email")) {
          setMailerr("");
        }
        if (!errors.includes("password")) {
          setPasserr("");
        }
      });
  }

  return (
    <div>
      <NavBar />
      <MediaQuery largerThan="sm" styles={hide}>
        <Center style={{ height: "100vh" }}>
          <div style={{ width: "60%" }}>
            <Group
              direction="column"
              style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
              }}
            >
              <Text weight={700} style={{ color: "#000000", fontSize: 24 }}>
                Sign in to your account
              </Text>
              <Space h="ls" />
              <TextInput
                onChange={(e) => setMail(e.target.value)}
                icon={<EmailIcon style={{ color: "#000000" }} />}
                size="lg"
                placeholder="email"
                radius="xs"
                error={mailerr}
                style={{ width: "70%" }}
                required
              />
              <Space h="ls" />
              <PasswordInput
                onChange={(e) => setPass(e.target.value)}
                icon={<Lock style={{ color: "#000000", width: 200 }} />}
                size="lg"
                placeholder="password"
                radius="xs"
                error={passerr}
                style={{ width: "70%" }}
                required
              />
              <Space h="ls" />
              <Button
                onClick={loginFunction}
                color="dark"
                radius="xs"
                size="lg"
              >
                Sign in
              </Button>
            </Group>
          </div>

          <div
            style={{
              height: "95vh",
              padding: 20,
              width: "40%",
              backgroundColor: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Group
              direction="column"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                weight={700}
                style={{ color: "#FFFFFF", fontSize: 24, textAlign: "center" }}
              >
                Welcome to Tunisian Modern Newspaper
              </Text>
              <Space h="xl" />
              <div
                style={{ width: 200, height: 2, backgroundColor: "#FFFFFF" }}
              />
              <Space h="xl" />
              <Text
                weight={300}
                style={{ color: "#FFFFFF", fontSize: 16, textAlign: "center" }}
              >
                we are a team of highly motivated indivuals who bla bla bla...it
                will be a great pleasure for you to join us eds eds eds boiiii
              </Text>
            </Group>
          </div>
        </Center>
      </MediaQuery>
      <MediaQuery smallerThan="sm" styles={hide}>
        <Center style={{ height: "100vh", width: "100%" }}>
          <Group
            direction="column"
            style={{
              height: "100vh",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
            }}
          >
            <Text weight={700} style={{ color: "#000000", fontSize: 24 }}>
              Sign in to your account
            </Text>
            <Space h="ls" />
            <TextInput
              onChange={(e) => setMail(e.target.value)}
              icon={<EmailIcon style={{ color: "#000000" }} />}
              size="lg"
              placeholder="email"
              radius="xs"
              error={mailerr}
              style={{ width: "70%" }}
              required
            />
            <Space h="ls" />
            <PasswordInput
              onChange={(e) => setPass(e.target.value)}
              icon={<Lock style={{ color: "#000000" }} />}
              size="lg"
              placeholder="password"
              radius="xs"
              error={passerr}
              style={{ width: "70%" }}
              required
            />
            <Space h="ls" />
            <Button onClick={loginFunction} color="dark" radius="xs" size="lg">
              Sign in
            </Button>
          </Group>
        </Center>
      </MediaQuery>
    </div>
  );
}

export default Login;
