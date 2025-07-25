import React from "react";

/**
 * Search component for controlling pagination and filtering data.
 *
 * Props:
 * - setParPage (function): Updates the number of items displayed per page.
 * - setSearchValue (function): Updates the current search query value.
 * - searchValue (string): Current search query value.
 *
 * Renders a select input for page size and a text input for search term.
 * Provides controlled inputs to update parent state.
 */

const Search = ({ setParPage, setSearchValue, searchValue }) => {
  return (
    <div className="flex justify-between items-center">
      <select
        onChange={(e) => setParPage(parseInt(e.target.value))}
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        type="text"
        placeholder="Search"
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
      />
    </div>
  );
};

export default Search;
