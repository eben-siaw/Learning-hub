import React, { useEffect, useState } from "react";
import Chat from "../../../StudentPage/Chat/Chat";
import { Link } from "react-router-dom";
import axios from "axios";
import { DefaultPlayer as Video} from 'react-html5video'; 
import 'react-html5video/dist/styles.css' 
import LikesDislike from './Likes/LikesDislike'; 
import Divider  from "@material-ui/core/Divider"; 
import {useSelector} from 'react-redux';

const URL = "https://nilee-nodedatabase.herokuapp.com";

const InstructorVideo = (props) => { 
  // get the id related to the video
  const { videoId } = props.match.params;
  const [messagelist, setMessagelist] = useState([]) 

  const userId = useSelector(state => state.auth.user._id);

  // declare the states
  const [video, setVideo] = useState([]);
 
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

    axios.post(URL + `/comment/getComments`, videovariable)  
    .then(response => { 
       if(response.data.success) { 
        console.log('response.data.comments', response.data.comments) 
       setMessagelist(response.data.comments) 
       } 
       else { 
          alert("failed to get comments") 
       }
    })    
    
  }, []); 

  function UpdateComments(newComment) { 
    setMessagelist(messagelist.concat(newComment));
  }

  return (
    <div className="stream-wrapper">
      <div style={{ padding: "20px 0" }}>
        <Link to="/dashboard/videos" class="back-button">
          <i className="ion-ios-arrow-back"></i>
          <span>Go Back</span>
        </Link>
      </div>
      <div>
        <Video
          key={video.video}   
          controls={['PlayPause', 'Seek', 'Time', 'Fullscreen', 'Volume']}
          width='100%'
          height='100%'>  
          <source src={video.video} type="video/mp4"/>  
        </Video>   
        <div className="likes-wrap">  
        <LikesDislike video userId={userId} videoId={videoId} />  
        <br /> 
        <Divider style={{marginTop: 8}}/>  
        </div> 
        <h3 className="title">{video.title}</h3>
        <p className="desc">{video.description}</p>
      </div>
      <div className="comments-wrapper">
        <small className="comments-tag">
          <b>Comments:</b>
        </small>
        <Chat messagelist={messagelist} postId={video._id}  refreshFunc={UpdateComments}/>
      </div>
      <style jsx>{`
        .title {
          color: var(--color-2);
          padding: 15px 0px;
        }
        .stream-wrapper::-webkit-scrollbar {
          display: none;
        }
        .likes-wrap { 
          padding-top: 20px;
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
