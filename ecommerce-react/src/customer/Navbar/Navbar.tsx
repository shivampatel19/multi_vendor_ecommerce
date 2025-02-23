import React, { useState } from 'react'
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
//import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AddShoppingCart, FavoriteBorder, Storefront } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import CategorySheet from './CategorySheet';
import { mainCategory } from '../../data/category/mainCategory';

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  return (
    <>
    <Box sx={{zIndex: 2}} className="sticky top-0 right-0 left-0 bg-white shadow-md">
        <div className="flex items-center justify-between p-5 lg:px20 h-[70px] border-b">
          <div className='flex items-center gap-9'>
          <div className="flex items-center gap-2">
            {!isLarge && <IconButton>
              <MenuIcon />
            </IconButton>}
            <h1 className="logo cursor-pointertext-lg md:text-2xl text-[#00927c]">
              Ecom Bazaar
            </h1>
          </div>
          <ul className='flex items-center font-medium text-gray-800'>
            {mainCategory.map((item)=> 
            <li 
            onMouseLeave={()=>{
              setShowCategorySheet(false);
            }}
            onMouseEnter={()=>{
              setShowCategorySheet(true);
              setSelectedCategory(item.categoryId);
            }}
            className='mainCategory hover:text-primary-color
          hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center'>
              {item.name}
              </li>
            )}
            <li></li>
          </ul>
          </div>
          <div className='flex gap-1 lg:gap6 items-center'>
            <IconButton>
              <SearchIcon />
            </IconButton>
            {false ? (
              <Button className="flexitems-centers gap-2">
                <Avatar src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8fDA%3D" />
                <h1 className="font-semibold hidden lg:block">Shivam</h1>
              </Button>
            ) : (
              <Button variant="contained">Login</Button>
            )}
            <IconButton>
              <FavoriteBorder sx={{fontSize:29}}/>
            </IconButton>
            <IconButton>
              <AddShoppingCart className="text-gray-700" sx={{fontSize:29}}/>
            </IconButton>
            {isLarge && <Button startIcon={<Storefront />} variant="outlined">Become Seller</Button>}
          </div>
        </div>
{        showCategorySheet && <div 
        onMouseLeave={()=>{
          setShowCategorySheet(false);
        }
        }
        onMouseEnter={()=>{
          setShowCategorySheet(true);
        }
        }
        className='categorySheet absolute top-[4.41rem] left-20 right-20 border'>
          <CategorySheet selectedCategory={selectedCategory}/>
        </div>}
      </Box>
    </>
  )
}

export default Navbar