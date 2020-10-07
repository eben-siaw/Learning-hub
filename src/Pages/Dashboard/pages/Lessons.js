import React,{useEffect, useState} from 'react';  
import PageHeader from "../components/PageHeader"; 
import { makeStyles } from '@material-ui/core/styles'; 
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper'; 
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'; 
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

const Lessons = () => { 
      
 const classes = useStyles();
    
 const meetingId = useSelector(state => state.course.data)
  
  const [lessons, setLessons] = useState([]); 

  const [loading, setLoading] = useState(true);

 const getLessons = () => { 
    axios.get(URL + "/lesson/getlessons") 
    .then(res => {    
      setLoading(false);
     setLessons(res.data);
     console.log(res.data)
    });
 }

   useEffect(() => { 
    getLessons(); 
   },[])
  
 const renderLessons = lessons.map((lesson, index) => {  
 
  if(lesson.meetingId == meetingId) {   

     return(  

      <div className={classes.root}>   
        <a style={{textDecoration: 'none'}} href={`/dashboard/lessons/view/${lesson._id}`}>   
       <Grid container spacing={4}>  
       <Grid item xs={12}> 
        <Paper className={classes.paper}>   
        <Avatar className={classes.orange}>L</Avatar>
         <Typography variant="h6"> {lesson.instructor.first_name} {lesson.instructor.last_name} posted a material: {lesson.lessonTitle}  </Typography>
         </Paper>
        </Grid>  
        </Grid>  
        </a> 
      </div> 
  );
 }   
 })
   if(meetingId) { 
    return( 
     <div>  
       <div> 
      {renderLessons}  
      {loading ? <LoadingSpin /> : null}
      </div>
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