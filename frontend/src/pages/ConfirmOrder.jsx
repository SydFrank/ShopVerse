import React, { useEffect, useState } from "react";
// Stripe integration components
import { loadStripe } from "@stripe/stripe-js";
import error from "../assets/error.png";
import success from "../assets/success.png";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import api from "../api/api";

/**
 * Order Confirmation Page - Handles Stripe payment status verification
 * Displays success/error feedback after payment processing and updates order status
 */

// Initialize Stripe with public key
const stripePromise = loadStripe(
  "pk_test_51SQZG9QqqlV3jHnT776SgqPkfbrdq0FfU9UAFU9s5QFAM1LTD08oH7USMv9in4MsB9xcK9XErrtnfmicHVva34Ta00F1YpWv0P"
);

// Function to load Stripe instance
const load = async () => {
  return await stripePromise;
};

const ConfirmOrder = () => {
  // State to manage loading state
  const [loader, setLoader] = useState(true);
  // State to manage Stripe instance
  const [stripe, setStripe] = useState("");
  // State to manage messages
  const [message, setMessage] = useState(null);

  /**
   * Effect to retrieve payment intent status from URL parameters
   * and update message state accordingly
   * @effect
   * @dependency [stripe]
   */
  useEffect(() => {
    if (!stripe) {
      return;
    }
    // Get client secret from URL parameters
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    // If no client secret, exit early
    if (!clientSecret) {
      return;
    }

    // Retrieve payment intent using Stripe instance
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("succeeded");
          break;

        case "processing":
          setMessage("processing");
          break;

        case "requires_payment_method":
          setMessage("failed");
          break;

        default:
          setMessage("failed");
          break;
      }
    });
  }, [stripe]);

  // Function to get and set Stripe instance
  const get_load = async () => {
    const tempStripe = await load();
    setStripe(tempStripe);
  };

  // Effect to load Stripe instance on component mount
  useEffect(() => {
    get_load();
  }, []);

  /**
   * Updates payment status on the backend after successful payment
   * Retrieves orderId from localStorage, makes API call to confirm payment,
   * and manages loader state accordingly.
   * @async
   * @function update_payment
   * @description Confirms payment status with backend after Stripe payment completion.
   * 1. Retrieves orderId from localStorage.
   * 2. Makes GET request to backend API to confirm payment.
   * 3. Removes orderId from localStorage and updates loader state.
   *
   * @throws {Error} Logs error if API request fails
   */
  const update_payment = async () => {
    const orderId = localStorage.getItem("orderId");
    if (orderId) {
      try {
        await api.get(`/order/confirm/${orderId}`);
        localStorage.removeItem("orderId");
        setLoader(false);
      } catch (error) {
        console.error("Error updating payment status:", error.response.data);
      }
    }
  };

  // Effect to trigger payment update when message indicates success
  useEffect(() => {
    if (message === "succeeded") {
      update_payment();
    }
  }, [message]);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      {message === "failed" || message === "processing" ? (
        <>
          <img src={error} />
          <Link
            to="/dashboard/my-orders"
            className="px-5 py-2 bg-green-500 rounded-sm text-white "
          >
            Back to Dashboard
          </Link>
        </>
      ) : message === "succeeded" ? (
        loader ? (
          <FadeLoader />
        ) : (
          <>
            {" "}
            <img src={success} />{" "}
            <Link
              to="/dashboard/my-orders"
              className="px-5 py-2 bg-green-500 rounded-sm text-white "
            >
              Back to Dashboard
            </Link>{" "}
          </>
        )
      ) : (
        <FadeLoader />
      )}
    </div>
  );
};

export default ConfirmOrder;
