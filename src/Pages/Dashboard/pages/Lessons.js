import React,{useEffect, useState} from 'react';  
import PageHeader from "../components/PageHeader"; 
import { makeStyles } from '@material-ui/core/styles'; 
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper'; 
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';  
import {Link} from 'react-router-dom'
import { Typography } from '@material-ui/core';
import LoadingSpin from "react-loading-spin";  
import {useSelector} from 'react-redux';

const local = "http://localhost:5050"

const URL = "https://nilee-nodedatabase.herokuapp.com"; 

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }, 
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  }));

const Lessons = (props) => { 
      
 const classes = useStyles();
    
 const {meetingId} = props.match.params;
  
  const [lessons, setLessons] = useState([]); 

  const [loading, setLoading] = useState(true); 

 const getLessons = () => { 
    axios.get(URL + "/lesson/getlessons") 
    .then(res => {    
      if(res.data.success) { 
        setLessons(res.data.lesson);  
        setLoading(false);
      } else {
        alert("No lessons Found");
      }
    }) 
    .catch(error => {
      console.log(error);
    })
 }

   useEffect(() => { 
    getLessons(); 
   },[])
   
  console.log(lessons);

 const renderLessons = lessons.map((lesson, index) => {  
 
  if(lesson.meetingId == meetingId) {   

     return(  

      <div className={classes.root}>   
        <a style={{textDecoration: 'none'}} href={`/dashboard/coursehub/lessonsView/${lesson._id}`}>   
       <Grid container spacing={4}>  
       <Grid item xs={12}> 
        <Paper className={classes.paper}>   
        <Avatar className={classes.orange}>L</Avatar>
         <Typography variant="h6"> {lesson.instructor.first_name} {lesson.instructor.last_name} posted a lesson material: {lesson.lessonTitle}  </Typography>
         </Paper>
        </Grid>  
        </Grid>  
        </a> 
      </div> 
  );
 }   
 })
   if(lessons) { 
    return( 
     <div className="main-wrapper">   
        <Link to={`/dashboard/coursehub`} className="back-button">
          <i className="ion-ios-arrow-back"></i>
          <span>Go Back</span>
        </Link>
       <div className="lesson-wrapper"> 
      {renderLessons}  
      {loading ? <LoadingSpin /> : null}
      </div> 
    <style jsx>{`
    .main-wrapper{
      margin-top: 30px;
    }
    .lesson-wrapper{
     margin-top: 40px;
    }
    `}</style>
     </div>   

    );
  } 
  else { 
    return( 
    <div> No lessons found. Please join a course </div>
    )
  } 
} 

export default Lessons;