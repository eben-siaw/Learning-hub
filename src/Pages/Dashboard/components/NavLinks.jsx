import React, { useContext } from "react"; 
import { NavLink } from "react-router-dom";  
import SchoolIcon from  '@material-ui/icons/SchoolOutlined';

export default function NavLinks(props) { 
 
  const logouthandler = () => { 
    localStorage.removeItem("usertoken"); 
    window.location = "/login"; 
  }; 

  const link = (value = "") => `/dashboard${value}`;
  return (
    <div className="list-box">
      <NavLink exact={true} to={link()}>
        <i className="ion-ios-home-outline"></i>
      </NavLink>
      <NavLink to={link(`/videos`)}>
        <i className="ion-ios-videocam-outline"></i>
      </NavLink>  
      <NavLink to={link(`/coursehub`)}>
        <i className="ion-ios-book-outline"></i>
      </NavLink> 
      {/*<NavLink to={link(`/lessons`)}>
        <i className="ion-ios-list-outline"></i>
      </NavLink>*/}
      <NavLink to={link(`/instructorhub`)}> 
      <i className="ion-android-contact"></i>
      </NavLink> 
      <NavLink to={link(`/settings`)}>
        <i className="ion-ios-gear-outline"></i>
      </NavLink>
      <NavLink to={link(`/help`)}>
        <i className="ion-ios-help-outline"></i>
      </NavLink>
      <div className="signout-box-in">
        <button
          style={{
            background: "#fff",
            fontSize: "18px",
            color: "var(--color-1)",
          }}
          onClick={() => logouthandler()}
        >
          <i className="ion-log-out"></i>
        </button>
      </div>
    </div>
  );
}
