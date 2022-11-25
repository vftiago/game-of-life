import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Game from "./Game";
import {
    DEFAULT_COLUMN_COUNT,
    DEFAULT_INTERVAL,
    DEFAULT_ROW_COUNT,
} from "./game-utils/constants";

describe("<Game />", () => {
    render(<Game />);

    it("should render all ui elements, working as expected", () => {
        const title = screen.getByText("Game of Life");
        const playPauseButton = screen.getByRole("button", { name: "Play" });
        const nextButton = screen.getByRole("button", { name: "Next" });
        const resetButton = screen.getByRole("button", { name: "Reset" });
        const stepNumber = screen.getByTestId("step-number");
        const columns = screen.queryAllByTestId("column");
        const cells = screen.queryAllByTestId("cell");
        const stepTestCount = 5;

        // expect basic ui elements to be in the document and the grid to have the default dimensions
        expect(title).toBeInTheDocument();
        expect(columns).toHaveLength(DEFAULT_COLUMN_COUNT);
        expect(cells).toHaveLength(DEFAULT_COLUMN_COUNT * DEFAULT_ROW_COUNT);

        // initial step number should be zero
        expect(stepNumber.textContent).toBe("0");

        for (let i = 1; i < stepTestCount; i++) {
            act(() => {
                nextButton.click();
            });

            // step number should update as the user clicks next step
            expect(stepNumber.textContent).toBe(i.toString());
        }

        act(() => {
            resetButton.click();
        });

        // resetting the grid should bring the step number back down to zero
        expect(stepNumber.textContent).toBe("0");

        act(() => {
            playPauseButton.click();
        });

        setTimeout(() => {
            // clicking play should increase the step number every time the default time interval has passed
            expect(stepNumber.textContent).toBe("1");
        }, DEFAULT_INTERVAL + 1);

        act(() => {
            playPauseButton.click();
        });

        setTimeout(() => {
            // clicking pause should then pause the game, keeping the step number at whatever it was before no matter how much time has passed
            expect(stepNumber.textContent).toBe("1");
        }, DEFAULT_INTERVAL + 1);

        // none of the previous actions should have affected the coverall cell count
        expect(columns).toHaveLength(DEFAULT_COLUMN_COUNT);
        expect(cells).toHaveLength(DEFAULT_COLUMN_COUNT * DEFAULT_ROW_COUNT);
    });
});
