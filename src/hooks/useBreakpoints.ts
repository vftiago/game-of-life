import { useEffect, useState } from "react";

export enum ScreenSize {
  XxS = "xxs",
  Xs = "xs",
  Sm = "sm",
  Md = "md",
  Lg = "lg",
  Xl = "xl",
  Xxl = "xxl",
}

const breakpoints = {
  [ScreenSize.XxS]: 0,
  [ScreenSize.Xs]: 375,
  [ScreenSize.Sm]: 576,
  [ScreenSize.Md]: 768,
  [ScreenSize.Lg]: 1024,
  [ScreenSize.Xl]: 1200,
  [ScreenSize.Xxl]: 1540,
};

const getScreenSize = () => {
  const width = window.innerWidth;

  let screenSize = ScreenSize.XxS;

  for (const size of Object.values(ScreenSize)) {
    if (width < breakpoints[size]) {
      break;
    }

    screenSize = size;
  }

  return screenSize;
};

export const useBreakpoints = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize);

  const handleResize = () => {
    setScreenSize(getScreenSize);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};
