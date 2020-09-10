import React,{useContext} from "react";
import { NavLink } from "react-router-dom";

export default function NavLinks(props) {  


  const logouthandler = ()=>{
    localStorage.removeItem("usertoken")
    window.location = "/login";
}
  const link = (value = "") => `/dashboard${value}`;
  return (
    <div className="list-box">
      <NavLink exact={true} to={link()}>
        <i className="ion-ios-home-outline"></i>
      </NavLink>
      <NavLink to={link(`/streams`)}>
        <i className="ion-ios-videocam-outline"></i>
      </NavLink>
      <NavLink to={link(`/courses`)}>
        <i className="ion-ios-book-outline"></i>
      </NavLink>
      <NavLink to={link(`/settings`)}>
        <i className="ion-ios-gear-outline"></i>
      </NavLink>
      <NavLink to={link(`/help`)}>
        <i className="ion-ios-help-outline"></i>
      </NavLink>
      <div className="signout-box-in">
        <button onClick={() => logouthandler()}>
          <i className="ion-log-out"></i>
        </button>
      </div>
    </div>
  );
}
