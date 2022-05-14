import React from "react";
import { useParams } from "react-router";
import NavBar from "../../components/navbar";
import YoutubeEmbed from "../../components/YoutubeEmbed";
import {Text } from "@mantine/core";
import { Loader, Center} from "@mantine/core";
import axios from "axios";
import {useEffect, useState} from "react";
import Footer from "../../components/footer";
import SeeMore from "../../components/seealso";

function PodcastPage() {
  let {id} = useParams();
  let [post, setPost] = useState("");
  const hide = { display: "none",width:0,height:0 };
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
     
      <div style={{display:'flex', flexDirection:'row'}}>
      <div style={{width:'70%', paddingLeft: "5%", paddingTop: 1, paddingBottom: 50 }}>
        <h1 style={{ color: "#000000", fontSize: 40 }}>{post.title}</h1>
        <YoutubeEmbed embedId={post.podcastLink.substring(32,43)}/>
        <div style={{marginLeft:20, marginTop:20}}>
        <Text style={{fontSize:25, fontWeight:700}}>{post.videoTeaser}</Text>
        
        <Text>{post.details}</Text>

        </div>
      </div>
      <div style={{width:'25%', marginTop:'100px'}}>
        <SeeMore/>
      </div>
      </div>

     
      <Footer/>
    </div>
  );
}
}

export default PodcastPage;