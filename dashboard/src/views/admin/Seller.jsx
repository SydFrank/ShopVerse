import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";

/**
 * Seller Component
 *
 * This component renders the admin view for managing seller accounts.
 * It includes a paginated table of sellers, a per-page selector, a search field,
 * and action buttons for each seller entry.
 *
 * Features:
 * - Pagination with adjustable items per page
 * - Search input for filtering sellers (currently not implemented)
 * - Seller information table (static data for demonstration)
 * - Action button for viewing seller details
 *
 * Dependencies:
 * - React, react-router-dom, react-icons
 * - Pagination component from the parent directory
 */

const Seller = () => {
  // State: current page number for pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  // State: search keyword entered by the user (functionality not yet implemented)
  const [searchValue, setSearchValue] = React.useState("");

  // State: number of sellers displayed per page
  const [parPage, setParPage] = React.useState(5);

  // State: controls modal or popup visibility (currently unused)
  const [show, setShow] = useState(false);

  return (
    <div className="px-2 lg:px-7 pt-5">
      {/* Main container for the seller management table */}
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        {/* Header: items per page selector and search input */}
        <div className="flex justify-between items-center">
          {/* Items per page selector */}
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          {/* Search input (does not filter the table yet) */}
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
          />
        </div>

        {/* Seller table */}
        <div className="relative overflow-x-auto">
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
                  Shop Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Division
                </th>
                <th scope="col" className="py-3 px-4">
                  District
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Static demo data for sellers */}
              {[1, 2, 3, 4, 5].map((curVal, index) => (
                <tr key={index}>
                  {/* Serial number */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {curVal}
                  </td>
                  {/* Seller image */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <img
                      className="w-[45px] h-[45px]"
                      src={`/images/category/${curVal}.jpg`}
                    />
                  </td>
                  {/* Seller name */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    Frank Xu
                  </td>
                  {/* Shop name */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    Easy Shop
                  </td>
                  {/* Payment status */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>Pending</span>
                  </td>
                  {/* Seller email */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    frankzhsy@gmail.com
                  </td>
                  {/* Seller division (region) */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    Sydney
                  </td>
                  {/* Seller district (sub-region) */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    Burwood
                  </td>
                  {/* Action buttons (e.g., view details) */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
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

export default Seller;
