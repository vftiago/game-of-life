import { css } from "@emotion/css";

type CellProps = {
    alive: boolean;
};

const GameCell = ({ alive }: CellProps) => (
    <div className={getCellStyles(alive)} />
);

export default GameCell;

const getCellStyles = (alive: boolean) => {
    const backgroundColor = alive ? "silver" : "black";

    return css`
        background-color: ${backgroundColor};
        height: 18px;
        width: 18px;
    `;
};
