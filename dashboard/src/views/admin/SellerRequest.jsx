import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search"; // Search component for filtering categories
import { get_seller_request } from "../../store/Reducers/sellerReducer";

/**
 * SellerRequest component displays a paginated table of seller requests.
 * Features include:
 * - Pagination controls for navigating large datasets
 * - Adjustable items per page
 * - Search bar placeholder (not yet implemented)
 * - Static demo data for table rows
 * - Action buttons for each seller (e.g., view details)
 *
 * Styling leverages Tailwind CSS utility classes.
 */

const SellerRequest = () => {
  // Redux dispatch function to trigger actions
  // This is used to dispatch the get_seller_request action to fetch seller data.
  const dispatch = useDispatch();

  // Destructure authentication-related state from Redux
  const { sellers, totalSeller } = useSelector((state) => state.seller);

  // State: current page number for pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  // State: search keyword entered by the user (functionality not yet implemented)
  const [searchValue, setSearchValue] = React.useState("");

  // State: number of sellers displayed per page
  const [parPage, setParPage] = React.useState(5);

  // State: controls modal or popup visibility (currently unused)
  const [show, setShow] = useState(false);

  // useEffect to fetch seller data when component mounts or dependencies change
  useEffect(() => {
    // Build the request object with pagination and search parameters
    const obj = {
      parPage: parseInt(parPage), // Number of categories per page
      page: parseInt(currentPage), // Current page number
      searchValue, // Search keyword for filtering sellers
    };
    // Dispatch Redux action to fetch sellers based on current filters
    dispatch(get_seller_request(obj));
  }, [searchValue, parPage, currentPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">Seller Request</h1>
      {/* Main container for the seller management table */}
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        {/* Pagination per-page selector and search box */}
        <Search
          setParPage={setParPage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        {/* Seller table */}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6] ">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>

                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Static demo data for sellers */}
              {sellers.map((curVal, index) => (
                <tr className="border-b border-slate-700" key={index}>
                  {/* Serial number */}
                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    {index + 1}
                  </td>
                  {/* Seller name */}
                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    {curVal.name}
                  </td>
                  {/* Seller email */}
                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    {curVal.email}
                  </td>
                  {/* Payment status  */}
                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    {curVal.payment}
                  </td>
                  {/* Status  */}
                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    {curVal.status}
                  </td>

                  {/* Action buttons (e.g., view details) */}
                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/admin/dashboard/seller/details/${curVal._id}`}
                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                      >
                        <FaEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination footer */}
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            parPage={parPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerRequest;
