import React, { useState } from "react";
// Stripe checkout form component
import {
  PaymentElement,
  LinkAuthenticationElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const CheckoutForm = ({ orderId }) => {
  // Store orderId in local storage
  localStorage.setItem("orderId", orderId);
  // Stripe hooks
  const stripe = useStripe();
  // Elements hook
  const elements = useElements();
  // Message state for payment status
  const [message, setMessage] = useState(null);
  // Loading state for form submission
  const [isLoading, setIsLoading] = useState(false);

  // Payment element layout options
  const paymentElementOptions = {
    layout: "tabs",
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/order/confirm",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={submit} id="payment-form">
      {/* Link authentication element */}
      <LinkAuthenticationElement id="link-authentication-element" />
      {/* Payment element */}
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white"
      >
        <span id="button-text">
          {isLoading ? <div>Loading...</div> : "Pay Now"}
        </span>
      </button>

      {message && <div>{message}</div>}
    </form>
  );
};

export default CheckoutForm;
