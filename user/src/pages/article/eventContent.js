import React from "react";
import EventCard from "../../components/eventCard";
import NavBar from "../../components/navbar";
import {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Loader, Center} from "@mantine/core";
import Footer from "../../components/footer";

function EventContent() {
  let [post, setPost] = useState("");
  let {id} = useParams();
  var rows = [];

  useEffect(() => {
    async function getdata(){
      axios.get("http://localhost:3000/api/event/allEvents").then((response) => {
        setPost(response.data);
        document.title = "events"
        
        //alert(JSON.stringify(post))
      });}
    getdata();
    
  }, [id,post]);

  if (post){
    

}
  
 if (!post)
    return (
      <Center style={{ width: "100%", height: "80vh" }}>
        <Loader color="dark" size="xl" variant="bars" />
      </Center>
    );
    else{
      post.map((piece) => {
        rows.push(<EventCard id={piece._id} title={piece.title} location={piece.location} time={piece.hour} src={piece.eventPoster}></EventCard>)
      })
      rows.reverse();
  return (
    <div>
      <NavBar />
      <div style={{ paddingLeft: "5%", paddingTop: 1, paddingBottom: 50 }}>
        <h1 style={{ color: "#000000", fontSize: 40 }}>Events</h1>

        {rows}
      </div>
      <Footer/>
    </div>
  );
}
}

export default EventContent;
