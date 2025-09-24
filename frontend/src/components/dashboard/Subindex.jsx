import React from "react";
import { IoCartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

// Dashboard overview component with order statistics
const Subindex = () => {
  return (
    <div>
      {/* Statistics cards grid */}
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-5 ">
        {/* Total orders card */}
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5 ">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <IoCartSharp />
            </span>
          </div>

          <div className="flex flex-col justify-start items-start text-slate-600 ">
            <h2 className="text-3xl font-bold">45</h2>
            <span>Orders</span>
          </div>
        </div>

        {/* Pending orders card */}
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5 ">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <IoCartSharp />
            </span>
          </div>

          <div className="flex flex-col justify-start items-start text-slate-600 ">
            <h2 className="text-3xl font-bold">25</h2>
            <span>Pending Orders</span>
          </div>
        </div>

        {/* Cancelled orders card */}
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5 ">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <IoCartSharp />
            </span>
          </div>

          <div className="flex flex-col justify-start items-start text-slate-600 ">
            <h2 className="text-3xl font-bold">2</h2>
            <span>Cancel Orders</span>
          </div>
        </div>
      </div>

      {/* Recent orders section */}
      <div className="bg-white p-5 mt-5 rounded-md ">
        <h2>Recent Orders</h2>
        <div className="pt-4">
          {/* Orders table */}
          <div className="relative overflow-x-auto rounded-md">
            <table className="w-full text-sm text-left text-gray-500 ">
              {/* Table header */}
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                <tr>
                  <th className="px-6 py-3" scope="col">
                    Order Id
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Price
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Payment Status
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Order Status
                  </th>
                  <th className="px-6 py-3" scope="col">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table body with order data */}
              <tbody>
                {/* Order row */}
                <tr className="bg-white border-b">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    #344
                  </td>

                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    $300
                  </td>

                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>

                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>

                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {/* Action buttons */}
                    <Link>
                      <span className="bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded">
                        View
                      </span>
                    </Link>

                    <Link>
                      <span className="bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded">
                        Pay Now
                      </span>
                    </Link>
                  </td>
                </tr>

                <tr className="bg-white border-b">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    #344
                  </td>

                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    $300
                  </td>

                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>

                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>

                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    <Link>
                      <span className="bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded">
                        View
                      </span>
                    </Link>

                    <Link>
                      <span className="bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded">
                        Pay Now
                      </span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subindex;
