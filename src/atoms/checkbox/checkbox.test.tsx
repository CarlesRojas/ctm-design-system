import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';
import Checkbox, { CheckboxProps } from '.';

const renderWithProps = (props: CheckboxProps): RenderResult => {
  return render(<Checkbox {...props} />);
};

const defaultProps: CheckboxProps = {
  id: 'mockId',
  children: <p>mockChildren</p>
};

describe('GIVEN the Checkbox component', () => {
  it('THEN it shows the children', () => {
    renderWithProps(defaultProps);

    expect(screen.getByText('mockChildren')).toBeInTheDocument();
  });

  describe('WHEN there is an errorMessage', () => {
    const errorProps: CheckboxProps = { ...defaultProps, errorMessage: 'mockError' };

    it('THEN it shows the error message and adds the error class', () => {
      renderWithProps(errorProps);

      expect(screen.getByTestId('checkbox_mockId')).toHaveClass('error');
      expect(screen.getByTestId('error_mockId')).not.toHaveClass('hidden');
      expect(screen.getByText('mockError')).toBeInTheDocument();
    });
  });

  describe('WHEN isDisabled is true', () => {
    const disabledProps: CheckboxProps = { ...defaultProps, isDisabled: true };

    it('THEN the checkbox is disabled', () => {
      renderWithProps(disabledProps);

      expect(screen.getByTestId('checkbox_mockId')).toBeDisabled();
    });
  });
});
