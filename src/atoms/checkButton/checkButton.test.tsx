import { render, RenderResult, screen } from "@testing-library/react";
import CheckButton, { CheckButtonProps } from ".";

const renderWithProps = (props: CheckButtonProps): RenderResult => {
  return render(<CheckButton {...props} />);
};

const defaultProps: CheckButtonProps = {
  value: "mockValue",
  label: "mockLabel",
};

describe("GIVEN the CheckButton component", () => {
  it("THEN it shows the CheckButton", () => {
    renderWithProps(defaultProps);

    expect(screen.getByTestId("checkButton_mockValue")).toBeInTheDocument();
  });

  describe("WHEN the isDisabled prop is true", () => {
    const disabledProps: CheckButtonProps = {
      ...defaultProps,
      isDisabled: true,
    };

    it("THEN it disables the input", () => {
      renderWithProps(disabledProps);

      expect(screen.getByTestId("checkButton_mockValue")).toBeDisabled();
    });
  });
});
