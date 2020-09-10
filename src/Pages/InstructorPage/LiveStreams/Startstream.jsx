import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createStream } from "../../../actions";
import StreamDetails from "./Components/StreamDetails";

const Startstream = (props) => {
  const dispatch = useDispatch();

  const onFormSubmit = (formValues) => {
    dispatch(createStream(formValues));
  };

  // passing onSubmit as a prop to the Stream details child component
  return (
    <div>
      <div className="create-stream-wrapper">
        <Link to="/dashboard/streams" className="back-button">
          <i className="ion-ios-arrow-back"></i>
          <span>Go Back</span>
        </Link>
        <h3>Create New Stream</h3>
        <div className="form-wrapper">
          <StreamDetails onSubmit={onFormSubmit} />
        </div>
      </div>
      <style jsx>{`
        .create-stream-wrapper {
          padding: 10px 0;
        }
        .create-stream-wrapper h3 {
          margin: 20px 0;
          text-align: center;
          color: var(--color-1);
        }

        .form-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Startstream;
