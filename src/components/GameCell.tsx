type GameCellProps = {
    backgroundColor: string;
};

const GameCell = ({ backgroundColor }: GameCellProps) => {
    return (
        <li
            style={{
                backgroundColor,
            }}
            data-testid="cell"
        />
    );
};

export default GameCell;
