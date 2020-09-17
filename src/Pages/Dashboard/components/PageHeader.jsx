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
          border: none;
        }

        @media (max-width: 740px) {
          .page-header {
            align-items: center;
          }
          .page-header h2 {
            color: var(--color-1);
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}
