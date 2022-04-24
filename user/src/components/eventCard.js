import React from "react";
import { MediaQuery, Card, Image, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const hide = { display: "none" };
function EventCard(props) {
  return (
    <div>
      <MediaQuery largerThan="xs" styles={hide}>
        <Card
          style={{ width: "900px", height: "300px", marginTop:40 }}
          shadow="xl"
          padding="xl"
          //component={Link}
          //to={"/events/" + props.id}
        >
          <Card.Section>
            <Image src={`data:image/jpeg;base64,${props.src}`} height={450} withPlaceholder />
            
            <div style={{position:'absolute', paddingLeft:20,bottom:0, left:0, backgroundColor:'#00000066', height:100, width:'100%'}}>
            <Text style={{ marginTop: "10px", color:'#fff' }} weight={500} size="xl">
            {props.title}
            </Text>
            <Text size="sm" weight={500}  style={{  color:'#e3e3e3',paddingRight:20}}>
            {props.location}
            </Text>
            <Text size="sm" weight={500}  style={{  color:'#e3e3e3',paddingRight:20}}>
            {props.time}
            </Text>
            </div>
            
          </Card.Section>
          
        </Card>
      </MediaQuery>

      <MediaQuery smallerThan="xs" styles={hide}>
        <Card
          style={{ width: "400px", height: "300px" }}
          shadow="sm"
          padding="xl"
          component={Link}
          to={"/" + props.category + "/" + props.id}
        >
          <Card.Section>
            <Image src={`data:image/jpeg;base64,${props.src}`} height={300} withPlaceholder />
            <div style={{position:'absolute', paddingLeft:20,bottom:0, left:0, backgroundColor:'#00000066', height:100, width:'100%'}}>
            <Text style={{ marginTop: "10px", color:'#fff' }} weight={500} size="xl">
            {props.title}
            </Text>
            <Text size="sm" style={{  color:'#e3e3e3',paddingRight:20}}>
            {props.location}
            </Text>
            <Text size="sm" style={{  color:'#e3e3e3',paddingRight:20}}>
            {props.time}
            </Text>
            </div>
          </Card.Section>
          
        </Card>
      </MediaQuery>
    </div>
  );
}

export default EventCard;
