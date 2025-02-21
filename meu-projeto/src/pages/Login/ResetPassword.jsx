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
import { Link, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Validators } from '../../core/utils/validation';
import { ROUTES } from '../../core/constants/routes';

function ResetPassword() {
  const [formData, setFormData] = useState({
    token: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const { resetPassword, isLoading } = useAuthentication();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const passwordError = Validators.combine(
      Validators.required,
      Validators.minLength(6)
    )(formData.newPassword);
    
    if (passwordError !== true) {
      newErrors.newPassword = passwordError;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (!formData.token) {
      newErrors.token = 'Token de recuperação é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await resetPassword({
          token: formData.token,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        });
        navigate(ROUTES.LOGIN); // Redireciona para login após redefinição
      } catch (error) {
        console.error('Erro na redefinição de senha', error);
      }
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
          Redefinir Senha
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
            label="Token de Recuperação"
            name="token"
            value={formData.token}
            onChange={handleChange}
            error={!!errors.token}
            helperText={errors.token}
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nova Senha"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirmar Nova Senha"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            disabled={isLoading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Redefinir Senha'}
          </Button>

          <Grid container justifyContent="center">
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
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default ResetPassword;
