import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className="search-container">
    <input
      type="text"
      placeholder="Search by name or ID..."
      className="search-input"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
);

export default SearchBar;

