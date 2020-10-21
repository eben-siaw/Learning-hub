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
import DeleteIcon from "@material-ui/icons/Delete";
import BookIcon from "@material-ui/icons/Book";
import { Link } from "react-router-dom";
import LoadingSpin from 'react-loading-spin';
import {useSelector} from 'react-redux'; 

const URL = "https://nilee-nodedatabase.herokuapp.com"; 

//const local = "http://localhost:5050"; 

const InstructorHub = () => { 
 
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true); 
  // get Courses created by the authenticated logged in user, url params
 
  const user = useSelector(state => state.auth.user._id)

  const getCourses = async () => {
    try {
      await axios.get(URL + `/courses/${user}/courses`)  
      .then(res => { 
        if(res.data.success) { 
          setCourses(res.data.course);  
          setLoading(false);
        }
      }) 
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios
        .delete(URL + `/courses/${user}/course/delete/${id}`)
        .then((res) => {
          return res.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  });

  const renderCourses = () => {
    return courses.map((course, index) => {
      return (
        <Grid md={6} xs={12} key={index} item style={{ position: "relative" }}>
          <Paper
            key={course._id}
            style={{
              padding: 10,
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h6">{course.course_name}</Typography>
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
                  to={`/courseview/${course.meetingId}/upload`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="outlined"
                    style={{
                      backgroundColor: "rgb(5, 31, 66)",
                      color: "#fff",
                      marginRight: 10,
                    }}
                  >
                    Proceed
                  </Button>
                </Link>
                <IconButton
                  onClick={() => deleteCourse(course._id)}
                  aria-label="delete"
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </CardContent>
          </Paper>
        </Grid>
      );
    });
  };

  if(courses.length < 1) { 
    return (    
      <div className="empty">   
        <div className="space">  <i className="ion-android-happy"></i> </div>
      <p>  You have not created any courses yet. </p> 
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
        .space { 
          padding-top: -10px; 
          font-size: 45px;
        }
        `}
      </style>
      </div>
    );
    
  }
  return (
    <div>
      <PageHeader title="Instructor Hub" useSearch={true} />
      <Container>
        <Grid
          container
          spacing={5}
          direction="row"
          className="course-list-container-inner"
        >
          {renderCourses()}   
          <div style={{paddingTop: 50}}> 
          {loading ? <LoadingSpin /> : null} 
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
};

export default InstructorHub;