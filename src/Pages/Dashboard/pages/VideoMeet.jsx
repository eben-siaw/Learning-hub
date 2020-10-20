import React from 'react';  
import {useState} from 'react';
import Button from '@material-ui/core/Button'; 
import PageHeader from "../components/PageHeader";
import {ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const BASE_URL = "https://videocommunications.herokuapp.com";  

const local = "http://localhost:8000"; 

const VideoMeet = () => {  

 const [roomId, setroomId] = useState(""); 
  
  const RoomJoin = () => {  
   
    axios.get(BASE_URL + `/joinRoom/${roomId}`)  
    .then(res => { 
    if(res.data) { 
     toast("You have successfully joined");    
     window.location = `/Video/videoConference/${roomId}`;
    } 
  
  }) 
   .catch(error => { 
    toast("Invalid room Id");
  })    
   
 }

 const handlePassword = (event) => { 
  setroomId(event.target.value);
 } 

 return( 
 
    <div>
  <PageHeader title="Meetings" useSearch={true} />  
  <div className="RoomPage">    

  <div>  

   <h1 className="main-head" itemProp="headline">Join a Meeting</h1>  
      <br/>
      <p style={{color: 'grey', paddingLeft: 20}}>Enter Room Id</p> 
      <input className="room-field" value={roomId} type="text" name="roomId"  onChange={handlePassword} pattern="^\w+$" maxLength="10" required autoFocus title="Enter existing room Id from your instructor."/> 

      <Button size="large" className="btn-down" variant="contained" onClick={() => RoomJoin()}>Join</Button> 
      <ToastContainer/>
    </div>
   <style jsx> 
   {`  
    
   .main-head { 
    color: blue; 
    font-size: 23px;   
   } 
   
   .RoomPage { 
    display: flex; 
    align-items: center;   
    justify-content: center;   
    margin-top: 75px;
    }  

    .room-field { 
      border: none;
      border-bottom: solid 2px #4c4c4f;
      font-size: 1em;
      background-color: transparent;
      padding: .4em 0;
      margin: 2ex 0;
      width: 100%;
      max-width: 18em;
      display: block;
    } 
    
     .btn-down { 
      background-color: dodgerblue; 
      color: white; 
      width: 180px;
     }

    `}
   </style>
  </div> 
  </div>
 );

};  

export default VideoMeet;