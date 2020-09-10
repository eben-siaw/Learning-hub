import React, { useState } from "react";

export default function Notification() {
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const renderEmpty = () => {
    return <div className="empty-box">No new notifications</div>;
  };

  const renderNotifications = () => {
    return (
      <div className="notification-list">
        {notifications.forEach((item, index) => (
          <div></div>
        ))}
      </div>
    );
  };
  return (
    <div className="notification">
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
          margin-right: 50px;
        }

        .notification .icon {
          font-size: 28px;
          color: var(--color-1);
          cursor: pointer;
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
      `}</style>
    </div>
  );
}
