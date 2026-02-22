import React, { useState } from "react";
import Sidebar from "../components/common/sidebar/Sidebar";
import SearchFilterTable from "../components/common/tables/SearchFilterTable";
import journals from "../data/journalData";
import JournalCard from "../components/common/cards/JournalCard";

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

  // Filter books based on search and category
  const filteredJournals = journals.filter((journal) => {
    const matchesCategory =
      selectedCategory === "All" || journal.category === selectedCategory;
    const matchesSearch =
      journal.title.toLowerCase().includes(searchQuery.toLowerCase());
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
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredJournals.map((journal) => (
            <JournalCard
              key={journal.id}
              title={journal.title}
            />
          ))}
        </div>
      </SearchFilterTable>
    </div>
  );
}

export default JournalPage;
