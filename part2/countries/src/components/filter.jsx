import { useState } from "react";

const Filter = ({ onCountryFilterChange }) => {
  const [countryFilter, setCountryFilter] = useState("");

  const handleCountryFilter = (event) => {
    const searchText = event.target.value;
    setCountryFilter(searchText);
    onCountryFilterChange(searchText);
  };

  return (
    <div>
      find countries{" "}
      <input value={countryFilter} onChange={handleCountryFilter} />
    </div>
  );
};

export default Filter;
