import { Center, Group, Space, Text, Affix, Transition, ActionIcon,Loader } from "@mantine/core";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router";
import NavBar from "../components/navbar";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import SliderArticle from "../components/sliderArticle";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import LatestNews from "../components/latestComp";
import Footer from "../components/footer";
import { useWindowScroll } from '@mantine/hooks';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import axios from "axios";
import get_youtube_thumbnail from "../components/getthumbnail";
import LatestNewsNoB from "../components/latestCompNoB";
import EventCard from "../components/eventCard";
import ArticleCard from "../components/articleCard";
import ArticleCardNoB from "../components/articleCardNoB";

function SearchResult() {
    const [scroll, scrollTo] = useWindowScroll();
    let {query} = useParams();
  let [blogs, setBlogs] = useState();
  let [pods, setPods] = useState();
  let [evnts, setEvnts] = useState();
  let [nws, setNws] = useState();

  useEffect(() => { 
    document.title = "Home Page"
    function getdata(){
      axios.get("http://localhost:3000/api/blogs/allblogs").then((response) => {
        setBlogs(response.data);
      });
      axios.get("http://localhost:3000/api/podcasts/allpodcasts").then((response) => {
        setPods(response.data);
      });
      axios.get("http://localhost:3000/api/event/allEvents").then((response) => {
        setEvnts(response.data);
      });
      axios.get("http://localhost:3000/api/news/allNews").then((response) => {
        setNws(response.data);
      });
    }
    getdata();
    
  }, []);

  let rows = []
  

  if (!blogs || !pods || !evnts || !nws){
    return(
      <Center style={{ widt: "100%", height: "80vh" }}>
      <Loader color="dark" size="xl" variant="bars" />
    </Center>
      );
  }

else{
    nws.map((blog) => {
        if (blog.title.toLowerCase().includes(query.toLowerCase()))
    rows.push(
      <ArticleCard
      title={blog.title}
      id={blog._id}
      category="news"
      subcategory={blog.category.title}//{piece.category}
      description={blog.content}
      src={blog.newsImages[0]}
    />
    )      
  })

  blogs.map((blog) => {
    if (blog.title.toLowerCase().includes(query.toLowerCase()))
rows.push(
  <ArticleCard
  title={blog.title}
  id={blog._id}
  category="blogs"
  subcategory={blog.category.title}//{piece.category}
  description={blog.content}
  src={blog.image}
/>
)      
})

pods.map((blog) => {
    if (blog.title.toLowerCase().includes(query.toLowerCase()))
    rows.push(
        <ArticleCardNoB
        title={blog.title}
        id={blog._id}
        category="podcasts"
        subcategory={blog.category.title}//{piece.category}
        description={blog.details}
        src={get_youtube_thumbnail(blog.podcastLink)}
      />);
})

evnts.map((blog) => {
    if (blog.title.toLowerCase().includes(query.toLowerCase()))
    rows.push(<EventCard id={blog._id} title={blog.title} location={blog.location} time={blog.hour} src={blog.eventPoster}></EventCard>)
})

  return (
    <div>
    <NavBar />
    
    <div style={{ backgroundColor: "#f5f5f5", width: "100%", height: "100%" }}/>
    <div style={{marginLeft:'30px'}}>
    <h1 style={{ color: "#000000", fontSize: 40, marginTop:'40px' }}>search results:</h1>
    
    {rows}
    </div>
    <Footer/> 
    </div>

  );
}}

export default SearchResult;