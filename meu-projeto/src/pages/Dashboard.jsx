import { Container, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome, {user?.name || 'User'}!
        </Typography>
      </Box>
    </Container>
  );
}

export default Dashboard;
