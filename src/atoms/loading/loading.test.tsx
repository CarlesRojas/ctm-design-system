import { render, RenderResult, screen } from "@testing-library/react";
import Loading, { LoadingProps } from ".";

const renderWithProps = (props: LoadingProps): RenderResult => {
  return render(<Loading {...props} />);
};

const defaultProps: LoadingProps = {};

describe("GIVEN the Loading component", () => {
  it("THEN it shows the loading icon", () => {
    renderWithProps(defaultProps);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
