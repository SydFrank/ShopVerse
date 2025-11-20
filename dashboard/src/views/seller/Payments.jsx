import React, { forwardRef, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { MdCurrencyExchange } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  get_seller_payment_details,
  send_withdrawal_request,
  messageClear,
} from "../../store/Reducers/paymentReducer";
import toast from "react-hot-toast";
import moment from "moment";

/**
 * This component displays a paginated, searchable table of products.
 * Each product row shows key details such as image, name, category, brand, price, discount, stock, and action buttons.
 * Includes custom pagination and search controls for enhanced user experience.
 *
 * Features:
 * - Search input for live filtering (logic to be implemented)
 * - Select dropdown for changing items-per-page
 * - Responsive table layout using Tailwind CSS
 * - Action buttons for edit, view, and delete (icons only, handlers to be implemented)
 * - Pagination controls at the bottom
 *
 * Usage:
 * Import and render this component within a parent route or dashboard.

 */

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

const Payments = () => {
  // Redux dispatch function
  const dispatch = useDispatch();
  // Extract userInfo from Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // Extract payment details from Redux state
  const {
    pendingWithdrawals,
    successWithdrawals,
    totalAmount,
    withdrawalAmount,
    pendingAmount,
    availableAmount,
    successMessage,
    errorMessage,
    loader,
  } = useSelector((state) => state.payment);

  // Local state for withdrawal amount input
  const [amount, setAmount] = useState(0);

  // Handles the submission of the withdrawal request form
  const sendRequest = (e) => {
    e.preventDefault();
    if (availableAmount - amount > 10) {
      dispatch(send_withdrawal_request({ amount, sellerId: userInfo._id }));
      setAmount(0);
    } else {
      toast.error("Insufficient Balance");
    }
  };

  /**
   * Renders a single row in the virtualized list.
   * Displays withdrawal request details such as number, amount, status, and date.
   * @param {Object} param0 - The props object containing index and style.
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
      </div>
    );
  };

  /**
   * Renders a single row in the virtualized list for successful withdrawals.
   * Displays withdrawal details such as number, amount, status, and date.
   * @param {Object} param0 - The props object containing index and style.
   */
  const Rows = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm text-white font-medium ">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          ${successWithdrawals[index]?.amount}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm">
            {successWithdrawals[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {moment(successWithdrawals[index]?.createdAt).format("LL")}
        </div>
      </div>
    );
  };

  // Fetch seller payment details on component mount
  useEffect(() => {
    dispatch(get_seller_payment_details(userInfo._id));
  }, []);

  // Show success or error messages as toasts
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5">
        <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-2xl font-bold ">${totalAmount}</h2>
            <span className="text-sm  font-bold">Total Sales</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-2xl font-bold ">${availableAmount}</h2>
            <span className="text-sm  font-bold">Available Amount</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-2xl font-bold ">${withdrawalAmount}</h2>
            <span className="text-sm  font-bold">Withdrawal Amount</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-2xl font-bold ">${pendingAmount}</h2>
            <span className="text-sm  font-bold">Pending Amount</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
      </div>

      <div className="w-full grid grid-col-1 md:grid-cols-2 gap-2 pb-4">
        <div className="bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5">
          <h2 className="text-lg">Send Request</h2>
          <div className="pt-5 mb-5">
            <form onSubmit={sendRequest}>
              <div className="flex gap-6 flex-wrap">
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  type="number"
                  name="amount"
                  className="px-3 py-2  md:w-[75%] focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                />
                {/* Submit Button */}
                <button
                  disabled={loader}
                  className="bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 cursor-pointer"
                >
                  {loader ? "loading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
          <h2 className="text-lg pb-4">Pending Request</h2>

          <div className="w-full overflow-x-auto">
            {/* Table Header */}
            <div className="flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-md">
              <div className="w-[25%] p-2 ">No</div>
              <div className="w-[25%] p-2 ">Amount</div>
              <div className="w-[25%] p-2 ">Status</div>
              <div className="w-[25%] p-2 ">Date</div>
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

        <div className="bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5">
          <h2 className="text-lg pb-4">Success Withdrawal</h2>

          <div className="w-full overflow-x-auto">
            {/* Table Header */}
            <div className="flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-md">
              <div className="w-[25%] p-2 ">No</div>
              <div className="w-[25%] p-2 ">Amount</div>
              <div className="w-[25%] p-2 ">Status</div>
              <div className="w-[25%] p-2 ">Date</div>
            </div>
            {/* Virtualized List of Withdrawal Requests */}
            <List
              style={{ minWidth: "340px" }}
              className="List"
              height={350}
              itemSize={35}
              itemCount={successWithdrawals.length}
              outerElementType={outerElementType}
            >
              {Rows}
            </List>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
