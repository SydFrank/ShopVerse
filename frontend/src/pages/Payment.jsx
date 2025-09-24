import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import Stripe from "../components/Stripe";

const Payment = () => {
  // Get order details from navigation state
  const {
    state: { price, items, orderId },
  } = useLocation();

  // Payment method selection (stripe or cod)
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  return (
    <div>
      <Header />
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] max-lg:w-[90%] max-md:w-[90%] max-sm:w-[90%] mx-auto py-16">
          <div className="flex flex-wrap max-md:flex-col-reverse">
            {/* Payment Method Selection */}
            <div className="w-7/12 max-md:w-full ">
              <div className="pr-2 max-md:pr-0">
                {/* Payment method tabs */}
                <div className="flex flex-wrap">
                  <div
                    onClick={() => setPaymentMethod("stripe")}
                    className={`w-[20%] border-r cursor-pointer  py-4 px-6 ${
                      paymentMethod === "stripe" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img src="/images/payment/stripe.png" alt="Payment" />
                    </div>
                    <span className="text-slate-600 ">Stripe</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`w-[20%] border-r cursor-pointer  py-4 px-6 ${
                      paymentMethod === "cod" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center">
                      <img src="/images/payment/cod.jpg" alt="Payment" />
                    </div>
                    <span className="text-slate-600">COD</span>
                  </div>
                </div>
              </div>

              {/* Stripe payment component */}
              {paymentMethod === "stripe" && (
                <div>
                  <Stripe />
                </div>
              )}

              {/* Cash on delivery option */}
              {paymentMethod === "cod" && (
                <div className="w-full px-4 py-8 bg-white shadow-sm">
                  <button className="px-10 py-[6px] rounded-sm hover:shadow-green-500/20 hover:shadow-lg bg-[#059473] text-white ">
                    Pay Now
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="w-5/12 max-md:w-full ">
              <div className="pl-2 max-md:pl-0 max-md:mb-0 ">
                <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3 ">
                  <h2 className="font-bold text-lg ">Order Summary</h2>
                  {/* Order details */}
                  <div className="flex justify-between items-center">
                    <span>{items} Items and Shipping Fee Included</span>
                    <span>${price}</span>
                  </div>
                  {/* Total amount */}
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Amount</span>
                    <span className="text-lg text-green-600">${price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Payment;
