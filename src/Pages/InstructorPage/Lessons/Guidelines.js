import React from 'react'; 
import Divider from '@material-ui/core/Divider'; 
import {useSelector} from 'react-redux'; 
import Person from '@material-ui/icons/Person'

function Guidelines() { 
 
    return(  

  <div> 
      <div style={{display: 'flex', flexDirection: 'row'}}>
     <Person/> <p> Guides </p>      
    </div>  
    <br/>
      <span> Share your course meeting id to allow people to view slides or lesson materials you have uploaded. </span> 
         <br/> 
         <Divider/>  

         <div style={{paddingTop: 40}}> 
      <span > Upload videos related to your courses. Video content should be of Learning type. </span> 
      <Divider/>
      </div>
  </div> 

 );

} 

export default Guidelines;