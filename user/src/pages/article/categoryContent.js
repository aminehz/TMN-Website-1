import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ArticleCard from "../../components/articleCard";
import NavBar from "../../components/navbar";
import { Loader, Center } from "@mantine/core";
import axios from "axios";
import Footer from "../../components/footer";
import ArticleCardNoB from "../../components/articleCardNoB";
import get_youtube_thumbnail from "../../components/getthumbnail";

function CategoryContent() {
  let { category } = useParams();
  let [post, setPost] = useState();
  var rows = [];

  
/*function getcategory(categoryid){
  axios.get("http://localhost:3000/api/categorys/allCategorys/"+categoryid).then((response) => {
    alert(response.data);
  });
}*/

  useEffect(() => { 
    function getdata(){
      axios.get("http://localhost:3000/api/"+category+"/all"+category).then((response) => {
        setPost(response.data);
          document.title = category
        
      });}
    getdata();
    
  }, [category]);

  if (post){

    post.map((piece) => {
      if (category === 'podcasts'){
        rows.push(
        <ArticleCardNoB
        title={piece.title}
        id={piece._id}
        category="podcasts"
        subcategory={piece.category.title}//{piece.category}
        description={piece.details}
        src={get_youtube_thumbnail(piece.podcastLink)}
      />);
      }
      else if (category==='news'){
          rows.push(
            <ArticleCard
              title={piece.title}
              id={piece._id}
              category={category}
              subcategory={piece.category.title}//{piece.category}
              description={piece.content}
              src={piece.newsImages[0]}
            />
          );
        }
        else{
    rows.push(
      <ArticleCard
        title={piece.title}
        id={piece._id}
        category={category}
        subcategory={piece.category.title}//{piece.category}
        description={piece.content}
        src={piece.image}
      />
    );
    }
      
    rows.reverse();
    
    return "";
 });
}

if (!post)
return (
  <Center style={{ widt: "100%", height: "80vh" }}>
    <Loader color="dark" size="xl" variant="bars" />
  </Center>
);
else{
return (
<div>
  <NavBar />
  
  <div style={{ }}>
    <h1 style={{ color: "#000000", fontSize: 40, marginLeft:'30px', marginTop:'70px'  }}>{category}</h1>
    <div style={{marginLeft:'30px'}}>
    {rows}
    </div>
  </div>
  <Footer/> 
</div>
);}
}

export default CategoryContent;
