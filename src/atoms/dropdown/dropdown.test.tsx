import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';
import Dropdown, { DropdownProps } from '.';

const renderWithProps = (props: DropdownProps): RenderResult => {
  return render(<Dropdown {...props} />);
};

const defaultProps: DropdownProps = {
  id: 'mockId',
  label: 'mockLabel',
  dropdownOptions: [{ value: 'mockOptionValue', label: 'mockOptionLabel' }]
};

describe('GIVEN the Dropdown component', () => {
  it('THEN it shows the label', () => {
    renderWithProps(defaultProps);

    expect(screen.getByText('mockLabel')).toBeInTheDocument();
  });

  it('THEN it shows the options', () => {
    renderWithProps(defaultProps);

    expect(screen.getByText('mockOptionLabel')).toBeInTheDocument();
  });

  describe('WHEN there is an errorMessage', () => {
    const errorProps = { ...defaultProps, errorMessage: 'mockError' };

    it('THEN it shows the error message and adds the error class', () => {
      renderWithProps(errorProps);

      expect(screen.getByTestId('dropdown_mockId')).toHaveClass('error');
      expect(screen.getByTestId('error_mockId')).not.toHaveClass('hidden');
      expect(screen.getByText('mockError')).toBeInTheDocument();
    });
  });

  describe('WHEN there is success', () => {
    const successProps = { ...defaultProps, success: true };

    it('THEN it adds the success class', () => {
      renderWithProps(successProps);

      expect(screen.getByTestId('dropdown_mockId')).toHaveClass('success');
    });
  });

  describe('WHEN isDisabled is true', () => {
    const disabledProps = { ...defaultProps, isDisabled: true };

    it('THEN the dropdown is disabled', () => {
      renderWithProps(disabledProps);

      expect(screen.getByTestId('dropdown_mockId')).toBeDisabled();
    });
  });
});
