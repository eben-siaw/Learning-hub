import React from "react";
import { useState } from "react";
import NavLinks from "./NavLinks";

export default function MobileMenu() {
  const [isClosed, setIsClosed] = useState(true);
  return (
    <div className="mobile-menu">
      <span
        onClick={() => setIsClosed(!isClosed)}
        className={`${isClosed ? "ion-navicon-round" : "ion-close"} menu-btn`}
      ></span>
      <div
        onClick={() => setIsClosed(!isClosed)}
        className={`${isClosed ? "" : "open"} menu-list`}
      >
        <NavLinks />
      </div>
      <style jsx>{`
        .mobile-menu {
          display: none;
        }

        .menu-btn {
          font-size: 30px;
          color: #fff;
          cursor: pointer;
        }

        .menu-list {
          position: fixed;
          top: 80px;
          right: 0;
          left: 0;
          background: var(--color-1);
          padding: 20px;
          display: flex;
          border-top: 1px solid #ffffff15;
          clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
          transition: 0.3s;
        }

        .menu-list.open {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        }

        .menu-list .list-box {
          flex-direction: row;
          justify-content: space-between;
          flex: 1;
        }

        @media (max-width: 500px) {
          .mobile-menu {
            display: initial;
          }
        }
      `}</style>
    </div>
  );
}
