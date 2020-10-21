import React from 'react';  
import {useState} from 'react';
import Button from '@material-ui/core/Button';
import { createBrowserHistory } from 'history';
import {ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const BASE_URL = "https://videocommunications.herokuapp.com";   

//const local = "http://localhost:8000"; 

const VideoRoom = () => {   

 
 const [roomName, setroomName] = useState("");
 const [roomId, setroomId] = useState(""); 
  

  const addRoom = async (roomId) => {  
    try {
       return await axios.post(BASE_URL + '/room', 
         roomId).then(res => { 
          console.log(res.data); 
          return res.data;
         })  
      } catch (error) {
       console.log({err: "Internal Error"})
      }
   
 }
 
  const Roomhandler = async () => { 
    await addRoom({roomId: roomId}).then(res => {  
      console.log(res);
      if(res) {   
        toast("You are about to start a meeting"); 
        window.location = `/Video/videoConference/${roomId}`;  
       }
     
    })
  }

 const handleRoomName = (event) => { 
  setroomName(event.target.value);
 } 

 const handlePassword = (event) => { 
  setroomId(event.target.value);
 } 

 return( 

  <div className="RoomPage">    

  <div>  

   <h1 style={{color: 'blue'}} itemProp="headline">Start A Meeting</h1>  

      <p>Please enter a room name.</p>
      <input className="room-field" value={roomName} type="text" name="room"  onChange={handleRoomName} pattern="^\w+$" maxLength="10" autoFocus title="Room name should only contain letters."/> 

      <p>Enter your room password.</p> 
      <input className="room-field" value={roomId} type="text" name="room"  onChange={handlePassword} pattern="^\w+$" maxLength="10" required autoFocus title="Your room password allows people to join your meeting."/> 

      <Button color="secondary" variant="contained" onClick={Roomhandler}>Create Room</Button> 
      <ToastContainer/>
    </div>
   <style jsx> 
   {` 
   .RoomPage { 
    display: flex; 
    align-items: center;   
    justify-content: center;   
    margin-top: 55px;
    }  
   
    .room-click { 
     background-color: red; 
     color: white;
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

    `}
   </style>
  </div>
 );

};  

export default VideoRoom;