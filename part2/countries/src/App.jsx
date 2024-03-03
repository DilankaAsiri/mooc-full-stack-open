import { useEffect, useState } from "react";

import Filter from "./components/filter";

import CountryService from "./services/country";
import CountryList from "./components/countryList";
import Country from "./components/country";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    CountryService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const handleCountryFilter = (searchText) => {
    if (searchText && searchText != "") {
      const _filteredCountries = countries.filter(
        (c) => c.name.common.toLowerCase().search(searchText.toLowerCase()) >= 0
      );
      if (_filteredCountries.length == 1) {
        // when search query matches exactly 1 country
        setFilteredCountries([]);
        setCountryDetails(_filteredCountries[0]);
      } else {
        // when search query matches multiple countries
        setCountryDetails(null);
        setFilteredCountries([..._filteredCountries]);
      }
    } else {
      // when search query is empty
      setCountryDetails(null);
      setFilteredCountries([]);
    }
  };

  const handleOnCountrySelected = (country) => {
    setCountryDetails(country);
  };

  return (
    <>
      <Filter onCountryFilterChange={handleCountryFilter} />
      <CountryList
        countries={filteredCountries}
        countrySelected={handleOnCountrySelected}
      />
      <Country country={countryDetails} />
    </>
  );
}

export default App;
