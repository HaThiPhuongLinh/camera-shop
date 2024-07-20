import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const RouteNavigation = () => {
  return (
    <div>
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route path="signin" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="camera" element={<ShopPage />} />
              <Route path="camera/:name" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="cart/checkout" element={<CheckoutPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blogc" element={<BlogPost />} />
              <Route path="about" element={<AboutPage />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}></Route>
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </div>
  );
};

export default RouteNavigation;
