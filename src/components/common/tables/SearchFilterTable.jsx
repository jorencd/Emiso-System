import React, { useState, useCallback } from "react";

function SearchFilterTable({ title, placeholder, categories, onSearchChange, onCategoryChange, children }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Use useCallback to memoize the functions
  const handleSearchChange = useCallback((value) => {
    setSearch(value);
    onSearchChange(value);
  }, [onSearchChange]);

  const handleCategoryChange = useCallback((value) => {
    setCategory(value);
    onCategoryChange(value);
  }, [onCategoryChange]);

  return (
    <div className="flex w-full min-h-screen flex-col p-2 px-10 border border-green-700">
      <h1 className='text-2xl font-bold text-neutral-700 mb-4'>
        {title}
      </h1>

      <div className='flex w-full gap-3 mb-4'>

        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className='w-full px-3 border rounded-md border-neutral-300 focus:outline-none focus:ring'
        />

        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className='px-3 py-2 bg-white border rounded-md border-neutral-300 focus:outline-none focus:ring'
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table Content Passed From Parent */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default SearchFilterTable;