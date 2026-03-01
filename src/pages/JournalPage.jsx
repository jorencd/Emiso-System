import React, { useState } from "react";
import Sidebar from "../components/common/sidebar/Sidebar";
import SearchFilterTable from "../components/common/tables/SearchFilterTable";
import JournalCard from "../components/common/cards/JournalCard";
import { useJournals } from "../hooks/useJournals";

const journalCategories = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "Education",
];

function JournalPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { journals, loading, error } = useJournals();

  // Filter journals
  const filteredJournals = journals.filter((journal) => {
    const matchesCategory =
      selectedCategory === "All" || journal.category === selectedCategory;

    const matchesSearch =
      journal.title?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex w-full h-full gap-x-2">
      <Sidebar />

      <SearchFilterTable
        title="Journal List"
        placeholder="Search journals..."
        categories={journalCategories}
        onSearchChange={(query) => setSearchQuery(query)}
        onCategoryChange={(category) => setSelectedCategory(category)}
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

        {/* EMPTY STATE */}
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

        {/* JOURNAL GRID */}
        {!loading && !error && filteredJournals.length > 0 && (
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredJournals.map((journal) => (
              <JournalCard
                key={journal.id}
                title={journal.title}
                pdfUrl={journal.pdfUrl}
                bgImageUrl={journal.bgImageUrl}
              />
            ))}
          </div>
        )}
      </SearchFilterTable>
    </div>
  );
}

export default JournalPage;