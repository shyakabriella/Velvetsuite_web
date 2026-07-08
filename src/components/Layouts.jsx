import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import VelvetNavbar from "./VelvetNavbar";
import VelvetFooter from "./VelvetFooter";
import { useReveal } from "../hooks/useReveal";
import "../velvet.css";

export default function Layouts() {
  const location = useLocation();
  const path = location.pathname;

  useReveal(path);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <div className="vs-page" style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <VelvetNavbar currentPath={path} />
      <main>
        <Outlet />
      </main>
      <VelvetFooter />
    </div>
  );
}
