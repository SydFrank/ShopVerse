import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  admin_order_status_update,
  get_admin_order,
  messageClear,
} from "../../store/Reducers/orderReducer";
import toast from "react-hot-toast";

/**
 * OrderDetails Component
 *
 * Displays detailed information about a specific order, including delivery details,
 * payment status, price, ordered products, and seller order statuses.
 *
 * Features:
 * - Header with order status selector.
 * - Displays order number and date.
 * - Shows recipient information, address, payment status, and total price.
 * - Lists all products in the order with images, brands, and quantities.
 * - Seller-specific order status and product breakdown.
 *
 * Note:
 * - All data is currently hardcoded for demonstration purposes.
 * - Replace static values (order ID, recipient, products, etc.) with dynamic data as needed.
 */
const OrderDetails = () => {
  // State to manage selected order status
  const [status, setStatus] = useState("");
  // Get the orderId from URL parameters
  const { orderId } = useParams();
  // Redux dispatch function
  const dispatch = useDispatch();
  // Extract order details from Redux state
  const { order, successMessage, errorMessage } = useSelector(
    (state) => state.order
  );

  // Update local status state when order delivery status changes
  useEffect(() => {
    setStatus(order?.delivery_status);
  }, [order]);

  // Fetch order details when the component mounts or orderId changes
  useEffect(() => {
    dispatch(get_admin_order(orderId));
  }, [orderId]);

  // Handler for updating order status
  const status_update = (e) => {
    dispatch(
      admin_order_status_update({ orderId, info: { status: e.target.value } })
    );
    setStatus(e.target.value);
  };

  // Show success or error messages as toast notifications
  useEffect(() => {
    if (successMessage) {
      // Show success toast notification
      toast.success(successMessage);
      // Clear success/error messages from Redux state
      dispatch(messageClear());
    }
    if (errorMessage) {
      // Show error toast notification
      toast.error(errorMessage);
      // Clear success/error messages from Redux state
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        {/* Header with title and order status selector */}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>
          <select
            value={status}
            onChange={status_update}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#475569] border border-slate-700 rounded-md text-[#d0d2d6]"
            name=""
            id=""
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="warehouse">Warehouse</option>
            <option value="placed">Placed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="p-4">
          {/* Order number and date */}
          <div className="flex gap-2 text-lg text-[#d0d2d6]">
            <h2>#{order._id}</h2>
            <span>{order.date}</span>
          </div>
          <div className="flex flex-wrap">
            {/* Left Section: Delivery and Products */}
            <div className="w-[30%]">
              <div className="pr-3 text-[#d0d2d6] text-lg">
                {/* Delivery details */}
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver To : {order.shippingInfo?.name}
                  </h2>
                  <p>
                    <span className="text-sm">
                      {order.shippingInfo?.address}, {""}
                      {order.shippingInfo?.area}, {""}
                      {order.shippingInfo?.city}, {""}
                      {order.shippingInfo?.post}, {""}
                      {order.shippingInfo?.province}, {""}
                    </span>
                  </p>
                </div>
                {/* Payment status and price */}
                <div className="flex justify-start items-center gap-3 ">
                  <h2>Payment Status: </h2>
                  <span className="text-base">{order.payment_status}</span>
                </div>
                <span>Price: ${order.price}</span>
                {/* Ordered products */}

                <div className="mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md">
                  <div className="text-[#d0d2d6]">
                    {order.products &&
                      order.products.map((p, i) => (
                        <div key={i} className="flex gap-3 text-md">
                          <img
                            className="w-[50px] h-[50px]"
                            src={p.images[0]}
                          />
                          <div>
                            <h2>{p.name}</h2>
                            <p>
                              <span>Brand:</span>
                              <span>{p.brand}</span>
                              <span className="text-lg">
                                Quantity: {p.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Right Section: Seller Orders */}
            <div className="w-[70%]">
              <div className="pl-3">
                <div className="mt-4 flex flex-col bg-[#8288ed] rounded-md p-4 ">
                  {/* Seller order status and products */}

                  {order?.suborder?.map((o, i) => (
                    <div key={i + 20} className="text-[#d0d2d6] mt-2">
                      <div className="flex justify-start items-center gap-3">
                        <h2>Seller {i + 1} Order : </h2>
                        <span>{o.delivery_status}</span>
                      </div>

                      {o.products?.map((p, i) => (
                        <div className="flex gap-3 text-md mt-2">
                          <img
                            className="w-[50px] h-[50px]"
                            src={p.images[0]}
                          />
                          <div>
                            <h2>{p.name}</h2>
                            <p>
                              <span>Brand:</span>
                              <span>{p.brand}</span>
                              <span className="text-lg">
                                Quantity: {p.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
