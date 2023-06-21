import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';
import Link, { LinkProps } from '.';

const renderWithProps = (props: LinkProps): RenderResult => {
  return render(<Link {...props} />);
};

const defaultProps: LinkProps = {
  id: 'mockId',
  children: <p>mockChildren</p>,
  href: 'mockHref'
};

describe('GIVEN the Link component', () => {
  it('THEN it shows the children', () => {
    renderWithProps(defaultProps);

    expect(screen.getByText('mockChildren')).toBeInTheDocument();
  });

  describe('WHEN the link is set to be full width', () => {
    const fullWidthProps: LinkProps = { ...defaultProps, fullWidth: true };

    it('THEN the icon has the fullWidth class', () => {
      renderWithProps(fullWidthProps);

      expect(screen.getByTestId('link_mockId')).toHaveClass('fullWidth');
    });
  });
});
