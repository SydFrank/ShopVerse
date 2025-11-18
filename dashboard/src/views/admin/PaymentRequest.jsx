import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import { get_payment_request } from "../../store/Reducers/paymentReducer";
import moment from "moment";

/**
 * Handles the wheel event on the list's outer container.
 * Logs the vertical scroll delta for debugging or analytics purposes.
 * @param {Object} param0 - The event object containing the deltaY property.
 */
function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

/**
 * Custom outer element for the react-window List component.
 * Forwards the ref and attaches a wheel event handler for custom scroll logic.
 * All additional props are spread onto the underlying div.
 */
const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

/**
 * PaymentRequest component renders a virtualized, scrollable list of withdrawal requests.
 * Utilizes react-window for efficient rendering of large lists.
 */
const PaymentRequest = () => {
  // Redux dispatch function
  const dispatch = useDispatch();

  // Extract payment details from Redux state
  const { successMessage, errorMessage, pendingWithdrawals } = useSelector(
    (state) => state.payment
  );

  // Fetch payment requests on component mount
  useEffect(() => {
    dispatch(get_payment_request());
  }, []);

  /**
   * Renders a single row in the virtualized list.
   * @param {Object} props - Contains index and style for positioning.
   * @returns {JSX.Element} The rendered row representing a withdrawal request.
   */
  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm text-white font-medium ">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          ${pendingWithdrawals[index]?.amount}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm">
            {pendingWithdrawals[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {moment(pendingWithdrawals[index]?.createdAt).format("LL")}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] cursor-pointer text-white rounded-sm text-sm">
            Confirm
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        {/* Section Title */}
        <h2 className="text-xl font-medium pb-5 text-[#d0d2d6]">
          Withdrawal Request
        </h2>
        <div className="w-full ">
          <div className="w-full overflow-x-auto">
            {/* Table Header */}
            <div className="flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-md">
              <div className="w-[25%] p-2 ">No</div>
              <div className="w-[25%] p-2 ">Amount</div>
              <div className="w-[25%] p-2 ">Status</div>
              <div className="w-[25%] p-2 ">Date</div>
              <div className="w-[25%] p-2 ">Action</div>
            </div>
            {/* Virtualized List of Withdrawal Requests */}
            <List
              style={{ minWidth: "340px" }}
              className="List"
              height={350}
              itemSize={35}
              itemCount={pendingWithdrawals.length}
              outerElementType={outerElementType}
            >
              {Row}
            </List>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequest;
