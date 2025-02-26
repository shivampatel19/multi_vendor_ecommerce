import { Filter, FilterAlt } from '@mui/icons-material'
import React, { useState } from 'react'
import FilterSection from './FilterSection'
import ProductCard from './ProductCard'
import { Divider, FormControl, IconButton, InputLabel, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material'

const Product = () => {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
    const [sort,setSort] = useState();

    const handleSortChange = (event:any) => {
        setSort(event.target.value);
    }
  return (
    <div className='-z-10 mt-10'>
        <div>
            <h1 className='text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2'> women sarees </h1>
        </div>

        <div className='lg:flex'>
            <section className='filter_section hidden lg:block w-[20%]'>
                <FilterSection />
            </section>
            <div className='w-full lg:w-[80%] space-y-5'>
                <div className='flex justify-between items-center px-9 h-[40px]'>
                    <div className='relative w-[50%]'>
                        {
                            !isLarge && (
                                <IconButton>
                                    <FilterAlt />
                                </IconButton>
                            )
                        }
                        {
                            !isLarge && (
                                <IconButton>
                                    <FilterSection />
                                </IconButton>
                            )
                        }
                    </div>


      <FormControl size="small" sx={{width: "200px"}}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Age"
          onChange={handleSortChange}
        >
          <MenuItem value={"price_low"}>Price : Low - High</MenuItem>
          <MenuItem value={"price_high"}>Price : High - Low</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>


                </div>
                <Divider />
            <section className='products_section'>
                <ProductCard />
            </section>
            </div>
        </div>

    </div>
  )
}

export default Product