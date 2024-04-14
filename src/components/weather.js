import React, { useState, useEffect } from "react";
import "./weather.css";
import TempUnitSlider from "./TempUnitSlider/TempUnitSlider";
import { Link } from "react-router-dom";
import DatedCrds from "./DatedCards/datedCrds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar/SearchBar";
import { Helmet } from "react-helmet";
import WeatherIcon from "./WeatherIcon/weatherIcon";

import {
  fetchData,
  updateFavorites,
  deleteFavorite,
  handleCityChange,
  getFavCityWeather,
  handleUnitChange,
  getFormattedForecast,
  handleAddToFavs,
  getUnitTemperature,
} from "../utility/weatherFunctions";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [tempUnit, setTempUnit] = useState("C");
  const [userFav, setUserFav] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  //Use effect to fetch API response on city change
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      if (!city) return;
      const data = await fetchData(city);
      setWeatherData(data);
    };

    fetchDataFromAPI();
  }, [city]);

  //Update user favourites
  useEffect(() => {
    const defaultLocations = ["London","Mumbai", "Dubai",];
    if (sessionStorage.getItem("UserFavs") == null) {
      sessionStorage.setItem("UserFavs", JSON.stringify(defaultLocations));
    }
    const storedFavorites = sessionStorage.getItem("UserFavs");
    if (storedFavorites) {
      setUserFav(JSON.parse(storedFavorites));
    }
  }, []);

  //Deletion of favourite from sessionStorage
  const handleDeleteFavorite = (favorite) => {
    const updatedFavorites = updateFavorites(favorite, userFav);
    setUserFav(updatedFavorites);
    setCity("");
    deleteFavorite(updatedFavorites);
  };

  //handle city change submit
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  //validate city
  const handleCityChangeSubmit = (event) => {
    handleCityChange(event, setCity, setErrorMsg);
  };

  //Get data for favourite city clicked
  const handleFavCityClick = (city) => {
    getFavCityWeather(city, setCity);
  };

  //handle Temperature unit change
  const handleTempUnitChange = (unit) => {
    handleUnitChange(unit, setTempUnit);
  };

  //Get forecast data into required format
  const forecast = getFormattedForecast(weatherData, tempUnit);

  const handleAddToFavoritesSubmit = (event) => {
    handleAddToFavs(event, weatherData, userFav, setCity, setUserFav);
  };

  return (
    <>
      <Helmet>
        <title>Weather-Home</title>
        <meta name="description" content="Weather app by Jasmeet" />
      </Helmet>

      {/* Using callback to get selected unit from child component */}
      <TempUnitSlider
        defaultUnit={tempUnit}
        onUnitChange={handleTempUnitChange}
      />
      <h2>
        Temperature Unit : {"\u00b0"}
        {tempUnit}
      </h2>
      <div className="mycontainer">
        {/* SearchBar componennt */}

        <SearchBar
          onSubmit={handleSubmit}
          city={city}
          onChange={handleCityChangeSubmit}
          errorMsg={errorMsg}
        />
        <section>
          {weatherData === null ? (
            <p>No data available</p>
          ) : weatherData.cod === "200" ? (
            <> 
              <div className="card-container-main">
                <div className="weatherMain-flex-container">
                  <div className="row1">
                    <h1>{city}</h1>
                    <WeatherIcon
                      iconCode={forecast[0].extraDetails.weather[0].icon}
                    />
                  </div>
                  <div className="row2">
                    <h3>
                      {getUnitTemperature(
                        forecast[0].extraDetails.main.temp,
                        tempUnit
                      )}
                      {"\u00b0"}
                      {tempUnit}
                    </h3>
                    <div>
                      <h3>
                        H -{" "}
                        {getUnitTemperature(
                          forecast[0].extraDetails.main.temp_max,
                          tempUnit
                        )}
                        {"\u00b0"} L -{" "}
                        {getUnitTemperature(
                          forecast[0].extraDetails.main.temp_min,
                          tempUnit
                        )}
                        {"\u00b0"}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="small-card-container">
                  {forecast.slice(1).map((item) => (
                    <DatedCrds
                      key={item.date}
                      screen="home"
                      item={item}
                      tempUnit={tempUnit}
                    />
                  ))}
                </div>
                <Link className="viewMoreLink" to={`/details/${city}`}>
                View More Details...
              </Link>
              </div>

           
              <form onSubmit={handleAddToFavoritesSubmit}>
                <button className="deleteButton" type="submit">
                  <FontAwesomeIcon icon={faStar} color="gold" /> Save{" "}
                  {weatherData.city.name}
                </button>
              </form>
            </>
          ) : (
            <p>No data available</p>
          )}
        </section>
        <aside>
          <h1>{userFav.length > 0 ? "Your Saved Locations" : ""}</h1>
          <div>
            <ul>
              {userFav.map((favorite, index) => (
                <li
                  className="favItem"
                  key={index}
                  onClick={() => handleFavCityClick(favorite)}
                >
                  <span className="favCityName">{favorite}</span>
                  <button
                    className="deleteButton"
                    onClick={() => handleDeleteFavorite(favorite)}
                  >
                    Delete <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Weather;
