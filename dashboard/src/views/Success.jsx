import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  active_stripe_connect_account,
  messageClear,
} from "../store/Reducers/sellerReducer";
import { FadeLoader } from "react-spinners";
import error from "../assets/error.png";
import success from "../assets/success.png";

/**
 * Success Component
 *
 * A status page component that handles Stripe Connect account activation.
 * Displays loading, success, or error states based on the activation result.
 * Automatically processes the activation code from URL parameters and provides
 * navigation back to the dashboard.
 */
const Success = () => {
  // Extract necessary state from the Redux store
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.seller
  );
  // Initialize navigation
  const navigate = useNavigate();
  // Initialize dispatch
  const dispatch = useDispatch();
  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(window.location.search);
  // Get the activeCode parameter
  const activeCode = queryParams.get("activeCode");

  // Effect to activate Stripe Connect account on component mount
  useEffect(() => {
    dispatch(active_stripe_connect_account(activeCode));
  }, [activeCode]);

  // Redirect function to navigate back to the dashboard
  const redirect = () => {
    dispatch(messageClear());
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      {loader ? (
        <FadeLoader />
      ) : errorMessage ? (
        <>
          <img src={error} />
          <button
            onClick={redirect}
            className="px-5 py-2 bg-green-700 rounded-sm text-white"
          >
            Back to Dashboard
          </button>
        </>
      ) : (
        successMessage && (
          <>
            <img src={success} />
            <button
              onClick={redirect}
              className="px-5 py-2 bg-green-700 rounded-sm text-white"
            >
              Back to Dashboard
            </button>
          </>
        )
      )}
    </div>
  );
};

export default Success;
