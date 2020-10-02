import React from 'react'; 
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import FileViewer from 'react-file-viewer'; 
import PageHeader from "../components/PageHeader"; 

const URL = "https://nilee-nodedatabase.herokuapp.com"; 

const local = "http://localhost:5050"

function LessonView(props) { 
  
 const file = "docx"

 const {id} = props.match.params;

 const [lesson, setView] = useState({})

 useEffect(() => { 
 
    axios.get(local + `/lesson/viewlesson/${id}`).then(res => { 
      setView(res.data);  
      console.log(res.data);
    })

 },[])

 return( 

    <div> 
     <div>   
    
         <FileViewer filePath={lesson.fileUrl}   
         fileType={file} />
     </div> 

    </div>
 );

} 

export default LessonView;