import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaRegImages } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { get_category } from "../../store/Reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  get_product,
  messageClear,
  update_product,
} from "../../store/Reducers/productReducer";
import { overrideStyle } from "../../utils/utils"; // Custom spinner style
import { PropagateLoader } from "react-spinners"; // Spinner component for indicating loading state
import toast from "react-hot-toast"; // For displaying toast messages

/**
 * EditProduct Component
 *
 * Renders a form interface for editing an existing product, including fields
 * for product name, brand, category selection (with search), stock, price,
 * discount, description, and image uploads with preview and removal functionality.
 *
 * Features:
 * - Responsive UI with form validation states.
 * - Custom category selection with search/filter capability.
 * - Multiple image uploads with preview, replace, and remove options.
 * - All form data managed via React state.
 *
 * Usage:
 * <EditProduct />
 *
 * Note:
 * - Product categories and demo images are hardcoded for demonstration.
 * - No backend integration is included in this component.
 * - Replace with real data and API handlers as required for production use.
 */

const EditProduct = () => {
  // Get product ID from URL parameters
  const { productId } = useParams();

  // Redux dispatch function to trigger actions (e.g., get_product, update_product)
  const dispatch = useDispatch();

  // Get the list of categories from Redux state
  const { categorys } = useSelector((state) => state.category);

  // Get the product details and status from Redux state
  const { product, loader, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );

  // Fetch categories from backend when component mounts
  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "", // No search filter
        parpage: "", // No per-page limit (fetch all)
        page: "", // No specific page (fetch all)
      })
    );
  }, []);

  // Fetch product details from backend when productId changes
  useEffect(() => {
    dispatch(get_product(productId));
  }, [productId]);

  // State for product input fields
  const [state, setState] = useState({
    name: "", // Product name
    description: "", // Product description
    discount: "", // Discount percentage
    price: "", // Product price
    brand: "", // Brand name
    stock: "", // Stock quantity
  });

  /**
   * Handles change for all input fields.
   * Updates the state dynamically based on input name.
   * @param {Event} e - Input change event
   */
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // State for category dropdown visibility
  const [categoryShow, setCategoryShow] = useState(false);

  // State for currently selected category name
  const [category, setCategory] = useState("");

  // State for filtered category list (for search)
  const [allCategory, setAllCategory] = useState([]);

  // State for category search input value
  const [searchValue, setSearchValue] = useState("");

  /**
   * Handles category search/filter logic.
   * Filters the category list based on the search input.
   * @param {Event} e - Input change event
   */
  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      // Filter categories by search value (case-insensitive)
      let srcValue = categorys.filter(
        (curVal) => curVal.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      // If search is empty, show all categories
      setAllCategory(categorys);
    }
  };

  // State for product images (File objects)
  const [images, setImages] = useState([]);

  // State for product image previews (URLs)
  const [imageShow, setImageShow] = useState([]);

  /**
   * Handles replacing an uploaded image at a specific index.
   * @param {string} img - Image URL
   * @param {FileList} files - File input
   */
  const changeImage = (img, files) => {
    if (files.length > 0) {
      // You can implement image replacement logic here if needed
      console.log(img);
      console.log(files[0]);
    }
  };

  /**
   * Loads default product data for editing when product data is available.
   * Sets form fields and image previews based on product data.
   */
  useEffect(() => {
    if (product) {
      setState({
        name: product.name,
        description: product.description,
        discount: product.discount,
        price: product.price,
        brand: product.brand,
        stock: product.stock,
      });
      setCategory(product.category);
      setImageShow(product.images);
    }
  }, [product]);

  /**
   * Updates the filtered category list whenever the Redux category list changes.
   */
  useEffect(() => {
    setAllCategory(categorys);
  }, [categorys]);

  /**
   * useEffect to handle product update response messages
   * - Shows a success toast if the product is updated successfully
   * - Shows an error toast if there is an error
   * - Clears messages from Redux after displaying
   */
  useEffect(() => {
    if (successMessage) {
      // Show success toast notification
      toast.success(successMessage);
      // Clear success/error messages from Redux state
      dispatch(messageClear());
    }
    if (errorMessage) {
      // Show error toast notification
      toast.error(errorMessage);
      // Clear success/error messages from Redux state
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  /**
   * Handles form submission to update product information.
   * Dispatches the update_product action with the updated product data.
   * @param {Event} e - Form submit event
   */
  const updateInfo = (e) => {
    e.preventDefault(); // Prevent default form submission
    const obj = {
      name: state.name, // Product name
      description: state.description, // Product description
      discount: state.discount, // Discount percentage
      price: state.price, // Product price
      brand: state.brand, // Brand name
      stock: state.stock, // Stock quantity
      category: category, // Selected category
      productId: productId, // Product ID for updating
    };
    dispatch(update_product(obj));
  };

  return (
    <div className=" px-2 lg:pl-7 pt-5 ">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        {/* Header with navigation */}
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">Edit Product</h1>
          <Link
            to="/seller/dashboard/all-product"
            className="bg-blue-500 hover:shadow-blue-500  hover:shadow-lg text-white rounded-sm px-7 py-2"
          >
            All Product
          </Link>
        </div>

        <div>
          <form onSubmit={updateInfo}>
            {/* Product Name & Brand */}
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="name">Product Name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Product Name"
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="brand">Brand Name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                  onChange={inputHandle}
                  value={state.brand}
                  type="text"
                  name="brand"
                  id="brand"
                  placeholder="Brand Name"
                />
              </div>
            </div>

            {/* Category & Stock */}
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-2 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => setCategoryShow(!categoryShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                  value={category}
                  type="text"
                  id="category"
                  placeholder="--Select Category--"
                />
                {/* Category dropdown */}
                <div
                  className={`absolute top-[101%] bg-[#475569] w-full transition-all ${
                    categoryShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                      type="text"
                      placeholder="Search"
                    />
                  </div>

                  <div className="pt-14"></div>

                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                    {allCategory.length > 0 &&
                      allCategory.map((curVal, index) => (
                        <span
                          key={curVal.id}
                          className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                            category === curVal.name && "bg-indigo-500"
                          }`}
                          onClick={() => {
                            setCategoryShow(false);
                            setCategory(curVal.name);
                            setSearchValue("");
                            setAllCategory(categorys);
                          }}
                        >
                          {curVal.name}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="stock">Product Stock</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                  onChange={inputHandle}
                  value={state.stock}
                  type="text"
                  name="stock"
                  id="stock"
                  placeholder="Product Stock"
                />
              </div>
            </div>

            {/* Price & Discount */}
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="price">Price</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                  onChange={inputHandle}
                  value={state.price}
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                />
              </div>

              <div className="flex flex-col w-full gap-2">
                <label htmlFor="discount">Discount %</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                  onChange={inputHandle}
                  value={state.discount}
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="Discount"
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col  md:flex-row gap-4 w-full text-[#d0d2d6] mb-5">
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="description">Description</label>
                <textarea
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                  onChange={inputHandle}
                  value={state.description}
                  name="description"
                  id="description"
                  placeholder="Description"
                  cols="10"
                  rows="4"
                ></textarea>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="grid lg:grid-cols-4 grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {/* Display uploaded images with option to replace */}
              {imageShow &&
                imageShow.length > 0 &&
                imageShow.map((img, index) => (
                  <div key={index}>
                    <label htmlFor={index}>
                      <img src={img} alt={`Product preview ${index + 1}`} />
                    </label>
                    <input
                      onChange={(e) => changeImage(img, e.target.files)}
                      type="file"
                      id={index}
                      className="hidden"
                    />
                  </div>
                ))}
            </div>
            {/* Submit Button */}
            <div className="flex">
              <button
                disabled={loader}
                className="bg-red-500 w-[280px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 flex items-center justify-center gap-2"
              >
                {loader ? (
                  // Show loading spinner during API request
                  <PropagateLoader color="white" cssOverride={overrideStyle} />
                ) : (
                  // Display lock icon and text if not loading
                  <>Save Changes</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
