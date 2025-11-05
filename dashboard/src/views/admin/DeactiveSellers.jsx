import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_deactive_sellers } from "../../store/Reducers/sellerReducer";

/**
 * DeactiveSellers component displays a paginated table of inactive sellers.
 * Features include:
 * - Pagination controls for navigating large datasets
 * - Adjustable items per page
 * - Search bar placeholder (not yet implemented)
 * - Static demo data for table rows
 * - Action buttons for each seller (e.g., view details)
 *
 * Styling leverages Tailwind CSS utility classes.
 */

const DeactiveSellers = () => {
  // Redux dispatch function
  const dispatch = useDispatch();
  // State: current page number for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // State: search keyword entered by the user (functionality not yet implemented)
  const [searchValue, setSearchValue] = useState("");

  // State: number of sellers displayed per page
  const [parPage, setParPage] = useState(5);

  // State: controls modal or popup visibility (currently unused)
  const [show, setShow] = useState(false);

  // Extract sellers and totalSeller from Redux store
  const { sellers, totalSeller } = useSelector((state) => state.seller);

  // Fetch active sellers whenever pagination or search parameters change
  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_deactive_sellers(obj));
  }, [parPage, currentPage, searchValue]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">Deactive Sellers</h1>
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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
                  Status
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
              {sellers.map((d, i) => (
                <tr key={i}>
                  {/* Serial number */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {i + 1}
                  </td>
                  {/* Seller image */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <img className="w-[45px] h-[45px]" src={d.image} />
                  </td>
                  {/* Seller name */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.name}
                  </td>
                  {/* Shop name */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.shopInfo?.shopName}
                  </td>
                  {/* Payment status */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.payment}</span>
                  </td>
                  {/* Seller email */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.email}
                  </td>
                  {/* Seller division (region) */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.status}
                  </td>
                  {/* Seller district (sub-region) */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.shopInfo?.district}
                  </td>
                  {/* Action buttons (e.g., view details) */}
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Link
                        to={`/admin/dashboard/seller/details/${d._id}`}
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

        {totalSeller <= parPage ? (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalSeller}
              parPage={parPage}
              showItem={4}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DeactiveSellers;
