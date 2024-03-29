import axios from "axios";
import React, { useState } from "react";
import {useEffect} from 'react';  
import LikeIcon from '@material-ui/icons/ThumbUp';
import { Divider } from "@material-ui/core";


const URL = "https://nilee-nodedatabase.herokuapp.com"; 

const local = "http://localhost:5050"

export default function Notifications({ onHeader }) { 

  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]); 
  
 const OpenNotification = () => {
  setOpenNotification(!openNotification);   
 }

  const renderEmpty = () => {
    return <div className="empty-box">No new notifications</div>;
  };

  const renderNotifications = () => { 
    return (  
     <div> 
     {notifications.map((item, index) => (    
      <div className="notification-box"> 
         <div className="user">  
       
         </div> 
         <span> 
     {/*<p> • {moment(Date.parse(item.notifiedAt)).fromNow()} </p> */}
        <br/>
        <span>   </span>    
        <Divider/> 
        </span>  
        </div>    
      ))}     
    </div>  
    );
  }; 

  
  return (
    <div className={`notification ${onHeader ? "inverse" : ""}`}>
      <span
        onClick={() => OpenNotification()}
        className={`ion-ios-bell-outline icon active`}
      ></span> 
      <div className={`list ${openNotification ? "show" : ""}`}>
        {notifications.length < 1 ? renderEmpty() : renderNotifications()}
      </div>
      <style jsx>{`
        .notification {
          margin-left: auto;
        }

        .notification .icon {
          font-size: 28px;
          color: var(--color-1);
          cursor: pointer;
        }

        .notification.inverse .icon {
          color: #fff;
        }
        .notification .icon.active::after {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 10px;
          background: red;
          position: absolute;
          right: 1px;
          top: 3px;
          border: 2px solid #fff;
        }
        .notification.inverse .icon.active::after {
          border: 2px solid var(--color-1);
        }
        .notification .list {
          position: absolute;
          right: -10px;
          top: 120%;
          border: 1px solid #eee;
          border-radius: 5px;
          overflow: hidden;
          min-width: 340px;  
          z-index: 5;
          clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
          transition: all 0.2s cubic-bezier(0.3, 1.01, 0.99, 1.32);
        }

        .notification .list.show {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }

        .empty-box {
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: var(--text-color);
          background: #f9f9f9;
        } 

        .notification-box {  
          display: flex;
          padding: 3px 0;
          font-size: 17px;
          color: black;  
          height: 280px; 
          background: #fff;
        }  

        .user { 
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          height: 50px;
          width: 50px;
          margin-right: 5px;
        }  

        @media (max-width: 500px) { 
          .notification-box {  
            display: none;
          }  
        }

      `}</style>
    </div>
  );
}
