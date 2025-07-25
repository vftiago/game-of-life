import { COLUMN_COUNT, ROW_COUNT } from "./constants";
import { act, fireEvent, render, screen } from "./test-utils";
import Game from "./Game";
import { useBreakpoints } from "./hooks/useBreakpoints";
import { useInterval } from "./hooks/useInterval";

jest.mock("./hooks/useInterval");
jest.mock("./hooks/useBreakpoints");

const DEFAULT_STEPS_TO_TEST = 3;

describe("<Game />", () => {
  let intervalCallback: (() => void) | null = null;

  beforeAll(() => {
    (useBreakpoints as jest.Mock).mockReturnValue({
      height: "xs",
      width: "xs",
    });

    (useInterval as jest.Mock).mockImplementation((callback) => {
      intervalCallback = callback;
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();

    render(<Game />);
  });

  afterEach(() => {
    intervalCallback = null;
  });

  it("should render initial UI elements with correct dimensions", () => {
    const title = screen.getByText("Game of Life");
    const grid = screen.getByTestId("game-grid");

    expect(title).toBeInTheDocument();
    expect(grid.children).toHaveLength(COLUMN_COUNT.xs * ROW_COUNT.xs);
  });

  it("should increment the step number when clicking Next, and reset the step number when clicking Reset", () => {
    const nextButton = screen.getByRole("button", { name: "Next" });
    const resetButton = screen.getByRole("button", { name: "Reset" });
    const stepNumber = screen.getByTestId("step-number");

    for (let i = 0; i < DEFAULT_STEPS_TO_TEST; i++) {
      fireEvent.click(nextButton);
    }

    expect(stepNumber.textContent).toBe(`Step: ${DEFAULT_STEPS_TO_TEST}`);

    fireEvent.click(resetButton);

    expect(stepNumber.textContent).toBe("Step: 0");
  });

  it("should increment step number when the game is running, but not when the game is paused", async () => {
    const playPauseButton = screen.getByRole("button", { name: "Play" });
    const stepNumber = screen.getByTestId("step-number");

    expect(stepNumber.textContent).toBe("Step: 0");

    fireEvent.click(playPauseButton);

    for (let i = 0; i < DEFAULT_STEPS_TO_TEST; i++) {
      act(() => {
        intervalCallback?.();
      });

      expect(stepNumber.textContent).toBe(`Step: ${i + 1}`);
    }

    fireEvent.click(playPauseButton);

    expect(stepNumber.textContent).toBe(`Step: ${DEFAULT_STEPS_TO_TEST}`);

    for (let i = 0; i < DEFAULT_STEPS_TO_TEST; i++) {
      act(() => {
        intervalCallback?.();
      });

      expect(stepNumber.textContent).toBe(`Step: ${DEFAULT_STEPS_TO_TEST}`);
    }
  });
});
