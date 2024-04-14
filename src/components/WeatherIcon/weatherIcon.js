import React from 'react';

const WeatherIcon = ({iconCode}) => {
    const iconUrl = `${process.env.REACT_APP_GETPNG_KEY}/${iconCode}.png`;

    return <img src={iconUrl} alt="Weather Icon" />;
}

export default WeatherIcon;
