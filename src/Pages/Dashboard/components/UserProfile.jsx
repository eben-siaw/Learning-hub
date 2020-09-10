import React,{useState} from "react";

export default function UserProfile({user}) { 

  return (
    <div className="profile-section">
      <div className="heading">
        <h3>Profile</h3>
        <i className="ion-compose edit"></i>
      </div>
      <div className="detail">
        <div className="img-box">
          <img src="/img/fluid-background.svg" alt="" />
          <div className="status">
            <span className="ion-checkmark-circled"></span>
          </div>
        </div>      
        <div className="text-box">
        {user.first_name}
          <p style={{ color: "#cfcfcf", padding: "10px 0", fontSize: "14px" }}>    
          {user.email}     
          </p>
        </div>
      </div>
      <style jsx>{`
        .profile-section {
          max-height: 100vh;
          overflow: auto;
        }

        .profile-section .heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--text-color);
        }

        .profile-section .heading .edit {
          font-size: 25px;
          cursor: pointer;
        }

        .profile-section .detail {
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .profile-section .detail .img-box {
          width: 150px;
          height: 150px;
          border-radius: 20px;
          padding: 5px;
          border: 2px solid #eaeaea;
        }

        .profile-section .detail .img-box .status {
          position: absolute;
          bottom: -10px;
          right: -10px;
          font-size: 25px;
          color: var(--color-2);
          background: #fafafa;
          border: 5px solid #fafafa;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-section .detail .img-box img {
          width: 100%;
          height: 100%;
          border-radius: inherit;
          object-fit: cover;
        }

        .profile-section .detail .text-box {
          margin-top: 15px;
          text-align: center;
          color: var(--text-color);
        }
      `}</style>
    </div>
  );
}
