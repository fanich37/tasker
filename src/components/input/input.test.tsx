import { render, screen } from '@testing-library/react';
import { Input, InputProps } from './input';
import { useForm } from 'react-hook-form';

const Wrapper = ({
  id,
  name,
  label,
  error,
  required,
  defaultValue,
}: Pick<
  InputProps,
  'id' | 'name' | 'label' | 'error' | 'required' | 'defaultValue'
>) => {
  const { control } = useForm();

  return (
    <Input
      dataTestId="test"
      id={id}
      name={name}
      label={label}
      control={control}
      error={error}
      required={required}
      defaultValue={defaultValue}
    />
  );
};

describe('[src/components/input]', () => {
  describe('[Input]', () => {
    it('should render <Input /> with required props', async () => {
      render(<Wrapper id="test" name="test" label="Test input" />);

      const component = await screen.findByTestId('test');
      const input = await screen.findByLabelText(/test input/i);

      expect(component.tagName).toBe('FIELDSET');
      expect(input).toHaveAttribute('placeholder', 'Test input');
      expect(input).toHaveAttribute('id', 'test');
      expect(input).toHaveAttribute('value', '');
    });

    it('should render <Input /> with defaultValue prop', async () => {
      render(
        <Wrapper id="test" name="test" label="Test input" defaultValue="test" />
      );

      const input = await screen.findByLabelText(/test input/i);

      expect(input).toHaveAttribute('value', 'test');
    });

    it('should render <Input /> with required prop', async () => {
      render(<Wrapper id="test" name="test" label="Test input" required />);

      const component = await screen.findByTestId('test');
      const input = component.querySelector('input');
      await screen.findByText('*');

      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('placeholder', 'Test input (required)');
    });

    it('should render <Input /> with error prop', async () => {
      render(
        <Wrapper id="test" name="test" label="Test input" error="Error" />
      );

      const component = await screen.findByTestId('test');
      const label = component.querySelector('label');
      const input = component.querySelector('input');
      const p = component.querySelector('p');

      expect(label).toHaveClass('Mui-error');
      expect(input?.parentElement).toHaveClass('Mui-error');
      expect(p).toHaveClass('Mui-error');
    });
  });
});
