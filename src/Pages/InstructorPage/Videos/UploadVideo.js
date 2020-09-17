import React from "react";
import { Link } from "react-router-dom";
import Videodetails from './Videodetails';

const UploadVideo = (props) => {
  
  return (
    <div>
      <div className="create-stream-wrapper">
        <Link to="/dashboard/courses" className="back-button">
          <i className="ion-ios-arrow-back"></i>
          <span>Go Back</span>
        </Link>
        <div className="form-wrapper">
          <Videodetails/>
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
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default UploadVideo;
