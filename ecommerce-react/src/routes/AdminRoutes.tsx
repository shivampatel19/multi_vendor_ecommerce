import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Deal from '../admin/pages/Home Page/Deal'
import ShopByCategoryTable from '../admin/pages/Home Page/ShopByCategoryTable'
import ElectronicsTable from '../admin/pages/Home Page/ElectronicsTable'
import GridTable from '../admin/pages/Home Page/GridTable'
import CouponForm from '../admin/pages/Coupon/CreateCouponForm'
import Coupon from '../admin/pages/Coupon/Coupon'
import SellersTable from '../admin/pages/sellers/SellersTable'


const AdminRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<SellersTable/>}/>
    <Route path='/coupon' element={<Coupon/>}/>
    <Route path='/add-coupon' element={<CouponForm/>}/>
    <Route path='/home-grid' element={<GridTable/>}/>
    <Route path='/electronics-category' element={<ElectronicsTable/>}/>
    <Route path='/shop-by-category' element={<ShopByCategoryTable/>}/>
    <Route path='/deals' element={<Deal/>}/>
  </Routes>
  </div>
  )
}

export default AdminRoutes