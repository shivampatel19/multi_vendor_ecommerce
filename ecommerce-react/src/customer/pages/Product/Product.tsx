import { Filter, FilterAlt } from "@mui/icons-material";
import React, { useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard/ProductCard";
import {
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const images = [
  "https://manyavar.scene7.com/is/image/manyavar/I02_ma3053_06-10-2022-09-23:650x900",
  "https://manyavar.scene7.com/is/image/manyavar/I03_ma3057_06-10-2022-09-24:650x900",
  "https://manyavar.scene7.com/is/image/manyavar/I04_ma3061_06-10-2022-09-26:650x900",
  "https://manyavar.scene7.com/is/image/manyavar/I01_ma3055_06-10-2022-09-23:650x900",
];


const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState();
  const [page, setPage] = useState(1);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  };
  return (
    <div className="-z-10 mt-10">
      <div>
        <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
          {" "}
          women sarees{" "}
        </h1>
      </div>

      <div className="lg:flex">
        <section className="filter_section hidden lg:block w-[20%]">
          <FilterSection />
        </section>
        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className="relative w-[50%]">
              {!isLarge && (
                <IconButton>
                  <FilterAlt />
                </IconButton>
              )}
              {!isLarge && (
                <IconButton>
                  <FilterSection />
                </IconButton>
              )}
            </div>

            <FormControl size="small" sx={{ width: "200px" }}>
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
          <section className="products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center">
            {[1, 1, 1, , 1, 1, 1, 1, 1].map((item) => (
              <ProductCard />
            ))}
          </section>
          <div className="flex justify-center pt-10">
          <Pagination
            //page={page}
            onChange={(e, value) => handlePageChange(value)}
            count={10}
            color="primary"
            //count={products?.totalPages}
            shape="rounded"
          />
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-10"></div>
    </div>
  );
};

export default Product;
