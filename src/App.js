import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./fonts/icon-font/ionicons.css";  
import CoursesTabs from "../src/Pages/Dashboard/pages/CourseTablayout/CoursesTabs";
//Pages
import Dashboard from "./Pages/Dashboard";
import history from "./Pages/InstructorPage/history";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import NotFound from "./Components/NotFound";
import VideoConfig from "./Pages/InstructorPage/VideoConference/VideoConfig"; 
import PasswordReset from './Components/PasswordReset/Reset';
import ReactGa from 'react-ga'
import NewPassword from "./Components/PasswordReset/NewPassword";

class App extends Component  {
   
  componentDidMount() { 
   ReactGa.initialize('UA-180908848-1'); 

   ReactGa.pageview(window.location.pathname + window.location.search);
  }
  
  render() {  

    return (
      <Router> 
        <Switch> 

        <Route path="/register" component={SignUp} />

        <Route exact path="/" component={Login} /> 

        <Route path="/login" component={Login} /> 

        <Route path="/reset" component={PasswordReset} /> 

        <Route path="/reset-pass/:token" component={NewPassword} />

        <Route path="/dashboard" component={Dashboard} /> 

        <Route path="/courseview/:meetingId/" component={CoursesTabs}/>  

        <Route path="/Video/videoConference/:room" component={VideoConfig}/>

        <Route path="/notFound" component={NotFound} /> 
        </Switch>
      </Router>
    );
  }
}
export default App;

// connect our actions to the redux store 