import React from "react";
import { Link } from "react-router-dom";
import ShareMaterials from './ShareMaterials';

const Share = ({meetingId}) => {
  
  return (
    <div>
      <div className="create-stream-wrapper">
        <Link to={`/dashboard/instructorhub`} className="back-button">
          <i className="ion-ios-arrow-back"></i>
          <span>Go Back</span>
        </Link>
        <h3>Share lessons</h3>
        <div className="form-wrapper">
          <ShareMaterials meetingId={meetingId}/>
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
          max-width: 100%;
        } 
        @media (max-width: 500px) {
            .create-stream-wrapper {
              height: 76vh; 
            }
          }
      `}</style>
    </div>
  );
};

export default Share;