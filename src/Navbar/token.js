import React, { Component } from "react";
import jwt_decode from "jwt-decode";

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      course_name: "",
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      course_name: decoded.course_name,
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.course_name}</p>
      </div>
    );
  }
}

export default Detail;
