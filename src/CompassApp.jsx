import { useState } from "react";
import { Compass } from "./components";

export const CompassApp = () => {
  const [direction, setDirection] = useState(0);

  const handleRangeOnChange = (evt) => {
    const { target } = evt;
    const dir = parseInt(target.value, 10);
    setDirection(dir);
  };

  return (
    <>
      <Compass direction={direction} />
      <input type="range" min="0" max="360" value={direction} onChange={handleRangeOnChange} />
    </>
  );
};
