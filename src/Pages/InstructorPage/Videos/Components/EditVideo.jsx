import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StreamDetails from "./StreamDetails";

const EditStream = (props) => {
  const dispatch = useDispatch();
  const {
    params: { id },
  } = useRouteMatch("/dashboard/videos/edit/:id");
  const state = useSelector((state) => state.streams);
  const editDetails = state[`${id}`];
  const errorMessage = state.editError || "";
  console.log(errorMessage);

  useEffect(() => {
    dispatch(fetchSingleStream(id));
  }, [dispatch, id]);

  const onFormSubmit = (formValues) => {
    dispatch(editStream(id, formValues));
  };

  return (
    <div>
      <div className="create-stream-wrapper">
        <Link to="/dashboard/streams" class="back-button">
          <i className="ion-ios-arrow-back"></i>
          <span>Go Back</span>
        </Link>
        <h3>Edit Existing Stream</h3>
        <div className="form-wrapper">
          <div className={`error-display ${errorMessage ? "" : "hidden"}`}>
            <p>{errorMessage}</p>
          </div>
          <StreamDetails
            editDetails={editDetails || {}}
            onSubmit={onFormSubmit}
          />
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
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default EditStream;
