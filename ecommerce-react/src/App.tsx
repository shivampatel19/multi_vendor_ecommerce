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
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    // <div>
    //   <ThemeProvider theme={customTheme}>
    //     <div>
    //       <Navbar />
    //       {/* <Home /> */}
    //       {/* <Product /> */}
    //       {/* <ProductDetails /> */}
    //       {/* <Reviews /> */}
    //       {/* <Cart /> */}
    //       {/* <AddressPage /> */}
    //        <Profile />
    //     </div>
    //   </ThemeProvider>
    // </div>
    <div>
          <ThemeProvider theme={customTheme}>
      <div className='App' >
      <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:category' element={<Product />} />
          <Route path='/reviews/:productId' element={<Reviews />} />
          <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<AddressPage />} />
          <Route path='/account/*' element={<Profile />} />
        </Routes>
        {/* <Footer/> */}
      </div>



    </ThemeProvider>
    </div>
  );
}

export default App;
