import days from "./DaysEnum";

export const fetchData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      );
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  
  export const updateFavorites = (favorite, userFav) => {
    const updatedFavorites = userFav.filter((item) => item !== favorite);
    return updatedFavorites;
  };
  
  export const deleteFavorite = (favorite) => {
    sessionStorage.setItem("UserFavs", JSON.stringify(favorite));
  };
  
  export const validateCityName = (city) => {
    // Regular expression to check if the city name contains at least one letter and does not have numbers or multiple spaces
    const regex = /^[A-Za-z\s'-]+$/;
  
    // Check if the city name matches the regular expression and is not just whitespace
    if (regex.test(city) && city.trim().length > 0) {
      return true; // City name is valid
    } else {
      return false; // City name is invalid
    }
  };
  
  export const handleCityChange = (event, setCity, setErrorMsg) => {
    const city = event.target.value;
    if (city.trim() === "") {
      // Empty city name, clear the error message and set the city state
      setErrorMsg("");
      setCity(city);
    } else if (validateCityName(city)) {
      // City name is valid
      setErrorMsg("");
      setCity(city);
    } else {
      setErrorMsg("Only letters are allowed in city field.");
    }
  };
  
  export const getFavCityWeather = (city, setCity) => {
    setCity(city);
  };
  
  export const handleUnitChange = (unit, setTempUnit) => {
    setTempUnit(unit);
    sessionStorage.setItem("tempUnit", JSON.stringify(unit));
  };
  
  export const getFormattedForecast = (weatherData, tempUnit) => {
    if (!weatherData) return [];
  
    return weatherData.list
      .filter((item, index) => index % 8 === 0)
      .slice(0, 5)
      .map((item) => {
        const date = new Date(item.dt * 1000);
        const day = days[date.getDay()];
        const temperature =
          tempUnit === "F"
            // ? ((item.main.temp - 273.15) * (9 / 5) + 32).toFixed(2)
            ? getUnitTemperature(item.main.temp , 'F')
            // : (item.main.temp - 273.15).toFixed(2);
            : getUnitTemperature(item.main.temp , 'C')
        const description = item.weather[0].description;
        const extraDetails = item;
        return { date, day, temperature, description, extraDetails };
      });
  };
  
  export const getUnitTemperature = (temp,tempUnit) =>
  {
    if(tempUnit === 'F')
    {
        return ((temp- 273.15) * (9 / 5) + 32).toFixed(2)
    }
    else{
        return (temp - 273.15).toFixed(2)
    }

  }
  export const getFahrenheitTemperature = (temp) =>
  {
    return (temp - 273.15).toFixed(2)
  }
  export const handleAddToFavs = (e, weatherData, userFav, setCity, setUserFav) => {
    e.preventDefault();
    let city = weatherData.city.name;
  
    const sessionFav = sessionStorage.getItem("UserFavs");
    if (sessionFav) {
      if (sessionFav.includes(city)) {
        alert("City already in favorites");
        return;
      } else {
        setUserFav([...userFav, city]);
        sessionStorage.setItem("UserFavs", JSON.stringify([...userFav, city]));
      }
    } else {
      setUserFav([...userFav, city]);
      sessionStorage.setItem("UserFavs", JSON.stringify([...userFav, city]));
    }
  };
