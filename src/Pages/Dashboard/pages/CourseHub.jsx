import React,{Component} from "react";
import { Route } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Courses from "./Courses"; 
import {connect} from 'react-redux'; 
import jwt_decode from 'jwt-decode'; 
import { setCurrentCourse } from "../../../actions";

class CourseHub extends Component {  
  
  componentDidMount() {  
    const {match : {params} } = this.props; 

    this.props.setCurrentCourse(params.meetingId);
  } 

 render() { 

  return ( 

    <div>
    <PageHeader title="Course Hub" useSearch={true} /> 
    
      <div className="content-box">
       
        <Route exact path="/dashboard/coursehub/:meetingId"  
        component={Courses} />

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

}
export default connect(null, {setCurrentCourse})(CourseHub);