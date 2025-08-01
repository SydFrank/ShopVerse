import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

/**
 * SellerToCustomer Component
 *
 * This component renders a responsive chat interface for seller communication.
 * It features a collapsible sidebar listing sellers and a main chat area for messaging.
 *
 * Features:
 * - Responsive sidebar with seller list and toggle functionality for mobile views.
 * - Displays a list of sellers with online status indicators.
 * - Main chat area shows sample chat messages between user and sellers.
 * - Chat input form for message entry (UI only, no send logic implemented).
 *
 * Props: None
 * State:
 *  - show (boolean): Controls the visibility of the sidebar on mobile devices.
 *
 * Note:
 * - Seller and chat data are currently hardcoded for demonstration.
 * - Replace static values (e.g., sellerId, seller names, images) with dynamic data as needed.
 */
const SellerToCustomer = () => {
  const [show, setShow] = useState(false);
  const sellerId = 65; // Example seller ID, replace with actual logic to get seller ID

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          {/* Sidebar: Seller List */}
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all`}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#9e97e9] md:bg-transparent overflow-y-auto">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
                <h1>Customers</h1>
                {/* Sidebar Toggle Button (Mobile Only) */}
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoMdClose />
                </span>
              </div>

              {/* Seller List Item - Example: Allen Li */}
              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-md cursor-pointer bg-[#8288ed]`}
              >
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                    src="/images/admin.jpg"
                  />
                  {/* Online Indicator */}
                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                </div>
                <div className="flex justify-center items-start flex-col w-full">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-base font-semibold">Allen Li</h2>
                  </div>
                </div>
              </div>

              {/* Seller List Item - Example: John Doe */}
              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm cursor-pointer`}
              >
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                    src="/images/admin.jpg"
                  />
                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                </div>
                <div className="flex justify-center items-start flex-col w-full">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-base font-semibold">John Doe</h2>
                  </div>
                </div>
              </div>

              {/* Seller List Item - Example: Amy Wu */}
              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm cursor-pointer`}
              >
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                    src="/images/admin.jpg"
                  />
                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                </div>
                <div className="flex justify-center items-start flex-col w-full">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-base font-semibold">Amy Wu</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex justify-between items-center">
              {sellerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full"
                      src="/images/demo.jpg"
                    />
                    {/* Online Indicator */}
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <h2 className="text-base text-white font-semibold">Allen</h2>
                </div>
              )}

              {/* Sidebar Toggle Button (Mobile Only) */}
              <div
                onClick={() => setShow(!show)}
                className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 cursor-pointer justify-center items-center text-white"
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>
            <div className="py-4">
              <div className="bg-[#475569] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                {/* Example Incoming Message */}
                <div className="w-full flex justify-start items-center ">
                  <div className="flex justify-start items-start gap-2 md:px-2 py-2 max-w-full lg:max-w-[85%]">
                    <div>
                      <img
                        className="w-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                        src="/images/demo.jpg"
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm">
                      <span>How are you ?</span>
                    </div>
                  </div>
                </div>

                {/* Example Outgoing Message */}
                <div className="w-full flex justify-end items-center ">
                  <div className="flex justify-start items-start gap-2 md:px-2 py-2 max-w-full lg:max-w-[85%]">
                    <div className="flex justify-center items-start flex-col w-full bg-red-500 shadow-lg shadow-red-500/50 text-white py-1 px-2 rounded-sm">
                      <span>How are you ?</span>
                    </div>
                    <div>
                      <img
                        className="w-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                        src="/images/admin.jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Example Incoming Message */}
                <div className="w-full flex justify-start items-center ">
                  <div className="flex justify-start items-start gap-2 md:px-2 py-2 max-w-full lg:max-w-[85%]">
                    <div>
                      <img
                        className="w-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                        src="/images/demo.jpg"
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm">
                      <span>I need some help</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Chat Input Form */}
            <form className="flex gap-3">
              <input
                className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#d0d2d6]"
                type="text"
                placeholder="Input Your Message"
              />
              <button className="shadow-lg bg-[#06b6d4] hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white ">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerToCustomer;
