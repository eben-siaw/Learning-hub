import React, { useState, useEffect } from "react";
import axios from "axios";   
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import {useSelector} from 'react-redux';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css" 

const URL = "https://nilee-nodedatabase.herokuapp.com"; 

const CourseList = () => { 
 
  const user = useSelector(state => state.auth.user._id);

  const [list, setList] = useState([]); 
  const [loading, setLoading] = useState(true);  

 const getCourse = async () => { 
  
  const res = await axios.get(URL + `/courses/${user}/currentcourse`) 
    if(res.data.success) { 
      setList(res.data.course);   
      setLoading(false);
    }
  
  }

  useEffect(() => { 
   getCourse();
  }, [])

  return (
    <div className="course-list">  
     <h5 style={{color: "CadetBlue", fontSize: '1.1em'}}>Your Courses</h5>
      {list.length < 1 || list.length === 0 ? <Empty /> : <div className="list">   
      { loading ? <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} timeout={10000} /> : null}
       <Typography variant="body1" style={{color: "DarkSlateGrey", fontSize: '1.4em', fontFamily: 'sans-serif, Arial, Helvetica'}}> {list.course_name}  </Typography>  
       <br/>
        <Link style={{color: "CadetBlue"}} to="/dashboard/instructorhub"> Show more </Link>
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
        .list { 
          margin: 0;
          position: absolute;
          top: 50%;
          left: 50%;
         -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
        }
        .course-list h5 {
          margin-bottom: 20px;
          color: var(--color-1);
        }

        @media (max-width: 920px) {
          .course-list {
            margin: 20px 0;
          }
        }

        @media (max-width: 500px) {
          .course-list {
            padding: 15px 10px;
            margin-left: 0px;
            min-width: 100%;
            min-height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

const Empty = () => {
  return (
    <div className="empty-list">
      <i className="ion-android-happy"></i>
      <p>You have not created a course</p>
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
