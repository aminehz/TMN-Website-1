import { Text, Image,Center,Loader, Box } from "@mantine/core";
import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function SeeMore() {
    let [blogs, setBlogs] = useState();
    let [nws, setNws] = useState();
    useEffect(() => { 
        document.title = "Home Page"
        function getdata(){
          axios.get("http://localhost:3000/api/blogs/allblogs").then((response) => {
            setBlogs(response.data);
          });
          axios.get("http://localhost:3000/api/news/allNews").then((response) => {
            setNws(response.data);
          });
        }
        getdata();
        
      }, []);

      if (!blogs || !nws){
        return(
          <Center style={{ width: "100%", height:'50%' }}>
          <Loader color="dark" size="xl" />
        </Center>
          );
      }
    return ( 
        <div style={{width:'100%',height:'100%', paddingLeft:10,paddingTop:10}}>
            <h3>See Also:</h3>
            <Smarticle category="news" subcategory={nws[0].category.title} id={nws[0]._id} title={nws[0].title} src={nws[0].newsImages[0]} date={nws[0].createdAt.substring(0,10)}/>
            <Smarticle category="news" subcategory={nws[1].category.title} id={nws[1]._id} title={nws[1].title} src={nws[1].newsImages[0]} date={nws[1].createdAt.substring(0,10)}/>
            <Smarticle category="blogs" subcategory={blogs[0].category.title} id={blogs[0]._id} title={blogs[0].title} src={blogs[0].image} date={blogs[0].createdAt.substring(0,10)}/>
        </div>
     );
}

function Smarticle(props){
    return(
    <Box style={{textDecoration:'none', width:'280px', height:'100px', display:'flex', marginTop:'5px'}} component={Link} to={"/" + props.category + "/" + props.subcategory + "/" +props.id}>
        <div style={{ width:'150px'}}>
        <img src={`data:image/jpeg;base64,${props.src}`} alt="dis a pic" style={{width:'150px', height:'100%',objectFit:'cover'}}/>
        </div>
        <div style={{ width:'130px'}}>
            <div style={{width:'100%', height:'70%', marginLeft:'5px'}}>
                <Text weight={700}>{props.title}</Text>
            </div>
            <div style={{width:'130px', height:'30%', marginLeft:'5px'}}>
            <Text weight={100} style={{fontSize:'14px'}}>{props.date}</Text>
            </div>

        </div>
        
    </Box>
    );
}

export default SeeMore;