import Avatar from "@material-ui/core/Avatar";
import React from "react";

const Messages = ({ messages }) => {
  return (
    <div className="comments-list">
      {messages.reverse().map((comment, index) => (
        <CommentItem key={index} comment={comment} />
      ))}
    </div>
  );
};

const CommentItem = ({ comment }) => {
  return (
    <div className="comment">
      <div className="avatar">
        <Avatar alt="Cute Kitten" src="http://placekitten.com/200/200" />
      </div>
      <div className="message">
        <span style={{ fontSize: "14px" }}>
          <b className="username">Nilee User</b> {comment}
        </span>
      </div>
      <style jsx>{`
        .comment {
          display: flex;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #cfcfcf;
        }

        .avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          height: 50px;
          width: 50px;
          margin-right: 5px;
        }

        .username {
          font-size: 14px;
          margin-right: 5px;
          color: var(--text-color);
        }
      `}</style>
    </div>
  );
};

export default Messages;
