import { render, screen } from '@testing-library/react';
import { Button } from './button';
import { ButtonWithLoader } from './button-with-loader';

describe('[src/components/button]', () => {
  describe('[Button]', () => {
    it('should call onClick handler twice', () => {
      const onClick = jest.fn(() => null);

      render(
        <Button type="button" onClick={onClick}>
          Test
        </Button>
      );

      const span = screen.getByText(/test/i);
      const button = span.parentElement;
      button?.click();
      button?.click();

      expect(onClick).toHaveBeenCalled();
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('should not call onClick if there is disabled prop', () => {
      const onClick = jest.fn(() => null);

      render(
        <Button type="button" disabled onClick={onClick}>
          Test
        </Button>
      );

      const span = screen.getByText(/test/i);
      const button = span.parentElement;
      button?.click();

      expect(onClick).not.toHaveBeenCalled();
    });

    it('should not fail with onClick if there is no handler', () => {
      render(<Button type="button">Test</Button>);

      const span = screen.getByText(/test/i);
      const button = span.parentElement;
      button?.click();
    });
  });

  describe('[ButtonWithLoader]', () => {
    it('should render <ButtonWithLoader /> with isLoading prop set to false', () => {
      render(
        <ButtonWithLoader type="button" isLoading={false}>
          Test
        </ButtonWithLoader>
      );

      const span = screen.getByText(/test/i);
      const spinner = screen.queryByRole(/progressbar/i);
      const spanStyles = window.getComputedStyle(span);

      expect(spinner).not.toBeInTheDocument();
      expect(spanStyles.color).not.toBe('transparent');
      expect(span.parentElement).not.toHaveAttribute('disabled');
    });
  });

  it('should render <ButtonWithLoader /> with isLoading prop set to true', () => {
    render(
      <ButtonWithLoader type="button" isLoading>
        Test
      </ButtonWithLoader>
    );

    const span = screen.getByText(/test/i);
    screen.getByRole(/progressbar/i);
    const spanStyles = window.getComputedStyle(span);

    expect(spanStyles.color).toBe('transparent');
    expect(span.parentElement).toHaveAttribute('disabled');
  });
});
