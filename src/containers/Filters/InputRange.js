import "./input-range.css";

import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

export const InputRange = ({
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
}) => {
  const [values, setValues] = useState([priceMin, priceMax]);
  //  functions

  const handleChangePrice = () => {
    setPriceMin(values[0]);
    setPriceMax(values[1]);
  };
  return (
    <Range
      step={100}
      min={0}
      max={50000}
      values={values}
      onChange={(values) => setValues([...values])}
      onFinalChange={handleChangePrice}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          className="range-track"
          style={{
            ...props.style,
            background: getTrackBackground({
              values,
              colors: ["#ccc", "#2baeb7", "#ccc"],
              min: 0,
              max: 50000,
            }),
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ index, props }) => (
        // dots
        <div {...props} className="range-dot">
          {/* values */}
          <div className="range-value">{values[index] + "€"}</div>
          {/* label */}
          <div className="range-label">{index === 0 ? "MIN" : "MAX"}</div>
        </div>
      )}
    />
  );
};
export default InputRange;
