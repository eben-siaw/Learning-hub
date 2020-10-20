import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Messages from "./Messages/Messages";
import {useSelector} from 'react-redux'; 
import axios from 'axios';

const URL = "https://nilee-nodedatabase.herokuapp.com"

const Chat = ({messagelist, postId, refreshFunc}) => {
  
  const userid = useSelector(state => state.auth.user._id);

  const [message, setMessage] = useState("")
  
  const variables = { 
    user: userid, 
    content: message,
    postId: postId,
   }

   // realtime comments 
  const PushComment = (event) => { 
 
    event.preventDefault();  

     axios.post(URL +  "/comment/saveComment", variables)
     .then(response => { 
        if(response.data.success) { 
         setMessage("") 
         refreshFunc(response.data.result)
        } 
        else{ 
            alert("failed to save comments")
        }
     })  

  }

  return (
     <div> 
     <div>
      <TextField
        fullWidth
        label="Type a comment"
        margin="normal"
        multiline
        onChange={(evt) => setMessage(evt.target.value)}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            evt.preventDefault();
            PushComment();
          }
        }}
        value={message}
      />
      <div onClick={PushComment} className="send-button">
        <span className="ion-android-send"></span>
      </div>
      <style jsx>{`
        .send-button {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-1);
          border: 1px solid var(--color-1);
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          transition: 0.3s linear;
          cursor: pointer;
        }
        .send-button:hover {
          background: var(--color-1);
          color: #fff;
        }
      `}</style>
    </div>   
     <Messages messagelist={messagelist}/>
    </div>
    
  );
};
export default Chat;
