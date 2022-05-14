import React,{useEffect, useState} from "react";
import { useParams } from "react-router";
import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import { Loader, Center,Image} from "@mantine/core";
import axios from "axios";
import SeeMore from "../../components/seealso";
import ReactHtmlParser from 'react-html-parser'; 

function Article() {
  let { id, category} = useParams();
  let [post, setPost] = useState("");
  let [imgx, setImgx] = useState("");
  let [imgar, setImgar] = useState([]);
  var imgrows = []

  function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }
  useEffect(() => {
    async function getdata(){
      if (category==='news'){
        axios.get("http://localhost:3000/api/news/oneNews/"+id).then((response) => {
        setPost(response.data);
        setImgx(response.data.newsImages[0]);
        document.title = category;
        //setImgar(response.data.newsImages);
        
        
        
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

      if (category==='news'){
        post.newsImages.slice(1).map((img) => {
          imgrows.push(<Image src={`data:image/jpeg;base64,${img}`} alt="dis a pic" style={{width:'75%', margin:'15px'}}/>);
          
        })

      }

      
     
  return (
    <div style={{height:window.innerHeight}}>
      <NavBar />
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <Image src={`data:image/jpeg;base64,${imgx}`} alt="dis a pic" style={{width:'100%'}}/>
      <h1 style={{ color: "#fff", fontSize: 60, position:'absolute', textAlign:'center' }}>{post.title}</h1>
      </div>
      
      
      <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap',flexFlow:'wrap row'}}>
      <div style={{ width:'75%' , marginLeft:'30px', marginTop:'80px'}}>
        <h1 style={{ color: "#353535", fontSize: 12, marginTop:'-20px' }}>{post.createdAt.substring(0,10)} - {post.createdAt.substring(11,16)}</h1>
        
        <p style={{textAlign: 'justify',textJustify: 'inter-word', fontSize:'18px', lineHeight:'15  0%'}}>{ReactHtmlParser(post.content)}</p>
        
        <div>
        {imgrows}
        </div>
        <div style={{width:'100%', display:'flex', alignItems:'flex-end',justifyContent:'flex-end'}}>
        
        <p style={{fontFamily: "MonteCarlo, cursive", fontSize:'36px'}}>-{post.author}</p>
        
        </div>
        
      </div>
      <div style={{width:'20% ', marginLeft:'10px',flexGrow:'initial'}}>
        <SeeMore/>
      </div>
      </div>
      
      <Footer/>
      
    </div>
  );}
}

function Quoi(){
  return(
    <div>hadha compoenent</div>
  )
}

export default Article;