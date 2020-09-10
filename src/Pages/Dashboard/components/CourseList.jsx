import React, { useState, useEffect} from "react";
import axios from 'axios'; 

const URL = "http://localhost:5050" 

const CourseList = () => {  
   
  const [list, setList] = useState("")

  return (
    <div className="course-list">
      <h5>Your Courses</h5>
      {list.length < 1 ? <Empty /> : <div className="list">  
       </div>}
      <style jsx>{`
        .course-list {
          background: rgba(0, 0, 0, 0.04);
          border-radius: 10px;
          flex: 1;
          padding: 15px 10px;
          margin-left: 20px;
          min-width: 350px;
          min-height: 300px;
        }
        .course-list h5 {
          margin-bottom: 20px; 
          margin-left: 150px;
          color: var(--color-1);
        }

        @media (max-width: 920px) {
          .course-list {
            margin: 20px 0;
          }
        }
      `}</style>
    </div>
  );
}

const Empty = () => {
  return (
    <div className="empty-list">
      <i className="ion-android-happy"></i>
      <p>View your created courses at Course Hub</p>
      <style jsx>{`
        .empty-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
        }

        .empty-list i {
          font-size: 100px;
          color: #9f9f9f;
          margin-bottom: 20px;
        }

        .empty-list p {
          font-size: 14px;
          color: #afafaf;
        }
      `}</style>
    </div>
  );
}; 

export default CourseList;
