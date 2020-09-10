import React from "react";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <img src="/img/notfound.svg" width="400px" alt="not found" />
      <style jsx>{`
        .not-found-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
