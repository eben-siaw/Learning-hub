import React from "react";
import Notification from "./Notification";

export default function PageHeader({ title, useSearch }) {
  return (
    <div className="page-header">
      <h2>{title}</h2>
      <div className="options">
        {useSearch && (
          <div className="search-field">
            <input placeholder="Search" type="text" name="search" id="search" />
          </div>
        )}
        <Notification />
      </div>
      <style jsx>{`
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .page-header h2 {
          color: var(--color-1);
        }

        .page-header .options {
          display: flex;
          align-items: center;
        }

        .page-header .options input {
          padding: 10px 15px;
          border-radius: 10px;
          background: #dfdfdf;
          margin-right: 20px;
          border: none;
        }

        @media (max-width: 740px) {
          .page-header {
            flex-direction: column-reverse;
            align-items: initial;
          }
          .page-header .options {
            flex: 1;
            margin-bottom: 10px;
          }

          .page-header .options input {
            width: 100%;
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}
