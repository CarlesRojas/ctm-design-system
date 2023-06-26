import '@testing-library/jest-dom';
import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';
import Button, { ButtonProps, ButtonType } from '.';

const renderWithProps = (props: ButtonProps): RenderResult => {
  return render(<Button {...props} />);
};

const defaultProps: ButtonProps = {
  id: 'mockId'
};

describe('GIVEN the Button component', () => {
  describe('WHEN there is a label', () => {
    const labelProps: ButtonProps = { ...defaultProps, label: 'mockLabel' };

    it('THEN it shows the label', () => {
      renderWithProps(labelProps);

      expect(screen.getByText('mockLabel')).toBeInTheDocument();
    });
  });

  describe('WHEN there the buttonType is PRIMARY', () => {
    const primaryProps: ButtonProps = { ...defaultProps, buttonType: ButtonType.PRIMARY };

    it('THEN it has the primary class', () => {
      renderWithProps(primaryProps);

      expect(screen.getByTestId('button_mockId')).toHaveClass('primary');
    });
  });

  describe('WHEN there the buttonType is SECONDARY', () => {
    const secondaryProps: ButtonProps = { ...defaultProps, buttonType: ButtonType.SECONDARY };

    it('THEN it has the secondary class', () => {
      renderWithProps(secondaryProps);

      expect(screen.getByTestId('button_mockId')).toHaveClass('secondary');
    });
  });

  describe('WHEN there the buttonType is MINIMAL', () => {
    const minimalProps: ButtonProps = { ...defaultProps, buttonType: ButtonType.MINIMAL };

    it('THEN it has the minimal class', () => {
      renderWithProps(minimalProps);

      expect(screen.getByTestId('button_mockId')).toHaveClass('minimal');
    });
  });

  describe('WHEN there the buttonType is DESTRUCTIVE', () => {
    const destructiveProps: ButtonProps = { ...defaultProps, buttonType: ButtonType.DESTRUCTIVE };

    it('THEN it has the destructive class', () => {
      renderWithProps(destructiveProps);

      expect(screen.getByTestId('button_mockId')).toHaveClass('destructive');
    });
  });

  describe('WHEN the button isLoading', () => {
    const loadingProps: ButtonProps = { ...defaultProps, isLoading: true };

    it('THEN the button is disabled and it shows the loading icon', () => {
      renderWithProps(loadingProps);

      expect(screen.getByTestId('button_mockId')).toBeDisabled();
      expect(screen.getByTestId('loading')).toBeInTheDocument();
      expect(screen.getByTestId('button_mockId')).toHaveClass('loading');
    });
  });

  describe('WHEN the button is disabled', () => {
    const disabledProps: ButtonProps = { ...defaultProps, isDisabled: true };

    it('THEN the button is disabled', () => {
      renderWithProps(disabledProps);

      expect(screen.getByTestId('button_mockId')).toBeDisabled();
      expect(screen.getByTestId('button_mockId')).toHaveClass('disabled');
    });
  });

  describe('WHEN the button has an icon', () => {
    const iconProps: ButtonProps = { ...defaultProps, icon: <p>mockicon</p> };

    it('THEN the icon shows on the left', () => {
      renderWithProps(iconProps);

      expect(screen.getByTestId('button_mockId_iconLeft')).toBeInTheDocument();
      expect(screen.getByText('mockicon')).toBeInTheDocument();
    });
  });

  describe('WHEN the button has an icon and has iconOnTheRight', () => {
    const iconRightProps: ButtonProps = { ...defaultProps, icon: <p>mockicon</p>, iconOnTheRight: true };

    it('THEN the icon shows on the right', () => {
      renderWithProps(iconRightProps);

      expect(screen.getByTestId('button_mockId_iconRight')).toBeInTheDocument();
      expect(screen.getByText('mockicon')).toBeInTheDocument();
    });
  });

  describe('WHEN the button is set to be full width', () => {
    const fullWidthProps: ButtonProps = { ...defaultProps, fullWidth: true };

    it('THEN the icon has the fullWidth class', () => {
      renderWithProps(fullWidthProps);

      expect(screen.getByTestId('button_mockId')).toHaveClass('fullWidth');
    });
  });

  describe('WHEN the button is set to be full width', () => {
    const fullWidthProps: ButtonProps = { ...defaultProps, fullWidth: true };

    it('THEN the icon has the fullWidth class', () => {
      renderWithProps(fullWidthProps);

      expect(screen.getByTestId('button_mockId')).toHaveClass('fullWidth');
    });
  });

  describe('WHEN the button is set to be dark mode', () => {
    const darkModeProps: ButtonProps = { ...defaultProps, darkMode: true };

    it('THEN the icon has the darkMode class', () => {
      renderWithProps(darkModeProps);

      expect(screen.getByTestId('button_mockId')).toHaveClass('darkMode');
    });
  });
});
