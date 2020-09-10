import React from "react";
import { Route } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ViewerStreamList from "../../InstructorPage/LiveStreams/Components/ViewerStreamlist";
import Startstream from "../../InstructorPage/LiveStreams/Startstream";
import EditStream from "../../InstructorPage/LiveStreams/Components/EditStream";
import ViewerStreamWatch from "../../InstructorPage/LiveStreams/Components/ViewerStreamWatch"; 
import StreamList from "../../InstructorPage/LiveStreams/Components/Streamlist"; 
import Instructorlive from "../../InstructorPage/LiveStreams/Components/InstructorLive";

function Streams() {
  return (
    <div>
      <PageHeader title="Streams" useSearch={true} />
      <div className="content-box">
        <Route
          exact
          path="/dashboard/viewerstreams"
          render={() => <ViewerStreamList />}
        />
        <Route
          exact
          path="/dashboard/streams/new"
          render={() => <Startstream />}
        /> 

       <Route   
       exact  
       path="/dashboard/streams"
       render={() => <StreamList/> }
       /> 

        <Route
          exact
          path="/dashboard/streams/edit/:id"
          render={() => <EditStream />}
        /> 
        <Route
          exact
          path="/dashboard/streams/watch/:id"
          render={() => <Instructorlive/>}
        /> 
      </div>
    </div>
  );
}

export default Streams;
