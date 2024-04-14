import React, { useState } from "react";

const TempUnitSlider = ({defaultUnit, onUnitChange}) => {  

  const handleSliderChange = (event) => {
    const unit = event.target.value;
    onUnitChange(unit);
  };

  return (
    <div>
      <label className='tempunit-label'>
        <span>Celsius</span>
        <input
          type="radio"
          value="C"
          checked={defaultUnit === "C"}
          onChange={handleSliderChange}
        />
      </label>
      <label className='tempunit-label'>
      <span> Fahrenheit</span>
        <input
          type="radio"
          value="F"
          checked={defaultUnit === "F"}
          onChange={handleSliderChange}
        />
      </label>
    </div>
  );
};

export default TempUnitSlider;
