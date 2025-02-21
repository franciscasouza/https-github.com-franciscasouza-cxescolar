import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Box, 
  Typography, 
  Container, 
  Paper,
  CircularProgress,
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Validators } from '../../core/utils/validation';
import { ROUTES } from '../../core/constants/routes';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { forgotPassword, isLoading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailValidation = Validators.email(email);
    if (emailValidation !== true) {
      setError(emailValidation);
      return;
    }

    try {
      await forgotPassword(email);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 3, 
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Recuperar Senha
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
          Digite seu e-mail para receber instruções de recuperação de senha
        </Typography>

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Recuperar Senha'}
          </Button>

          <Grid container justifyContent="space-between">
            <Grid item>
              <Link 
                to={ROUTES.LOGIN} 
                style={{ textDecoration: 'none' }}
              >
                <Typography variant="body2">
                  Voltar para Login
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link 
                to={ROUTES.REGISTER} 
                style={{ textDecoration: 'none' }}
              >
                <Typography variant="body2">
                  Criar conta
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default ForgotPassword;
