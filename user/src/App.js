import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./pages/notFoundPage";
import LandingPage from "./pages/landingPage";
import LoginNav from "./pages/auth/loginNavigation";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import WelcomePage from "./pages/welcomepage";
import CategoryContent from "./pages/article/categoryContent";
import Article from "./pages/article/article";
import EventContent from "./pages/article/eventContent";
import PodcastPage from "./pages/article/podcast";
import SubCategoryContent from "./pages/article/subcategoryContent";
import EventSubCategoryContent from "./pages/article/eventsubcategoryContent";
import './App.css';
import SearchResult from "./pages/searchresult";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route exact path="/loginNavigation">
            <LoginNav />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>

          <Route exact path="/welcome">
            <WelcomePage />
          </Route>

          <Route exact path="/:category(news|blogs|podcasts)">
            <CategoryContent />
          </Route>

          <Route exact path="/:category(news|blogs|podcasts)/:subcategory">
            <SubCategoryContent />
          </Route>

          <Route exact path="/:category(news|blogs)/:subcategory/:id">
            <Article />
          </Route>

          <Route exact path="/events">
            <EventContent/>
          </Route>
          
          <Route exact path="/events/:id">
            <EventSubCategoryContent/>
          </Route>

          <Route exact path="/podcasts/:subcategory/:id">
            <PodcastPage/>
          </Route>

          <Route exact path="/search/:query">
            <SearchResult/>
          </Route>

          <Route exact path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;