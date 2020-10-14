import axios from "axios";
import React, { useState } from "react";
import {useEffect} from 'react';  
import LikeIcon from '@material-ui/icons/ThumbUp';
import {useSelector} from 'react-redux';
import Avatar  from "@material-ui/core/Avatar";
import { Divider } from "@material-ui/core";
import { UpCircleFilled } from "@ant-design/icons";

const URL = "https://nilee-nodedatabase.herokuapp.com"; 

const local = "http://localhost:5050"

export default function Notification({ onHeader }) { 
  
  const user = useSelector(state => state.auth.user._id);

  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]); 

  const getNotifications = async () => { 
    
    try { 
      return await axios.get(URL + `/like/getNotifications/${user}`) 
      .then(response => { 
       if(response.data) { 
         setNotifications(response.data); 
         console.log(response.data);
       }
      }) 
    } catch (error) {
       console.log(error);
    }
 
  } 

  useEffect(() => { 
    getNotifications();
  }); 

  const renderEmpty = () => {
    return <div className="empty-box">No new notifications</div>;
  };

  const renderNotifications = () => {
    return (
      <div className="notification-list">
        {notifications.map((item, index) => (
        <div key={index}> 
         <div className="notification-items"> 
         <Avatar /> {item.sender.first_name} {item.sender.last_name} liked <LikeIcon style={{paddingTop: 8}} color="primary"/> a video you posted.  
          
          </div> 
          </div> 
        ))}
      </div>
    );
  };
  return (
    <div className={`notification ${onHeader ? "inverse" : ""}`}>
      <span
        onClick={() => setOpenNotification(!openNotification)}
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
          min-width: 300px; 
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

        .notification-list { 
          padding: 5px 0px 10px 0; 
          text-align: center;
          font-size: 16px;
          color: black;  
          height: 100px; 
          background: #f9f9f9;
        }  

        .notification-list { 
         display: flex; 
         flex-direction: row;
        } 

      `}</style>
    </div>
  );
}
