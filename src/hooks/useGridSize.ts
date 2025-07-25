import { useEffect, useState } from "react";
import { COLUMN_COUNT, ROW_COUNT } from "../constants";
import { useBreakpoints } from "./useBreakpoints";

export const useGridDimensions = () => {
  const { height, width } = useBreakpoints();

  const [gridDimensions, setGridDimensions] = useState<{
    columnCount: number;
    rowCount: number;
  }>({
    columnCount: COLUMN_COUNT[width],
    rowCount: ROW_COUNT[height],
  });

  useEffect(() => {
    setGridDimensions({
      columnCount: COLUMN_COUNT[width],
      rowCount: ROW_COUNT[height],
    });
  }, [width, height]);

  return gridDimensions;
};
