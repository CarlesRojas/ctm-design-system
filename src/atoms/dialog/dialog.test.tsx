import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';
import Dialog, { DialogProps } from '.';

const renderWithProps = (props: DialogProps): RenderResult => {
  return render(<Dialog {...props} />);
};

const mockOnClose = jest.fn();
const defaultProps: DialogProps = {
  id: 'mockId',
  onClose: mockOnClose,
  open: false,
  title: 'mockTitle',
  children: <div>mockChildren</div>
};

describe('GIVEN the Dialog component', () => {
  it('THEN it shows the title, children and close button', () => {
    renderWithProps(defaultProps);

    expect(screen.getByText('mockTitle')).toBeInTheDocument();
    expect(screen.getByText('mockChildren')).toBeInTheDocument();
    expect(screen.getByTestId('button_closeModal')).toBeInTheDocument();
  });
});
