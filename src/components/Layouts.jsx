import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CookieCleaner from "./CookieCleaner";
import VelvetNavbar from "./VelvetNavbar";
import VelvetFooter from "./VelvetFooter";
import { useReveal } from "../hooks/useReveal";
import "../velvet.css";

function MobileBottomBar() {
  const navigate = useNavigate();

  const handleOpenMenu = () => {
    window.dispatchEvent(new CustomEvent("toggle-mobile-menu"));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] lg:hidden">
      <div className="grid h-[68px] grid-cols-3 overflow-hidden border-t border-white/10 bg-[#3b0404]/95 backdrop-blur-md shadow-[0_-8px_20px_rgba(0,0,0,0.25)]">
        <button
          type="button"
          onClick={handleOpenMenu}
          className="flex flex-col items-center justify-center border-r border-white/10 text-white transition-colors hover:text-[#c9a84c]"
        >
          <span className="mb-1 inline-flex">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </span>

          <span className="text-[11px] font-medium uppercase tracking-[0.14em]">
            Menu
          </span>
        </button>

        <a
          href="tel:+250781423080"
          className="flex flex-col items-center justify-center border-r border-white/10 text-white transition-colors hover:text-[#c9a84c]"
        >
          <span className="mb-1 inline-flex">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.79.68 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.25a2 2 0 0 1 2.11-.45c.84.33 1.73.56 2.63.68A2 2 0 0 1 22 16.92Z" />
            </svg>
          </span>

          <span className="text-[11px] font-medium uppercase tracking-[0.14em]">
            Call
          </span>
        </a>

        <a
          href="https://direct-book.com/properties/velvetsuites?locale=en&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=USD&checkInDate=2026-08-06&checkOutDate=2026-08-07&trackPage=no"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-[#c9a84c] px-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#d4b45a]"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}

export default function Layouts() {
  const location = useLocation();
  const path = location.pathname;

  useReveal(path);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <div
      className="vs-page relative"
      style={{
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <CookieCleaner />

      <VelvetNavbar currentPath={path} />

      <main>
        <Outlet />
      </main>

      <div className="pb-[68px] lg:pb-0">
        <VelvetFooter />
      </div>

      <MobileBottomBar />
    </div>
  );
}
