import {
    Flex,
    Grid,
    Stack,
    Stat,
    StatLabel,
    StatNumber,
    useColorMode,
} from "@chakra-ui/react";
import { memo } from "react";
import { DEFAULT_CELL_SIZE } from "../game-utils/constants";
import { GameGrid } from "../game-utils/game-utils";

type GameGridProps = {
    columnCount: number;
    stepNumber: number;
    cellType: "dot" | "square";
    grid: GameGrid;
};

const GameGridC = ({
    columnCount,
    grid,
    stepNumber,
    cellType,
}: GameGridProps) => {
    const { colorMode } = useColorMode();

    const getBackgroundColor = (alive: boolean) => {
        if (colorMode === "light") return alive ? "#1A202C" : "white";
        return alive ? "white" : "#1A202C";
    };

    return (
        <Stack>
            <Flex>
                <Stat>
                    <StatLabel>Step</StatLabel>
                    <StatNumber data-testid="step-number">
                        {stepNumber}
                    </StatNumber>
                </Stat>
            </Flex>
            <Grid gridTemplateColumns={`repeat(${columnCount}, 1fr)`} gap="1px">
                {grid.map((column: boolean[], columnIndex: number) => (
                    <Flex
                        direction="column"
                        gap="1px"
                        key={columnIndex}
                        data-testid="column"
                    >
                        {column.map((cell: boolean, rowIndex: number) => (
                            <div
                                // we're styling cells inline performance reasons:
                                // https://emotion.sh/docs/performance
                                style={{
                                    backgroundColor: getBackgroundColor(cell),
                                    borderRadius:
                                        cellType === "dot" ? "50%" : "15%",
                                    height: `${DEFAULT_CELL_SIZE}px`,
                                    width: `${DEFAULT_CELL_SIZE}px`,
                                }}
                                data-testid="cell"
                                key={
                                    columnIndex.toString() + rowIndex.toString()
                                }
                            />
                        ))}
                    </Flex>
                ))}
            </Grid>
        </Stack>
    );
};

const MemoizedGameGrid = memo((props: GameGridProps) => (
    <GameGridC {...props} />
));

export default MemoizedGameGrid;
