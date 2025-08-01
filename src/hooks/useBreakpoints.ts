import { useEffect, useState } from "react";
import { ScreenSize } from "../constants";

const breakpoints = {
  [ScreenSize.XXS]: 0,
  [ScreenSize.XS]: 375,
  [ScreenSize.SM]: 576,
  [ScreenSize.MD]: 768,
  [ScreenSize.LG]: 1024,
  [ScreenSize.XL]: 1200,
};

const getScreenSize = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;

  const screenSize = {
    height: ScreenSize.XXS,
    width: ScreenSize.XXS,
  };

  for (const size of Object.values(ScreenSize)) {
    if (height >= breakpoints[size]) {
      screenSize.height = size;
    }
    if (width >= breakpoints[size]) {
      screenSize.width = size;
    }
  }

  return screenSize;
};

export const useBreakpoints = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize);

  const handleResize = () => {
    setScreenSize(getScreenSize);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};
