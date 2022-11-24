import { css } from "@emotion/css";

type CellProps = {
    alive: boolean;
};

export const Cell = ({ alive }: CellProps) => (
    <div className={getCellStyles(alive)} />
);

const getCellStyles = (alive: boolean) => {
    const backgroundColor = alive ? "silver" : "black";

    return css`
        background-color: ${backgroundColor};
        height: 18px;
        width: 18px;
    `;
};
