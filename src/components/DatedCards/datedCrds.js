import React from "react";
import WeatherIcon from "../WeatherIcon/weatherIcon";

const DatedCrds = ({ item, tempUnit, screen }) => {
  if (screen === "home") {
    return (

        <div className="card-main-small" key={item.date}>
          {/* <p>{item.date.toLocaleDateString()}</p> */}
          <h3>
            {item.day.toString().substring(0,3)}
          </h3>
          <WeatherIcon iconCode={item.extraDetails.weather[0].icon} />
          {/* <p>{item.description.toUpperCase()}</p> */}
        </div>
  
    );
  } else {
    return (
      <div className="card" key={item.date}>
        <p>{item.date.toLocaleDateString()}</p>
        <h3>
          {item.day}
        </h3>
        <p>
          Temperature: {item.temperature} {"\u00b0"}
          {tempUnit}
        </p>
        <WeatherIcon iconCode={item.extraDetails.weather[0].icon} />
        <p>{item.description.toUpperCase()}</p>
      </div>
    );
  }
};
export default DatedCrds;
