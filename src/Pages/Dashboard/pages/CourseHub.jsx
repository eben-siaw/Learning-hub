import React,{Component} from "react";
import { Route } from "react-router-dom";
import Lessons from './Lessons';
import PageHeader from "../components/PageHeader"; 
import LessonView from './LessonView'
import Courses from "./Courses"; 
import CourseVideos from "./PrivateVideos/CourseVideos";
import InstructorVideo from "../../InstructorPage/Videos/Components/InstructorVideo";

 // coursehub shows the lessons and the videos for a course the user joined and video playback.

function CourseHub () {  
  
  return ( 

    <div>
    <PageHeader title="Course Hub" useSearch={true} /> 
    
      <div className="content-box">
       
        <Route exact path="/dashboard/coursehub/"  
        component={Courses} /> 

          
      <Route exact path="/dashboard/coursehub/lessons/:meetingId"  
        component={Lessons} />   

      <Route path="/dashboard/coursehub/videos/:meetingId"  
      component={CourseVideos} /> 

      <Route exact path="/dashbaord/coursehub/videoplay/:id" 
      component={InstructorVideo} />

      <Route exact path="/dashboard/coursehub/lessonsView/:id"  
        component={LessonView} /> 

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
export default CourseHub;