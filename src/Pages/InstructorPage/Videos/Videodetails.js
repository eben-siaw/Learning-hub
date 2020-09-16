import React, {useEffect, useState, useCallback } from 'react';  
import axios from 'axios'; 
import {TextField, Select, Fab, FormControl, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'; 
import {useDropzone} from 'react-dropzone';
import Button from '@material-ui/core/Button';  
import {useSelector} from 'react-redux';   
import AddIcon from '@material-ui/icons/Add';  
import {storage} from '../../../Firebase/firebase';

const URL = "https://nilee-nodedatabase.herokuapp.com"; 

const useStyles = makeStyles((theme) => ({ 

    root: { 
        display: 'flex',  
        flexDirection: 'column',  
        alignItems: 'center', 
        maxWidth: 700,  
        margin: '2rem auto'
    }, 
   
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },

    select: { 
      width: 500
    },

   field: { 
     width: 500
   }

}));
  

const Videodetails = () =>
{   
    const classes = useStyles();  
  
    const userId = useSelector(state => state.auth.user._id)
    
     const [videoFile, setVideoFile] = useState("")

    const [videotitle, setvideoTitle] = useState(""); 
    const [description, setdescription] = useState("");  
    const [firebaseVideo, setfirebaseVideo] = useState(""); 

   const handleDescription = (event) => { 
   setdescription(event.currentTarget.value)
   }  

   const handleTitle = (event) => { 
   setvideoTitle(event.currentTarget.value)
   }  
    
  const handleOnChange = (event) => { 
   setVideoFile(event.target.files[0]); 
  } 

 //submit all the video details to the backend mongo database
    const handleSubmit = (event) => { 
    
     event.preventDefault();

     //validation  
     if(videotitle === "" || description === "") { 
     return alert("All Fields are Required" )
     } 
  
     console.log(videoFile); 

     //uploading task to storage 

     let videoObject = {}
  
     const uploadTask = storage.ref(`/videos/${videoFile.name}`).put(videoFile);
   
      uploadTask.on('state_changed',
      (snapshot) => {},
      (error) => {
      alert(error);
      },
      () => { 
      storage.ref('videos').child(videoFile.name).getDownloadURL().then(url => {  
    
      setfirebaseVideo({url})
    
      const details = { 
        instructor: userId,  
        title: videotitle, 
        description: description, 
        videoName: videoFile.name, 
        video: url 
      }

     // saving video data to mongo
     axios.post(URL + `/video/saveVideo`, details)
     .then(response => { 
     if(response.data.success){  
     alert("Video Uploaded")
     window.location = "/dashboard/videos"
     } 
     else{ 
     alert("Failed to upload video")
     }
    }) 

   }) 
}) 

 }
     return(   
     <div> 
        <label htmlFor="video">
        <input
          style={{ display: 'none' }}
          id="video"
          name="video"  
          type="file"
          onChange={handleOnChange} 
        />
        <Fab color="primary" size="large" component="span" aria-label="add">
          <AddIcon />
        </Fab>
      </label>
   
        <br/>

          <TextField
          label="title"
          id="outlined-size-normal" 
          onChange={handleTitle}  
          value={videotitle}
          className={classes.field}
        />     
        <br/> 

        <TextField
          label="description"
          id="outlined-size-normal"  
          onChange={handleDescription}  
          value={description}
          className={classes.field}
        />
         <br/> 

         <Button onClick={handleSubmit} color="primary" variant="contained" > Upload video </Button> 

      </div>

     );   

}  

export default Videodetails;