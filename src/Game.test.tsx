import { MAX_COLUMN_COUNT, MAX_ROW_COUNT } from "./constants";
import { act, fireEvent, render, screen } from "./test-utils";
import Game from "./Game";
import { useBreakpoints } from "./hooks/useBreakpoints";
import { useInterval } from "./hooks/useInterval";

jest.mock("./hooks/useInterval");
jest.mock("./hooks/useBreakpoints");

const COLUMN_COUNT = MAX_COLUMN_COUNT.xs;
const ROW_COUNT = MAX_ROW_COUNT.xs;

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
    const columns = screen.queryAllByTestId("column");
    const cells = screen.queryAllByTestId("cell");

    expect(title).toBeInTheDocument();
    expect(columns).toHaveLength(COLUMN_COUNT);
    expect(cells).toHaveLength(COLUMN_COUNT * ROW_COUNT);
  });

  it("should increment step number when clicking Next", () => {
    const nextButton = screen.getByRole("button", { name: "Next" });
    const stepNumber = screen.getByTestId("step-number");

    expect(stepNumber.textContent).toBe("0");

    for (let i = 0; i < DEFAULT_STEPS_TO_TEST; i++) {
      fireEvent.click(nextButton);
      expect(stepNumber.textContent).toBe((i + 1).toString());
    }
  });

  it("should reset step number to zero when clicking Reset button", () => {
    const nextButton = screen.getByRole("button", { name: "Next" });
    const resetButton = screen.getByRole("button", { name: "Reset" });
    const stepNumber = screen.getByTestId("step-number");

    for (let i = 0; i < DEFAULT_STEPS_TO_TEST; i++) {
      fireEvent.click(nextButton);
    }

    fireEvent.click(resetButton);
    expect(stepNumber.textContent).toBe("0");
  });

  it("should automatically increment step number when playing the game", async () => {
    const playPauseButton = screen.getByRole("button", { name: "Play" });
    const stepNumber = screen.getByTestId("step-number");

    expect(stepNumber.textContent).toBe("0");

    fireEvent.click(playPauseButton);

    for (let i = 0; i < DEFAULT_STEPS_TO_TEST; i++) {
      expect(stepNumber.textContent).toBe(i.toString());

      act(() => {
        if (intervalCallback) intervalCallback();
      });

      expect(stepNumber.textContent).toBe((i + 1).toString());
    }
  });

  it("should pause the game when clicking Pause button", async () => {
    const playPauseButton = screen.getByRole("button", { name: "Play" });
    const stepNumber = screen.getByTestId("step-number");

    fireEvent.click(playPauseButton);

    for (let i = 0; i < DEFAULT_STEPS_TO_TEST; i++) {
      act(() => {
        if (intervalCallback) intervalCallback();
      });
    }

    fireEvent.click(playPauseButton);

    const pausedValue = stepNumber.textContent;

    act(() => {
      if (intervalCallback) intervalCallback();
    });

    expect(stepNumber.textContent).toBe(pausedValue);
  });

  it("should maintain correct grid dimensions throughout gameplay", () => {
    const nextButton = screen.getByRole("button", { name: "Next" });
    const resetButton = screen.getByRole("button", { name: "Reset" });

    for (let i = 0; i < DEFAULT_STEPS_TO_TEST; i++) {
      fireEvent.click(nextButton);
    }

    fireEvent.click(resetButton);

    const columns = screen.queryAllByTestId("column");
    const cells = screen.queryAllByTestId("cell");
    expect(columns).toHaveLength(COLUMN_COUNT);
    expect(cells).toHaveLength(COLUMN_COUNT * ROW_COUNT);
  });
});
