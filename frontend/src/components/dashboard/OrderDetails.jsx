import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_orders_details } from "../../store/reducers/orderReducer";
import { Link } from "react-router-dom";

// Order details component showing complete order information
const OrderDetails = () => {
  // Redux dispatch function
  const dispatch = useDispatch();

  // Get order ID from URL parameters
  const { orderId } = useParams();

  // Get user info from auth state
  const { userInfo } = useSelector((state) => state.auth);

  // Get order details from order state
  const { myOrder } = useSelector((state) => state.order);

  // Fetch order details when component mounts
  useEffect(() => {
    dispatch(get_orders_details(orderId));
  }, [orderId]);

  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      {/* Order header with ID and date */}
      <h2 className="text-slate-600 font-semibold text-lg mb-2">
        #{myOrder._id} ,{" "}
        <span className="pl-1 text-sm font-normal text-slate-500">
          {myOrder.date}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping information section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-slate-600 font-semibold font-sans">
            Deliver To: {myOrder.shippingInfo?.name}
          </h2>

          {/* Delivery address */}
          <p className="flex flex-wrap items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-[3px] rounded">
              Home
            </span>

            <span className="text-slate-600 text-sm leading-5">
              {myOrder.shippingInfo?.address}, {myOrder.shippingInfo?.area},{" "}
              {myOrder.shippingInfo?.post}, {myOrder.shippingInfo?.city},{" "}
              {myOrder.shippingInfo?.province}
            </span>
          </p>

          <p className="text-slate-600 text-md font-semibold">
            Email To: {userInfo.email}
          </p>
        </div>

        {/* Order status and payment information */}
        <div className="text-slate-600 flex flex-col justify-center gap-1">
          <h2 className="font-mono ">
            Price :{" "}
            <span className="font-semibold">
              ${myOrder.price} Included Shipping
            </span>
          </h2>

          {/* Payment status badge */}
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-mono flex items-center gap-1">
              Payment Status :
              <span
                className={`py-[1px] text-xs px-3 rounded-md font-semibold ${
                  myOrder.payment_status === "paid"
                    ? "bg-green-300 text-green-800"
                    : "bg-red-300 text-red-800"
                }`}
              >
                {myOrder.payment_status}
              </span>
            </p>

            {/* Order status badge */}
            <p className="font-mono flex items-center gap-1">
              Order Status :
              <span
                className={`py-[1px] text-xs px-3 rounded-md font-semibold ${
                  myOrder.delivery_status === "paid"
                    ? "bg-green-300 text-green-800"
                    : "bg-red-300 text-red-800"
                }`}
              >
                {myOrder.delivery_status}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Ordered products section */}
      <div className="mt-6">
        <h2 className="text-slate-600 text-lg pb-3 font-sans font-bold border-b border-slate-200">
          Orders Products
        </h2>

        {/* Product list */}
        <div className="flex flex-col divide-y divide-slate-200">
          {myOrder.products?.map((item, index) => (
            <div key={index} className="py-4">
              <div className="grid grid-cols-[60px,1fr,auto] gap-5 items-center text-slate-600">
                {/* Product image and basic info */}
                <img
                  className="w-[55px] h-[55px] object-cover rounded-md"
                  src={item.images[0]}
                  alt={item.name}
                />

                <div className="flex text-sm flex-col justify-start items-start">
                  <Link className="font-medium hover:text-slate-800">
                    {item.name}
                  </Link>
                  <p>
                    <span>Brand : {item.brand}</span>
                  </p>
                  <p>
                    <span>Quantity: {item.quantity}</span>
                  </p>
                </div>

                {/* Product pricing information */}
                <div className="text-right">
                  <h2 className="text-md text-green-800 font-semibold">
                    Price : $
                    {item.price -
                      Math.floor((item.price * item.discount) / 100)}
                  </h2>
                  <p className="text-sm">
                    Regular Price :{" "}
                    <span className="line-through">${item.price}</span>
                  </p>
                  <p className="text-sm">
                    Discount :{" "}
                    <span className="font-semibold">{item.discount}%</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
