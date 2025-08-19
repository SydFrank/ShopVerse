import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoIosArrowForward } from "react-icons/io"; // Forward arrow icon for breadcrumb
import { Link } from "react-router-dom"; // React Router Link for navigation

const Card = () => {
  const card_products = [1, 2];
  const outOfStockProducts = [1, 2];

  return (
    <div>
      <Header />

      {/* Hero banner section with shop page title and breadcrumb */}
      <section className="bg-[url('/images/banner/shop.png')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
        {/* Dark overlay for better text readability */}
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto">
            {/* Centered content with page title and navigation breadcrumb */}
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold ">Card Page</h2>
              {/* Breadcrumb navigation */}
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Card</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eeeeee]">
        <div className="w-[85%] max-lg:w-[90%] max-md:w-[90%] max-sm:w-[90%] mx-auto py-16">
          {card_products.length > 0 || outOfStockProducts.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] max-lg:w-full">
                <div className="pr-3 max-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4">
                      <h2 className="text-md text-green-500 font-semibold">
                        Stock Products {card_products.length}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/shops" className="px-4 py-1 bg-indigo-500 text-white">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Card;
