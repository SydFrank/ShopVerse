import React, { useEffect } from "react";
import { IoCartSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { get_dashboard_index_data } from "../../store/reducers/dashboardReducer";

// Dashboard overview component with order statistics
const Subindex = () => {
  // Hook for navigation
  const navigate = useNavigate();
  // Redux dispatch function
  const dispatch = useDispatch();

  // Get user info from auth state
  const { userInfo } = useSelector((state) => state.auth);

  // Get dashboard data from Redux store
  const { recentOrders, totalOrder, pendingOrder, cancelledOrder } =
    useSelector((state) => state.dashboard);

  // Fetch dashboard data on component mount
  useEffect(() => {
    dispatch(get_dashboard_index_data(userInfo.id));
  }, []);

  // Redirect to payment page with order details
  const redirect = (order) => {
    let items = 0;
    for (let i = 0; i < order.length; i++) {
      items = order.products[i].quantity + items;
    }
    navigate("/payment", {
      state: {
        price: order.price,
        items: items,
        orderId: order._id,
      },
    });
  };

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
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
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
            <h2 className="text-3xl font-bold">{pendingOrder}</h2>
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
            <h2 className="text-3xl font-bold">{cancelledOrder}</h2>
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
                {
                  // Map through recent orders and display each order in a table row
                  recentOrders.map((order, index) => (
                    <tr className="bg-white border-b">
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        #{order._id}
                      </td>

                      <td
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        ${order.price}
                      </td>

                      <td
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        {order.payment_status}
                      </td>

                      <td
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        {order.delivery_status}
                      </td>

                      <td
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        {/* Action buttons */}
                        <Link to={`/dashboard/order/details/${order._id}`}>
                          <span className="bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded">
                            View
                          </span>
                        </Link>

                        {order.payment_status !== "paid" && (
                          <span
                            onClick={() => redirect(order)}
                            className="bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded cursor-pointer"
                          >
                            Pay Now
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subindex;
