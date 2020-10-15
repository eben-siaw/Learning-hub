import React, { Component, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Route, Switch } from "react-router-dom";
import DashboardNav from "./components/DashboardNav";
import Home from "./pages/Home";
import Videos from "./pages/Videos";
import CourseHub from "./pages/CourseHub";
import ViewerVideolist from "../InstructorPage/Videos/Components/ViewerVideolist";
import Settings from "./pages/Settings";
import UserProfile from "./components/UserProfile";
import Help from "./pages/Help";
import NotFound from "../../Components/NotFound";
import { connect } from "react-redux";
import { setCurrentUser, setLoggedIn } from "../../actions/index"; 
import {setCurrentCourse} from "../../actions/index";
import Lessons from './pages/Lessons';
import InstructorHub from "./pages/InstructorHub";
import axios from "axios";

const local = "http://localhost:5050"

const URL = "https://nilee-nodedatabase.herokuapp.com"; 

class Dashboard extends Component { 

  constructor() {
    super();
    this.state = {  
      notification: [],
      first_name: "",
      email: "",
      last_name: "",
      _id: null,
    }; 
  
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    if (!token) {
      window.location = "/";
    }
    const decoded = jwt_decode(token);
    this.setState({
      _id: decoded._id,
      first_name: decoded.first_name,
      email: decoded.email,
      last_name: decoded.last_name, 
      country: decoded.country, 
      region: decoded.region
    });
    this.props.setCurrentUser(decoded);  
    this.props.setLoggedIn(true); 

  } 
   

  render() {   

    return (
      <main>
        <div className="inner">
          <DashboardNav />

          <div className="content">
            <Switch>
              <Route exact path="/dashboard" render={() => <Home />} /> 

              <Route path="/dashboard/videos" render={() => <Videos />} /> 

              <Route
                path="/dashboard/coursehub/"
                component={CourseHub}
              />  
          
              <Route
                exact
                path="/dashboard/instructorhub"
                component={InstructorHub}
              />
              <Route path="/dashboard/settings" render={() => <Settings />} /> 

              <Route path="/dashboard/help" render={() => <Help />} /> 

              <Route path="/dashboard" render={() => <NotFound />} />
            </Switch>
          </div>

          <div className="side-content">
            <UserProfile user={this.state} /> 
          </div>
        </div>
        <style jsx>{`
          main {
            background: #fff;
            overflow: hidden;
          }
          .inner {
            display: grid;
            grid-template-columns: 80px 2fr 1fr;
            grid-template-areas: "navbar content side-content";
            height: 100vh;
          }

          .content {
            grid-area: content;
            padding: 20px;
            padding-bottom: 0;
          }
          .side-content {
            grid-area: side-content;
            padding: 20px;
            background-color: #fafafa;
          }

          @media (max-width: 920px) {
            .inner {
              grid-template-columns: 80px 1fr;
              grid-template-areas: "navbar content";
            }
            .side-content {
              position: fixed;
              left: 110%;
              top: 0;
              bottom: 0;
            }
          }
          @media (max-width: 500px) {
            .inner {
              grid-template-columns: 1fr;
              grid-template-rows: 60px 1fr;
              grid-template-areas: "navbar" "content";
            }
            .side-content {
              display: none;
            }
          }
        `}</style>
      </main>
    );
  }
}

export default connect(null, { setCurrentUser, setLoggedIn })(Dashboard);
