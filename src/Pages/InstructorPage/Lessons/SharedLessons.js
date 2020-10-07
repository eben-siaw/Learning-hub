import React,{useEffect, useState} from 'react';  
import { makeStyles } from '@material-ui/core/styles'; 
import {deepOrange,  deepPurple } from '@material-ui/core/colors';
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

const SharedLessons = () => { 
      
 const classes = useStyles();
    
 const userId = useSelector(state => state.auth.user._id);

  const [lessons, setLessons] = useState([]); 

  const [loading, setLoading] = useState(true); 

  const [errors, setErrors] = useState("")

 const getLessons = () => { 
    axios.get(URL + "/lesson/getlessons") 
    .then(res => {    
      setLoading(false);
     setLessons(res.data);
     console.log(res.data)
    }) 
    .catch(error => { 
      setErrors(error);
    })
 }

   useEffect(() => { 
    getLessons(); 
   },[])
  
 const renderLessons = lessons.map((lesson, index) => {  
 
  if(lesson.instructor._id == userId) {   

     return(  
      <div className={classes.root}>   
        <a style={{textDecoration: 'none'}} href={`/dashboard/lessons/view/${lesson._id}`}>   
       <Grid container spacing={4}>  
       <Grid item xs={12}> 
        <Paper className={classes.paper}>   
        <Avatar className={classes.orange}>S</Avatar>
         <Typography variant="h6"> {lesson.instructor.first_name} {lesson.instructor.last_name} posted a material: {lesson.lessonTitle}  </Typography>
         </Paper>
        </Grid>  
        </Grid>  
        </a> 
      </div> 
  );
 }   
 })
     
    return( 
     
     <div>  
       <div className="lesson-inner"> 
      {renderLessons}  
      {loading ? <LoadingSpin /> : null}
      </div> 
     <style jsx>{ 
       ` 
        @media (max-width: 500px) {
          .lesson-inner {
            height: 76vh;
            overflow: auto; 
            margin-right: 14px;
          }  
        }
    `}  
     </style>
     </div>   

    );
  
} 

export default SharedLessons;