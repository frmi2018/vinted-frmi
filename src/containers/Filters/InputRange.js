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
          style={{
            ...props.style,
            height: "2px",
            width: "15%",
            marginRight: "2em",
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
        <div
          {...props}
          style={{
            ...props.style,
            height: "1em",
            width: "1em",
            backgroundColor: "#2baeb7",
            borderRadius: "50%",
            outline: "none",
          }}
        >
          {/* values */}
          <div
            style={{
              position: "absolute",
              bottom: "-16px",
              color: "#2baeb7",
              fontWeight: "bold",
              fontSize: "0.7em",
            }}
          >
            {values[index] + "€"}
          </div>
          {/* label */}
          <div
            style={{
              position: "absolute",
              top: "-12px",
              color: "#2baeb7",
              fontWeight: "bold",
              fontSize: "0.5em",
            }}
          >
            {index === 0 ? "MIN" : "MAX"}
          </div>
        </div>
      )}
    />
  );
};
export default InputRange;
