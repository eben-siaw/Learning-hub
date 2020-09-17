import React from "react";
import PageHeader from "../components/PageHeader";
import {useSelector} from 'react-redux';

function Settings() { 

  const user = useSelector(state => state.auth.user)
  return (
    <div>
      <PageHeader title="Settings" useSearch={true} /> 

      <div> 
     
      <h1 style={{fontSize: 16}}> Account Settings </h1> 

      <div style={{paddingTop: 50}}>  

      <span> <div style={{fontSize: 16, color: 'dodgerblue'}}> First name </div>  {user.first_name} </span>
     <div style={{paddingTop: '19px'}}></div>
     <hr/>
      <span> <div style={{fontSize: 16, color: 'dodgerblue'}}> Last name </div>  {user.last_name} </span>   
      <div style={{paddingTop: '19px'}}></div> 
      <hr/>
       <span>  <div style={{fontSize: 16, color: 'dodgerblue'}}> Nationality  </div> {user.country} </span>      
       <div style={{paddingTop: '19px'}}></div> 
       <hr/>
       <span>  <div style={{fontSize: 16, color: 'dodgerblue'}}> Region </div>  {user.region} </span> 
     </div>
      </div>
    </div>
  );
}

export default Settings;
