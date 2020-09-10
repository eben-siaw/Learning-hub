import PageHeader from "../components/PageHeader";    
import axios from 'axios';
import React, { Fragment, useEffect, useState } from "react";
import {Container,Paper,Grid,Typography, Button,Avatar, IconButton,CardContent,} from '@material-ui/core';  
import DeleteIcon from '@material-ui/icons/Delete'; 
import BookIcon from '@material-ui/icons/Book'
import { Link } from 'react-router-dom';

const URL = "http://localhost:5050"

const Courses = ({user}) => { 

   const [courses, setCourses] = useState([]);
    // get Courses created by the authenticated logged in user, url params
  
  const getCourses = async()  => { 
    try {
      const res = await axios.get(URL + `/courses/${user._id}/courses`);
      setCourses(res.data);
    } catch (error) {
       console.log(error)
    }
 
  };  

  const deleteCourse = async id => {
		try {
      await axios.delete(URL + `/courses/${user.id}/course/delete/${id}`) 
       .then(res=>{ 
        return res.data;
      })
		} catch (error) {
			console.log(error);
		}
	};
  
  useEffect(()=> { 
    getCourses();
  })

  const renderCourses = () => { 

    return courses.map((course, index) => {
      return (
        <Grid
          item
          xs={6}
          sm={6}
          key={course._id}
          style={{ marginBottom: 20, position: 'relative' }}>
          <Paper
            style={{
              padding: 10,
              height: '100%',
            }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
            
              <Typography
                variant="h6"
                style={{
                  paddingLeft: 10, 
                }}> 
              {course.course_name}
              </Typography>
            </div>
            <CardContent> 
              <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Link
                  to={`/dashboard/streams/new`}
                  style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    style={{
                      backgroundColor: 'rgb(5, 31, 66)',
                      color: '#fff',
                      marginRight: 10,
                    }}>
                     Proceed
                  </Button>
                </Link>             
                <IconButton  
                onClick={() => deleteCourse(course._id)}
                  aria-label="delete" color="secondary">
                 <DeleteIcon />
                </IconButton>              
              </div>
            </CardContent>
          </Paper>
        </Grid>
      );
    });
  };
  console.log(courses);

  return ( 
    <div>  
   <PageHeader title="Course Hub" useSearch={true}/>  
   <Container>
        <Grid className="course-list-container-inner">
          {renderCourses()}
        </Grid> 
        <style jsx>{` 
            .course-list-container-inner {
              height: 88vh;
              overflow: auto;
              padding-bottom: 20px;
            }
            .course-list-container-inner::-webkit-scrollbar {
              display: none;
            } 
            `} 
        </style>
      </Container>

   </div>
  );
};

export default Courses;