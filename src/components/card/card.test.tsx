import { render, screen } from '@testing-library/react';
import { Card } from './card';

describe('[src/components/card]', () => {
  describe('[Card]', () => {
    it('should render <Card /> with one item', async () => {
      render(
        <Card>
          <div>Test</div>
        </Card>
      );

      await screen.findByText(/test/i);
    });

    it('should render <Card /> with text Test', async () => {
      render(<Card>Test</Card>);

      await screen.findByText(/test/i);
    });

    it('should render <Card /> with multiple items', async () => {
      render(
        <Card>
          <div>Div 1</div>
          <div>Div 2</div>
          Text
        </Card>
      );

      await screen.findByText(/div 1/i);
      await screen.findByText(/div 2/i);
      await screen.findByText(/text/i);
    });
  });
});
