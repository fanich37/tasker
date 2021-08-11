import { CircularProgress, makeStyles } from '@material-ui/core';
import { ButtonWithLoaderProps } from './button.types';
import { Button } from './button';
import { COLORS } from 'styles/constants';

const useStyles = makeStyles({
  wrapper: {
    display: 'inline-flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    '& button span': {
      color: ({
        isLoading,
      }: {
        isLoading: ButtonWithLoaderProps['isLoading'];
      }) => (isLoading ? 'transparent' : 'inherit'),
    },
  },
  loader: {
    position: 'absolute',
    color: COLORS.White,
  },
});

export const ButtonWithLoader = ({
  children,
  size = 'large',
  disabled = false,
  fullWidth = false,
  type = 'button',
  isLoading,
  onClick,
}: ButtonWithLoaderProps) => {
  const styles = useStyles({ isLoading });

  return (
    <div className={styles.wrapper}>
      <Button
        type={type}
        size={size}
        disabled={disabled || isLoading}
        fullWidth={fullWidth}
        onClick={onClick}
      >
        {children}
      </Button>
      {isLoading && <CircularProgress size={24} className={styles.loader} />}
    </div>
  );
};
