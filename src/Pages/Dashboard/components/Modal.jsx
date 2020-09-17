import React from "react";

function Modal({ component: Component, onClose, buttonTitle, onClick }) {
  return (
    <div className="modal">
      <div className="modal-inner bg-modal">
        <div onClick={onClose} className="close-btn">
          <i className="ion-close"></i>
        </div>
        <Component />
      </div>
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000000aa;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .modal-inner {
          min-height: 350px;
          min-width: 500px;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pop-in 0.5s cubic-bezier(0.04, 1.22, 0.78, 1.09);
          background-color: #fff;
        }

        @keyframes pop-in {
          0% {
            transform: scale(0.9);
          }
        }

        .modal-inner .button {
          width: 100%;
        }

        .modal .close-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 20px;
          right: 20px;
          background: #fff;
          color: red;
          cursor: pointer;
          box-shadow: 0 0 10px #0000003a;
        }

        @media (max-width: 520px) {
          .modal-inner {
            min-width: 95%;
          }
        }
      `}</style>
    </div>
  );
}

export default Modal;
