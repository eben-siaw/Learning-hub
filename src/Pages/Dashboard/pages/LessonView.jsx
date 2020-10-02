import React from 'react'; 
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react'; 
import {FilePreviewerThumbnail} from "react-file-previewer"; 
import Typography from '@material-ui/core/Typography';

const URL = "https://nilee-nodedatabase.herokuapp.com"; 

const local = "http://localhost:5050"

function LessonView(props) { 
  
 const file = "docx"
 
 const {id} = props.match.params;

 const [lesson, setView] = useState({}) 
 
 const data = lesson.fileUrl; 

 useEffect(() => { 
 
    axios.get(URL + `/lesson/viewlesson/${id}`).then(res => { 
      setView(res.data);  
      console.log(res.data);
    })

 },[])

 return( 

    <div className="outer-content"> 
     <div>    
         <Typography variant="body1">{lesson.lessonTitle}</Typography> 
         <br/> 
         <FilePreviewerThumbnail file={{
            url: data }}
        />
      
     </div> 

    </div>
 );

} 

export default LessonView;