import React, { useState } from "react";
import Sidebar from "../components/common/sidebar/Sidebar";
import SearchFilterTable from "../components/common/tables/SearchFilterTable";
import BookCard from "../components/common/cards/BookCard";
import { useBooks } from "../hooks/useBooks";

const bookCategories = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "Education",
];

function BookPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { books, loading, error } = useBooks();

  // Filter books based on search and category
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex w-full h-full gap-x-2">
        <Sidebar />
        <SearchFilterTable
        title="Book List"
        placeholder="Search books..."
        categories={bookCategories}
        onSearchChange={(query) => setSearchQuery(query)}
        onCategoryChange={(category) => setSelectedCategory(category)}
      >
        <div className="flex-1 p-4 text-center text-gray-600">
          loading books...
        </div>
      </SearchFilterTable>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full h-full gap-x-2">
        <Sidebar />
        <SearchFilterTable
        title="Book List"
        placeholder="Search books..."
        categories={bookCategories}
        onSearchChange={(query) => setSearchQuery(query)}
        onCategoryChange={(category) => setSelectedCategory(category)}
      >
        <div className="flex-1 p-4">
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </SearchFilterTable>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full gap-x-2">
      <Sidebar />
      <SearchFilterTable
        title="Book List"
        placeholder="Search books..."
        categories={bookCategories}
        onSearchChange={(query) => setSearchQuery(query)}
        onCategoryChange={(category) => setSelectedCategory(category)}
      >
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              pdfUrl={book.pdfEbook}
            />
          ))}
        </div>
      </SearchFilterTable>
    </div>
  );
}

export default BookPage;