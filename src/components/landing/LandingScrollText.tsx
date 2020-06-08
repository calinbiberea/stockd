import React, { useEffect, useState } from "react";
import { Slide, Typography } from "@material-ui/core";
import type { LandingScrollTextProps } from "./LandingTypes";

const randomIx = (arr: string[]) => Math.floor(Math.random() * arr.length);
const randomInterval = (from: number, to: number) => Math.random() * (to - from) + to;

const itemStyle = (ix: number) => ({
  transform: `translateY(-${(ix + 1) * 100 + 25}%)`,
  color: "rgba(0, 0, 0, 0.4)",
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
    <div>
      {items.map((item, ix) => (
        <div key={item} style={itemStyle(ix)}>
          <Slide in={selected === ix} direction={selected === ix ? "left" : "right"} timeout={1000}>
            <Typography variant="body1">{item}</Typography>
          </Slide>
        </div>
      ))}
    </div>
  );
};

export default LandingScrollText;
