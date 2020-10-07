import React, {useEffect, useState, useCallback } from 'react';  
import axios from 'axios'; 
import {TextField, Select, Fab, FormControl, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button';  
import {useSelector} from 'react-redux';   
import AddIcon from '@material-ui/icons/Add';   
import CloudUploadIcon from '@material-ui/icons/CloudUpload';  
import InputAdornment from '@material-ui/core/InputAdornment';
import DescIcon from '@material-ui/icons/Description' 
import TitleIcon from '@material-ui/icons/TitleSharp'
import LoadingSpin from 'react-loading-spin'

const URL = "https://nilee-nodedatabase.herokuapp.com";  

const local = "http://localhost:5050"; 

const useStyles = makeStyles((theme) => ({ 

    root: { 
      display: 'flex',  
      flexWrap: 'wrap', 
      lineHeight: 6
    }, 
 
}));
  

const VideoUpdate = ({videoId}) =>
{   
    const classes = useStyles();  
  
    const userId = useSelector(state => state.auth.user._id)
    
    const [videotitle, setvideoTitle] = useState(""); 
    const [description, setdescription] = useState("");  

  
  const [loading, setLoading] = useState(false) 

   const handleDescription = (event) => { 
   setdescription(event.currentTarget.value)
   }  

   const handleTitle = (event) => { 
   setvideoTitle(event.currentTarget.value)
   }  

 //submit all the video details to the backend mongo database
    const handleSubmit = (event) => { 
    
     event.preventDefault();
     
     let errors = {};
     //validation  
     if(videotitle === "" || description === "" ) { 
     return alert("All Fields are required")
     } 
    
      const details = {  
        title: videotitle, 
        description: description, 
      } 

     // update video title and description 

     axios.patch(URL + `/video/updateVideo/${videoId}`, details) 
     .then(res => {  
     if(res.data){    
     alert("Video Updated") 
     setLoading(false);
     window.location = "/dashboard/videos" 
     } 
     else{ 
     alert("Failed to update video"); 
   }
 })  

}
     return(    
         
     <div className={classes.root}> 
         <TextField
          label="Title" 
          fullWidth
          onChange={handleTitle}  
          value={videotitle} 
        />      
       <br/>
        <TextField
          label="Description" 
          fullWidth 
          variant="outlined" 
          onChange={handleDescription}  
          value={description} 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescIcon />
              </InputAdornment>
            ),
          }}
        />  
       
         <br/> 
    
         <Button onClick={handleSubmit} color="secondary"
          variant="contained" 
          startIcon={<CloudUploadIcon />} > Update Video </Button>  

        {loading ? <LoadingSpin  /> : null } 

      </div>

     );   

}  

export default VideoUpdate;