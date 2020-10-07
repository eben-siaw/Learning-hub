import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import VideoUpdate from './VideoUpdate';
import axios from "axios";

const EditVideo = () => { 

  const { params: { id }, 
} = useRouteMatch("/dashboard/videos/edit/:id");   

  return (
    <div>
      <div className="create-stream-wrapper">
        <Link to="/dashboard/videos" class="back-button">
          <i className="ion-ios-arrow-back"></i>
          <span>Go Back</span>
        </Link>
        <h3>Edit Existing Video</h3>
        <div className="form-wrapper">
          {/* <div className={`error-display ${errorMessage ? "" : "hidden"}`}>
            <p>{errorMessage}</p>
           </div>*/}
          <VideoUpdate videoId={id} />
        </div>
      </div>
      <style jsx>{`
        .create-stream-wrapper {
          padding: 10px 0;
        }
        .create-stream-wrapper h3 {
          margin: 20px 0;
          text-align: center;
          color: var(--color-1);
        }

        .form-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default EditVideo;
