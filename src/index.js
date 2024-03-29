import React from 'react'; 
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';     
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './action_reducers'; 
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>  
      <App /> 
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
