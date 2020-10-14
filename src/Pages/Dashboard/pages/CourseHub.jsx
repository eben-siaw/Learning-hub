import React,{Component} from "react";
import { Route } from "react-router-dom";
import Lessons from './Lessons';
import PageHeader from "../components/PageHeader"; 
import LessonView from './LessonView'
import Courses from "./Courses"; 


function CourseHub () {  
  
  return ( 

    <div>
    <PageHeader title="Course Hub" useSearch={true} /> 
    
      <div className="content-box">
       
        <Route exact path="/dashboard/coursehub/"  
        component={Courses} /> 

          
      <Route exact path="/dashboard/coursehub/lessons/:meetingId"  
        component={Lessons} />  

      <Route exact path="/dashboard/coursehub/lessonsView/:meetingId"  
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