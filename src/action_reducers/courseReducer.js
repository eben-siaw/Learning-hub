import {MEETING_ID } from '../actions/types';

const INITIAL_STATE = { 
  data: {}
};

export function course(state = INITIAL_STATE, action) {
    switch (action.type) { 

  case MEETING_ID: 
  return { 
   ...state, 
   data: action.payload
  };  
    
 default:
    return state;  

 } 
 
}