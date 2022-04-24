import { Center, Blockquote, Text } from "@mantine/core";
import React, { useEffect } from "react";
import NavBar from "../components/navbar";
function NotFoundPage() {

  useEffect(()=>{
    document.title = "404"
  })
  return (
    <div>
      <NavBar />

      <Center style={{ widt: "100%", height: "80vh" }}>
        <Blockquote
          cite={
            <Text
              style={{ fontSize: "24px", fontFamily: "MonteCarlo, cursive" }}
            >
              -Malek
            </Text>
          }
        >
          <Text style={{ fontSize: "46px", fontFamily: "MonteCarlo, cursive" }}>
            i ain't got no time to make a creative 404 page
          </Text>
        </Blockquote>
      </Center>
    </div>
  );
}

export default NotFoundPage;
