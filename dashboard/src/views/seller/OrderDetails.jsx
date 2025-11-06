import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  get_seller_order,
  seller_order_status_update,
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
  // Redux dispatch function
  const dispatch = useDispatch();
  // Get orderId from URL parameters
  const { orderId } = useParams();
  // Extract order details from Redux state
  const { order, successMessage, errorMessage } = useSelector(
    (state) => state.order
  );

  // Update local status state when order delivery status changes
  useEffect(() => {
    setStatus(order?.delivery_status || "");
  }, [order]);

  // Fetch order details when component mounts or orderId changes
  useEffect(() => {
    dispatch(get_seller_order(orderId));
  }, [orderId]);

  // Handler for updating order status
  const status_update = (e) => {
    dispatch(
      seller_order_status_update({ orderId, info: { status: e.target.value } })
    );
    setStatus(e.target.value);
  };

  // Show success or error messages as toast notifications
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        {/* Header with title and order status selector */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 gap-3">
          <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>
          <select
            value={status}
            onChange={status_update}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#475569] border border-slate-700 rounded-md text-[#d0d2d6] w-full sm:w-auto"
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
          <div className="flex flex-wrap gap-2 text-lg text-[#d0d2d6] break-all">
            <h2>#{order._id}</h2>
            <span>{order.date}</span>
          </div>

          <div className="flex flex-wrap">
            {/* Left Section: Delivery and Products */}
            <div className="w-full md:w-[60%] lg:w-[30%]">
              <div className="pr-3 text-[#d0d2d6] text-lg">
                {/* Delivery details */}
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold break-words">
                    Deliver To:{" "}
                    <span className="font-normal">{order.shippingInfo}</span>
                  </h2>
                </div>

                {/* Payment status and price */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h2>Payment Status:</h2>
                  <span className="text-base">{order.payment_status}</span>
                </div>
                <span className="block mt-1">Price: ${order.price}</span>

                {/* Ordered products */}
                {order?.products?.map((p, i) => (
                  <div
                    key={i}
                    className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 bg-[#8288ed] rounded-md p-3"
                  >
                    <img
                      className="w-[60px] h-[60px] object-cover rounded"
                      src={p.images[0]}
                      alt="Product"
                    />
                    <div className="text-[#d0d2d6]">
                      <h2 className="text-base font-semibold">{p.name}</h2>
                      <p className="text-sm">
                        <span>Brand: </span>
                        <span>{p.brand}</span>{" "}
                        <span className="ml-2">Quantity: {p.quantity}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
