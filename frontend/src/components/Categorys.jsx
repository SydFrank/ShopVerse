// Import React library
import React from "react";
// Import Carousel component from react-multi-carousel for creating responsive image carousels
import Carousel from "react-multi-carousel";
// Import Link component from React Router for navigation
import { Link } from "react-router-dom";
// Import default styles for the carousel component
import "react-multi-carousel/lib/styles.css";

/**
 * Categorys Component - Product Categories Carousel
 * Displays a responsive carousel showcasing different product categories
 * Each category is represented by an image with an overlay label
 * Uses react-multi-carousel library for responsive behavior across different screen sizes
 */

const Categorys = () => {
  // Mock categories data - represents different product categories available in the store
  // In a real application, this would typically be fetched from an API or Redux store
  const categorys = [
    "Mobiles", // Mobile phones and accessories
    "Laptops", // Laptop computers and related items
    "Speakers", // Audio equipment and speakers
    "Top wear", // Shirts, t-shirts, and upper body clothing
    "Footwear", // Shoes, sandals, and other footwear
    "Watches", // Traditional and digital watches
    "Home Decor", // Furniture and home decoration items
    "Smart Watches", // Wearable technology and smartwatches
  ];

  // Responsive breakpoints configuration for the carousel
  // Defines how many items to show at different screen sizes
  const responsive = {
    // Extra large desktop screens (4K and above)
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6, // Show 6 category items
    },
    // Standard desktop screens
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6, // Show 6 category items
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
    // Main container with responsive width and centered alignment
    <div className="w-[87%] mx-auto relative">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-3xl text-slate-600 font-bold relative pb-[35px]">
          <h2>Top Category</h2>
          <div className="w-[100px] h-[2px] bg-[#059473] mt-4 "></div>
        </div>
      </div>
      {/* Carousel component with auto-play and infinite scroll functionality */}
      <Carousel
        autoPlay={true} // Automatically advance slides
        infinite={true} // Loop back to first slide after last slide
        arrows={true} // Show navigation arrows
        responsive={responsive} // Apply responsive breakpoints
        transitionDuration={500} // Animation duration between slides (500ms)
      >
        {/* Map through categories array to create carousel items */}
        {categorys.map((curVal, index) => (
          // Individual category item - clickable link with category image and label
          <Link
            className="h-[185px] border border-gray-200 block" // Fixed height with light border
            key={index} // Unique key for React list rendering
            to="#" // Placeholder link (should link to category page)
          >
            {/* Category card container with padding */}
            <div className="w-full h-full relative p-3">
              {/* Category image - dynamically loaded based on index */}
              <img
                src={`/images/products/${index + 1}.webp`}
                alt={`${curVal} category`} // Accessible alt text
                className="w-full h-full object-cover" // Responsive image styling
              />

              {/* Category label overlay positioned at bottom */}
              <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center">
                {/* Semi-transparent background with category name */}
                <span className="py-2 px-6 bg-[#3330305d] text-white">
                  {curVal} {/* Display category name */}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

// Export the Categorys component as default export for use in other parts of the application
export default Categorys;
