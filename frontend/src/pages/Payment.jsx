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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <section className="flex-1">
        <div className="w-[85%] max-xl:w-[90%] mx-auto py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Payment Method Selection */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-5 border-b border-slate-100">
                  <h3 className="text-slate-800 font-semibold">
                    Choose payment method
                  </h3>
                </div>
                <div className="p-5">
                  {/* Payment method tabs */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod("stripe")}
                      className={`rounded-lg border px-4 py-3 flex items-center gap-3 transition ${
                        paymentMethod === "stripe"
                          ? "border-emerald-500 ring-2 ring-emerald-100 bg-emerald-50"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-md overflow-hidden bg-slate-100 grid place-content-center">
                        <img
                          src="/images/payment/stripe.png"
                          alt="Payment"
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                      <span
                        className={
                          paymentMethod === "stripe"
                            ? "text-emerald-700 text-sm font-medium"
                            : "text-slate-700 text-sm font-medium"
                        }
                      >
                        Stripe
                      </span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("cod")}
                      className={`rounded-lg border px-4 py-3 flex items-center gap-3 transition ${
                        paymentMethod === "cod"
                          ? "border-emerald-500 ring-2 ring-emerald-100 bg-emerald-50"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-md overflow-hidden bg-slate-100 grid place-content-center">
                        <img
                          src="/images/payment/cod.jpg"
                          alt="Payment"
                          className="w-7 h-7 object-cover"
                        />
                      </div>
                      <span
                        className={
                          paymentMethod === "cod"
                            ? "text-emerald-700 text-sm font-medium"
                            : "text-slate-700 text-sm font-medium"
                        }
                      >
                        COD
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Stripe payment component */}
              {paymentMethod === "stripe" && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                  <Stripe orderId={orderId} price={price} />
                </div>
              )}

              {/* Cash on delivery option */}
              {paymentMethod === "cod" && (
                <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                  <button className="w-full sm:w-auto px-6 py-2.5 rounded-md hover:shadow-emerald-700/20 hover:shadow-md bg-emerald-600 text-white font-medium">
                    Pay Now
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-slate-700 space-y-4">
                  <h2 className="font-semibold text-lg text-slate-800">
                    Order Summary
                  </h2>
                  {/* Order details */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">
                      {items} Items and Shipping Fee Included
                    </span>
                    <span className="font-medium">${price}</span>
                  </div>
                  {/* Total amount */}
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-800">
                      Total Amount
                    </span>
                    <span className="text-xl font-semibold text-emerald-600">
                      ${price}
                    </span>
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
