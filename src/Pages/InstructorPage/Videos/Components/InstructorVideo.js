import React, { useEffect, useState } from "react";
import Chat from "../../../StudentPage/Chat/Chat";
import { Link } from "react-router-dom";
import axios from "axios";

const URL = "https://nilee-nodedatabase.herokuapp.com";

const InstructorVideo = (props) => {
  // get the id related to the video
  const { videoId } = props.match.params;

  // declare the states
  const [Video, setVideo] = useState([]);

  const videovariable = {
    videoId: videoId,
  };

  useEffect(() => {
    axios.post(URL + "/video/getVideo", videovariable).then((response) => {
      if (response.data.success) {
        console.log(response.data.video);
        setVideo(response.data.video);
      } else {
        alert("Failed to get Video");
      }
    });
  });

  return (
    <div className="stream-wrapper">
      <div style={{ padding: "20px 0" }}>
        <Link to="/dashboard/streams" class="back-button">
          <i className="ion-ios-arrow-back"></i>
          <span>Go Back</span>
        </Link>
      </div>
      <div>
        <video
          src={Video.video}
          style={{ width: "100%", height: 400 }}
          controls={true}
        />
        <h3 className="title">{Video.title}</h3>
        <p className="desc">{Video.description}</p>
      </div>
      <div className="comments-wrapper">
        <small className="comments-tag">
          <b>Comments:</b>
        </small>
        <Chat />
      </div>
      <style jsx>{`
        .title {
          color: var(--color-2);
          padding: 15px 0px;
        }
        .stream-wrapper::-webkit-scrollbar {
          display: none;
        }

        .comments-wrapper {
          padding: 20px 0;
          margin-bottom: 10px;
        }

        .comments-tag {
          color: var(--color-3);
          background: var(--color-3-transparent);
          padding: 5px 10px;
          border-radius: 10px;
          margin-bottom: 10px;
          font-size: 12px;
        }
        @media (max-width: 500px) {
          .title {
            color: var(--color-2);
            padding: 15px 0px 5px 0px;
          }
          .desc {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default InstructorVideo;
