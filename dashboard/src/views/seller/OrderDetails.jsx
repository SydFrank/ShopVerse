import React from "react";

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
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        {/* Header with title and order status selector */}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>
          <select
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#475569] border border-slate-700 rounded-md text-[#d0d2d6]"
            name=""
            id=""
          >
            <option value="">Pending</option>
            <option value="">Processing</option>
            <option value="">Warehouse</option>
            <option value="">Placed</option>
            <option value="">Cancelled</option>
          </select>
        </div>
        <div className="p-4">
          {/* Order number and date */}
          <div className="flex gap-2 text-lg text-[#d0d2d6]">
            <h2>#3434</h2>
            <span>23 Jul 2025</span>
          </div>
          <div className="flex flex-wrap">
            {/* Left Section: Delivery and Products */}
            <div className="w-[30%]">
              <div className="pr-3 text-[#d0d2d6] text-lg">
                {/* Delivery details */}
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">Deliver To: Warehouse</h2>
                </div>
                {/* Payment status and price */}
                <div className="flex justify-start items-center gap-3 ">
                  <h2>Payment Status: </h2>
                  <span className="text-base">Paid</span>
                </div>
                <span>Price: $660</span>
                {/* Ordered products */}
                <div className="mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md">
                  <div className="text-[#d0d2d6]">
                    <div className="flex gap-3 text-md">
                      <img
                        className="w-[50px] h-[50px]"
                        src="/images/category/1.jpg"
                        alt="Product"
                      />
                      <div>
                        <h2>Product Name here</h2>
                        <p>
                          <span>Brand:</span>
                          <span>Easy</span>
                          <span className="text-lg">Quantity: 3</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md">
                  <div className="text-[#d0d2d6]">
                    <div className="flex gap-3 text-md">
                      <img
                        className="w-[50px] h-[50px]"
                        src="/images/category/2.jpg"
                        alt="Product"
                      />
                      <div>
                        <h2>Product Name here</h2>
                        <p>
                          <span>Brand:</span>
                          <span>Easy </span>
                          <span className="text-lg">Quantity: 3</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md">
                  <div className="text-[#d0d2d6]">
                    <div className="flex gap-3 text-md">
                      <img
                        className="w-[50px] h-[50px]"
                        src="/images/category/3.jpg"
                        alt="Product"
                      />
                      <div>
                        <h2>Product Name here</h2>
                        <p>
                          <span>Brand:</span>
                          <span>Easy</span>
                          <span className="text-lg">Quantity: 3</span>
                        </p>
                      </div>
                    </div>
                  </div>
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
