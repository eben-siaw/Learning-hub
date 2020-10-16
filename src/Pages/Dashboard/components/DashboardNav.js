import React, { useContext, Fragment } from "react";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import NotificationMenu from "./LikeNotification";

export default function DashboardNav() {
  const logouthandler = () => {
    localStorage.removeItem("usertoken");
    window.location = "/login";
  };

  return (
    <div className="nav-bar">
      <div className="logo-box">
        <img src="/img/logo_white.svg" width="60px" alt="nilee logo" />
      </div>
      <div className="general-menu">
        <NavLinks />
      </div>
      <div className="header-notification">
        <NotificationMenu />
        <MobileMenu />
      </div>
      <div className="signout-box">
        <button onClick={logouthandler}>
          <i className="ion-log-out"></i>
        </button>
      </div>
      <style jsx>{`
        .nav-bar {
          background: var(--color-1);
          z-index: 5;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          --icon-padding: 10px 15px;
          grid-area: navbar;
        }

        .logo-box {
          display: flex;
          align-items: center;
          justify-self: stretch;
          justify-content: center;
          padding: 20px 0;
          width: 100%;
        }

        .header-notification { 
          display: none;
          align-items: center;
        }

        .list-box {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .list-box a {
          padding: var(--icon-padding);
          color: #fff;
          margin: 10px 0;
          border-radius: 10px;
          font-size: 25px;
          font-weight: bold;
        }

        .list-box a:hover {
          background: #ffffff38;
        }
        .list-box a.active {
          background: #ffffff5a;
        }
        .list-box a:hover > i {
          background: transparent;
        }

        .signout-box {
          padding: 20px 10px;
          text-align: center;
          font-size: 25px;
        }

        .signout-box button {
          color: #fff;
          background: #ffffff;
          padding: var(--icon-padding);
          border-radius: 10px;
          color: var(--color-1);
        }

        .general-menu .signout-box-in {
          display: none;
        }

        @media (max-width: 500px) {
          .header-notification {
            display: flex;
          }  
          .m-view { 
            color: #fff;
          }
          .nav-bar {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
          }

          .logo-box {
            justify-self: initial;
            width: initial;
          }

          .general-menu {
            display: none;
          }
          .signout-box {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
