import React, { useEffect, useState } from "react";
import type { LandingScrollTextProps } from "./LandingTypes";
import { Slide } from "@material-ui/core";

const randomIx = (arr: unknown[]) => Math.floor(Math.random() * arr.length);
const randomInterval = (from: number, to: number) => Math.random() * (to - from) + to;

const containerStyle = {
  width: "100%",
  height: "100%",
};

const itemStyle = (ix: number) => ({
  position: "relative" as const,
  transform: `translateY(-${(ix + 1) * 100 + 25}%)`,
  overflowX: "hidden" as const,
});

const LandingScrollText: React.FC<LandingScrollTextProps> = ({ items }: LandingScrollTextProps) => {
  const [selected, setSelected] = useState(randomIx(items));

  useEffect(() => {
    const selectRandom = () => {
      let newSelected;
      do {
        newSelected = randomIx(items);
      } while (newSelected === selected);
      setSelected(newSelected);
    };

    setTimeout(selectRandom, randomInterval(1500, 2500));
  }, [selected, items]);

  return (
    <div style={containerStyle}>
      {items.map((item, ix) => (
        <div key={item} style={itemStyle(ix)}>
          <Slide in={selected === ix} direction={selected === ix ? "left" : "right"} timeout={1000}>
            <div>{item}</div>
          </Slide>
        </div>
      ))}
      {/*{selected}*/}
    </div>
  );
};

export default LandingScrollText;
