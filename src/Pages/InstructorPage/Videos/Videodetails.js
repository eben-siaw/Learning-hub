import React, {useEffect, useState, useCallback } from 'react';  
import axios from 'axios'; 
import {TextField, Select, Fab, FormControl, InputLabel} from '@material-ui/core';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = "https://nilee-nodedatabase.herokuapp.com";  

//const local = "http://localhost:5050"; 

const useStyles = makeStyles((theme) => ({ 

    root: { 
      display: 'flex',   
      flexDirection: 'column', 
      lineHeight: 2
    },  

    formControl: {
      margin: theme.spacing(1),
      minWidth: 140,
    },

    select: { 
      width: 500
    },

 
}));
  
 /*const VideoState = [ 
  {value: 0, label: "Private - Only those who join my course can see this video" }, 
  {value: 1, label: "Public - EveryOne can see this video"}
]*/

const Videodetails = ({meetingId}) =>
{   
    const classes = useStyles();  
  
    const userId = useSelector(state => state.auth.user._id)
    
    const [videoFile, setVideoFile] = useState("")
    const [videotitle, setvideoTitle] = useState(""); 
    const [description, setdescription] = useState("");  
    const [firebaseVideo, setfirebaseVideo] = useState(""); 
    const [VideoPrivacy, setVideoPrivacy] = useState(0);  

    const [loading, setLoading] = useState(false); 

   const handleDescription = (event) => { 
   setdescription(event.currentTarget.value)
   }  

   const handleTitle = (event) => { 
   setvideoTitle(event.currentTarget.value)
   }  
    
  const handleOnChange = (event) => { 
   setVideoFile(event.target.files[0]); 
  } 
  const handlePrivacy = (event) => { 
    setVideoPrivacy(event.target.value);
  }
 //submit all the video details to the backend mongo database
    const handleSubmit = (event) => { 
    
     event.preventDefault();
      
     //validation  
     if(videotitle === "" || description === "" || videoFile === "") {  
      toast("All Fields are required"); 
      return null;
     } 
     else { 
 
      console.log(videoFile); 
    
      setLoading(true);
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
        meetingId: meetingId,
        videoName: videoFile.name, 
        video: url 
      } 
 
      // saving video with meeting Id to mongo
      axios.post(URL + `/video/saveVideo`, details)
     .then(response => { 
     if(response.data.success){   
      setLoading(false); 
      toast("Your Video has been Uploaded!"); 
      window.location =`/courseview/${meetingId}/videos`; 
     }else{ 
      toast("Failed to upload video"); 
    // window.location = '/dashboard/videos/new'
    } 

  })  

   });  

  }) 

  }
     
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
         <div className="">  
         <Button onClick={handleSubmit} color="secondary"
          variant="contained" 
          startIcon={<CloudUploadIcon />} > Submit video </Button>   
            <ToastContainer />
          </div>
         
         <div style={{padding: 10}}> 
         {loading ? <LoadingSpin /> : null } 
         </div>
      </div>

     );   

}  

export default Videodetails;