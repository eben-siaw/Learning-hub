import React from 'react'; 
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';  
import {Link} from 'react-router-dom'
import FilePreviewer from "react-file-previewer"; 
import Typography from '@material-ui/core/Typography';
import {useSelector} from 'react-redux';

const URL = "https://nilee-nodedatabase.herokuapp.com"; 

const local = "http://localhost:5050"

function LessonView(props) { 
  
 const file = "docx"
 
 const {id} = props.match.params;

 const [lesson, setView] = useState({}); 
 
 useEffect(() => { 
 
    axios.get(URL + `/lesson/viewlesson/${id}`).then(res => {  
      if(res.data.success) { 
        setView(res.data.lesson);  
        console.log(res.data.lesson);
      } else { 
        alert("No lesson found");
      }
    
    })

 },[])

 return( 

    <div className="outer-content"> 
     <div className="lesson-wrapper">     
     <Link to={`/dashboard/coursehub/`} className="back-button">
          <i className="ion-ios-arrow-back"></i>
          <span>Go Back</span> 
        </Link> 
         <div className="inner-wrapper"> 
         <Typography variant="body1">Click on the download icon to download <i style={{fontSize: 17}} className="ion-android-document:before"></i> {lesson.lessonTitle}</Typography> 
         <br/> 
         <FilePreviewer file={{
            url: `${lesson.fileUrl}` }}
        /> 
        </div> 
     </div> 
     <style jsx>{`  
      .outer-content { 
      display: flex;
      } 

     .lesson-wrapper { 
       padding: 15px 0;
     }  
     
     .inner-wrapper { 
       padding: 14px 0;
      }
     `}
     </style>
    </div>
 );

} 

export default LessonView;