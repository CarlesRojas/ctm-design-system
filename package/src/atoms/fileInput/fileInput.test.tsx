import '@testing-library/jest-dom';
import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';
import FileInput, { FileInputProps } from '.';

const renderWithProps = (props: FileInputProps): RenderResult => {
  return render(<FileInput {...props} />);
};

const mockWatch = jest.fn().mockReturnValue({
  unsubscribe: jest.fn()
});

const defaultProps: FileInputProps = {
  id: 'mockId',
  label: 'mockLabel',
  watch: mockWatch,
  setValue: jest.fn(),
  errorMessage: undefined
};

describe('GIVEN the FileInput component', () => {
  describe('WHEN there is an error', () => {
    const errorProps: FileInputProps = { ...defaultProps, errorMessage: 'mockError' };

    it('THEN it shows the error message', () => {
      renderWithProps(errorProps);

      expect(screen.getByText('mockError')).toBeInTheDocument();
    });
  });
});
