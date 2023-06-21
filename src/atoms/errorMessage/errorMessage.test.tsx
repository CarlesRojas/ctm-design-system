import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';
import ErrorMessage, { ErrorMessageProps } from '.';

const renderWithProps = (props: ErrorMessageProps): RenderResult => {
  return render(<ErrorMessage {...props} />);
};

const defaultProps: ErrorMessageProps = {
  id: 'mockId',
  message: 'mockMessage'
};

describe('GIVEN the ErrorMessage component', () => {
  it('THEN it shows the message', () => {
    renderWithProps(defaultProps);

    expect(screen.getByText('mockMessage')).toBeInTheDocument();
  });

  describe('WHEN the darkMode prop is true', () => {
    const darkModeProps: ErrorMessageProps = { ...defaultProps, darkMode: true };

    it('THEN it adds the darkMode class', () => {
      renderWithProps(darkModeProps);

      expect(screen.getByTestId('error_mockId')).toHaveClass('darkMode');
    });
  });

  describe('WHEN the hidden prop is true', () => {
    const hiddenProps: ErrorMessageProps = { ...defaultProps, hidden: true };

    it('THEN it adds the hidden class', () => {
      renderWithProps(hiddenProps);

      expect(screen.getByTestId('error_mockId')).toHaveClass('hidden');
    });
  });

  describe('WHEN there is a classname in the props', () => {
    const classNameProps: ErrorMessageProps = { ...defaultProps, className: 'mockClass' };

    it('THEN it adds the class', () => {
      renderWithProps(classNameProps);

      expect(screen.getByTestId('error_mockId')).toHaveClass('mockClass');
    });
  });
});
