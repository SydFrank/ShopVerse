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
    setStatus(order?.delivery_status || "");
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
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center p-4">
          <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>
          <select
            value={status}
            onChange={status_update}
            className="w-full sm:w-auto px-4 py-2 focus:border-indigo-500 outline-none bg-[#475569] border border-slate-700 rounded-md text-[#d0d2d6]"
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
          <div className="flex flex-wrap gap-2 text-lg text-[#d0d2d6] break-all mb-3">
            <h2 className="min-w-0">#{order?._id}</h2>
            <span className="min-w-0">{order?.date}</span>
          </div>

          {/* Responsive 1 -> 2 column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Section: Delivery and Products */}
            <div className="lg:col-span-1">
              <div className="text-[#d0d2d6] text-lg">
                {/* Delivery details */}
                <div className="flex flex-col gap-2">
                  <h2 className="pb-1 font-semibold">
                    Deliver To : {order?.shippingInfo?.name}
                  </h2>
                  <p className="text-sm leading-6 whitespace-pre-line break-words">
                    {[
                      order?.shippingInfo?.address,
                      order?.shippingInfo?.area,
                      order?.shippingInfo?.city,
                      order?.shippingInfo?.post,
                      order?.shippingInfo?.province,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>

                {/* Payment status and price */}
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h2>Payment:</h2>
                  <span className="text-base">{order?.payment_status}</span>
                </div>
                <div className="mt-1">Price: ${order?.price}</div>

                {/* Ordered products */}
                <div className="mt-4 flex flex-col gap-3 bg-[#8288ed] rounded-md p-3">
                  <div className="text-[#d0d2d6]">
                    {order?.products?.map((p, i) => (
                      <div
                        key={`left-${i}`}
                        className="flex items-start gap-3 text-md not-italic mb-2 last:mb-0"
                      >
                        <img
                          className="w-[56px] h-[56px] rounded-md object-cover flex-none"
                          src={p.images?.[0]}
                          alt={p.name}
                        />
                        <div className="min-w-0">
                          <h2 className="font-medium truncate">{p.name}</h2>
                          <p className="text-sm flex flex-wrap gap-2">
                            <span>Brand:</span>
                            <span className="break-words">{p.brand}</span>
                            <span className="text-base">
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
            <div className="lg:col-span-2">
              <div className="bg-[#8288ed] rounded-md p-4">
                {order?.suborder?.map((o, i) => (
                  <div key={`seller-${i}`} className="text-[#d0d2d6] mt-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-semibold">Seller {i + 1} Order :</h2>

                      <span
                        className={`px-2 py-0.5 rounded text-white ${
                          status === "pending" ? "bg-yellow-500/70" : ""
                        } ${status === "processing" ? "bg-blue-500/70" : ""} ${
                          status === "warehouse" ? "bg-purple-500/70" : ""
                        } ${status === "placed" ? "bg-green-500/70" : ""} ${
                          status === "cancelled" ? "bg-red-500/70" : ""
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-col gap-3">
                      {o.products?.map((p, j) => (
                        <div
                          key={`seller-${i}-p-${j}`}
                          className="flex items-start gap-3 text-md"
                        >
                          <img
                            className="w-[56px] h-[56px] rounded-md object-cover flex-none"
                            src={p.images?.[0]}
                            alt={p.name}
                          />
                          <div className="min-w-0">
                            <h2 className="font-medium truncate">{p.name}</h2>
                            <p className="text-sm flex flex-wrap gap-2">
                              <span>Brand:</span>
                              <span className="break-words">{p.brand}</span>
                              <span className="text-base">
                                Quantity: {p.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {!order?.suborder?.length && (
                  <p className="text-[#d0d2d6]/80">No seller suborders.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
