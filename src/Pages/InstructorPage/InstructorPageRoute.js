import React, { Component } from 'react'; 
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Startstream from './LiveStreams/Startstream';
import StreamList from './LiveStreams/Components/Streamlist';
import StreamWatch from './LiveStreams/Components/StreamWatch';
import history from './history';

class InstructorPage extends Component
{

 render()
 {

 return( 

<Router history={history}>
  <Route path="/stream/new"  component={Startstream}/> 
  <Route path="/streams"  component={StreamList}/> 
  <Route path="/stream/watch/:id"  component={StreamWatch}/> 
  <Route  /> 
 </Router>

 );

 }

 
} 

export default InstructorPage;