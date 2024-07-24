import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "../hooks/authStore";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import BlogPage from "../pages/BlogPage";
import BlogPost from "../pages/BlogPage/BlogPost";
import AboutPage from "../pages/AboutPage";
import ProductPage from "../pages/ProductPage";
import Wrapper from "../utils/Wrapper";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import NotiSuccess from "../pages/CheckoutPage/NotiSuccess";
import ErroPage from "../pages/ErrorPage";
import Dashboard from "./../pages/DashBoard/index";
import Products from "../pages/DashBoard/Product";
import Variants from "../pages/DashBoard/Variant";
import Brands from "../pages/DashBoard/Brand";
import Categories from "../pages/DashBoard/Category";
import Features from "../pages/DashBoard/Feature";
import Order from "../pages/DashBoard/Order";
import Customers from "../pages/DashBoard/Customer";
import Posts from "../pages/DashBoard/Post";

const RouteNavigation = () => {
  const role = useAuthStore((state) => state.role);

  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="signin" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<ErroPage />} />

          {role === "ADMIN" ? (
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="cameras" element={<Products />} />
              <Route path="variants" element={<Variants />} />
              <Route path="brands" element={<Brands />} />
              <Route path="categories" element={<Categories />} />
              <Route path="features" element={<Features />} />
              <Route path="orders" element={<Order />} />
              <Route path="customers" element={<Customers />} />
              <Route path="posts" element={<Posts />} />
            </Route>
          ) : (
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="camera" element={<ShopPage />} />
              <Route path="camera/:name" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="cart/checkout" element={<CheckoutPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:postId" element={<BlogPost />} />
              <Route path="about" element={<AboutPage />} />
            </Route>
          )}
          <Route path="order-success" element={<NotiSuccess />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default RouteNavigation;
