// Import React library
import React from "react";
// Import Carousel component from react-multi-carousel for creating responsive product carousels
import Carousel from "react-multi-carousel";
// Import Link component from React Router for navigation
import { Link } from "react-router-dom";
// Import default styles for the carousel component
import "react-multi-carousel/lib/styles.css";
// Import chevron icons for navigation buttons
import { FiChevronLeft } from "react-icons/fi"; // Left arrow icon
import { FiChevronRight } from "react-icons/fi"; // Right arrow icon

/**
 * Products Component - Product Carousel Display
 * Displays a carousel of products with custom navigation buttons
 * Features a title header and custom button group for navigation
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Title to display above the product carousel
 * @returns {JSX.Element} Product carousel with navigation controls
 */
const Products = ({ title }) => {
  // Mock products data - organized in groups for carousel display
  // Each sub-array represents a column of products to be shown together
  // In a real application, this would be fetched from an API or Redux store
  const products = [
    [1, 2, 3], // First column: Product IDs 1, 2, 3
    [4, 5, 6], // Second column: Product IDs 4, 5, 6
  ];

  // Responsive breakpoints configuration for the carousel
  // All breakpoints show 1 item at a time since each item contains multiple products
  const responsive = {
    // Extra large desktop screens (4K and above)
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1, // Show 1 product group at a time
    },
    // Standard desktop screens
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1, // Show 1 product group at a time
    },
    // Tablet screens
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1, // Show 1 product group at a time
    },
    // Mobile screens
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1, // Show 1 product group at a time
    },
  };

  /**
   * ButtonGroup Component - Custom Navigation Controls
   * Creates a header section with title and navigation buttons for the carousel
   *
   * @param {Object} props - Button group props
   * @param {Function} props.next - Function to navigate to next slide
   * @param {Function} props.previous - Function to navigate to previous slide
   * @returns {JSX.Element} Header with title and navigation buttons
   */
  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex justify-between items-center">
        {/* Product section title */}
        <div className="text-xl font-bold text-slate-600">{title}</div>

        {/* Navigation buttons container */}
        <div className="flex justify-center items-center gap-3 text-slate-600">
          {/* Previous button - navigate to previous product group */}
          <button
            onClick={() => previous()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <FiChevronLeft />
          </button>

          {/* Next button - navigate to next product group */}
          <button
            onClick={() => next()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    );
  };

  // Main component render
  return (
    // Main container with flex layout - navigation on top, carousel below
    <div className="flex gap-8 flex-col-reverse">
      {/* Product carousel with custom navigation */}
      <Carousel
        autoPlay={false} // Disable auto-advance slides
        infinite={false} // Disable infinite loop
        arrows={false} // Hide default arrow buttons (using custom ones)
        responsive={responsive} // Apply responsive breakpoints
        transitionDuration={500} // Animation duration between slides (500ms)
        renderButtonGroupOutside={true} // Render custom buttons outside carousel
        customButtonGroup={<ButtonGroup />} // Use custom button group component
      >
        {/* Map through product groups to create carousel slides */}
        {products.map((p, i) => {
          return (
            // Each slide contains a column of products
            <div key={i} className="flex flex-col justify-start gap-2">
              {/* Map through individual products in the group */}
              {p.map((pl, j) => (
                // Individual product item - clickable link
                <Link key={j} className="flex justify-start items-start" to="#">
                  {/* Product image */}
                  <img
                    className="w-[110px] h-[110px]"
                    src={`/images/products/${pl}.webp`} // Dynamic image source based on product ID
                    alt={`Product ${pl}`} // Accessible alt text
                  />

                  {/* Product details container */}
                  <div className="px-3 flex justify-start items-start gap-1 flex-col text-slate-600">
                    {/* Product name - placeholder text */}
                    <h2>Product Name </h2>
                    {/* Product price - placeholder price */}
                    <span className="text-lg font-bold">$500</span>
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

// Export the Products component as default export for use in other parts of the application
export default Products;
