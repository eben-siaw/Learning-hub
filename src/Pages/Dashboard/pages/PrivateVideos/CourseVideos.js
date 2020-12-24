import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import VideoThumbnail from "react-video-thumbnail";
import LoadingSpin from "react-loading-spin";

const URL = "https://nilee-nodedatabase.herokuapp.com"; 

const local = "http://localhost:5050"; 

const PrivateVideos = (props) => { 

  const authUserId = useSelector((state) => state.auth.user._id);  

  const isAuth = useSelector((state) => state.auth.isLoggedIn); 

  const {meetingId} = props.match.params;

  const [Videos, setVideos] = useState([]); 
 
  // TODO serach 
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredVideos, setFilteredVideos] = useState("")

  const [loading, setLoading] = useState(true); 
  
  // get Only Videos by meeting Id of this course that the user joined
  const getvideos = async () => {
    const res = await axios.get(URL + `/video/getVideos/${meetingId}`);
    setVideos(res.data);
    setLoading(false);
  };
  
  // delete video
 const onItemDelete = async id => {  
   try {
      await axios.delete(URL + `/video/removeVideo/${id}`).then(res => { 
        if(res.data) { 
          window.location = "/dashboard/videos";
        }
      })
   } catch (error) {
     console.log(error);
   }
 
 }

  console.log(Videos);

  useEffect(() => {
    getvideos();
  }, []);
  
  const UpdateSearchResults = (e) => { 
    
  }

  const reduceDescription = (description) => {
    const { length } = description;
    const max = 60;
    if (length >= max) {
      return description.slice(0, max) + "...";
    }
    return description;
  };

  const renderVideos = () => { 

    const color = Math.ceil(Math.random() * 3);

    return Videos.map((videos, index) => {
      return (
      
          <div className="stream-card" key={videos._id}> 
            <a
             style={{ textDecoration: "none" }}
             href={`/dashboard/coursehub/videoplay/${videos._id}`}
            >
            <div className="thumbnail">
              <VideoThumbnail
                videoUrl={videos.video}  
                thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                snapshotAtTime={2}
                cors={true}
                width={100}
              />  
            </div> 
            </a>
            <div className="detail"> 
              <div
                className="detail-icon"
                style={{ background: `var(--color-${color}-transparent)` }}
              >
                <i
                  className="ion-videocamera"
                  style={{ color: `var(--color-${color})` }}
                ></i>
              </div>
              <div className="detail-info">
                <h5 style={{ marginBottom: "5px", color: "var(--text-color)" }}>
                  {videos.title}
                </h5>
                <p style={{ fontSize: "14px", color: "grey"}}>
                  {reduceDescription(videos.description)}
                </p>
                <p style={{ fontSize: "15px", color: "grey" }}>{videos.instructor.first_name} {videos.instructor.last_name}</p>
              </div>   
              {videos.instructor._id === authUserId ? (
             <AuthOptions 
             onDelete={() => onItemDelete(videos._id)}
              videoId={videos._id}
            /> 
          ) : (
            ""
          )}
            </div> 
          </div>

      );
    });
  };
  const renderCreateButton = () => {
    if (authUserId) {
      return (
        <Link className="add-button" to="/dashboard/instructorhub">
          <img width="50%" src="/img/addIconFlat.svg" alt="add Icon" />
        </Link>
      );
    }
  }; 

  if (Videos.length !== 0) {
    return (
      <div className="stream-list-container">
        {renderCreateButton()} 
        <Link to={`/dashboard/coursehub/lessons/${meetingId}`} className="back-button">
          <i className="ion-ios-arrow-back"></i>
          <span>lessons</span> 
        </Link> 
        <div className="stream-list-container-inner">
          {renderVideos()}
          {loading ? <LoadingSpin /> : null}
        </div>
        <style jsx>{`
          .stream-list-container-inner {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
            grid-gap: 20px;
            padding: 20px 0;
            overflow: auto;
          }

          .add-button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            box-shadow: 0 0 10px #00000095;
            position: absolute;
            right: 20px;
            bottom: 100px;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
          }

          .stream-card {
            width: 99%;
            min-height: 170px;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0 0 5px #00000032;
            padding: 0px;
            display: grid;
            grid-template-rows: 200px 1fr;
            overflow: hidden;
          }

          .stream-card .thumbnail {
            background: #f1f1f1;
          }

          .stream-card .auth-options {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.2s;
          }
          .stream-card .auth-options:hover {
            background: #00000025;
          }
          .stream-card .option-list {
            position: absolute;
            top: 110%;
            right: 0;
            font-size: 14px;
            color: red;
            box-shadow: 0 0 10px #00000025;
            border-radius: 5px;
            background: #fff;
            overflow: hidden;
          }

          .stream-card .option-list > * {
            padding: 10px 30px;
            display: flex;
            flex-direction: column;
            cursor: pointer;
          }

          .stream-card .option-list > *:hover {
            background: #f9f9f9;
          }

          .stream-card .detail {
            display: flex;
            margin-bottom: auto;
            padding: 20px;
            background: #fff;
          }
          .stream-card .detail .detail-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 25px;
          }
          .stream-card .detail .detail-info {
            flex: 1;
            margin-left: 10px;
            padding: 10px 0;
          }

          .stream-card .actions {
            display: flex;
            justify-content: flex-end;
          }

          .stream-card .actions .button {
            font-weight: 300;
            padding: 10px;
          }
          .react-thumbnail-generator {
            width: 100%;
          }
          .react-thumbnail-generator .snapshot-generator {
            width: 100% !important;
            height: 200px !important;
          }

          @media (max-width: 600px) {
            .stream-list-container-inner {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  } else {
    return <div> No videos uploaded by your Instructor</div>;
  }
};

const AuthOptions = ({ videoId, onDelete }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="auth-options">
      <i
        onClick={() => setShow(!show)}
        style={{
          fontSize: "25px",
          color: "var(--text-color)",
          cursor: "pointer",
        }}
        className="ion-android-more-vertical"
      ></i>
      <div
        className="option-list"
        style={{ display: `${show ? "block" : "none"}` }}
      >
        <Link
          to={`/dashboard/videos/edit/${videoId}`}
          className="delete-button"
          style={{ color: "var(--color-2)" }}
        >
          Edit
        </Link> 
        <span
          onClick={onDelete}
          className="delete-button"
          style={{ color: "red" }}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

export default PrivateVideos;

