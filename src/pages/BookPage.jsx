import React, { useState } from "react";
import Sidebar from "../components/common/sidebar/Sidebar";
import SearchFilterTable from "../components/common/tables/SearchFilterTable";
import BookCard from "../components/common/cards/Card";
import { useBooks } from "../hooks/useBooks";

const bookCategories = [
  "All",
  "Arts",
  "Business",
  "Education",
  "Medicine",
  "Science",
  "Technology",
  "Social Science",
];

function BookPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { books, loading, error } = useBooks();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;

    const matchesSearch =
      book.title?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentBooks = filteredBooks.slice(firstPostIndex, lastPostIndex);

  const totalPages = Math.ceil(filteredBooks.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex w-full h-full gap-x-2 ">
      <Sidebar />

      <SearchFilterTable
        title="Book List"
        placeholder="Search books..."
        categories={bookCategories}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
        onCategoryChange={(category) => {
          setSelectedCategory(category);
          setCurrentPage(1);
        }}
      >
        {/* LOADING */}
        {loading && (
          <div className="flex items-center justify-center w-full py-16 text-gray-600">
            Loading books...
          </div>
        )}

        {/* ERROR */}
        {error && !loading && (
          <div className="flex items-center justify-center w-full py-16 text-red-600">
            Error: {error}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && filteredBooks.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full py-16 text-center text-gray-500">
            <h2 className="text-lg font-semibold">
              {books.length === 0
                ? "No books available yet."
                : "No books match your search."}
            </h2>

            <p className="mt-2 text-sm">
              {books.length === 0
                ? "Please check back later."
                : "Try changing the search keyword or category."}
            </p>
          </div>
        )}

        {/* BOOK GRID - Use currentBooks instead of filteredBooks */}
        {!loading && !error && filteredBooks.length > 0 && (
          <div className="flex flex-col flex-1 min-h-[600px]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentBooks.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  pdfUrl={book.pdfUrl}
                  bgImageUrl={book.bgImageUrl}
                />
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-auto space-x-2 pt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      currentPage === index + 1
                        ? "bg-green-400 text-white"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
            
            {/* Optional: Show current page info */}
            <div className="mt-4 text-sm text-center text-gray-600">
              Showing {firstPostIndex + 1} - {Math.min(lastPostIndex, filteredBooks.length)} of {filteredBooks.length} books
            </div>
          </div>
        )}
      </SearchFilterTable>
    </div>
  );
}

export default BookPage;