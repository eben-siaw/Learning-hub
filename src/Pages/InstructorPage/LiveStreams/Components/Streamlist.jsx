import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStreams, deleteStream } from "../../../../actions";
import { Link } from "react-router-dom";
import { useState } from "react";

const StreamList = () => { 

  const dispatch = useDispatch();
  const state = useSelector((state) => state.streams);
  const authUserId = useSelector((state) => state.auth.user._id);
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const streams = Object.values(state);
  

  const onItemDelete = (streamId) => {
    dispatch(deleteStream(streamId));
  };

  useEffect(() => {
    dispatch(fetchStreams());
  }, [dispatch]);

  const reduceDescription = (description) => {
    const { length } = description;
    const max = 60;
    if (length >= max) {
      return description.slice(0, max) + "...";
    }
    return description;
  };
 
  
  const renderStreams = () => {
    return streams.map((stream, index) => {
      const color = Math.ceil(Math.random() * 3);
      return (
        <div
          key={index}
          className="stream-card"
          style={{
            borderLeft: `3px solid var(--color-${color})`,
          }}
        >
          <div className="detail">
            <div
              className="detail-icon"
              style={{ background: `var(--color-${color}-transparent)` }}
            >
              <i
                className="ion-videocamera"
                style={{ color: `var(--color-${color})` }}
              ></i>
            </div>
            <div className="detail-info">
              <h5 style={{ marginBottom: "5px", color: "var(--text-color)" }}>
                {stream.title}
              </h5>
              <p style={{ fontSize: "14px" }}>
                {reduceDescription(stream.description)}
              </p>
            </div> 
            
          </div>
          <div className="actions">
            <Link
              to={`/dashboard/streams/watch/${stream._id}`}
              className="button prime"
            >
               Go live
            </Link>
          </div>
          {stream.user._id === authUserId ? (
            <AuthOptions
              streamId={stream._id}
              onDelete={() => onItemDelete(stream._id)}
            />
          ) : (
            ""
          )}
        </div>
      );
    });
  };

  const renderCreateButton = () => {
    if (isAuth) {
      return (
        <Link className="add-button" to="/dashboard/streams/new">
          <img width="50%" src="/img/addIconFlat.svg" alt="add Icon" />
        </Link>
      );
    }
  };
  return (
    <div className="stream-list-container">
      {renderCreateButton()}
      <div className="stream-list-container-inner">{renderStreams()}</div>
      <style jsx>{`
        .stream-list-container-inner {
          height: 88vh;
          overflow: auto;
          padding-bottom: 20px;
        }
        .stream-list-container-inner::-webkit-scrollbar {
          display: none;
        }
        .stream-list-container-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto;
          grid-gap: 20px;
          padding: 20px 0;
          overflow: auto;
        }

        .add-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          box-shadow: 0 0 10px #00000095;
          position: absolute;
          right: 20px;
          bottom: 100px;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
        }

        .stream-card {
          width: 99%;
          min-height: 170px;
          max-height: 200px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 0 5px #00000032;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .stream-card .auth-options {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.2s;
        }
        .stream-card .auth-options:hover {
          background: #00000025;
        }
        .stream-card .option-list {
          position: absolute;
          top: 110%;
          right: 0;
          font-size: 14px;
          color: red;
          box-shadow: 0 0 10px #00000025;
          border-radius: 5px;
          background: #fff;
          overflow: hidden;
        }

        .stream-card .option-list > * {
          padding: 10px 30px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .stream-card .option-list > *:hover {
          background: #f9f9f9;
        }

        .stream-card .detail {
          display: flex;
          margin-bottom: auto;
        }
        .stream-card .detail .detail-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
        }
        .stream-card .detail .detail-info {
          flex: 1;
          margin-left: 10px;
          padding: 10px 0;
        }

        .stream-card .actions {
          display: flex;
          justify-content: flex-end;
        }

        .stream-card .actions .button {
          font-weight: 300;
          padding: 10px;
        }

        @media (max-width: 600px) {
          .stream-list-container-inner {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

  const AuthOptions = ({ streamId, onDelete }) => {
    const [show, setShow] = useState(false);
    return (
      <div className="auth-options">
        <i
          onClick={() => setShow(!show)}
          style={{
            fontSize: "25px",
            color: "var(--text-color)",
            cursor: "pointer",
          }}
          className="ion-android-more-vertical"
        ></i>
        <div
          className="option-list"
          style={{ display: `${show ? "block" : "none"}` }}
        >
          <Link
            to={`/dashboard/streams/edit/${streamId}`}
            className="delete-button"
            style={{ color: "var(--color-2)" }}
          >
            Edit
          </Link>
          <span
            onClick={onDelete}
            className="delete-button"
            style={{ color: "red" }}
          >
            Delete
          </span>
        </div>
      </div>
    );
  };



export default StreamList;
