import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { get_orders } from "../../store/reducers/orderReducer";

// User orders management component with filtering
const Orders = () => {
  // Order status filter state
  const [state, setState] = useState("all");

  // Navigation hook
  const navigate = useNavigate();

  // Redux dispatch function
  const dispatch = useDispatch();

  // Get user info from auth state
  const { userInfo } = useSelector((state) => state.auth);

  // Get orders from order state
  const { myOrders } = useSelector((state) => state.order);

  // Fetch orders when status filter changes
  useEffect(() => {
    dispatch(get_orders({ customerId: userInfo.id, status: state }));
  }, [state]);

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
    <div className="bg-white p-4 rounded-md">
      {/* Header with title and status filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-600">My Orders</h2>
        {/* Order status filter dropdown */}
        <select
          className="outline-none  px-3 py-1 border border-gray-100 rounded-md text-slate-600"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="all">--order status--</option>
          <option value="placed">Placed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
          <option value="warehouse">Warehouse</option>
        </select>
      </div>

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
                // Map through myOrders and display each order in a table row
                myOrders.map((order, index) => (
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

                      {/* Show pay now button for unpaid orders */}
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
  );
};

export default Orders;
