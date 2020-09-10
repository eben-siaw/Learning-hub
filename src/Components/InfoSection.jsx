import React from "react";

function InfoSection({ isLogin }) {
  return (
    <div className="info-section">
      <div className="text">
        <span>
          Welcome to <b>Nilee</b>
        </span>
        {isLogin ? (
          <p>Log in to access your account</p>
        ) : (
          <p>Sign up to Nilee for a new account</p>
        )}
      </div>
    </div>
  );
}

export default InfoSection;
