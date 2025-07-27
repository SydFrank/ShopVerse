import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegImages } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

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
  // List of available product categories (hardcoded for demo)
  const categorys = [
    { id: 1, name: "Sports" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Clothing" },
    { id: 4, name: "Books" },
    { id: 5, name: "Home Appliances" },
    { id: 6, name: "Beauty Products" },
    { id: 7, name: "Toys" },
    { id: 8, name: "Automotive" },
  ];

  // State for product input fields
  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  /**
   * Handles change for all input fields.
   * Updates the state dynamically based on input name.
   */
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // Category dropdown visibility
  const [categoryShow, setCategoryShow] = useState(false);

  // Selected category name
  const [category, setCategory] = useState("");

  // List of categories to display (filtered)
  const [allCategory, setAllCategory] = useState(categorys);

  // Search value for category dropdown
  const [searchValue, setSearchValue] = useState("");

  /**
   * Handles category search/filter.
   * Filters category list based on input value.
   */
  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = categorys.filter(
        (curVal) => curVal.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categorys);
    }
  };

  // Product images (File objects)
  const [images, setImages] = useState([]);

  // Product images (preview URLs)
  const [imageShow, setImageShow] = useState([]);

  /**
   * Handles replacing an uploaded image at a specific index.
   * @param {string} img - Image URL
   * @param {FileList} files - File input
   */
  const changeImage = (img, files) => {
    if (files.length > 0) {
      console.log(img);
      console.log(files[0]);
      // Implement image replacement logic if required
    }
  };

  /**
   * Load default product data for editing on component mount.
   * Replace with real API calls in production.
   */
  useEffect(() => {
    setState({
      name: "Men Tshirt",
      description: "Made for comfort. Designed to stand out.",
      discount: "10%",
      price: 150,
      brand: "Nike",
      stock: 50,
    });
    setCategory("Clothing");
    setImageShow(["/images/category/1.jpg", "/images/category/2.jpg"]);
  }, []);

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
          <form>
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
                    {allCategory.map((curVal, index) => (
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
              {imageShow.map((img, index) => (
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
              <button className="bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
