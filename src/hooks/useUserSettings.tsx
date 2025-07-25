import { useState } from "react";
import { DEFAULT_CELL_TYPE, DEFAULT_INTERVAL } from "../constants";

export const useUserSettings = () => {
  const [interval, setInterval] = useState<number>(DEFAULT_INTERVAL);
  const [cellType, setCellType] = useState<"square" | "dot">(DEFAULT_CELL_TYPE);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(true);

  return {
    isAlertVisible,
    interval,
    cellType,
    setIsAlertVisible,
    setInterval,
    setCellType,
  };
};
