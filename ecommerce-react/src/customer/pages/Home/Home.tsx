import React from "react";
import ElectricCategory from "./ElectricCategory/ElectricCategory";
import CategoryGrid from "./CategoryGrid/CategoryGrid";
import Deal from "./Deal/Deal";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import { Button } from "@mui/material";
import { Storefront } from "@mui/icons-material";

const Home = () => {
  return (
    <div>
      <div className="space-y-5 lg:space-y-10 relative pb-20">
        <ElectricCategory />
        <CategoryGrid />
        
        <section className="pt-20">
        <h1 className="text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-20 text-center">TODAY'S DEALS</h1>
        <Deal />
        </section>
        <section className="pt-20">
        <h1 className="text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-20 text-center">SHOP BY CATEGORY</h1>
        <ShopByCategory />
        </section>
        <section className="pt-20 lg:px-20 relative h-[200px] lg:h-[450px] object-cover">
          <img className="w-full h-full" src="https://c4.wallpaperflare.com/wallpaper/657/437/78/banner-horse-soldier-knight-wallpaper-preview.jpg" alt="" />
          <div className="absolute top-40 left-4 lg:left-[10rem] transform-translate-y-1/2 font-semibold lg:text-4xl space-y-3">
          <h1>Sell your Product</h1>
          <p>with</p>
          <p className="logo">Ecom Bazaar</p>

          <div className="pt-6 flex justify-center">
            <Button startIcon={<Storefront />} variant="contained" size="large"> Become Seller</Button>
          </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
