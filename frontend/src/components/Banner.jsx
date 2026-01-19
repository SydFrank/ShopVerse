import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { get_banners } from "../store/reducers/homeReducer";

// Banner component that displays a carousel of images
// It uses the react-multi-carousel library for responsive carousels
// The images are linked to a placeholder URL (can be modified as needed)

const Banner = () => {
  // Dispatch hook for Redux actions
  const dispatch = useDispatch();
  // Selector to get banners from the Redux store
  const { banners } = useSelector((state) => state.home);

  // Responsive settings for the carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Fetch banners on component mount
  useEffect(() => {
    dispatch(get_banners());
  }, []);

  return (
    <div className="w-full max-lg:mt-6 ">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="w-full flex flex-wrap max-lg:gap-8">
          <div className="w-full ">
            <div className="my-8">
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                showDots={true}
                responsive={responsive}
              >
                {/* {[1, 2, 3, 4, 5].map((image, index) => (
                  <Link key={index} to="#">
                    <img src={`/images/banner/${image}.jpg`} />
                  </Link>
                ))} */}

                {banners.length > 0 &&
                  banners.map((b, i) => (
                    <Link key={i} to={`product/details/${b.link}`}>
                      <img src={b.banner} />
                    </Link>
                  ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
