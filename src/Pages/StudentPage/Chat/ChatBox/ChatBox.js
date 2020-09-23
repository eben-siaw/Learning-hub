/*
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";

const MessageBox = ({ onSendMessage: pushSendMessage }) => {
  const [message, setMessage] = useState("");
  const pushComment = () => {
    if (message.length > 0) {
      pushSendMessage(message);
      setMessage("");
    }
  };
  return (
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
            pushComment();
          }
        }}
        value={message}
      />
      <div onClick={pushComment} className="send-button">
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
  );
};

export default MessageBox; 

*/
