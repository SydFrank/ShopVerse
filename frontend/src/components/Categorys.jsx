import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

// Banner component that displays a carousel of images
// It uses the react-multi-carousel library for responsive carousels
// The images are linked to a placeholder URL (can be modified as needed)

const Categorys = () => {
  // Mock categories (should be fetched from an API or state manager in actual project)
  const categorys = [
    "Mobiles",
    "Laptops",
    "Speakers",
    "Top wear",
    "Footwear",
    "Watches",
    "Home Decor",
    "Smart Watches",
  ];

  // Responsive settings for the carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="w-[87%] mx-auto relative">
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categorys.map((curVal, index) => (
          <Link
            className="h-[185px] border border-gray-200 block"
            key={index}
            to="#"
          >
            <div className="w-full h-full relative p-3">
              <img src={`/images/products/${index + 1}.webp`} />
              <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center">
                <span className="py-2 px-6 bg-[#3330305d] text-white">
                  {curVal}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Categorys;
