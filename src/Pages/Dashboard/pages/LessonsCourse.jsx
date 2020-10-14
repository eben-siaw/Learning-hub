/*import React from "react";
import { Route } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import LessonView from './LessonView';
import Lessons from "./Lessons";

function LessonCourse() {
  return (
    <div>
      <PageHeader title="Lessons" useSearch={true} />
      <div className="content-box">
        

        <Route exact path="/dashboard/lessons" 
        render={() => <Lessons />} />

        <Route
          exact
          path="/dashboard/lessons/view/:id"
          component={LessonView}
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

export default LessonCourse; 
*/