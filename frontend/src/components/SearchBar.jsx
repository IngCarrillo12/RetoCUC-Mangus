import React from "react";
import "../style/searchBar.css";

export const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar curso..."
        onChange={handleSearch}
      />
    </div>
  );
};
