import {URL} from "../Pages/InstructorPage/api/streams";  
import axios from 'axios';

import {  
  LOGGED_IN,
  AUTH_USER,
  CREATE_STREAM,
  CREATE_STREAM_FAILED,
  FETCH_STREAMS,
  FETCH_SINGLE_STREAM,
  EDIT_STREAM,
  EDIT_STREAM_FAILED,
  DELETE_STREAM,
} from "./types";


// get the current user and send to the store with the reducers
export const setCurrentUser = decoded => {
  return  { 
    type: AUTH_USER, 
     payload: decoded 
  };
}

export const setLoggedIn = bool => {
  return {
     type: LOGGED_IN,
     payload: bool,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {  
  try {   
    // getState gets the current state in the store
     const {user} = getState().auth 

    const response = await axios.post(URL + `/streams/${user._id}/createstreams`, {
      ...formValues, 
    });

    dispatch({ type: CREATE_STREAM, payload: response.data }); 
    return window.location = "/dashboard/streams";
  } catch (error) {
    dispatch({
      type: CREATE_STREAM_FAILED,
      payload: { error: "Internal Server Error. Please try again" },
    });
  }
};

export const fetchStreams = () => async (dispatch, getState) => { 

   const {user} = getState().auth 

  const response = await axios.get(URL + `/streams/${user._id}/getstreams`);

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchSingleStream = (id) => async (dispatch) => {
  const response = await axios.get(URL + `/streams/stream/${id}`);

  dispatch({ type: FETCH_SINGLE_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async (dispatch) => {
  try {
    const response = await axios.patch(URL + `/streams/edit/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data });
    return window.location = "/dashboard/streams";
  } catch (err) {
    dispatch({
      type: EDIT_STREAM_FAILED,
      payload: {
        error: "Internal server error. Please try again.",
      },
    });
  }
};

export const deleteStream = (id) => async (dispatch) => {
  await axios.delete(URL + `/streams/delete/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
};

//dispatch sends our streams to the db, form values and the user