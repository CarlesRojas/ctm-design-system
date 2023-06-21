import '@testing-library/jest-dom';
import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';
import RadioButton, { RadioButtonProps } from '.';

const renderWithProps = (props: RadioButtonProps): RenderResult => {
  return render(<RadioButton {...props} />);
};

const defaultProps: RadioButtonProps = {
  value: 'mockValue',
  label: 'mockLabel'
};

describe('GIVEN the RadioButton component', () => {
  it('THEN it shows the RadioButton', () => {
    renderWithProps(defaultProps);

    expect(screen.getByTestId('radioButton_mockValue')).toBeInTheDocument();
  });

  describe('WHEN the isDisabled prop is true', () => {
    const disabledProps: RadioButtonProps = {
      ...defaultProps,
      isDisabled: true
    };

    it('THEN it disables the input', () => {
      renderWithProps(disabledProps);

      expect(screen.getByTestId('radioButton_mockValue')).toBeDisabled();
    });
  });
});
