import { useState, useEffect } from "react";

const Filter = ({ onNameFilterChange, resetFilters }) => {
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    setNameFilter("");
  }, [resetFilters]);

  const handleNameFilter = (event) => {
    const searchText = event.target.value;
    setNameFilter(searchText);
    onNameFilterChange(searchText);
  };

  return (
    <div>
      filter shown with:{" "}
      <input value={nameFilter} onChange={handleNameFilter} />
    </div>
  );
};

export default Filter;
