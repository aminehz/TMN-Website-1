import { Center, Group, Space, Text, Affix, Transition, ActionIcon,Loader } from "@mantine/core";
import React, {useState, useEffect} from "react";
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

const AutoplaySlider = withAutoplay(AwesomeSlider);

function LandingPage() {
  const [scroll, scrollTo] = useWindowScroll();
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

  if (!blogs || !pods || !evnts || !nws){
    return(
      <Center style={{ widt: "100%", height: "80vh" }}>
      <Loader color="dark" size="xl" variant="bars" />
    </Center>
      );
  }



  return (
    <div>
      <NavBar />
      <div
        style={{ backgroundColor: "#f5f5f5", width: "100%", height: "100%" }}
      >
        <Space />
        <Center>
          <AutoplaySlider
            organicArrows={false}
            play={true}
            cancelOnInteraction={false}
            interval={6000}
            style={{ marginTop: "50px", width: "80%", height: "50vh" }}
          >
            <div>
              <SliderArticle
                src={'data:image/png;base64,'+blogs[0].image}
                id={'blogs/'+blogs[0].category.title+"/"+blogs[0]._id}
                title={blogs[0].title}
                description={blogs[0].content}
              />
            </div>
            <div>
            <SliderArticle
                src={'data:image/png;base64,'+blogs[1].image}
                id={'blogs/'+blogs[1].category.title+"/"+blogs[1]._id}
                title={blogs[1].title}
                description={blogs[1].content}
              />
            </div>
            <div>
            <SliderArticle
                src={'data:image/png;base64,'+nws[0].newsImages}
                id={'news/'+nws[0].category.title+"/"+nws[0]._id}
                title={nws[0].title}
                description={nws[0].content}
              />
            </div>
          </AutoplaySlider>
        </Center>
        <div
          style={{ marginTop: "50px", marginLeft: "50px", marginRight: "50px" }}
        >
          <Text weight={900} style={{ fontSize: "46px" }}>
            latest news:
          </Text>
          <Group position="center">
            <LatestNews
              id={nws[0]._id}
              category='news'
              subcategory={nws[0].category.title}
              title={nws[0].title}
              description={nws[0].content}
              src={nws[0].newsImages}
            />
            <LatestNews
              id={nws[1]._id}
              category='news'
              subcategory={nws[1].category.title}
              title={nws[1].title}
              description={nws[1].content}
              src={nws[1].newsImages}
            />
            <LatestNews
              id={nws[2]._id}
              category='news'
              subcategory={nws[2].category.title}
              title={nws[2].title}
              description={nws[2].content}
              src={nws[2].newsImages}
            />
          </Group>
          <Text weight={900} style={{ fontSize: "46px" }}>
            latest blogs:
          </Text>
          <Group position="center">
          <LatestNews
              id={blogs[0]._id}
              category='blogs'
              subcategory={blogs[0].category.title}
              title={blogs[0].title}
              description={blogs[0].content}
              src={blogs[0].image}
            />
            <LatestNews
              id={blogs[1]._id}
              category='blogs'
              subcategory={blogs[1].category.title}
              title={blogs[1].title}
              description={blogs[1].content}
              src={blogs[1].image}
            />
            <LatestNews
              id={blogs[2]._id}
              category='blogs'
              subcategory={blogs[2].category.title}
              title={blogs[2].title}
              description={blogs[2].content}
              src={blogs[2].image}
            />
          </Group>
          <Text weight={900} style={{ fontSize: "46px" }}>
            latest podcasts:
          </Text>
          <Group position="center">
            <LatestNewsNoB
              id={pods[0]._id}
              category='podcasts'
              subcategory={pods[0].category.title}
              title={pods[0].title}
              description={pods[0].details}
              src={get_youtube_thumbnail(pods[0].podcastLink)}
              />
            <LatestNewsNoB
              id={pods[1]._id}
              category='podcasts'
              subcategory={pods[1].category.title}
              title={pods[1].title}
              description={pods[1].details}
              src={get_youtube_thumbnail(pods[1].podcastLink)}
              />
              <LatestNewsNoB
              id={pods[2]._id}
              category='podcasts'
              subcategory={pods[2].category.title}
              title={pods[2].title}
              description={pods[2].details}
              src={get_youtube_thumbnail(pods[2].podcastLink)}
              />
          </Group>
          <Text weight={900} style={{ fontSize: "46px" }}>
            latest events:
          </Text>
          <Group position="center">
          <EventCard id={evnts[0]._id} title={evnts[0].title} location={evnts[0].location} time={evnts[0].hour} src={evnts[0].eventPoster}/>
          <EventCard id={evnts[1]._id} title={evnts[1].title} location={evnts[1].location} time={evnts[1].hour} src={evnts[1].eventPoster}/>
          <EventCard id={evnts[2]._id} title={evnts[2].title} location={evnts[2].location} time={evnts[2].hour} src={evnts[2].eventPoster}/>
    
          </Group>
          <Space />
        </div>
      </div>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ActionIcon
              leftIcon={<Text>Up</Text>}
              style={{borderRadius:'50px', width:'40px', height:'40px', opacity:'0.7', backgroundColor:'#000'}}
              onClick={() => scrollTo({ y: 0 })}
              variant="filled"
              borderRadius={50}
            >
              <ArrowUpwardRoundedIcon ></ArrowUpwardRoundedIcon>
            </ActionIcon>
          )}
        </Transition>
      </Affix>
      <Footer/>
    </div>
  );
}

export default LandingPage;
