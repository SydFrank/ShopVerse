import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { PropagateLoader } from "react-spinners"; // Spinner component for indicating loading state
import { overrideStyle } from "../../utils/utils"; // Custom spinner
// style override
import {
  updateCategory,
  categoryAdd,
  messageClear,
  get_category,
} from "../../store/Reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast"; // For displaying toast messages
import Search from "../components/Search"; // Search component for filtering categories

/**
 * Category Component
 *
 * This component provides the admin interface for managing product categories.
 * It features a responsive layout with a paginated table view and a sidebar/modal
 * for adding new categories. Core functionalities include:
 *
 * - Pagination and per-page selector for category table
 * - Search box for filtering categories (logic to implement)
 * - Category listing with edit and delete actions
 * - Responsive sidebar/modal form for adding a new category
 * - File upload for category images
 *
 * Dependencies:
 * - React, react-router-dom, react-icons
 * - Pagination component from the parent directory
 */

const Category = () => {
  // Redux dispatch function to trigger actions
  // This is used to dispatch the categoryAdd action when adding a new category.
  const dispatch = useDispatch();

  // Destructure authentication-related state from Redux
  const { loader, successMessage, errorMessage, categorys } = useSelector(
    (state) => state.category
  );

  // State: current page number for pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  // State: search keyword entered by the user (search logic not implemented)
  const [searchValue, setSearchValue] = React.useState("");

  // State: number of categories to display per page
  const [parPage, setParPage] = React.useState(5);

  // State: controls the visibility of the add category sidebar/modal
  const [show, setShow] = useState(false);

  // State: holds the selected image for the category
  const [imageShow, setImageShow] = useState("");
  // State: determines if the form is in edit mode
  const [isEdit, setIsEdit] = useState(false);
  // State: holds the ID of the category being edited
  const [editId, setEditId] = useState(null);

  /**
   * State holds the form data for adding a new category
   * This state can be expanded to include image upload handling
   * and form submission logic as needed.
   */
  const [state, setState] = useState({
    name: "",
    image: "",
  });

  /// Function to handle image selection from an <input type="file" />
  const imageHandle = (e) => {
    // Get the list of files selected by the user
    let files = e.target.files;
    // Check if at least one file has been selected
    if (files.length > 0) {
      // Create a temporary URL representing the selected file object
      // This URL can be used as the src for an <img> tag to preview the image in the browser without uploading it to a server
      setImageShow(URL.createObjectURL(files[0]));

      // Update the component state with the selected file object
      // files[0] refers to the first (and usually only) file selected by the user
      // Storing the file object in state allows you to use it later, for example, for uploading to a server
      setState({ ...state, image: files[0] });
    }
  };

  // Function to handle form submission for adding or updating a category
  const addOrUpdateCategory = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // console.log(state);
    if (isEdit) {
      // Update category logic to be implemented
      dispatch(
        updateCategory({
          id: editId,
          ...state,
        })
      );
    } else {
      dispatch(categoryAdd(state)); // Dispatch the categoryAdd action with the current state
    }
  };

  // useEffect to handle category add response messages
  // - Shows a success toast if a category is added successfully
  // - Shows an error toast if there is an error
  // - Clears messages from Redux after displaying
  // - Resets form state and image preview after successful addition
  useEffect(() => {
    if (successMessage) {
      // Show success toast notification
      toast.success(successMessage);
      // Clear success/error messages from Redux state
      dispatch(messageClear());
      // Reset form fields
      setState({
        name: "",
        image: "",
      });
      // Reset image preview
      setImageShow("");
      setIsEdit(false);
      setEditId(null);
    }
    if (errorMessage) {
      // Show error toast notification
      toast.error(errorMessage);
      // Clear success/error messages from Redux state
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  // useEffect to fetch categories whenever search value, items per page, or current page changes
  useEffect(() => {
    // Build the request object with pagination and search parameters
    const obj = {
      parPage: parseInt(parPage), // Number of categories per page
      page: parseInt(currentPage), // Current page number
      searchValue, // Search keyword for filtering categories
    };
    // Dispatch Redux action to fetch categories based on current filters
    dispatch(get_category(obj));
  }, [searchValue, parPage, currentPage]);

  // Function to handle editing a category (to be implemented)
  const handleEdit = (category) => {
    setState({
      name: category.name,
      image: category.image,
    });
    setImageShow(category.image);
    setEditId(category._id);
    setIsEdit(true);
    setShow(true);
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      {/* Mobile header bar with Category title and Add button */}
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5ddf] rounded-md ">
        <h1 className="text-[#d0d2d6] font-semibold text-lg">Category</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-red-500 shadow-lg hover:shadow-red-500/40 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        {/* Category table and pagination (left side on desktop) */}
        <div className="w-full lg:w-7/12">
          <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
            {/* Pagination per-page selector and search box */}
            <Search
              setParPage={setParPage}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />

            {/* Categories table */}
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-[#d0d2d6] ">
                <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      No
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Image
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Static demo data for categories */}
                  {categorys.map((curVal, index) => (
                    <tr key={index}>
                      {/* Serial number */}
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {index + 1}
                      </td>
                      {/* Category image */}
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <img className="w-[45px] h-[45px]" src={curVal.image} />
                      </td>
                      {/* Category name */}
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {curVal.name}
                      </td>
                      {/* Edit and Delete actions */}
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex justify-start items-center gap-4">
                          <Link
                            className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 "
                            onClick={() => handleEdit(curVal)}
                          >
                            <FaEdit />
                          </Link>
                          <Link className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                            <FaTrash />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination footer */}
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={50}
                parPage={parPage}
                showItem={3}
              />
            </div>
          </div>
        </div>

        {/* Sidebar/modal for adding a new category (right side on desktop, fixed on mobile) */}
        <div
          className={`w-[320px] lg:w-5/12 lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5">
            <div className="bg-[#6a5fdf] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-[#d0d2d6] font-semibold text-xl mb-4 w-full text-center">
                  {isEdit ? "Edit Category" : "Add Category"}
                </h1>
                <div onClick={() => setShow(false)} className="block lg:hidden">
                  <IoMdCloseCircle />
                </div>
              </div>
              <form onSubmit={addOrUpdateCategory}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="name">Category Name</label>
                  <input
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    value={state.name}
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                    type="text"
                    id="name"
                    name="category_name"
                    placeholder="Category Name"
                  />
                </div>
                <div>
                  <label
                    className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-black w-full border-[#d0d2d6]"
                    htmlFor="image"
                  >
                    {imageShow ? (
                      <img className="w-full h-full" src={imageShow} />
                    ) : (
                      <>
                        <span>
                          <FaImage />
                        </span>
                        <span>Select Image</span>
                      </>
                    )}
                  </label>
                  <input
                    onChange={imageHandle}
                    className="hidden"
                    type="file"
                    name="image"
                    id="image"
                  />
                  <div className="mt-4">
                    {/* Submit Button */}
                    <button
                      disabled={loader}
                      className="bg-red-800 w-full hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 flex items-center justify-center gap-2"
                    >
                      {loader ? (
                        // Show loading spinner during API request
                        <PropagateLoader
                          color="white"
                          cssOverride={overrideStyle}
                        />
                      ) : (
                        // Display lock icon and text if not loading
                        <>{isEdit ? "Update Category" : "Add Category"}</>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
