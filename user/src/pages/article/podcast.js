import React from "react";
import { useParams } from "react-router";
import NavBar from "../../components/navbar";
import YoutubeEmbed from "../../components/YoutubeEmbed";
import { Text } from "@mantine/core";
import { Loader, Center} from "@mantine/core";
import axios from "axios";
import {useEffect, useState} from "react";
import Footer from "../../components/footer";


function PodcastPage() {
  let {id} = useParams();
  let [post, setPost] = useState("");
  
  useEffect(() => {
    async function getdata(){
      axios.get("http://localhost:3000/api/podcasts/allPodcasts/"+id).then((response) => {
        setPost(response.data);
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
  return (
    <div>
      <NavBar />
      
      <div style={{ paddingLeft: "5%", paddingTop: 1, paddingBottom: 50 }}>
        <h1 style={{ color: "#000000", fontSize: 40 }}>{post.title}</h1>
        <YoutubeEmbed embedId={post.podcastLink.substring(32,43)}/>
        <div style={{marginLeft:20, marginTop:20}}>
        <Text style={{fontSize:25, fontWeight:700}}>{post.videoTeaser}</Text>
        
        <Text>{post.details}</Text>

        </div>
      </div>
      <Footer/>
    </div>
  );
}
}

export default PodcastPage;
