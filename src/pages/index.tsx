import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from 'components/Sample/Link';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link href="/gre" color="secondary">
          Gre Page
        </Link>
        <Link href="/gre/history" color="secondary">
          Gre History Page
        </Link>
      </Box>
    </Container>
  );
}
