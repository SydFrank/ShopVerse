import React, { useState } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

/**
 * Orders component displays a paginated table of order entries (using static demo data).
 * Includes search and page size controls, and allows viewing details for each order.
 *
 * State:
 * - currentPage: Tracks the current page for pagination.
 * - searchValue: Stores the search keyword entered by the user.
 * - parPage: Number of orders to display per page.
 *
 * Renders:
 * - Search controls for filtering and page size.
 * - Table listing order details (demo data).
 * - Action for viewing each order.
 * - Pagination control.
 */
const Orders = () => {
  // State: current page number for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // State: search keyword entered by the user
  const [searchValue, setSearchValue] = useState("");

  // State: number of orders to display per page
  const [parPage, setParPage] = useState(5);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">Orders</h1>
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
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Static demo data for orders */}
              {[1, 2, 3, 4, 5].map((curVal, index) => (
                <tr key={index}>
                  {/* Order Id */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {curVal}
                  </td>
                  {/* Price */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    $50
                  </td>
                  {/* Payment Status */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>
                  {/* Order Status */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>
                  {/* View action */}
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

export default Orders;
