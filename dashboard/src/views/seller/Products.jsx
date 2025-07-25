import React, { useState } from "react";
import Search from "../components/Search";

const Products = () => {
  // State: current page number for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // State: search keyword entered by the user (search logic not implemented)
  const [searchValue, setSearchValue] = useState("");

  // State: number of categories to display per page
  const [parPage, setParPage] = useState(5);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">All Products</h1>
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <Search setParPage={setParPage} />
      </div>
    </div>
  );
};

export default Products;
