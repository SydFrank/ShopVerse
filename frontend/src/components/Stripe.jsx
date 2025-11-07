import React, { useState } from "react";
import axios from "axios";
// Stripe integration components
import { loadStripe } from "@stripe/stripe-js";
// Elements provider for Stripe
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Initialize Stripe with public key
const stripePromise = loadStripe(
  "pk_test_51SQZG9QqqlV3jHnT776SgqPkfbrdq0FfU9UAFU9s5QFAM1LTD08oH7USMv9in4MsB9xcK9XErrtnfmicHVva34Ta00F1YpWv0P"
);

const Stripe = ({ order, price }) => {
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
  return (
    <div className="mt-4">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <button className="px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white">
          Start Payment
        </button>
      )}
    </div>
  );
};

export default Stripe;
