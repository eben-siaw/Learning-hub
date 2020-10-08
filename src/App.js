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


class App extends Component  {
   
  
  render() {  

    return (
      <Router> 
        <Switch> 

        <Route path="/register" component={SignUp} />

        <Route exact path="/" component={Login} /> 

        <Route path="/login" component={Login} />

        <Route path="/dashboard" component={Dashboard} /> 

        <Route path="/courseview/:meetingId/" component={CoursesTabs}  /> 

        {/* <Route path="/stream/new" component={Startstream} />

        <Route path="/streams" component={StreamList} />

        <Route path="/stream/watch/:id" component={StreamWatch} /> */}

        {/* <Route path="/viewer/streams" component={ViewerStreamList} /> */}

        {/* <Route path="/viewerstream/watch/:id" component={ViewerStreamWatch} /> */}

        <Route path="/notFound" component={NotFound} /> 
        </Switch>
      </Router>
    );
  }
}
export default App;

// connect our actions to the redux store 