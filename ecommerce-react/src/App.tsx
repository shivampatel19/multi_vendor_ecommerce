import { ThemeProvider } from "@mui/material";
import "./App.css";
import customTheme from "./theme/customTheme";
import Navbar from "./customer/Navbar/Navbar";
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/Product/Product";
import ProductDetails from "./customer/pages/Product/ProductDetails/ProductDetails";
import Reviews from "./customer/pages/Review/Reviews";
import Cart from "./customer/pages/Cart/Cart";
import AddressPage from "./customer/pages/Checkout/AddressPage";
import Profile from "./customer/pages/Account/Profile";
import { Route, Routes, useNavigate } from "react-router-dom";
import BecomeSeller from "./customer/pages/BecomeSeller/BecomeSeller";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/Dashboard";
import { useEffect } from "react";
import { fetchProducts } from "./State/fetchProducts";
import { useAppDispatch, useAppSelector } from "./Redux Toolkit/Store";
import { fetchUserProfile } from "./Redux Toolkit/Customer/UserSlice";
import { fetchSellerProfile } from "./Redux Toolkit/Seller/sellerSlice";
import { createHomeCategories } from "./Redux Toolkit/Customer/Customer/AsyncThunk";
import { homeCategories } from "./data/homeCategories";

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const sellerAuth = useAppSelector((state) => state.sellerAuth);
  const sellers = useAppSelector((state) => state.sellers);
  const user = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(
        fetchUserProfile({
          jwt: localStorage.getItem("jwt") || auth.jwt || "",
          navigate,
        })
      );
      dispatch(
        fetchSellerProfile(localStorage.getItem("jwt") || sellerAuth.jwt)
      );
    }
  }, [auth.jwt, sellerAuth.jwt, dispatch, navigate]);

  useEffect(() => {
    dispatch(createHomeCategories(homeCategories));
    // dispatch(fetchHomePageData())
  }, [dispatch]);

  return (
    <div>
      <ThemeProvider theme={customTheme}>
        <div className="App">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:category" element={<Product />} />
            <Route path="/reviews/:productId" element={<Reviews />} />
            <Route
              path="/product-details/:categoryId/:name/:productId"
              element={<ProductDetails />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<AddressPage />} />
            <Route path="/account/*" element={<Profile />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/seller/*" element={<SellerDashboard />} />
            <Route path="/become-seller" element={<BecomeSeller />} />
          </Routes>
          {/* <Footer/> */}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
