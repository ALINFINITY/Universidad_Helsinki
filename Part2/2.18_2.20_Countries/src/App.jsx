import { useState } from "react";
import CountriesService from "./services/countries/CountriesService";
import { useEffect } from "react";
import { SearchCountrie } from "./components/Countries/SearchCountries";
import { Notification } from "./components/Notify/Notification";

export const App = () => {
  //States
  const [countries, setCountries] = useState([]);
  const [messageNotify, setMessageNotify] = useState("");
  const [className, setclassName] = useState("");

  //Notification function
  const notification = (message, type = "info",time=5000) => {
    setMessageNotify(null);
    setMessageNotify(message);
    setTimeout(() => {
      setMessageNotify(null);
    }, time);

    setclassName(`notify-${type}`);
  };

  //Getting all data with the API
  const getAll = () => {
    let aux = [];

    CountriesService.getAll()
      .then((data) => {
        data.map((countrie) => {
          aux.push({ name: countrie.name.common.toString() });
        });
      })
      .then(() => {
        aux = [...new Set(aux)];
        setCountries(aux);
      })
      .catch((error) => {
        notification(
          `An error occurred while getting data: ${error.message}`,
          "error",10000
        );
      });
  };

  useEffect(getAll, []);

  return (
    <>
      <h1 className="title">Weather around the world!</h1>
      <Notification className={className} message={messageNotify} />
      <SearchCountrie countries={countries} notification={notification} />
    </>
  );
};
