import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

/**
 * Category Component
 *
 * This component provides the admin interface for managing product categories.
 * It features a responsive layout with a paginated table view and a sidebar/modal
 * for adding new categories. Core functionalities include:
 *
 * - Pagination and per-page selector for category table
 * - Search box for filtering categories (logic to implement)
 * - Category listing with edit and delete actions
 * - Responsive sidebar/modal form for adding a new category
 * - File upload for category images
 *
 * Dependencies:
 * - React, react-router-dom, react-icons
 * - Pagination component from the parent directory
 */

const Category = () => {
  // State: current page number for pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  // State: search keyword entered by the user (search logic not implemented)
  const [searchValue, setSearchValue] = React.useState("");

  // State: number of categories to display per page
  const [parPage, setParPage] = React.useState(5);

  // State: controls the visibility of the add category sidebar/modal
  const [show, setShow] = useState(false);

  return (
    <div className="px-2 lg:px-7 pt-5">
      {/* Mobile header bar with Category title and Add button */}
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5ddf] rounded-md ">
        <h1 className="text-[#d0d2d6] font-semibold text-lg">Category</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-red-500 shadow-lg hover:shadow-red-500/40 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        {/* Category table and pagination (left side on desktop) */}
        <div className="w-full lg:w-7/12">
          <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
            {/* Pagination per-page selector and search box */}
            <div className="flex justify-between items-center">
              <select
                onChange={(e) => setParPage(parseInt(e.target.value))}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
              />
            </div>

            {/* Categories table */}
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Static demo data for categories */}
                  {[1, 2, 3, 4, 5].map((curVal, index) => (
                    <tr key={index}>
                      {/* Serial number */}
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {curVal}
                      </td>
                      {/* Category image */}
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <img
                          className="w-[45px] h-[45px]"
                          src={`/images/category/${curVal}.jpg`}
                        />
                      </td>
                      {/* Category name */}
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        Tshirt
                      </td>
                      {/* Edit and Delete actions */}
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex justify-start items-center gap-4">
                          <Link className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                            <FaEdit />
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

        {/* Sidebar/modal for adding a new category (right side on desktop, fixed on mobile) */}
        <div
          className={`w-[320px] lg:w-5/12 lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5">
            <div className="bg-[#6a5fdf] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-[#d0d2d6] font-semibold text-xl mb-4 w-full text-center">
                  Add Category
                </h1>
                <div onClick={() => setShow(false)} className="block lg:hidden">
                  <IoMdCloseCircle />
                </div>
              </div>
              <form>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="name">Categoty Name</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                    type="text"
                    id="name"
                    name="categoty_name"
                    placeholder="Category Name"
                  />
                </div>
                <div>
                  <label
                    className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-black w-full border-[#d0d2d6]"
                    htmlFor="image"
                  >
                    <span>
                      <FaImage />
                    </span>
                    <span>Slect Image</span>
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    name="image"
                    id="image"
                  />
                  <div>
                    <button className="bg-red-500 w-full hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                      Add Category
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
