import { Weather } from "../weather/weather";

export const Country = ({ country, showdatacountry,notification }) => {
  if (
    country.name.common &&
    country.capital &&
    country.area &&
    country.population &&
    country.languages &&
    country.flags.png
  ) {

    const countryCode = country.cca2.toLowerCase()
    const city = country.capital.toString()

    return (
      <div className="container-country">
        <div className="card-country">
          <h3>{country.name.common}</h3>
          <p>Capital: {country.capital}</p>
          <p>
            Area: {country.area} km <sup>2</sup>{" "}
          </p>
          <h4>Languages:</h4>
          {Object.values(country.languages).map((value) => (
            <p key={value}>- {value}</p>
          ))}
          <h4>Flag:</h4>
          <img src={country.flags.png} alt={country.flags.alt} />
        </div>
        <Weather cityName={city} countryCode={countryCode} notification={notification}/>
      </div>
    );
  }
  return (
    <div className="card-country">
      <h3>{country.name}</h3>
      <button className="btn-show" onClick={showdatacountry}>
        Show
      </button>
    </div>
  );
};
