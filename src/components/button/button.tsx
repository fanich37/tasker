import ButtonMUI from '@material-ui/core/Button';
import { ButtonProps } from './button.types';

export const Button = ({
  children,
  size = 'large',
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
}: ButtonProps) => {
  return (
    <ButtonMUI
      type={type}
      color="primary"
      size={size}
      disabled={disabled}
      variant="contained"
      fullWidth={fullWidth}
      disableRipple
      onClick={onClick}
    >
      {children}
    </ButtonMUI>
  );
};
