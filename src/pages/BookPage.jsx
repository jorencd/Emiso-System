import React from 'react'
import Sidebar from '../components/common/sidebar/Sidebar'
import SearchFilterTable from '../components/common/tables/SearchFilterTable'

const bookCategories = [
    "All",
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "Education",
  ];

function BookPage() {
  return (
    <div className='flex w-full h-full gap-x-2'>
      <Sidebar />
      <SearchFilterTable
        title="Book List"
        placeholder="Search books..."
        categories={bookCategories}
      >
        {/* This can be your actual table later */}
        <div className="text-gray-500">
          Book table will go here...
        </div>
      </SearchFilterTable>
    </div>
  )
}

export default BookPage