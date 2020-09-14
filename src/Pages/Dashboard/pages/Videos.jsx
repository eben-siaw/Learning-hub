import React from "react";
import { Route } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ViewerStreamList from "../../InstructorPage/LiveStreams/Components/ViewerStreamlist";
import Startstream from "../../InstructorPage/LiveStreams/Startstream";
import EditStream from "../../InstructorPage/LiveStreams/Components/EditStream";
import ViewerStreamWatch from "../../InstructorPage/LiveStreams/Components/ViewerStreamWatch"; 
import StreamList from "../../InstructorPage/LiveStreams/Components/Streamlist"; 
import Instructorlive from "../../InstructorPage/LiveStreams/Components/InstructorLive";
import UploadVideo from "../../InstructorPage/Videos/UploadVideo";

function Videos() {
  return (
    <div>
      <PageHeader title="Videos" useSearch={true} />
      <div className="content-box">
        <Route
          exact
          path="/dashboard/viewersvideo"
          render={() => <ViewerStreamList />}
        />
        <Route
          exact
          path="/dashboard/videos/new"
          render={() => <UploadVideo />}
        /> 

       <Route   
       exact  
       path="/dashboard/videoslist"
       render={() => <VideoList/> }
       /> 

        <Route
          exact
          path="/dashboard/videos/edit/:videoId"
          render={() => <EditVideo />}
        /> 
        <Route
          exact
          path="/dashboard/videos/watch/:videoId"
          render={() => <Instructorlive/>}
        /> 
      </div>
    </div>
  );
}

export default Videos;
