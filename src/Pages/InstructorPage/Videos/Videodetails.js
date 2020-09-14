import React, {useEffect, useState } from 'react';  
import axios from 'axios'; 
import {TextField, Select, InputLabel, FormControl, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'; 
import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';  
import {useSelector} from 'react-redux';
import UploadIcon from '@material-ui/icons/CloudUpload';    

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
   
    const [videotitle, setvideoTitle] = useState(""); 
    const [description, setdescription] = useState("");  
    const [FilePath, setFilePath] = useState("")
   
   const handleDescription = (event) => { 
   setdescription(event.currentTarget.value)
   }  

   const handleTitle = (event) => { 
   setvideoTitle(event.currentTarget.value)
   }  

  const drop = (files) => { 

   let formData = new FormData(); 

   const config = { 
   header: { 'content-type': 'multipart/form-data'} 
   } 

   console.log(files)
   formData.append("file", files[0])  // log the uploaded file

   //send the video files to the backend
   axios.post(URL + `/video/uploadfiles`, formData, config)
   .then(response => {
       if (response.data.success) {
           let variable = {
               filePath: response.data.filePath,
               fileName: response.data.fileName
           }
           setFilePath(response.data.filePath)
                
        }
    })
      .catch(error => { 
        console.log(error.message);
      })

  }
  //submit all the video details to the backend mongo database
  const handleSubmit = (event) => { 
       event.preventDefault()
    //validation  
     if(videotitle === "" || description === "") { 
      return alert("All Fields are Required" )
     }
       const videoDetails = { 
      instructor: userId,
      title: videotitle, 
      description: description, 
      filePath: FilePath
    }
  
   axios.post(URL + `/video/saveVideo`, videoDetails)
   .then(response => { 
    if(response.data.success){  
       window.location = "/dashboard/videos"
    }else{ 
      alert("Failed to upload video")
    }
   }).catch(error => { 
     console.log(error.message)
    }) 

  }

     return( 
   
      <div className={classes.root}>         
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <h1 style={{fontSize: '1em'}}>Click to upload Video</h1>
            </div>
           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone 
                       onDrop ={drop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} /> 
                                <UploadIcon  style={{ fontSize: '3rem' }}/>
                            </div>
                        )}
                    </Dropzone>
                </div> 

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