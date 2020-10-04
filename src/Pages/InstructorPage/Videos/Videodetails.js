import React, {useEffect, useState, useCallback } from 'react';  
import axios from 'axios'; 
import {TextField, Select, Fab, FormControl, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'; 
import {useDropzone} from 'react-dropzone';
import Button from '@material-ui/core/Button';  
import {useSelector} from 'react-redux';   
import AddIcon from '@material-ui/icons/Add';   
import CloudUploadIcon from '@material-ui/icons/CloudUpload';  
import InputAdornment from '@material-ui/core/InputAdornment';
import DescIcon from '@material-ui/icons/Description' 
import TitleIcon from '@material-ui/icons/TitleSharp'
import {storage} from '../../../Firebase/firebase';
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
  

const Videodetails = () =>
{   
    const classes = useStyles();  
  
    const userId = useSelector(state => state.auth.user._id)
    
    const [videoFile, setVideoFile] = useState("")
    const [videotitle, setvideoTitle] = useState(""); 
    const [description, setdescription] = useState("");  
    const [firebaseVideo, setfirebaseVideo] = useState(""); 
  
    const [loading, setLoading] = useState(false) 

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
     
     let errors = {};
     //validation  
     if(videotitle === "" || description === "" || videoFile === "") { 
     return alert("All fields are required")
     } 
  
     console.log(videoFile); 

     //uploading task to storage 

     let videoObject = {}
    
     setLoading(true);

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
     setLoading(false);
     window.location = "/dashboard/videos"
     }else{ 
     alert("Failed to upload video"); 
      window.location = '/dashboard/videos/new'
     }
    }) 

   }) 
}) 

}
     return(    
         
     <div className={classes.root}> 
        <label htmlFor="video">
        <input
          style={{ display: 'none' }}
          id="video"
          name="video"  
          type="file"
          onChange={handleOnChange} 
        />
        <Fab color="default" size="large" component="span" aria-label="add">
          <AddIcon />
        </Fab>
      </label> 
        <br/>
       <li style={{listStyle: 'none', paddingTop: '6px'}}> {videoFile.name} </li>
        <br/>
              
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
          startIcon={<CloudUploadIcon />} > Submit video </Button>  

        {loading ? <LoadingSpin  /> : null } 

      </div>

     );   

}  

export default Videodetails;