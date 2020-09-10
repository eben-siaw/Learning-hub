import React, {Component } from "react"; 
import jwt_decode from 'jwt-decode';
import { Route, Switch } from "react-router-dom";
import DashboardNav from "./components/DashboardNav";
import Home from "./pages/Home";
import Streams from "./pages/Streams";
import Courses from "./pages/Courses"; 
import ViewerStreamList from '../InstructorPage/LiveStreams/Components/ViewerStreamlist';
import Settings from "./pages/Settings";
import UserProfile from "./components/UserProfile";
import Help from "./pages/Help";
import NotFound from "../../Components/NotFound";
import {connect} from "react-redux";  
import {
  setCurrentUser,
} from "../../actions/index"; 

class Dashboard extends Component  {
     
 constructor() { 
   super(); 
  this.state = { 
   first_name: "", 
   email: "", 
   last_name: "", 
   _id: null
 }
 }

 componentDidMount() {  
  const token = localStorage.usertoken;
   if(!token) { 
     window.location = "/login"
   }
  const decoded = jwt_decode(token);    
  this.setState({ 
    _id: decoded._id, 
    first_name: decoded.first_name,  
    email: decoded.email,
    last_name: decoded.last_name
  }) 
  this.props.setCurrentUser(decoded);
 }

  render() { 
    return (
      <main>
        <div className="inner">
          <DashboardNav />

          <div className="content">
            <Switch>
              <Route exact path="/dashboard" render={() => <Home />} />
              <Route path="/dashboard/streams" render={() => <Streams />} />
              <Route path="/dashboard/courses" render={() => <Courses user={this.state} />} />  
              <Route exact path="/dashboard/viewerstreams" render={() => <ViewerStreamList user={this.state}/>} />
              <Route path="/dashboard/settings" render={() => <Settings />} />
              <Route path="/dashboard/help" render={() => <Help />} />
              <Route path="/dashboard" render={() => <NotFound />} />
            </Switch>
          </div>

          <div className="side-content">
            <UserProfile user={this.state}/>
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
              grid-template-rows: 80px 1fr;
              grid-template-areas: "navbar" "content";
            }
          }
        `}</style>
      </main>
    );
  
} 

}

export default connect(null,{setCurrentUser})(Dashboard);
