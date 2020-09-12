import React, {useState, useEffect} from "react";
import Modal from "./Modal";
import InputField from "../../../Components/InputField";
import { v1 as uuid } from "uuid"; 
import axios from 'axios'; 
import {useSelector} from 'react-redux';
import {courseEntry} from "./Coursefunctions";


const URL = "https://nilee-nodedatabase.herokuapp.com"  

const Actions = ({user}) => { 
  
  const CreateForm = ({action}) => {    
 
    const addcourse = async newcourse => {     
      try {
       return await axios.post(URL + `/courses/${user._id}/addcourse`, newcourse); 
      } catch (error) {
        return { error: "Internal Server Error" };
      }
    } 
  
    const [data, setData] = useState({
      course_name: "",
      meetingId: uuid(),
    }); 
  
    const [error, setError] = useState({
      isTrue: false,
      message: "",
    });
  
    const throwError = (message) => {
      setError({ isTrue: true, message });
      setTimeout(() => setError({ isTrue: false, message: "" }), 5000);
    };
  
    const onChange = ({ target }) => {
      setData({ ...data, [target.name]: target.value });
    };
  
    const submit = async () => {
      const isValid = Object.values(data).includes("") === false;
      if (isValid) {
        await addcourse({...data}).then((data) => {
          if(data.error) return throwError(data.error);   
           window.location.href = "/dashboard/courses";
        });
      }
    };
  
    return (
      <form action={action}>
        <div className={`error-display ${error.isTrue ? "" : "hidden"}`}>
          <p>{error.message}</p>
        </div> 
        <InputField
          name="course_name"
          label="Course name here"
          onChange={onChange}
          value={data.course_name}
          error={data.course_name.length < 1}
          errorMessage="Field cannot be empty"
          required={true}
        />
        <InputField
          name="meetingId"
          label="Enter meeting id"
          onChange={onChange}
          value={data.meetingId}
          error={data.meetingId.length < 1}
          errorMessage="Field cannot be empty"
          required={true}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span onClick={submit} className="button">
            Create
          </span>
        </div>
      </form>
    );
  };


  const [modalState, setModalState] = useState({
    create: false,
    join: false,
  });

  const openModal = (arg) => {
    switch (arg) {
      case "join":
        setModalState({ ...modalState, join: true });
        break;
      case "create":
        setModalState({ ...modalState, create: true });
        break;
      default:
        break;
    }
  };

  const reset = () => setModalState({ create: false, join: false });

  return (
    <div className="actions">
      <div className="card bg-main">
        <div className="icon">
          <i className="ion-android-people"></i>
        </div>
        <span onClick={() => openModal("join")} className="button white">
          Join a course
        </span>
      </div>
      <div className="card bg-secondary">
        <div className="icon">
          <i className="ion-compose"></i>
        </div>
        <span onClick={() => openModal("create")} className="button white">
          Create a course
        </span>
      </div>
      {modalState.create && <Modal onClose={reset} component={CreateForm} />}
      {modalState.join && <Modal onClose={reset} component={JoinForm} />}
      <style jsx>{`
        .actions {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex: 0.8;
        }
        .card {
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px #00000039;
          min-width: 200px;
          flex: 1;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .card:first-child {
          margin-bottom: 20px;
        }

        .card .icon {
          background: #ffffff1a;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }

        @media (max-width: 920px) {
          .actions {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}; 


const JoinForm = ({ action }) => {
  const [meetingId, setMeetingId] = useState("");
  const [error, setError] = useState({
    isTrue: false,
    message: "",
  });

  const throwError = (message) => {
    setError({ isTrue: true, message });
    setTimeout(() => setError({ isTrue: false, message: "" }), 5000);
  };

  const onChange = ({ target }) => {
    setMeetingId(target.value);
  };

  const submit = async () => {
    if (meetingId)
      await courseEntry({ meetingId: meetingId }).then((res) => {
        console.log(res);
        if (res.error) {
          return throwError(res.error);
        }  
        window.location.href = "/dashboard/viewerstreams";
      });
  };

  return (
    <form action={action}>
      <div className={`error-display ${error.isTrue ? "" : "hidden"}`}>
        <p>{error.message}</p>
      </div>
      <InputField
        name="entryId"
        label="Enter meeting id"
        onChange={onChange}
        value={meetingId}
        error={meetingId < 1}
        errorMessage="Field cannot be empty"
        required={true}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span onClick={submit} className="button">
          Join Now
        </span>
      </div>
    </form>
  );
};

export default Actions;
