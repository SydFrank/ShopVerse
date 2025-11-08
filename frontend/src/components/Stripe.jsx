import React, { useState } from "react";
import api from "../api/api";
// Stripe integration components
import { loadStripe } from "@stripe/stripe-js";
// Elements provider for Stripe
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Initialize Stripe with public key
const stripePromise = loadStripe(
  "pk_test_51SQZG9QqqlV3jHnT776SgqPkfbrdq0FfU9UAFU9s5QFAM1LTD08oH7USMv9in4MsB9xcK9XErrtnfmicHVva34Ta00F1YpWv0P"
);

const Stripe = ({ orderId, price }) => {
  // Client secret state for payment intent
  const [clientSecret, setClientSecret] = useState("");
  // Create payment intent on component mount
  const appearance = {
    theme: "stripe",
  };
  // Payment intent creation
  const options = {
    clientSecret,
    appearance,
  };

  // const create_payment = async () => {
  //   try {
  //     const { data } = await api.post(
  //       "/order/create-payment",
  //       { price },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     setClientSecret(data.clientSecret);
  //   } catch (error) {
  //     console.error("Error creating payment intent:", error.response.data);
  //   }
  // };

  /**
   * Creates a Stripe payment intent for processing customer payments
   * Validates price data and communicates with backend to initialize secure payment
   *
   * @async
   * @function create_payment
   * @description Initiates the payment process by:
   * 1. Validating the price is a valid positive number
   * 2. Sending payment request to backend API
   * 3. Setting client secret for Stripe Elements integration
   * 4. Enabling secure payment form rendering
   *
   * @throws {Error} Logs error if price validation fails or API request fails
   *
   * @example
   * // Called when user clicks "Start Payment" button
   * create_payment(); // Validates price and creates payment intent
   */
  const create_payment = async () => {
    try {
      // Convert price to number and validate it's a positive finite value
      const numeric = Number(price);
      if (!Number.isFinite(numeric) || numeric <= 0) {
        return;
      }

      // Send payment intent request to backend with validated price
      const { data } = await api.post(
        "/order/create-payment",
        { price: numeric },
        { withCredentials: true }
      );

      // Set client secret to enable Stripe Elements payment form
      setClientSecret(data.clientSecret);
    } catch (error) {
      // Log payment initialization errors for debugging
      console.error(
        "Error creating payment intent:",
        error?.response?.data || error
      );
    }
  };

  return (
    <div>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      ) : (
        <button
          onClick={create_payment}
          className="w-full sm:w-auto px-6 py-2.5 rounded-md hover:shadow-emerald-700/20 hover:shadow-md bg-emerald-600 text-white font-medium"
        >
          Pay Now
        </button>
      )}
    </div>
  );
};

export default Stripe;
