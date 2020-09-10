import React from "react";
import HelpContent from "../components/HelpContent";

export default function Help() {
  return (
    <div className="help-page">
      <div className="help-page-inner">
        <div className="logo-box">
          <img src="/img/nileeLogo.png" width="100px" alt="" />
          <h3>Nilee Help</h3>
        </div>
        <div className="help-content"> <HelpContent/> </div>
      </div>
      <style jsx>{`
        .help-page {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--color-1);
          border-left: 1px solid rgba(0, 0, 0, 0.3);
          animation: slide-in 0.5s cubic-bezier(0.24, 1.07, 0.68, 1.1);
        }

        .help-page-inner {
          animation: fade-slide-in 1s;
        }

        @keyframes fade-slide-in {
          0%,
          30% {
            opacity: 0;
            transform: translateY(20px);
          }
          80% {
            opacity: 1;
          }
        }

        @keyframes slide-in {
          0% {
            width: 0%;
          }
        }

        .logo-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          padding: 30px 0;
          border-bottom: 1px solid #ffffff0a;
        }
        .logo-box img {
          margin-bottom: 10px;
        }

        .help-content {
        }
      `}</style>
    </div>
  );
}
