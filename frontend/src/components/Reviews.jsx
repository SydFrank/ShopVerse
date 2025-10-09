/**
 * Reviews Component - Product Review System with Rating Display and Review Submission
 *
 * This component renders a comprehensive product review system for the ShopVerse
 * e-commerce application. It displays overall product ratings, rating distribution
 * with visual bars, individual customer reviews with pagination, and provides
 * functionality for authenticated users to submit new reviews with star ratings.
 *
 * Key Features:
 * - Overall rating display (4.5/5) with visual star representation
 * - Rating distribution breakdown (5-star to 0-star) with percentage bars
 * - Paginated list of customer reviews with dates and ratings
 * - Interactive star rating system for new review submissions
 * - User authentication check for review submission access
 * - Responsive design optimized for all screen sizes
 * - Real-time rating updates and review management
 * - Visual feedback with hover states and transitions
 *
 * @component
 * @returns {JSX.Element} Complete review system with rating display and submission form
 */

import React, { useState } from "react";
import Rating from "./Rating";
import RatingTemp from "./RatingTemp";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import RatingReact from "react-rating";
// React Icons for star representations
import { CiStar } from "react-icons/ci";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { customer_review } from "../store/reducers/homeReducer";

/**
 * Reviews Functional Component
 * Manages product review display, rating distribution, and new review submissions
 */
const Reviews = ({ product }) => {
  // Redux dispatch function
  const dispatch = useDispatch();

  // Pagination state for managing review list navigation
  const [pageNumber, setPageNumber] = useState(1);

  // Reviews per page configuration
  const [parPage, setParPage] = useState(5);

  // Mock user authentication object
  // const userInfo = {};

  const [rate, setRate] = useState(""); // Selected star rating for new review

  const [review, setReview] = useState(""); // Review text content (currently unused)

  const { userInfo } = useSelector((state) => state.auth);

  // Handle review form submission
  const review_submit = (e) => {
    e.preventDefault();
    const obj = {
      name: userInfo.name,
      review: review,
      rating: rate,
      productId: product._id,
    };
    dispatch(customer_review(obj));
  };

  return (
    <div className="mt-8">
      {/* Overall rating summary and distribution section */}
      <div className="flex gap-10 max-lg:flex-col ">
        {/* Left column: Overall rating display */}
        <div className="flex flex-col gap-2 justify-start items-center py-4">
          {/* Large rating number display */}
          <div>
            <span className="text-6xl font-semibold">4.5</span>
            <span className="text-3xl font-semibold text-slate-600">/5</span>
          </div>
          {/* Star rating visual representation */}
          <div className="flex tet-3xl">
            <Rating ratings={4.5} />
          </div>
          {/* Total number of reviews */}
          <p className="text-sm text-slate-600">15 Reviews</p>
        </div>

        {/* Right column: Rating distribution bars */}
        <div className="flex gap-2 flex-col py-4">
          {/* 5-star rating distribution */}
          <div className="flex justify-start items-center gap-5">
            {/* 5-star display */}
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={5} />
            </div>

            {/* Progress bar showing 60% of users gave 5 stars */}
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0e] w-[60%]"></div>
            </div>
            {/* Number of 5-star reviews */}
            <p className="text-sm text-slate-600 w-[0%]">10</p>
          </div>

          {/* 4-star rating distribution */}
          <div className="flex justify-start items-center gap-5">
            {/* 4-star display */}
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={4} />
            </div>

            {/* Progress bar showing 70% of users gave 4 stars */}
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0e] w-[70%]"></div>
            </div>
            {/* Number of 4-star reviews */}
            <p className="text-sm text-slate-600 w-[0%]">20</p>
          </div>

          {/* 3-star rating distribution */}
          <div className="flex justify-start items-center gap-5">
            {/* 3-star display */}
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={3} />
            </div>

            {/* Progress bar showing 60% of users gave 3 stars */}
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0e] w-[60%]"></div>
            </div>
            {/* Number of 3-star reviews */}
            <p className="text-sm text-slate-600 w-[0%]">8</p>
          </div>

          {/* 2-star rating distribution */}
          <div className="flex justify-start items-center gap-5">
            {/* 2-star display */}
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={2} />
            </div>

            {/* Progress bar showing 30% of users gave 2 stars */}
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0e] w-[30%]"></div>
            </div>
            {/* Number of 2-star reviews */}
            <p className="text-sm text-slate-600 w-[0%]">5</p>
          </div>

          {/* 1-star rating distribution */}
          <div className="flex justify-start items-center gap-5">
            {/* 1-star display */}
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={1} />
            </div>

            {/* Progress bar showing 10% of users gave 1 star */}
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0e] w-[10%]"></div>
            </div>
            {/* Number of 1-star reviews */}
            <p className="text-sm text-slate-600 w-[0%]">2</p>
          </div>

          {/* 0-star rating distribution (no ratings) */}
          <div className="flex justify-start items-center gap-5">
            {/* 0-star display */}
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemp rating={0} />
            </div>

            {/* Progress bar showing 0% of users gave 0 stars */}
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0e] w-[0%]"></div>
            </div>
            {/* Number of 0-star reviews */}
            <p className="text-sm text-slate-600 w-[0%]">0</p>
          </div>
        </div>
      </div>

      {/* Individual reviews section header */}
      <h2 className="text-slate-600 text-xl font-bold py-5">
        Product Review 10
      </h2>

      {/* Individual customer reviews list with pagination */}
      <div className="flex flex-col gap-8 pb-10 pt-4">
        {/* Map through mock reviews data to display individual reviews */}
        {[1, 2, 3, 4, 5].map((r, i) => (
          <div key={i} className="flex flex-col gap-1 ">
            {/* Review header with rating and date */}
            <div className="flex justify-between items-center">
              {/* Individual review star rating */}
              <div className="flex gap-1 text-xl">
                <RatingTemp rating={4} />
              </div>

              {/* Review submission date */}
              <span className="text-slate-600 ">24 Aug 2025</span>
            </div>
            {/* Reviewer name */}
            <span className="text-slate-600 text-md">Echo</span>
            {/* Review text content */}
            <p className="text-slate-600 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.{" "}
            </p>
          </div>
        ))}
        {/* Pagination controls for navigating through reviews */}
        <div className="flex justify-end">
          {
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={20} // Total number of reviews
              parPage={parPage} // Reviews per page
              showItem={Math.floor(10 / 3)} // Number of pagination buttons to show
            />
          }
        </div>
      </div>

      {/* New review submission section with authentication check */}
      <div className="mb-5">
        {userInfo ? (
          // Show review form if user is authenticated
          <div className="flex flex-col gap-3">
            {/* Interactive star rating selector for new review */}
            <div className="flex gap-1">
              <RatingReact
                onChange={(e) => setRate(e)} // Update rating state on star selection
                initialRating={rate} // Current selected rating
                emptySymbol={
                  // Empty star icon for unselected stars
                  <span className="text-[#Edbb0e] text-4xl">
                    <CiStar />
                  </span>
                }
                fullSymbol={
                  // Filled star icon for selected stars
                  <span className="text-[#Edbb0e] text-4xl">
                    <FaStar />
                  </span>
                }
              />
            </div>

            {/* Review text submission form */}
            <form onSubmit={review_submit}>
              {/* Multi-line text area for review content */}
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                name=""
                id=""
                cols="30"
                rows="5"
                className="border outline-0 border-slate-200 p-3 w-full"
                placeholder="Write your review here..."
              ></textarea>

              {/* Submit button for review form */}
              <div className="mt-2">
                <button className="py-1 px-5 bg-indigo-500 text-white rounded-sm">
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          // Show login prompt if user is not authenticated
          <div>
            <Link
              to="/login"
              className="py-1 px-5 bg-red-500 text-white rounded-sm "
            >
              Login First
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
