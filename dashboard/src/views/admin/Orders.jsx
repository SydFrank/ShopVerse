import React, { useEffect, useState } from "react";
import { BsArrowDownSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { get_admin_orders } from "./../../store/Reducers/orderReducer";

/**
 * Orders Component
 *
 * Displays a paginated list of customer orders with search functionality.
 * Features expandable order details and responsive table layout.
 */

const Orders = () => {
  // Redux dispatch function
  const dispatch = useDispatch();

  // Pagination state: current page number
  const [currentPage, setCurrentPage] = useState(1);

  // Search keyword entered by the user
  const [searchValue, setSearchValue] = useState("");

  // Number of orders to display per page
  const [parPage, setParPage] = useState(5);

  // Controls whether the additional order details are shown or hidden
  const [show, setShow] = useState(null);

  // Extract orders and total order count from Redux state
  const { myOrders, totalOrder } = useSelector((state) => state.order);

  // Fetch active sellers whenever pagination or search parameters change
  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_admin_orders(obj));
  }, [parPage, currentPage, searchValue]);

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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search"
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
          />
        </div>

        <div className="relative mt-5 overflow-x-auto">
          <div className="min-w-[1100px]">
            {/* Table Header */}
            <div className="w-full text-sm text-left text-[#d0d2d6]">
              <div className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                {/* ✅ 去掉 justify-between，改为紧密排列 */}
                <div className="flex items-center">
                  <div className="py-3 w-[25%] shrink-0 font-bold">
                    Order id
                  </div>
                  <div className="py-3 w-[13%] shrink-0 font-bold">Price</div>
                  <div className="py-3 w-[18%] shrink-0 font-bold">
                    Payment Status
                  </div>
                  <div className="py-3 w-[18%] shrink-0 font-bold">
                    Order Status
                  </div>
                  <div className="py-3 w-[18%] shrink-0 font-bold">Action</div>
                  <div className="py-3 w-[8%] shrink-0 font-bold text-xl">
                    <BsArrowDownSquare />
                  </div>
                </div>
              </div>
            </div>

            {myOrders.map((o, i) => (
              <div className="text-[#d0d2d6]" key={i}>
                <div className="flex items-start border-b border-slate-700">
                  <div className="py-3 w-[25%] shrink-0 font-medium whitespace-nowrap">
                    #{o._id}
                  </div>
                  <div className="py-3 w-[13%] shrink-0 font-medium">
                    ${o.price}
                  </div>
                  <div className="py-3 w-[18%] shrink-0 font-medium">
                    {o.payment_status}
                  </div>
                  <div className="py-3 w-[18%] shrink-0 font-medium">
                    {o.delivery_status}
                  </div>
                  <div className="py-3 w-[18%] shrink-0 font-medium">
                    <Link to={`/admin/dashboard/order/details/${o._id}`}>
                      View
                    </Link>
                  </div>
                  {/* Expand/Collapse toggle icon */}
                  <div
                    // onClick={() => setShow(o._id)}
                    onClick={() => setShow(show === o._id ? null : o._id)}
                    className="py-3 w-[8%] shrink-0 font-medium text-xl cursor-pointer"
                  >
                    <BsArrowDownSquare />
                  </div>
                </div>

                {/* Nested/Expanded Order Rows — shown when `show` is true */}
                <div
                  className={
                    show === o._id
                      ? "block border-b border-slate-700 bg-[#8288ed]"
                      : "hidden"
                  }
                >
                  {o.suborder.map((so, i) => (
                    <div
                      key={i}
                      className="flex items-start border-b border-slate-700"
                    >
                      <div className="py-3 w-[25%] shrink-0 font-medium whitespace-nowrap pl-3">
                        #{so._id}
                      </div>
                      <div className="py-3 w-[13%] shrink-0 font-medium">
                        ${so.price}
                      </div>
                      <div className="py-3 w-[18%] shrink-0 font-medium">
                        {so.payment_status}
                      </div>
                      <div className="py-3 w-[18%] shrink-0 font-medium">
                        {so.delivery_status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination footer */}

        {totalOrder <= parPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
