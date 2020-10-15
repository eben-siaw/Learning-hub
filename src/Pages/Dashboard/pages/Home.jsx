import React, { Component } from "react";
import Actions from "../components/Actions";
import PageHeader from "../components/PageHeader";
import CourseList from "../components/CourseList";
import jwt_decode from "jwt-decode";


class Home extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      email: "",
      last_name: "",
      _id: null,
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    if (!token) {
      window.location = "/";
    }
    const decoded = jwt_decode(token);
    this.setState({
      _id: decoded._id,
      first_name: decoded.first_name,
      email: decoded.email,
      last_name: decoded.last_name,
    });
  }

  render() { 
    
    return (
      <div className="container">
        <PageHeader title="Dashboard" useSearch={false} />    
        <div className="container-inner">
          <div className="welcome-card">
            <div>
              <h3>Welcome Back!</h3>
              <h5>Educational contents & Studies made easy.</h5>
              <p>
                You can start by either joining a course or creating a course as an Instructor
              </p>
              <p>
                Links are provided below. Enjoy your stay with Edunal by Dawn Of
                Abstraction
              </p>
            </div>
            <div className="icon">
              <i className="ion-chatboxes"></i>
            </div> 
          </div>
          <div className="info-box">
            <Actions user={this.state} />
            <CourseList />
          </div> 
        </div>
        <style jsx>{`
          .container-inner {
            max-height: 88vh;
            overflow: auto;
          }
          .container-inner::-webkit-scrollbar {
            display: none;
          }
          .welcome-card {
            padding: 10px 20px;
            border-radius: 10px;
            min-height: 100px;
            background-image: url(/img/backgroundPrimary.svg);
            background-size: cover;
            background-position: left bottom;
            display: flex;
            align-items: center;
            margin-bottom: 30px;
          }

          .welcome-card .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 140px;
            color: #fff;
            opacity: 0.5;
            transform: translateX(-50px);
          }
          .welcome-card > div:first-child {
            flex: 1;
          }

          .welcome-card h3,
          .welcome-card h5 {
            color: #fff;
          }
          .welcome-card h3 {
            font-size: 30px;
          }
          .welcome-card h5 {
            font-size: 18px;
            font-family: regularFont !important;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .welcome-card p {
            color: #ffffffaa;
            margin-bottom: 10px;
          }

          .info-box {
            display: flex;
            flex-wrap: wrap;
          }

          @media (max-width: 500px) {
            .container-inner {
              max-height: 76vh;
            }
            .welcome-card {
              max-width: 100%;
              padding: 10px;
            }
            .welcome-card h3 {
              font-size: 20px;
            }
            .welcome-card h5 {
              font-size: 14px;
              margin-bottom: 10px;
            }
            .welcome-card p {
              font-size: 12px;
            }
            .welcome-card .icon {
              display: none;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Home;
