import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  Center,
  Checkbox,
  Button,
  Text,
  Space,
  Group,
  TextInput,
  PasswordInput,
  Tooltip,
  MediaQuery,
} from "@mantine/core";
import EmailIcon from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/LockOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LockResetIcon from "@mui/icons-material/LockReset";
import IconButton from "@mui/material/IconButton";
import { generate } from "generate-password";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../../components/navbar";

const hide = { display: "none" };
function Signup() {
  const [username, setUsername] = useState();
  const [mail, setMail] = useState();
  const [pass, setPass] = useState();
  const [cpass, setCpass] = useState();

  const passRef = useRef(null);
  const cpassRef = useRef(null);

  const passRefM = useRef(null);
  const cpassRefM = useRef(null);

  var [isChecked, setisChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const [tosopened, setTosOpened] = useState(false);

  const [mailerr, setMailerr] = useState();
  const [nameerr, setNameerr] = useState();
  const [passerr, setPasserr] = useState();
  const [pass2err, setPass2err] = useState();
  useEffect(()=>{
    document.title = "Signup"
  })
  function signupFunction() {
    if (isChecked) {
      signupFunction_main();
    } else {
      setTosOpened(true);
    }
  }

  async function signupFunction_main() {
    //alert("mail: "+mail+"\nusr: "+username+"\npass: "+pass+"\ncpass: "+cpass+"\nischkd: "+isChecked);
    const bodylogin = {
      email: mail,
      password: pass,
      password2: cpass,
      name: username,
    };
    await axios
      .post("http://localhost:3000/api/auth/signup", bodylogin)
      .then((response) => {
        //alert(JSON.stringify("signup supposedly successful\n"+response.data));
        setOpened(true);
      })
      .catch((error) => {
        let errors = Object.keys(error.response.data);
        errors.forEach((element) => {
          if (element === "email") {
            setMailerr(error.response.data.email);
          }
          if (element === "password") {
            setPasserr(error.response.data.password);
          }
          if (element === "password2") {
            setPass2err(error.response.data.password2);
          }
          if (element === "name") {
            setNameerr(error.response.data.name);
          }
        });
        if (!errors.includes("email")) {
          setMailerr("");
        }
        if (!errors.includes("name")) {
          setNameerr("");
        }
        if (!errors.includes("password")) {
          setPasserr("");
        }
        if (!errors.includes("password2")) {
          setPass2err("");
        }
      });
  }

  function passgenerator() {
    var passw = generate({ length: 10, numbers: true });
    passRef.current.value = passw;
    cpassRef.current.value = passw;
    setPass(passw);
    setCpass(passw);
  }

  function passgeneratorM() {
    var passw = generate({ length: 10, numbers: true });
    passRefM.current.value = passw;
    cpassRefM.current.value = passw;
    setPass(passw);
    setCpass(passw);
  }

  return (
    <div>
      <Dialog
        opened={tosopened}
        withCloseButton
        onClose={() => setTosOpened(false)}
        size="lg"
        radius="md"
      >
        <Text
          size="sm"
          style={{ marginBottom: 10, marginLeft: 10 }}
          weight={500}
        >
          please agree to the Terms of service to continue
        </Text>
      </Dialog>

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
                onChange={(e) => setUsername(e.target.value)}
                icon={<PersonIcon style={{ color: "#000000" }} />}
                size="lg"
                placeholder="username"
                radius="xs"
                error={nameerr}
                style={{ width: "70%" }}
                required
              />
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
              
              <div style={{display:'flex',flexDirection:'row',width:'70%'}}>
                  <PasswordInput
                    ref={passRef}
                    onChange={(e) => setPass(e.target.value)}
                    icon={<Lock style={{ color: "#000000", width: 200 }} />}
                    size="lg"
                    placeholder="password"
                    radius="xs"
                    error={passerr}
                    style={{ width: "100%", marginRight:'5%', alignSelf:'flex-start' }}
                    required
                  />
                
                
                  <Tooltip
                    position="top"
                    placement="center"
                    label="use this button to generator a strong password"
                    gutter={10}
                  >
                    <IconButton
                      onClick={passgenerator}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 1,
                        backgroundColor: "#000000",
                        alignSelf:'flex-end'
                      }}
                    >
                      <LockResetIcon style={{ color: "#ffffff" }} />
                    </IconButton>
                  </Tooltip>
                
              </div>
              <Space h="ls" />
              <PasswordInput
                ref={cpassRef}
                onChange={(e) => setCpass(e.target.value)}
                icon={<Lock style={{ color: "#000000", width: 200 }} />}
                size="lg"
                placeholder="confirm password"
                radius="xs"
                error={pass2err}
                style={{ width: "70%" }}
                required
              />
              <Space h="ls" />
              <Checkbox
                onChange={(e) => setisChecked(e.target.checked)}
                label="I agree to terms of service and privacy policy"
                color="dark"
              />
              <Space h="ls" />
              <Button
                onClick={signupFunction}
                color="dark"
                radius="xs"
                size="lg"
              >
                Sign up
              </Button>

              <Dialog
                opened={opened}
                withCloseButton
                onClose={() => setOpened(false)}
                size="lg"
                radius="md"
              >
                <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
                  Account created successfully, Sign In to continue
                </Text>
                <Center>
                  <Button color="dark" radius="xs" component={Link} to="/login">
                    Sign in
                  </Button>
                </Center>
              </Dialog>
            </Group>
          </div>

          <div
            style={{
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
                height: "100vh",
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
        <div>
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
              onChange={(e) => setUsername(e.target.value)}
              icon={<PersonIcon style={{ color: "#000000" }} />}
              size="lg"
              placeholder="username"
              radius="xs"
              error={nameerr}
              style={{ width: "70%" }}
              required
            />
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
            <div style={{display:'flex',flexDirection:'row',width:'70%'}}>
                <PasswordInput
                  ref={passRefM}
                  onChange={(e) => setPass(e.target.value)}
                  icon={<Lock style={{ color: "#000000", width: 200 }} />}
                  size="lg"
                  placeholder="password"
                  radius="xs"
                  error={passerr}
                  style={{ width: "100%", marginRight:'5%', alignSelf:'flex-start' }}
                  required
                />
              
                <Tooltip
                  position="top"
                  placement="center"
                  label="use this button to generator a strong password"
                  gutter={10}
                >
                  <IconButton
                    onClick={passgeneratorM}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 1,
                      backgroundColor: "#000000",
                      alignSelf:'flex-end' 
                    }}
                  >
                    <LockResetIcon style={{ color: "#ffffff" }} />
                  </IconButton>
                </Tooltip>
               </div>
            <Space h="ls" />
            <PasswordInput
              ref={cpassRefM}
              onChange={(e) => setCpass(e.target.value)}
              icon={<Lock style={{ color: "#000000", width: 200 }} />}
              size="lg"
              placeholder="confirm password"
              radius="xs"
              error={pass2err}
              style={{ width: "70%" }}
              required
            />
            <Space h="ls" />
            <Checkbox
              onChange={(e) => setisChecked(e.target.checked)}
              label="I agree to terms of service and privacy policy"
              color="dark"
            />
            <Space h="ls" />
            <Button onClick={signupFunction} color="dark" radius="xs" size="lg">
              Sign up
            </Button>
          </Group>
        </div>
      </MediaQuery>
    </div>
  );
}

export default Signup;
