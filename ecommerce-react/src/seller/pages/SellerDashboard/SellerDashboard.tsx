import React, { useEffect } from "react";
import SellerDrawerList from "../../components/SideBar/DrawerList";
import Navbar from "../../../customer/Navbar/Navbar";
import SellerRoutes from "../../../routes/SellerRoutes";

const SellerDashboard = () => {
  return (
    <div className="min-h-screen">
      {/* <Navbar DrawerList={SellerDrawerList}/> */}
      {/* <Navbar /> */}
      <section className="lg:flex lg:h-[90vh]">
        <div className="hidden lg:block h-full">
        <SellerDrawerList/>
        </div>
        <div className="p-10 w-full lg:w-[80%]  overflow-y-auto">
          <SellerRoutes />
          
        </div>
      </section>
    </div>
  );
};

export default SellerDashboard;
