import { Route, Routes, useParams, Navigate } from "react-router-dom";

import Layouts from "../components/Layouts";
import Home from "../pages/Home";
import About from "../pages/About";
import SuiteDetail from "../pages/SuiteDetail";
import Experiences from "../pages/Experiences";
import ExperienceDetail from "../pages/ExperienceDetail";
import Dining from "../pages/Dining";
import Menu from "../pages/Menu";
import Gallery from "../pages/Gallery";
import Stories from "../pages/Stories";
import Book from "../pages/Book";
import Policies from "../pages/Policies";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login"; // ← Updated: Login is in pages folder
import Dashboard from "../pages/Dashboard";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";

const SuiteDetailWrapper = () => {
  const { slug } = useParams();
  return <SuiteDetail slug={slug} />;
};

const ExperienceDetailWrapper = () => {
  const { slug } = useParams();
  return <ExperienceDetail slug={slug} />;
};

export default function AppRoutes() {
  // Check if user is logged in
  const token =
    sessionStorage.getItem("token") || sessionStorage.getItem("auth_token");

  return (
    <Routes>
      {/* Login page - always accessible */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard - only if logged in */}
      <Route
        path="/admin/*"
        element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      {/* Redirect root to admin if logged in, else home */}
      <Route
        path="/"
        element={token ? <Navigate to="/admin" replace /> : <Layouts />}
      >
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="stays" element={<Navigate to="/gallery" replace />} />
        <Route path="stays/:slug" element={<SuiteDetailWrapper />} />
        <Route path="experiences" element={<Experiences />} />
        <Route path="experiences/:slug" element={<ExperienceDetailWrapper />} />
        <Route path="dining" element={<Dining />} />
        <Route path="restaurant" element={<Dining />} />
        <Route path="menu" element={<Menu />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="stories" element={<Stories />} />
        <Route path="book" element={<Book />} />
        <Route path="policies" element={<Policies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
