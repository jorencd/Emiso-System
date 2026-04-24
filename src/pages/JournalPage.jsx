import React, { useState } from "react";
import Sidebar from "../components/common/sidebar/Sidebar";
import SearchFilterTable from "../components/common/tables/SearchFilterTable";
import Card from "../components/common/cards/Card";
import { useJournals } from "../hooks/useJournals";

const journalCategories = [
  "All",
  "Biography",
  "Business and Economics",
  "Governments",
  "History",
  "Literature and Arts",
  "Science and Health",
  "Social Issues",
  "Sports",
  "World Culture and Religion",
];

function JournalPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { journals, loading, error } = useJournals();

  // ✅ PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(16);

  // ✅ FILTER
  const filteredJournals = journals.filter((journal) => {
    const matchesCategory =
      selectedCategory === "All" || journal.category === selectedCategory;

    const matchesSearch =
      journal.title?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // ✅ PAGINATION LOGIC
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentJournals = filteredJournals.slice(
    firstPostIndex,
    lastPostIndex
  );

  const totalPages = Math.ceil(filteredJournals.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex w-full h-full gap-x-2">
      <Sidebar />

      <SearchFilterTable
        title="Journal List"
        placeholder="Search journals..."
        categories={journalCategories}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1); // ✅ reset page
        }}
        onCategoryChange={(category) => {
          setSelectedCategory(category);
          setCurrentPage(1); // ✅ reset page
        }}
      >
        {/* LOADING */}
        {loading && (
          <div className="flex items-center justify-center w-full py-16 text-gray-600">
            Loading journals...
          </div>
        )}

        {/* ERROR */}
        {error && !loading && (
          <div className="flex items-center justify-center w-full py-16 text-red-600">
            Error: {error}
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && filteredJournals.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full py-16 text-center text-gray-500">
            <h2 className="text-lg font-semibold">
              {journals.length === 0
                ? "No journals available yet."
                : "No journals match your search."}
            </h2>

            <p className="mt-2 text-sm">
              {journals.length === 0
                ? "Please check back later."
                : "Try changing the search keyword or category."}
            </p>
          </div>
        )}

        {/* ✅ GRID + PAGINATION */}
        {!loading && !error && filteredJournals.length > 0 && (
          <div className="flex flex-col flex-1">
            {/* GRID */}
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentJournals.map((journal) => (
                <Card
                  key={journal.id}
                  title={journal.title}
                  pdfUrl={journal.pdfUrl}
                  bgImageUrl={journal.bgImageUrl}
                />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-auto space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

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

            {/* INFO */}
            <div className="mt-4 text-sm text-center text-gray-600">
              Showing {firstPostIndex + 1} -{" "}
              {Math.min(lastPostIndex, filteredJournals.length)} of{" "}
              {filteredJournals.length} journals
            </div>
          </div>
        )}
      </SearchFilterTable>
    </div>
  );
}

export default JournalPage;