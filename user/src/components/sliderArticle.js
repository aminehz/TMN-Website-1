import { Image, Text, MediaQuery, SimpleGrid } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const hide = { display: "none" };
function SliderArticle(props) {
  return (
    <>
      <MediaQuery largerThan="xs" styles={hide}>
        <SimpleGrid cols={2} style={{ height: "50vh", width: "100%" }}>
          <div style={{ width: "130%", backgroundColor: "#FFFFFF" }}>
            <Image
              style={{ width: "100%", height: "100%",objectFit:'cover',  }}
              fit="cover"
              src={props.src}
            />
          </div>
          <div
            style={{
              width: "70%",
              backgroundColor: "#000000",
              padding: "10px",
              marginLeft: "27%",
              float:'right'
            }}
          >
            <Text weight={1000} style={{ fontSize: "36px", color: "#fff" }}>
              {props.title}
            </Text>
            <Text weight={300} lineClamp={4} style={{ fontSize: "14px", color: "#fff" }}>
              {props.description}
            </Text>
            <Text
              component={Link}
              to={"/" + props.id}
              style={{
                position: "fixed",
                bottom: 10,
                right: 10,
                color: "#fff",
              }}
            >
              read more →
            </Text>
          </div>
        </SimpleGrid>
      </MediaQuery>
      <MediaQuery smallerThan="xs" styles={hide}>
        <div
          style={{
            width: "99%",
            height: "46vh",
            padding: "10px",
            backgroundImage: `url(${props.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Text weight={1000}  style={{ fontSize: "36px", color: "#fff" }}>
            {props.title}
          </Text>
          <Text weight={300} lineClamp={4} style={{ fontSize: "14px", color: "#fff" }}>
            {props.description}
          </Text>
          <Text
            component={Link}
            to={"/" + props.id}
            style={{ position: "fixed", bottom: 10, right: 10, color: "#fff" }}
          >
            read more →
          </Text>
        </div>
      </MediaQuery>
    </>
  );
}

export default SliderArticle;
