import { render, RenderResult, screen } from "@testing-library/react";
import SuccessMessage, { SuccessMessageProps } from ".";

const renderWithProps = (props: SuccessMessageProps): RenderResult => {
  return render(<SuccessMessage {...props} />);
};

const defaultProps: SuccessMessageProps = {
  id: "mockId",
  message: "mockMessage",
};

describe("GIVEN the SuccessMessage component", () => {
  it("THEN it shows the message", () => {
    renderWithProps(defaultProps);

    expect(screen.getByText("mockMessage")).toBeInTheDocument();
  });

  describe("WHEN the darkMode prop is true", () => {
    const darkModeProps: SuccessMessageProps = { ...defaultProps, darkMode: true };

    it("THEN it adds the darkMode class", () => {
      renderWithProps(darkModeProps);

      expect(screen.getByTestId("success_mockId")).toHaveClass("darkMode");
    });
  });

  describe("WHEN the hidden prop is true", () => {
    const hiddenProps: SuccessMessageProps = { ...defaultProps, hidden: true };

    it("THEN it adds the hidden class", () => {
      renderWithProps(hiddenProps);

      expect(screen.getByTestId("success_mockId")).toHaveClass("hidden");
    });
  });

  describe("WHEN there is a classname in the props", () => {
    const classNameProps: SuccessMessageProps = { ...defaultProps, className: "mockClass" };

    it("THEN it adds the class", () => {
      renderWithProps(classNameProps);

      expect(screen.getByTestId("success_mockId")).toHaveClass("mockClass");
    });
  });
});
