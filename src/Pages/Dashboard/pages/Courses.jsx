import PageHeader from "../components/PageHeader";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  Avatar,
  IconButton,
  CardContent,
} from "@material-ui/core";
import BookIcon from "@material-ui/icons/Book";
import { Link } from "react-router-dom";
import LoadingSpin from 'react-loading-spin';  
 import {useSelector, useDispatch} from 'react-redux';
 import Loader from 'react-loader-spinner';
 import "react-loader-spinner/dist/loader/css/react-spinner-loader.css" 
 
// Course Hub

const URL = "https://nilee-nodedatabase.herokuapp.com"; 

const local = "http://localhost:5050";

const Courses = (props) => {  
  
  const user = useSelector(state => state.auth.user._id);

  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true);  
  const [notFound, setNotFound] = useState(""); 

  const dispatch = useDispatch(); 
  // get Courses joined by the authenticated logged in user, url params

  const getCourses = () => {
   
    return axios.get(URL + `/courses/coursehub/${user}`)  
      .then(res => {    
        if(res.data.success) { 
          setCourses(res.data.course);    
          setLoading(false);  
        }
      }) 
  };

  useEffect(() => {
    getCourses(); 
  }, []);
   
  
 
  const renderCourses = courses.map((joined, index) => {  
     
      //if(course.meetingId == meetingId) {  

      return (
        <Grid md={6} xs={12} key={index} item style={{ position: "relative" }}>
          <Paper
            key={index}
            style={{
              padding: 10,
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h6">{joined.course.course_name}</Typography>  
              <br/>
              <Typography variant="h6">By {joined.course.user.first_name}</Typography> 
            </div>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  to={`/dashboard/coursehub/lessons/${joined.course.meetingId}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained" 
                    color="inherit"
                    style={{
                    //  backgroundColor: "rgb(5, 31, 66)",
                      color: "#fff",
                      marginRight: 10,
                    }}
                  >
                    View course
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Paper>
        </Grid>
      );  
     
    });
  
  
  if(courses.length < 1) {  
    return (  
      <div className="empty">  
       { loading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} timeout={10000} /> :  
        <p>  You have not joined any courses at the moment </p>  }
      <style jsx> {`
         .empty { 
          margin: 0;
          position: absolute;
          top: 50%;
          left: 50%;
         -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          font-size: 25px;
          color: black;
        } 
        `}
      </style>
      </div>
    );
    
  } else {  
    return (
      <div>
        <Container>
          <Grid
            container
            spacing={5}
            direction="row"
            className="course-list-container-inner"
          >          
            
            {renderCourses}    
  
            <div style={{paddingTop: 50}}> 
            {loading ? <LoadingSpin /> :  null} 
            </div> 
  
          </Grid> 
          <style jsx>
            {`
              .course-list-container-inner {
                height: 88vh;
                overflow: auto;
                padding-bottom: 20px;
              }
              .course-list-container-inner::-webkit-scrollbar {
                display: none;
              } 
  
              @media (max-width: 500px) {
                .course-list-container-inner {
                  height: 76vh;
                }
              }
            `}
          </style>
        </Container>
      </div>
    ); 
  
    
  }
  
 
};

export default Courses;
