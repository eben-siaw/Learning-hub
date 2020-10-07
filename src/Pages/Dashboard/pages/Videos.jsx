import React from "react";
import { Route } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ViewerVideolist from "../../InstructorPage/Videos/Components/ViewerVideolist";
import EditVideo from "../../InstructorPage/Videos/Components/EditVideo";
import VideoList from "../../InstructorPage/Videos/Components/Videolist";
import InstructorVideo from "../../InstructorPage/Videos/Components/InstructorVideo";
import UploadVideo from "../../InstructorPage/Videos/UploadVideo";

function Videos() {
  return (
    <div>
      <PageHeader title="Videos" useSearch={true} />
      <div className="content-box">
        <Route
          exact
          path="/dashboard/viewersvideo"
          render={() => <ViewerVideolist />}
        />
        <Route
          exact
          path="/dashboard/videos/new"
          render={() => <UploadVideo />}
        />

        <Route exact path="/dashboard/videos" render={() => <VideoList />} />

        <Route
          exact
          path="/dashboard/videos/edit/:id"
          render={() => <EditVideo />}
        />
        <Route
          exact
          path="/dashboard/videos/watch/:videoId"
          component={InstructorVideo}
        />
      </div>
      <style jsx>{`
        .content-box {
          height: 88vh;
          overflow: auto;
        }
        .content-box::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 500px) {
          .content-box {
            height: 76vh;
            overflow: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default Videos;
