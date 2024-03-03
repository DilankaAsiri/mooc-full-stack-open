const CountryList = ({ countries, countrySelected }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  const handleOnShow = (country) => {
    countrySelected(country);
  };

  return (
    <div style={{ marginTop: "1em" }}>
      {countries.map((country) => (
        <div key={country.name.common}>
          <div style={{ display: "inline-block" }}>{country.name.common}</div>
          <button
            style={{
              display: "inline-block",
              marginLeft: "1em",
            }}
            onClick={() => handleOnShow(country)}
          >
            show
          </button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
