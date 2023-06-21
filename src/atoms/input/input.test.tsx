import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';
import Input, { InputProps } from '.';

const renderWithProps = (props: InputProps): RenderResult => {
  return render(<Input {...props} />);
};

const defaultProps: InputProps = {
  id: 'mockId',
  label: 'mockLabel'
};

describe('GIVEN the Input component', () => {
  it('THEN it shows the label', () => {
    renderWithProps(defaultProps);

    expect(screen.getByText('mockLabel')).toBeInTheDocument();
  });

  describe('WHEN there is an errorMessage', () => {
    const errorProps = { ...defaultProps, errorMessage: 'mockError' };

    it('THEN it shows the error message and adds the error class', () => {
      renderWithProps(errorProps);

      expect(screen.getByTestId('input_mockId')).toHaveClass('error');
      expect(screen.getByTestId('error_mockId')).not.toHaveClass('hidden');
      expect(screen.getByText('mockError')).toBeInTheDocument();
    });
  });

  describe('WHEN there is success', () => {
    const successProps = { ...defaultProps, success: true };

    it('THEN it adds the success class', () => {
      renderWithProps(successProps);

      expect(screen.getByTestId('input_mockId')).toHaveClass('success');
    });
  });

  describe('WHEN isDisabled is true', () => {
    const disabledProps = { ...defaultProps, isDisabled: true };

    it('THEN the input is disabled', () => {
      renderWithProps(disabledProps);

      expect(screen.getByTestId('input_mockId')).toBeDisabled();
    });
  });
});
