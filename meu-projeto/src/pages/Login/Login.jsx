import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../core/constants/routes';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login({ username, password });
      navigate('/'); // Redireciona para página inicial após login
    } catch (err) {
      // Tratamento de erros específicos
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setError('Credenciais inválidas. Verifique seu usuário e senha.');
            break;
          case 403:
            setError('Acesso negado. Você não tem permissão para acessar o sistema.');
            break;
          case 500:
            setError('Erro interno do servidor. Tente novamente mais tarde.');
            break;
          default:
            setError('Ocorreu um erro ao fazer login. Tente novamente.');
        }
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Erro de conexão. Verifique sua internet.');
      }
    } finally {
      setIsLoading(false);
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
          Login CX Escolar
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ width: '100%', mb: 2 }}
          >
            {error}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Entrar'}
          </Button>

          <Grid container justifyContent="space-between">
            <Grid item>
              <Link 
                to={ROUTES.FORGOT_PASSWORD} 
                style={{ textDecoration: 'none', color: 'primary' }}
              >
                <Typography variant="body2">
                  Esqueceu a senha?
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link 
                to={ROUTES.REGISTER} 
                style={{ textDecoration: 'none', color: 'primary' }}
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

export default Login;
