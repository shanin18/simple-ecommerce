import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search for products..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="border p-2 rounded-lg w-full outline-none text-gray-700 mb-4"
    />
  );
};

export default SearchBar;
