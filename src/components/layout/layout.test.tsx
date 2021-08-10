import { render, screen } from '@testing-library/react';
import { Layout } from './layout';

describe('[src/components/layout]', () => {
  describe('[Layout]', () => {
    it('should render <Layout /> with text Test in a div container', () => {
      render(
        <Layout>
          <div>Test</div>
        </Layout>
      );

      const div = screen.getByText(/test/i);

      expect(div.tagName).toBe('DIV');
      expect(div.parentElement?.tagName).toBe('SECTION');
    });

    it('should render <Layout /> with text Test', () => {
      render(<Layout>Test</Layout>);

      const text = screen.getByText(/test/i);

      expect(text.tagName).toBe('SECTION');
    });

    it('should render <Layout /> with multiple items', () => {
      render(
        <Layout>
          <div>First div</div>
          <div>Second div</div>
          Text
        </Layout>
      );

      const div1 = screen.getByText(/first div/i);
      const div2 = screen.getByText(/second div/i);
      const text = screen.getByText(/text/i);

      expect(div1.tagName).toBe('DIV');
      expect(div1.parentElement?.tagName).toBe('SECTION');
      expect(div2.tagName).toBe('DIV');
      expect(div2.parentElement?.tagName).toBe('SECTION');
      expect(text.tagName).toBe('SECTION');
    });
  });
});
