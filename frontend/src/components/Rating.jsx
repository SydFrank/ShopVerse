// Import React library
import React from "react";
// Import star icons from react-icons library
import { CiStar } from "react-icons/ci"; // Empty/outline star icon
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Filled star and half star icons

/**
 * Rating Component - Star Rating Display
 * Renders a 5-star rating system based on the provided rating value
 * Supports full stars, half stars, and empty stars
 *
 * @param {Object} props - Component props
 * @param {number} props.ratings - Rating value (0-5, supports decimals)
 * @returns {JSX.Element} Star rating display with appropriate filled/half/empty stars
 */
const Rating = ({ ratings }) => {
  return (
    <>
      {/* First Star - Rating threshold: 1.0 for full, 0.5 for half */}
      {ratings >= 1 ? (
        // Full star - golden color for ratings 1.0 and above
        <span className="text-[#edbb0e]">
          <FaStar />
        </span>
      ) : ratings >= 0.5 ? (
        // Half star - golden color for ratings 0.5 to 0.9
        <span className="text-[#edbb0e]">
          <FaStarHalfAlt />
        </span>
      ) : (
        // Empty star - gray color for ratings below 0.5
        <span className="text-slate-600">
          <CiStar />
        </span>
      )}

      {/* Second Star - Rating threshold: 2.0 for full, 1.5 for half */}
      {ratings >= 2 ? (
        // Full star - golden color for ratings 2.0 and above
        <span className="text-[#edbb0e]">
          <FaStar />
        </span>
      ) : ratings >= 1.5 ? (
        // Half star - golden color for ratings 1.5 to 1.9
        <span className="text-[#edbb0e]">
          <FaStarHalfAlt />
        </span>
      ) : (
        // Empty star - gray color for ratings below 1.5
        <span className="text-slate-600">
          <CiStar />
        </span>
      )}

      {/* Third Star - Rating threshold: 3.0 for full, 2.5 for half */}
      {ratings >= 3 ? (
        // Full star - golden color for ratings 3.0 and above
        <span className="text-[#edbb0e]">
          <FaStar />
        </span>
      ) : ratings >= 2.5 ? (
        // Half star - golden color for ratings 2.5 to 2.9
        <span className="text-[#edbb0e]">
          <FaStarHalfAlt />
        </span>
      ) : (
        // Empty star - gray color for ratings below 2.5
        <span className="text-slate-600">
          <CiStar />
        </span>
      )}

      {/* Fourth Star - Rating threshold: 4.0 for full, 3.5 for half */}
      {ratings >= 4 ? (
        // Full star - golden color for ratings 4.0 and above
        <span className="text-[#edbb0e]">
          <FaStar />
        </span>
      ) : ratings >= 3.5 ? (
        // Half star - golden color for ratings 3.5 to 3.9
        <span className="text-[#edbb0e]">
          <FaStarHalfAlt />
        </span>
      ) : (
        // Empty star - gray color for ratings below 3.5
        <span className="text-slate-600">
          <CiStar />
        </span>
      )}

      {/* Fifth Star - Rating threshold: 5.0 for full, 4.5 for half */}
      {ratings >= 5 ? (
        // Full star - golden color for perfect rating (5.0)
        <span className="text-[#edbb0e]">
          <FaStar />
        </span>
      ) : ratings >= 4.5 ? (
        // Half star - golden color for ratings 4.5 to 4.9
        <span className="text-[#edbb0e]">
          <FaStarHalfAlt />
        </span>
      ) : (
        // Empty star - gray color for ratings below 4.5
        <span className="text-slate-600">
          <CiStar />
        </span>
      )}
    </>
  );
};

// Export the Rating component as default export for use in other parts of the application
export default Rating;
