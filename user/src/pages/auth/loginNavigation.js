import React, {useEffect} from "react";
import { Group, Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import googleIcon from "../../media/google.svg";
import fbIcon from "../../media/facebook.svg";
import mailIcon from "../../media/mail.png";
import NavBar from "../../components/navbar";
import axios from "axios";

function LoginNav() {
  const buttonstyle = {
    width: 300,
    height: 50,
    borderWidth: 1,
  };
  useEffect(()=>{
    document.title = "login"
  })

  async function loginFunction() {
    
    //const bodylogin = { email: mail, password: pass };
    await axios
      .get("localhost:3000/api/auth/google")
      .then((response) => {
        alert(response);
        //setToken(response.data.token);
        //localStorage.setItem("token", response.data.token);
        //localStorage.setItem("email", mail);
        
        //alert("login successful\ntoken="+token);
        //history.push("/welcome");
      })
      .catch((error) => {
        alert(error);
           /*
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
      */});
  }

  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Group direction="column" spacing="xl">
          <Text size="xl" weight={700}>
            Sign in to your account
          </Text>
          <Button
            color="dark"
            radius="xs"
            style={buttonstyle}
            variant="outline"
            onClick={loginFunction}
            leftIcon={
              <img
                src={googleIcon}
                alt="google"
                style={{ width: 16, height: 16 }}
              />
            }
          >
            {" "}
            Sign in with google account{" "}
          </Button>
          <Button
            color="dark"
            radius="xs"
            style={buttonstyle}
            variant="outline"
            leftIcon={
              <img
                src={fbIcon}
                alt="facebook"
                style={{ width: 18, height: 18 }}
              />
            }
          >
            {" "}
            Sign in with Facebook account
          </Button>
          <Button
            color="dark"
            radius="xs"
            component={Link}
            to="/login"
            style={buttonstyle}
            variant="outline"
            leftIcon={
              <img
                src={mailIcon}
                alt="mail"
                style={{ width: 22, height: 16 }}
              />
            }
          >
            {" "}
            Sign in with email address{" "}
          </Button>
          <Group spacing="xs">
            <Text color="dimmed" size="md">
              Still don't have an account?
            </Text>
            <Text color="dark" variant="link" component={Link} to="/signup">
              Join us now.
            </Text>
          </Group>
        </Group>
      </div>
    </div>
  );
}

export default LoginNav;
