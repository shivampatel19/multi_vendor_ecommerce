import React from 'react'

const CategoryGrid = () => {
  return (
    <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
        <div className='col-span-3 row-span-12 text-white'>
            <img 
            className='w-full h-full object-cover object-top rounded-md'
            src='https://www.fabtopper.com/media/catalog/product/cache/7c373a228156ca734e7d8bd3183f97fe/y/e/yellow-banarasi-silk-south-indian-women-wear-saree-ft100438.jpg' alt=''/>
        </div>
        <div className='col-span-2 row-span-6 text-white'>
            <img 
            className='w-full h-full object-cover object-top rounded-md'
            src='https://abrosshoes.com/cdn/shop/products/000A9994_52477171-eb07-414c-961e-91a019191eb8.jpg?v=1737964341&width=2048' alt=''/>
        </div>
        <div className='col-span-4 row-span-6 text-white'>
            <img 
            className='w-full h-full object-cover object-top rounded-md'
            src='https://www.oyorooms.com/blog/wp-content/uploads/2018/03/shutterstock_763588522.jpg' alt=''/>
        </div>
        <div className='col-span-3 row-span-12 text-white'>
            <img 
            className='w-full h-full object-cover object-top rounded-md'
            src='https://pyaariweddings.co/public/static/assets/ckfinder/userfiles/files/Wedding%20-%20Simran%20Dhesi%20and%20Avjeet%2046(2).jpeg' alt=''/>
        </div>
        <div className='col-span-4 row-span-6 text-white'>
            <img 
            className='w-full h-full object-cover object-top rounded-md'
            src='https://zevar.com/cdn/shop/files/zevar-kundan-bridal-jewellery-elegant-kundan-bridal-necklace-set-with-meenakari-design-elegant-kundan-bridal-necklace-set-with-meenakari-design-43808394739945.jpg?v=1729740520' alt=''/>
        </div>
        <div className='col-span-2 row-span-6 text-white'>
            <img 
            className='w-full h-full object-cover object-top rounded-md'
            src='https://www.fizzygoblet.com/cdn/shop/files/CoconutColadaDomesticcover_11zon_1024x1024.jpg?v=1691568502' alt=''/>
        </div>
    </div>
  )
}

export default CategoryGrid