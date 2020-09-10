import React from "react";

export default function HelpContent() {
  return <div>  
   <h1 style={{color: 'white', fontWeight: '100', fontSize: 16}}> How can I join a course? </h1> 

   <span style={{color: 'white'}}> You can join a course with a meeting id created by your instructor, <br/> 
   your instructor will give you an id to join a course. After you join you can see the current stream created by your instructor </span>     

   <div style={{paddingTop: 25}}> 
   <h1 style={{color: 'white', fontWeight: '100', fontSize: 16}}> How can I create a course? </h1> 

   <span style={{color: 'white'}}> You can create a course as an Instructor by clicking on the Create a Course button at the Dashboard <br/>  </span>   
   </div> 

   <div style={{paddingTop: 25}}> 
   <h1 style={{color: 'white', fontWeight: '100', fontSize: 16}}> How can I see my courses as an Instructor? </h1> 

   <span style={{color: 'white'}}> You can see your courses you created by going to the <br/> 
   course hub page  </span> 
   </div>
  </div>;
}
