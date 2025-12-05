import React, { useState, useEffect } from "react";
import { FaRegImage } from "react-icons/fa6";
import { overrideStyle } from "../../utils/utils"; // Custom spinner
// style override
import { PropagateLoader } from "react-spinners"; // Spinner component for indicating loading state
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { add_banner, messageClear } from "../../store/Reducers/bannerReducer";
import toast from "react-hot-toast";

const AddBanner = () => {
  // Extract banner-related state from Redux
  const { successMessage, errorMessage, loader } = useSelector(
    (state) => state.banner
  );
  // Extract productId from URL parameters
  const { productId } = useParams();
  // Redux dispatch function to trigger actions
  const dispatch = useDispatch();

  // State to hold the selected image file
  const [imageShow, setImageShow] = useState("");
  // State to hold the image file data
  const [image, setImage] = useState("");

  // Handler for image file input change
  const imageHandle = (e) => {
    const files = e.target.files; // Get the selected file
    const length = files.length; // Get the number of selected files
    if (length > 0) {
      setImage(files[0]); // Update state with the first selected file
      setImageShow(URL.createObjectURL(files[0])); // Create a preview URL for the selected file
    }
  };

  // Handler for form submission to add banner
  const add = (e) => {
    e.preventDefault();
    // Create a FormData object to hold the image file
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("mainban", image);
    dispatch(add_banner(formData)); // Dispatch the add_banner action with the form data
  };

  // Show success or error messages as toasts
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">Add Banner</h1>
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <form onSubmit={add}>
          <div className="mb-4 ">
            <label
              htmlFor="image"
              className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-white"
            >
              <span className="text-4xl ">
                <FaRegImage />
              </span>
              <span>Select Banner Image</span>
            </label>
            <input
              required
              onChange={imageHandle}
              type="file"
              id="image"
              className="hidden"
            />
          </div>

          {imageShow && (
            <div className="mb-4">
              <img src={imageShow} className="w-full h-[300px]" />
            </div>
          )}

          <button
            disabled={loader}
            className="bg-red-500 w-[280px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 flex items-center justify-center gap-2"
          >
            {loader ? (
              // Show loading spinner during API request
              <PropagateLoader color="white" cssOverride={overrideStyle} />
            ) : (
              // Display lock icon and text if not loading
              <>Add Banner</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;
