import React, { useState } from 'react';  
import {Fab, Button} from '@material-ui/core' 
import TextField from '@material-ui/core/TextField';
import {storage} from '../../../Firebase/firebase'; 
import axios from 'axios'; 
import UploadIcon from '@material-ui/icons/CloudUpload'; 
import LoadingSpin from 'react-loading-spin'; 
import {useSelector} from 'react-redux';

const URL = "https://nilee-nodedatabase.herokuapp.com"; 

const local = "http://localhost:5050" 

const ShareMaterials = ({meetingId}) => { 
  
 const [file, setFile] = useState("")
 const [title, setTitle] = useState("")
 const [loading, setLoading] = useState(false); 

 const userId = useSelector(state => state.auth.user._id)

 const handleChange = (event) => { 
  setFile(event.target.files[0]) 
 } 

 function handleTitle(event) { 
   setTitle(event.target.value)
 }

  const handleFileSubmit = (event) => {  

    event.preventDefault();
    //firebase cloud 

    if(title === "" || file === "") { 
      return alert("All Fields are required")
      } 

    const uploadTask = storage.ref(`/lessons/${file.name}`).put(file);
    
     console.log(file);

     setLoading(true)

    uploadTask.on('state_changed',
    (snapshot) => {},
    (error) => {
    alert(error);
    }, 
    () => {   
     storage.ref('lessons').child(file.name).getDownloadURL().then(url => {   
   
     const info = {  
      instructor: userId, 
      fileUrl: url, 
      lessonTitle: title, 
      meetingId: meetingId
      } 

        axios.post(URL + "/lesson/savelesson", info) 
        .then(response => {  
          if(response.data.success) {  
            alert("Lesson Uploaded!")
            setLoading(false);
            window.location = `/dashboard/lessons/${meetingId}`;
          } 
          else{ 
            alert("Failed to Upload"); 
          }
      }) 
       .catch(error => {  
         setLoading(false)
        console.log(error);
      })

    }); 
     
    })
  }

 return(  
  
    <div>    

    <div className="file-upload">    

      <div className="inner-container"> 

       <label htmlFor="document">  

       <input type="file" id="document"  
       name="document" className="file-input"   
       onChange={handleChange} />  

        <Fab  
        className="fab"
        color="default"
        size="small" 
        component="span"
        aria-label="add"
        variant="extended"
      >
      <UploadIcon /> Upload 
        </Fab> 
        </label> 
    </div>   
        
        <br/>
         <TextField
            label="Lesson Title" 
            fullWidth
            onChange={handleTitle}  
            value={title}  
            variant="outlined"
        />      

    <Button variant="contained" className="file-button" color="primary"  
    onClick={handleFileSubmit}>Share</Button>   

    {loading ? <LoadingSpin  /> : null }  

    </div>  
   
      <style jsx>{`  
       .file-upload {   
        margin-top: 15px; 
        border: 0.5px solid black; 
        border-radius: 5px; 
        width: 300px; 
        height: 220px 
      }  
      .wrapper { 
        padding: 15px 0;
      }
      .file-input { 
        display: none; 
      }   

      .inner-container {  
        padding-top: 100px; 
        padding-left: 100px
      }
      
      .file-button { 
        width: 250px;   
        height: 45px;
        margin: 40px 5px 10px 28px;
      } 

      `} 
      </style> 
    </div>
 );

} 

export default ShareMaterials;