import React from "react";
import PageHeader from "../components/PageHeader";

function Settings() {
  return (
    <div>
      <PageHeader title="Settings" useSearch={true} /> 

      <div> 
     
      <h1 style={{fontSize: 16}}> Streaming Configuration </h1> 

      <div style={{paddingTop: 50}}> 
      <span> After creating a course as an Instructor which redirects you to the streams, <br/> 
        open or install <a href="https://obsproject.com/">OBS studio</a>  on your PC and open settings add a custom stream and use rtmp://localhost-live as the URL or server.  </span> 
        <br/>  

        <div style={{paddingTop: 50}}> 
        <span> You can get the Stream key or stream number after creating a stream which can be seen at the url, the key will be a number. You are now ready to go. </span> 
        </div>
      </div>   

      </div>
    </div>
  );
}

export default Settings;
