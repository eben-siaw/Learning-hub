import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { auth } from './authReducer';
import { streams } from './streamReducer'; 
import {course} from './courseReducer';

//submits the reducers to the redux store 

export default combineReducers({
  auth, 
  course,
  form,
  streams,
});

