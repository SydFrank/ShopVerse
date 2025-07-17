/**
 * Orders Component
 * ----------------
 * This React component displays a list of customer orders in a styled, paginated interface.
 *
 * Features:
 * 1. Pagination Size Selector:
 *    - Allows the user to select how many orders to show per page (5, 10, or 15).
 *
 * 2. Search Bar:
 *    - Search input is present but currently non-functional (placeholder for future filtering).
 *
 * 3. Order Table Display:
 *    - Orders are displayed in a responsive table-like layout using Flexbox.
 *    - Columns include: Order ID, Price, Payment Status, Order Status, Action.
 *
 * 4. Row Expansion:
 *    - Clicking the arrow icon toggles the visibility of additional (nested) order rows.
 *    - NOTE: The `show` state is shared across all rows; toggling one affects all.
 *      Consider improving this with per-row expansion state (e.g., using an array of IDs).
 *
 * 5. Pagination Component:
 *    - Includes a reusable Pagination component with dynamic `parPage` and `currentPage`.
 *
 * 6. Styling:
 *    - Tailwind CSS is used for styling.
 *    - Table supports horizontal scrolling (`overflow-x-auto`) for smaller screens.
 *
 * TODO (Enhancements):
 * - Connect search functionality to `searchValue`.
 * - Slice data based on `currentPage` and `parPage`.
 * - Load order data from API/backend.
 * - Make row expansion per-item instead of global.
 */

import React from "react";
import { BsArrowDownSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

const Orders = () => {
  // Pagination state: current page number
  const [currentPage, setCurrentPage] = React.useState(1);

  // Search keyword entered by the user
  const [searchValue, setSearchValue] = React.useState("");

  // Number of orders to display per page
  const [parPage, setParPage] = React.useState(5);

  // Controls whether the additional order details are shown or hidden
  const [show, setShow] = React.useState(false);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
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

        <div className="relative mt-5 overflow-x-auto">
          {/* Table Header */}
          <div className="w-full text-sm text-left text-[#d0d2d6]">
            <div className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <div className="flex justify-between items-center">
                <div className="py-3 w-[25%] font-bold">Order id</div>
                <div className="py-3 w-[13%] font-bold">Price</div>
                <div className="py-3 w-[18%] font-bold">Payment Status</div>
                <div className="py-3 w-[18%] font-bold">Order Status</div>
                <div className="py-3 w-[18%] font-bold">Action</div>
                <div className="py-3 w-[8%] font-bold text-xl">
                  <BsArrowDownSquare />
                </div>
              </div>
            </div>
          </div>
          <div className="text-[#d0d2d6] ">
            {/* Example Order Row */}
            <div className="flex justify-between items-start border-b border-slate-700">
              <div className="py-3 w-[25%] font-medium whitespace-nowrap">
                #6449556
              </div>
              <div className="py-3 w-[13%] font-medium">$660</div>
              <div className="py-3 w-[18%] font-medium">Pending</div>
              <div className="py-3 w-[18%] font-medium">Pending</div>
              <div className="py-3 w-[18%] font-medium">
                <Link>View</Link>
              </div>
              {/* Expand/Collapse toggle icon */}
              <div
                onClick={(e) => setShow(!show)}
                className="py-3 w-[8%] font-medium text-xl"
              >
                <BsArrowDownSquare />
              </div>
            </div>

            {/* Nested/Expanded Order Rows — shown when `show` is true */}
            <div
              className={
                show ? "block border-b border-slate-700 bg-[#8288ed]" : "hidden"
              }
            >
              {/* Example nested row */}
              <div className="flex justify-satrt items-start border-b border-slate-700">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                  #25000
                </div>
                <div className="py-3 w-[13%] font-medium">$50</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
              </div>

              <div className="flex justify-satrt items-start border-b border-slate-700">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                  #66000
                </div>
                <div className="py-3 w-[13%] font-medium">$50</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
              </div>
            </div>
          </div>
          <div className="text-[#d0d2d6] ">
            <div className="flex justify-between items-start border-b border-slate-700">
              <div className="py-3 w-[25%] font-medium whitespace-nowrap">
                #34335
              </div>
              <div className="py-3 w-[13%] font-medium">$660</div>
              <div className="py-3 w-[18%] font-medium">Pending</div>
              <div className="py-3 w-[18%] font-medium">Pending</div>
              <div className="py-3 w-[18%] font-medium">
                <Link>View</Link>
              </div>
              <div
                onClick={(e) => setShow(!show)}
                className="py-3 w-[8%] font-medium text-xl"
              >
                <BsArrowDownSquare />
              </div>
            </div>

            <div
              className={
                show ? "block border-b border-slate-700 bg-[#8288ed]" : "hidden"
              }
            >
              <div className="flex justify-satrt items-start border-b border-slate-700">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                  #66000
                </div>
                <div className="py-3 w-[13%] font-medium">$50</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
              </div>

              <div className="flex justify-satrt items-start border-b border-slate-700">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                  #66000
                </div>
                <div className="py-3 w-[13%] font-medium">$50</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
              </div>
            </div>
          </div>

          <div className="text-[#d0d2d6] ">
            <div className="flex justify-between items-start border-b border-slate-700">
              <div className="py-3 w-[25%] font-medium whitespace-nowrap">
                #34335
              </div>
              <div className="py-3 w-[13%] font-medium">$660</div>
              <div className="py-3 w-[18%] font-medium">Pending</div>
              <div className="py-3 w-[18%] font-medium">Pending</div>
              <div className="py-3 w-[18%] font-medium">
                <Link>View</Link>
              </div>
              <div
                onClick={(e) => setShow(!show)}
                className="py-3 w-[8%] font-medium text-xl"
              >
                <BsArrowDownSquare />
              </div>
            </div>

            <div
              className={
                show ? "block border-b border-slate-700 bg-[#8288ed]" : "hidden"
              }
            >
              <div className="flex justify-satrt items-start border-b border-slate-700">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                  #66000
                </div>
                <div className="py-3 w-[13%] font-medium">$50</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
              </div>

              <div className="flex justify-satrt items-start border-b border-slate-700">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                  #66000
                </div>
                <div className="py-3 w-[13%] font-medium">$50</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
              </div>
            </div>
          </div>
          <div className="text-[#d0d2d6] ">
            <div className="flex justify-between items-start border-b border-slate-700">
              <div className="py-3 w-[25%] font-medium whitespace-nowrap">
                #34335
              </div>
              <div className="py-3 w-[13%] font-medium">$660</div>
              <div className="py-3 w-[18%] font-medium">Pending</div>
              <div className="py-3 w-[18%] font-medium">Pending</div>
              <div className="py-3 w-[18%] font-medium">
                <Link>View</Link>
              </div>
              <div
                onClick={(e) => setShow(!show)}
                className="py-3 w-[8%] font-medium text-xl"
              >
                <BsArrowDownSquare />
              </div>
            </div>

            <div
              className={
                show ? "block border-b border-slate-700 bg-[#8288ed]" : "hidden"
              }
            >
              <div className="flex justify-satrt items-start border-b border-slate-700">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                  #66000
                </div>
                <div className="py-3 w-[13%] font-medium">$50</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
              </div>

              <div className="flex justify-satrt items-start border-b border-slate-700">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3">
                  #66000
                </div>
                <div className="py-3 w-[13%] font-medium">$50</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
              </div>
            </div>
          </div>
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
