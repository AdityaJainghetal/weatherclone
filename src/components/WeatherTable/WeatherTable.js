import React from "react";
import "./weatherTable.css";
import WeatherIcon from "../WeatherIcon/weatherIcon";
import TempUnitSlider from "../TempUnitSlider/TempUnitSlider";
const WeatherTable = ({
  weatherData,
  tempUnit,
  handleUnitChange,
  cityName,
}) => {
  let feelsLike = weatherData.extraDetails.main.feels_like;
  let minTemp = weatherData.extraDetails.main.temp_min;
  let maxTemp = weatherData.extraDetails.main.temp_max;

  let convertedFeelsLike = 0;
  let convertedMinTemp = 0;
  let convertedMaxTemp = 0;
  if (tempUnit === "F") {
    convertedFeelsLike = ((feelsLike - 273.15) * (9 / 5) + 32).toFixed(2);
    convertedMinTemp = ((minTemp - 273.15) * (9 / 5) + 32).toFixed(2);
    convertedMaxTemp = ((maxTemp - 273.15) * (9 / 5) + 32).toFixed(2);
  } else {
    convertedFeelsLike = (feelsLike - 273.15).toFixed(2);
    convertedMinTemp = (minTemp - 273.15).toFixed(2);
    convertedMaxTemp = (maxTemp - 273.15).toFixed(2);
  }

  return (
    <>
      <TempUnitSlider defaultUnit={tempUnit} onUnitChange={handleUnitChange} />
      <h2>
        Temperature Unit : {"\u00b0"}
        {tempUnit}
      </h2>

      <div className="flex-container tableBackground">
        <div class="weatherSummary">
          <div className="">
            <h1>
              Location - {cityName}{" "}             
            </h1>
            <h2>{weatherData.extraDetails.weather[0].main}</h2><WeatherIcon
                iconCode={weatherData.extraDetails.weather[0].icon}
              ></WeatherIcon>
            <h1>{weatherData.date.toLocaleString()}</h1>
          </div>
     
        </div>
        <div class="weatherTilesContainer">
          <div class="weatherTiles">
            <div>
              <p>Feels like</p>
              <p>
                {convertedFeelsLike} {"\u00b0"}
                {tempUnit}
              </p>
            </div>
            <div>
              <p>Min Temp</p>
              <p>
                {convertedMinTemp} {"\u00b0"}
                {tempUnit}
              </p>
            </div>
            <div>
              <p>Max Temp</p>
              <p>
                {convertedMaxTemp} {"\u00b0"}
                {tempUnit}
              </p>
            </div>
          </div>
          <div class="weatherTiles">
            <div>
              <p>Humidity</p>
              <p>{weatherData.extraDetails.main.humidity}</p>
            </div>
            <div>
              <p>Pressure</p>
              <p>{weatherData.extraDetails.main.pressure}</p>
            </div>
            <div>
              <p>Wind</p>
              <p>{weatherData.extraDetails.wind.speed}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherTable;
