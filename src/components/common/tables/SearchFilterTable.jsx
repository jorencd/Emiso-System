import React, { useState } from "react";

function SearchFilterTable({ title, placeholder, categories, children }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  return (
    <div className='w-full px-10 py-7 rounded-2xl border-2 border-green-700 m-2'>
      <h1 className='text-2xl font-bold text-neutral-700 mb-4'>
        {title}
      </h1>

      <div className='flex w-full gap-3 mb-4'>
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-600'
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600'
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table Content Passed From Parent */}
      <div>
        {children}
      </div>
    </div>
  );
}

export default SearchFilterTable;
