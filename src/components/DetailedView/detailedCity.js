import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import days from "../../utility/DaysEnum";
import WeatherTable from "../WeatherTable/WeatherTable";
import DatedCrds from "../DatedCards/datedCrds";

const DetailedCity = () => {
  const { city } = useParams();
  const [tempUnit, setTempUnit] = useState(
    JSON.parse(sessionStorage.getItem("tempUnit"))
  );
  const [moreData, setMoreData] = useState(null);

  const handleUnitChange = (unit) => {
    setTempUnit(unit);
    sessionStorage.setItem("tempUnit", JSON.stringify(unit));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!city) return;
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          setMoreData(data);
        } else {
          setMoreData(null);
        }
      } catch (error) {
        setMoreData(null);
      }
    };
    fetchData();
  }, [city]);

  const forecast = moreData
    ? moreData.list
        .filter((item, index) => index % 8 === 0)
        .slice(0, 6)
        .map((item) => {
          const date = new Date(item.dt * 1000);
          const day = days[date.getDay()];
          const extraDetails = item;

          //OpenWeatherAPI return temperature in Kelvin by default
          const temperature =
            tempUnit === "F"
              ? ((item.main.temp - 273.15) * (9 / 5) + 32).toFixed(2) // Fahrenheit formula
              : (item.main.temp - 273.15).toFixed(2); //Celsius formula

          const description = item.weather[0].description;

          //custom format
          return { date, day, temperature, description, extraDetails };
        })
    : [];

  return (
    <section>
      {/* To set custom page metadata for each page */}
      <Helmet>
        <title>{city}-Weather</title>
        <meta name="description" content="Weather app by Jasmeet" />
      </Helmet>

      <Link className="goHomeLink" to={`/`}>
        Go Home{" "}
      </Link>

      {forecast.length > 0 && (
        <div key={forecast[0].date}>
          <WeatherTable
            cityName={city}
            weatherData={forecast[0]}
            tempUnit={tempUnit}
            handleUnitChange={handleUnitChange}
          />
        </div>
      )}

      <div className="card-container">
        {forecast.map((item, index) =>
          index !== 0 ? (
            <DatedCrds item={item} tempUnit={tempUnit}></DatedCrds>
          ) : null
        )}
      </div>
    </section>
  );
};

export default DetailedCity;
