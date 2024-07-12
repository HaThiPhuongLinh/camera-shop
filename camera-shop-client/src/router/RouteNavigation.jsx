import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import BlogPage from "../pages/BlogPage";
import BlogPost from "../pages/BlogPage/BlogPost";
import AboutPage from "../pages/AboutPage";

const RouteNavigation = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="camera" element={<ShopPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blogc" element={<BlogPost />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RouteNavigation;
