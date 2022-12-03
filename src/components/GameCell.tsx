type GameCellProps = {
    alive: boolean;
};

const GameCell = ({ alive }: GameCellProps) => (
    <li
        style={{
            backgroundColor: alive ? "black" : "white",
        }}
        data-testid="cell"
    />
);

export default GameCell;
