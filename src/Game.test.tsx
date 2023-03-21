import { act, fireEvent, render, screen } from "@testing-library/react";
import Game from "./Game";
import {
    DEFAULT_COLUMN_COUNT,
    DEFAULT_ROW_COUNT,
} from "./game-utils/constants";
import "@testing-library/jest-dom/extend-expect";

describe("<Game />", () => {
    render(<Game />);

    jest.useFakeTimers();

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

        // the initial step number should be zero, and it should update as the user clicks next step
        for (let i = 0; i < stepTestCount; i++) {
            expect(stepNumber.textContent).toBe(i.toString());
            fireEvent.click(nextButton);
        }

        // resetting the grid should bring the step number back down to zero
        fireEvent.click(resetButton);

        expect(stepNumber.textContent).toBe("0");

        // clicking play should increase the step number every time the default time interval has passed
        fireEvent.click(playPauseButton);

        for (let i = 0; i < stepTestCount; i++) {
            expect(stepNumber.textContent).toBe(i.toString());

            act(() => {
                jest.advanceTimersToNextTimer();
            });
        }

        // clicking pause should then pause the game, keeping the step number at whatever it was before, no matter how much time has passed
        fireEvent.click(playPauseButton);

        for (let i = 0; i < stepTestCount; i++) {
            expect(stepNumber.textContent).toBe(stepTestCount.toString());

            act(() => {
                jest.advanceTimersToNextTimer();
            });
        }

        // none of the previous actions should have affected the overall cell count
        expect(columns).toHaveLength(DEFAULT_COLUMN_COUNT);
        expect(cells).toHaveLength(DEFAULT_COLUMN_COUNT * DEFAULT_ROW_COUNT);
    });
});
