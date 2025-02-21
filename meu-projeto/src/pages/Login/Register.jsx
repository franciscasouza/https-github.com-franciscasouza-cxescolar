import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Box, 
  Typography, 
  Container, 
  Paper,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Validators } from '../../core/utils/validation';
import { ROUTES } from '../../core/constants/routes';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const { register, isLoading } = useAuthentication();
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

    // Validações
    const usernameError = Validators.combine(
      Validators.required,
      Validators.minLength(3)
    )(formData.username);
    if (usernameError !== true) newErrors.username = usernameError;

    const emailError = Validators.email(formData.email);
    if (emailError !== true) newErrors.email = emailError;

    const passwordError = Validators.combine(
      Validators.required,
      Validators.minLength(6)
    )(formData.password);
    if (passwordError !== true) newErrors.password = passwordError;

    // Confirmação de senha
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        navigate(ROUTES.LOGIN); // Redireciona para login após registro
      } catch (error) {
        console.error('Erro no registro', error);
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
          Registro CX Escolar
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
            label="Nome de Usuário"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirmar Senha"
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
            {isLoading ? <CircularProgress size={24} /> : 'Registrar'}
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="body2">
                Já tem uma conta? {' '}
                <Link 
                  to={ROUTES.LOGIN} 
                  style={{ textDecoration: 'none' }}
                >
                  Fazer Login
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
