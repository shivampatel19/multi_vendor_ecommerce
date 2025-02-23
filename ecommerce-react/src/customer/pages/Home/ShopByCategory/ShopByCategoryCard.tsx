import React from 'react'
import "./ShopByCategory.css"

const ShopByCategoryCard
 = () => {
  return (
    <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
        <div className='custom-border w-[150px] h-[150px] lg:w-[249px] lg:h-[249px] rounded-full bg-primary-color'>
          <img className='rounded-full group-hover:scale-95 transition-transform transform-duration-700 object-cover object-top h-full w-full' 
          src="https://5.imimg.com/data5/SELLER/Default/2024/3/397351169/HK/ZL/ID/29955370/modern-kitchen-cabinet.jpg" alt="" />
        </div>
        <h1> Kitchen & Table </h1>
    </div>
  )
}

export default ShopByCategoryCard
