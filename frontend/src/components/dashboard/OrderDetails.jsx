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
    <div className="bg-white p-5 ">
      {/* Order header with ID and date */}
      <h2 className="text-slate-600 font-semibold">
        #{myOrder._id} , <span className="pl-1">{myOrder.date}</span>
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {/* Shipping information section */}
        <div className="flex flex-col gap-1">
          <h2 className="text-slate-600 font-semibold font-sans">
            Deliver To: {myOrder.shippingInfo?.name}
          </h2>

          {/* Delivery address */}
          <p>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-2 rounded">
              Home
            </span>

            <span className="text-slate-600 text-sm ">
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
        <div className="text-slate-600 ">
          <h2 className="font-mono">
            Price : ${myOrder.price} Included Shipping
          </h2>

          {/* Payment status badge */}
          <p className="font-mono">
            Payment Status :{" "}
            <span
              className={`py-[1px] text-xs px-3 ${
                myOrder.payment_status === "paid"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              } rounded-md`}
            >
              {myOrder.payment_status}
            </span>
          </p>

          {/* Order status badge */}
          <p className="font-mono">
            Order Status :{" "}
            <span
              className={`py-[1px] text-xs px-3 ${
                myOrder.delivery_status === "paid"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              } rounded-md`}
            >
              {myOrder.delivery_status}
            </span>
          </p>
        </div>
      </div>

      {/* Ordered products section */}
      <div className="mt-4">
        <h2 className="text-slate-600 text-lg pb-2 font-sans font-bold">
          Orders Products
        </h2>

        {/* Product list */}
        <div className="flex gap-5 flex-col">
          {myOrder.products?.map((item, index) => (
            <div key={index}>
              <div className="flex gap-5 justify-start items-center  text-slate-600">
                {/* Product image and basic info */}
                <div className="flex gap-2">
                  <img className="w-[55px] h-[55px]" src={item.images[0]} />
                  <div className="flex text-sm flex-col justify-start items-start">
                    <Link>{item.name}</Link>
                    <p>
                      <span>Brand : {item.brand}</span>
                    </p>
                    <p>
                      <span>Quantity: {item.quantity}</span>
                    </p>
                  </div>
                </div>

                {/* Product pricing information */}
                <div className="pl-4 flex flex-col ">
                  <h2 className="text-md text-green-800 ">
                    Price : $
                    {item.price -
                      Math.floor((item.price * item.discount) / 100)}
                  </h2>
                  <p>
                    Regular Price :{" "}
                    <span className="line-through">${item.price}</span>
                  </p>
                  <p>
                    Discount :{" "}
                    <span className="line-through">{item.discount}%</span>
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
