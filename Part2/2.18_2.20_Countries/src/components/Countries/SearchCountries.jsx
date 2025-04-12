import { useState } from "react";
import { Notification } from "../Notify/Notification";
import { Country } from "./Country";
import CountriesService from "../../services/countries/CountriesService";

export const SearchCountrie = ({ countries, notification }) => {
  const [countriesFiltered, setCountriesFiltered] = useState([]);
  const [name, setName] = useState("");

  //functions
  const onChangeName = (event) => setName(event.target.value);

  const getDataOneCountry = (name) => {
    CountriesService.getOneCountry(name)
      .then((data) => {
        setCountriesFiltered([data]);
      })
      .catch((error) => {
        notification(
          `An error occurred while getting data: ${error.message}`,
          "error"
        );
      });
  };

  const onSubmitSearch = (event) => {
    event.preventDefault();
    setCountriesFiltered([]);

    if (!name.trim()) {
      notification("Please enter a text...", "info");
      setName("");
      return;
    }

    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(name.toLowerCase().trim())
    );

    if (filteredCountries.length === 0) {
      notification(`Country "${name}" not found`, "info");
      setName("");
      return;
    } else if (filteredCountries.length === 1) {
      notification(
        `Country ${filteredCountries[0].name} found successfully!`,
        "success"
      );
      const name = filteredCountries[0].name;
      getDataOneCountry(name);
    } else if (filteredCountries.length <= 10) {
      notification(`${filteredCountries.length} countries found!!`, "success");
      setCountriesFiltered(filteredCountries);
    } else {
      notification("Too many matches, please be more specific", "info");
    }

    setName("");
  };

  const showdatacountry = (name) => {
    notification(`Country ${name} found successfully!`, "success");
    getDataOneCountry(name);
  };

  return (
    <>
      <h2 className="search-title">Search</h2>
      <form onSubmit={onSubmitSearch}>
        <label className="search-label">Find Countries: </label>
        <input type="text" value={name} onChange={onChangeName} />
        <button>Search</button>
      </form>

      {countriesFiltered.map((country) => (
        <Country
          key={country.name.common || country.name}
          country={country}
          showdatacountry={() => showdatacountry(country.name)}
          notification={notification}
        />
      ))}
    </>
  );
};
