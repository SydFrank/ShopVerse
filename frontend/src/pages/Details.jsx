import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoIosArrowForward } from "react-icons/io"; // Forward arrow icon for breadcrumb navigation
import { Link } from "react-router-dom"; // React Router Link component for navigation
import { MdKeyboardArrowRight } from "react-icons/md";
// Import Carousel component from react-multi-carousel for creating responsive image carousels
import Carousel from "react-multi-carousel";
// Import default styles for the carousel component
import "react-multi-carousel/lib/styles.css";

const Details = () => {
  const images = [1, 2, 3, 4, 5, 6];

  const [image, setImage] = useState("");

  // Responsive breakpoints configuration for the carousel
  // Defines how many items to show at different screen sizes
  const responsive = {
    // Extra large desktop screens (4K and above)
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5, // Show 5 category items
    },
    // Standard desktop screens
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5, // Show 5 category items
    },
    // Tablet landscape mode
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4, // Show 4 category items
    },
    // Medium tablet screens
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4, // Show 4 category items
    },
    // Mobile phones in landscape
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3, // Show 3 category items
    },
    // Small mobile screens
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2, // Show 2 category items
    },
    // Extra small mobile screens
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1, // Show 1 category item
    },
  };

  return (
    <div>
      <Header />

      {/* Hero banner section with cart page title and breadcrumb navigation */}
      <section className="bg-[url('/images/banner/shop.png')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
        {/* Dark overlay for better text readability over background image */}
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto">
            {/* Centered content with page title and navigation breadcrumb */}
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold ">Product Detail Page</h2>
              {/* Breadcrumb navigation for user orientation */}
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Product Details</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-slate-100 py-5 mb-5 ">
          <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto ">
            <div className="flex justify-start items-center text-md text-slate-600 w-full ">
              <Link to="/">Home</Link>
              <span className="pt-1">
                <MdKeyboardArrowRight />
              </span>
              <Link to="/">Category</Link>
              <span className="pt-1">
                <MdKeyboardArrowRight />
              </span>
              <span>Product Name</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto ">
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8">
            <div>
              <div className="p-5 border border-slate-200">
                <img
                  className="h-[400px] w-full"
                  src="/images/products/3.webp"
                />
              </div>

              <div className="py-3">
                {images && (
                  <Carousel
                    autoPlay={true} // Automatically advance slides
                    infinite={true} // Loop back to first slide after last slide
                    responsive={responsive} // Apply responsive breakpoints
                    transitionDuration={500} // Animation duration between slides (500ms)
                  >
                    {images.map((img, index) => {
                      return (
                        <div key={index} onClick={() => {}}>
                          <img
                            src={`/images/products/${img}.webp`}
                            className=" h-[120px] cursor-pointer"
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Details;
