import React, { Component } from "react";
import StudentNav from "../../Navbar/StudentNav";
import ViewerStreamList from "../InstructorPage/LiveStreams/Components/ViewerStreamlist";

export default function StudentPage() {
  return (
    <div>
      <div className="studentPage_header">
        <StudentNav />
      </div>
      <div className="studentPage_body">
        <ViewerStreamList />
      </div>
    </div>
  );
}

export default StudentPage;
