import React from "react";
import { BsArrowDownSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

const Orders = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [parPage, setParPage] = React.useState(5);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
          />
        </div>

        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left text-[#d0d2d6]">
            <div className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <div className="flex justify-between items-center">
                <div className="py-3 w-[25%] font-bold">Order id</div>
                <div className="py-3 w-[13%] font-bold">Price</div>
                <div className="py-3 w-[18%] font-bold">Payment Status</div>
                <div className="py-3 w-[18%] font-bold">Order Status</div>
                <div className="py-3 w-[18%] font-bold">Action</div>
                <div className="py-3 w-[8%] font-bold">
                  <BsArrowDownSquare />
                </div>
              </div>
            </div>
          </div>

          <div className="text-[#d0d2d6] ">
            <div className="flex justify-between items-start border-b border-slate-700">
              <div className="py-3 w-[25%] font-medium whitespace-nowrap">
                Order id
              </div>
              <div className="py-3 w-[13%] font-medium">#34335</div>
              <div className="py-3 w-[18%] font-medium">$660</div>
              <div className="py-3 w-[18%] font-medium">Pending</div>
              <div className="py-3 w-[18%] font-medium">
                <Link>View</Link>
              </div>
              <div className="py-3 w-[8%] font-medium">
                <BsArrowDownSquare />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
