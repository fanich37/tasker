import { Container, makeStyles } from '@material-ui/core';

interface LayoutProps {
  children: React.ReactChild | React.ReactChild[];
}

const useStyles = makeStyles({
  layout: {
    padding: '24px 0',
  },
});

export const Layout = ({ children }: LayoutProps) => {
  const styles = useStyles();

  return (
    <Container maxWidth="xl">
      <section className={styles.layout}>{children}</section>
    </Container>
  );
};
