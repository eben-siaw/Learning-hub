import {LOGGED_IN, AUTH_USER } from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: false,
  user: {}, 
};

export function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
      case AUTH_USER:
      return { ...state,  
     user: action.payload };

      case LOGGED_IN:
         return {
            ...state,
            isLoggedIn: action.payload,
         };
    
    default:
      return state;
  }
}

// auth reducers takes an intial state and an updated state