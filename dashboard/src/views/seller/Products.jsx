import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_products } from "../../store/Reducers/productReducer";
/**
 * Products component displays a paginated table of products with static demo data.
 * Includes search and page size controls, and action icons for each product row.
 *
 * State:
 * - currentPage: Tracks the current page number for pagination.
 * - searchValue: Stores the search keyword entered by the user.
 * - parPage: Number of items to display per page.
 *
 * Renders:
 * - Search controls for filtering and page size.
 * - Table listing product details (demo data).
 * - Actions for editing, viewing, and deleting each product.
 * - Pagination control.
 */

const Products = () => {
  // Redux dispatch function to trigger actions
  // This is used to dispatch the categoryAdd action when adding a new category.
  const dispatch = useDispatch();

  // Destructure authentication-related state from Redux
  const { products, totalProduct } = useSelector((state) => state.product);

  // State: current page number for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // State: search keyword entered by the user
  const [searchValue, setSearchValue] = useState("");

  // State: number of products to display per page
  const [parPage, setParPage] = useState(5);

  // useEffect to fetch products whenever search value, items per page, or current page changes
  useEffect(() => {
    // Build the request object with pagination and search parameters
    const obj = {
      parPage: parseInt(parPage), // Number of products per page
      page: parseInt(currentPage), // Current page number
      searchValue, // Search keyword for filtering products
    };
    // Dispatch Redux action to fetch categories based on current filters
    dispatch(get_products(obj));
  }, [searchValue, parPage, currentPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">All Products</h1>
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-left text-[#d0d2d6] ">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Category
                </th>
                <th scope="col" className="py-3 px-4">
                  Brand
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Discount
                </th>
                <th scope="col" className="py-3 px-4">
                  Stock
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Static demo data for products */}
              {products.map((curVal, index) => (
                <tr key={index}>
                  {/* Serial number */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {index + 1}
                  </td>
                  {/* Product image */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <img className="w-[45px] h-[45px]" src={curVal.images[0]} />
                  </td>
                  {/* Name */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {curVal?.name?.slice(0, 15)}...
                  </td>
                  {/* Category name */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {curVal.category}
                  </td>
                  {/* Brand */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {curVal.brand}
                  </td>
                  {/* Price */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    ${curVal.price}
                  </td>
                  {/* Discount */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {curVal.discount === 0 ? (
                      <span>No Discount</span>
                    ) : (
                      <span>{curVal.discount}%</span>
                    )}
                  </td>
                  {/* Stock */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {curVal.stock}
                  </td>
                  {/* Edit, View, and Delete actions */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/seller/dashboard/edit-product/${curVal._id}`}
                        className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                      >
                        <FaEdit />
                      </Link>
                      <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                        <FaEye />
                      </Link>
                      <Link className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                        <FaTrash />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination footer */}
        {/* <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            parPage={parPage}
            showItem={3}
          />
        </div> */}
        {totalProduct <= parPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={50}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
