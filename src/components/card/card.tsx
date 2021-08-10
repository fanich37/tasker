import { Card as CardMUI, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    padding: 24,
  },
});

interface CardProps {
  children: React.ReactChild | React.ReactChild[];
}

export const Card = ({ children }: CardProps) => {
  const styles = useStyles();

  return (
    <CardMUI className={styles.card} variant="outlined">
      {children}
    </CardMUI>
  );
};
