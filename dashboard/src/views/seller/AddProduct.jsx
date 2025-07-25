import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegImages } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

/**
 * AddProduct Component
 *
 * Renders a form interface for adding a new product, including fields
 * for product name, brand, category selection (with search), stock, price,
 * discount, description, and image uploads with preview and removal functionality.
 *
 * Features:
 * - Responsive UI with form validation states.
 * - Custom category selection with search/filter capability.
 * - Multiple image uploads with preview, replace, and remove options.
 * - All form data is managed through React state.
 *
 * Note:
 * - Product categories and demo images are hardcoded for demonstration.
 * - No backend integration is included in this component.
 * - Replace with real data and API handlers as required.
 */

const AddProduct = () => {
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

  // State for product fields
  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  // Handle input changes for all fields
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // Category dropdown show/hide
  const [categoryShow, setCategoryShow] = useState(false);
  // Currently selected category
  const [category, setCategory] = useState("");
  // Filtered list for category search
  const [allCategory, setAllCategory] = useState(categorys);
  // Category search value
  const [searchValue, setSearchValue] = useState("");

  // Handle category search/filter
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

  // Product images (as File objects)
  const [images, setImages] = useState([]);
  // Product images (as preview URLs)
  const [imageShow, setImageShow] = useState([]);

  // Handle multi-image upload and preview
  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];
      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  // Replace an uploaded image at a given index
  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImgaes = images;
      tempImgaes[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };

      setImageShow([...tempUrl]);
      setImages([...tempImgaes]);
    }
  };

  // Remove an uploaded image at a given index
  const removeImage = (index) => {
    const filterImage = images.filter((img, i) => i !== index);
    const filterImageUrl = imageShow.filter((img, i) => i !== index);

    setImages(filterImage);
    setImageShow(filterImageUrl);
  };

  return (
    <div className=" px-2 lg:pl-7 pt-5 ">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        {/* Header with navigation */}
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">Add Product</h1>
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
              {imageShow.map((img, index) => (
                <div className="h-[180px] relative" key={index}>
                  <label htmlFor={index}>
                    <img
                      src={img.url}
                      className="w-full h-full rounded-sm"
                      alt="Product Preview"
                    />
                  </label>

                  <input
                    onChange={(e) => changeImage(e.target.files[0], index)}
                    type="file"
                    id={index}
                    className="hidden"
                  />

                  <span
                    onClick={() => removeImage(index)}
                    className="p-2 z-10 cursor-pointer bg-slate-700 hover: shadow-lg hover: shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                  >
                    <IoMdCloseCircle />
                  </span>
                </div>
              ))}

              {/* Add Image Button */}
              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-[#d0d2d6]"
                htmlFor="image"
              >
                <span>
                  <FaRegImages />
                </span>
                <span>Select Image</span>
              </label>
              <input
                className="hidden"
                onChange={imageHandle}
                multiple
                type="file"
                id="image"
              />
            </div>
            {/* Submit Button */}
            <div className="flex">
              <button className="bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
