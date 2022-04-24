import React,{useEffect, useState} from "react";
import { useParams } from "react-router";
import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import { Loader, Center,Image} from "@mantine/core";
import axios from "axios";

function Article() {
  let { id, category} = useParams();
  let [post, setPost] = useState("");
  let [imgx, setImgx] = useState("");
  
  useEffect(() => {
    async function getdata(){
      if (category==='news'){
        axios.get("http://localhost:3000/api/news/oneNews/"+id).then((response) => {
        setPost(response.data);
        setImgx(response.data.newsImages);
        document.title = category     
        //alert(JSON.stringify(post))
      });
      }
      else{
      axios.get("http://localhost:3000/api/blogs/detail/"+id).then((response) => {
        setPost(response.data);
        setImgx(response.data.image);
      });
    }
    }
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
    <div style={{height:window.innerHeight,marginBottom:'350px'}}>
      <NavBar />
   
      <div style={{ height:'100vh', width:'80%' , marginLeft:'30px', marginTop:'80px'}}>
        <h1 style={{ color: "#000000", fontSize: 40 }}>{post.title}</h1>
        <h1 style={{ color: "#353535", fontSize: 12, marginTop:'-20px' }}>{post.createdAt.substring(0,10)} - {post.createdAt.substring(11,16)}</h1>
        <Image src={`data:image/jpeg;base64,${imgx}`} alt="dis a pic" style={{width:'60%', float:'right', margin:'20px'}}/>
        
        <p style={{textAlign: 'justify',textJustify: 'inter-word', fontSize:'18px'}}>{post.content}</p>
        <div style={{width:'100%', display:'flex', alignItems:'flex-end',justifyContent:'flex-end'}}>
        
        <p style={{fontFamily: "MonteCarlo, cursive", fontSize:'36px'}}>-{post.author}</p>
        </div>
      </div>
      <Footer/>
    </div>
  );}
}

export default Article;
