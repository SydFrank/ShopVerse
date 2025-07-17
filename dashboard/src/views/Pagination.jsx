/**
 * Pagination component renders pagination controls for navigating through pages of data.
 *
 * Props:
 * - pageNumber (number): The current active page.
 * - setPageNumber (function): Function to update the current page number.
 * - totalItem (number): Total number of items across all pages.
 * - parPage (number): Number of items displayed per page.
 * - showItem (number): Number of pagination buttons to display at a time.
 */

import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  parPage,
  showItem,
}) => {
  // Calculate the total number of pages
  let totalPage = Math.ceil(totalItem / parPage);

  // Initialize the starting page number for pagination buttons
  let startPage = pageNumber;

  // Calculate how many pages are left after the current page
  let dif = totalPage - pageNumber;

  // If remaining pages are less than or equal to number of buttons to show,
  // shift the start page so the pagination stays within bounds
  if (dif <= showItem) {
    startPage = totalPage - showItem;
  }

  // Define the ending page number for pagination buttons
  let endPage = startPage <= 0 ? showItem : showItem + startPage;

  // Ensure the starting page number is at least 1
  if (startPage <= 0) {
    startPage = 1;
  }

  /**
   * Generates an array of pagination button elements based on the current range.
   * Each button allows the user to navigate to a specific page.
   */
  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i < endPage; i++) {
      btns.push(
        <li
          onClick={() => setPageNumber(i)}
          className={`${
            pageNumber === i
              ? "bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white"
              : "bg-slate-600 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]"
          } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`}
        >
          {i}
        </li>
      );
    }
    return btns;
  };

  return (
    <ul className="flex gap-3">
      {/* Render previous arrow only if the current page is greater than 1 */}
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
        >
          <RiArrowLeftDoubleFill />
        </li>
      )}

      {/* Render pagination number buttons */}
      {createBtn()}

      {/* Render next arrow only if current page is not the last */}
      {pageNumber < totalPage && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
        >
          <MdKeyboardDoubleArrowRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
