
import React, {useEffect} from "react";
import NavBar from "../components/navbar";
import { Center, Button, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";

function WelcomePage() {
  var email = localStorage.getItem("email");
  useEffect(()=>{
    document.title = "404"
  })
  return (
    <div>
      <NavBar />
      <div
        style={{ backgroundColor: "#f5f5f5", width: "100%", height: "100vh" }}
      >
        <Center style={{ width: "100%", height: "100vh" }}>
          <Group
            direction="column"
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text weight={700} style={{ color: "#000000", fontSize: 48 }}>
              Welcome to Tunisian Modern Newspaper {email}
            </Text>
            <Button
              component={Link}
              to="/"
              variant="outline"
              color="dark"
              radius="xs"
              size="lg"
            >
              Go back to the home page
            </Button>
          </Group>
        </Center>
      </div>
    </div>
  );
}

export default WelcomePage;
