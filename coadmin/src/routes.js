import React from "react";
import { Redirect,} from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewBlog from "./views/Addnewblog";

import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";

import BlogPosts from "./views/BlogPosts";
import CoAdmin from "./views/CoAdmin";
import BlogsApproval from "./views/BlogsApproval";
import PodcastSApproval from "./views/PodcastSApproval";
import NewsApproval from "./views/NewsApproval";
import EventsApproval from "./views/EventsApproval";
import Categories from "./views/Categories";
import NewSubCategory from "./views/NewSubCategory";
import AddNewNews from "./views/AddNewNews";
import AddNewEvent from "./views/AddNewEvent";
import AddNewPodcast from "./views/AddNewPodcast";
import BlogDetails from "./views/BlogDetails";
import PodcastDetails from "./views/PodcastDetails";
import EventDetails from "./views/EventDetails";
import NewsDetails from "./views/NewsDetails";
import Login from "./views/Login";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,

    component: () => <Redirect to="/coadmin" />
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/new-blog",
    layout: DefaultLayout,
    component: AddNewBlog
  },
  {
    path: "/new-news",
    layout: DefaultLayout,
    component: AddNewNews
  },
  {
    path: "/new-event",
    layout: DefaultLayout,
    component: AddNewEvent
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/co-admin",
    layout: DefaultLayout,
    component: CoAdmin 
  },
  {

    path: "/categories",
    layout: DefaultLayout,
    component: Categories 
  },
 
  {
    path: "/new-Subcategory",
    layout: DefaultLayout,
    component: NewSubCategory 
  },
 
  {
    path: "/Blogs-management",
    layout: DefaultLayout,
    component: BlogsApproval 
  },
  {
    path: "/Podcasts-management",
    layout: DefaultLayout,
    component: PodcastSApproval 
  },
  {
    path: "/News-management",
    layout: DefaultLayout,
    component: NewsApproval
  },
  {
    path: "/Events-management",
    layout: DefaultLayout,
    component: EventsApproval
  },
  
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/Blog-Details/:id",
    layout: DefaultLayout,
    component: BlogDetails
  },
  {
    path: "/event-Details/:id",
    layout: DefaultLayout,
    component: EventDetails
  },
  {
    path: "/news-details/:id",
    layout: DefaultLayout,
    component: NewsDetails
  },
  {
    path: "/podcast-Details/:id",
    layout: DefaultLayout,
    component: PodcastDetails
  },
  {
    path: "/new-podcast",
    layout: DefaultLayout,
    component: AddNewPodcast
  },
];
