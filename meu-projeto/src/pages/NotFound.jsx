import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Paper, 
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

function NotFound() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          padding: theme.spacing(4),
          borderRadius: theme.spacing(2),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 500,
          width: '100%'
        }}
      >
        <ErrorOutlineIcon 
          sx={{ 
            fontSize: isMobile ? 100 : 150, 
            color: theme.palette.error.main,
            mb: 2 
          }} 
        />
        
        <Typography 
          variant={isMobile ? 'h4' : 'h3'} 
          component="h1" 
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Página Não Encontrada
        </Typography>
        
        <Typography 
          variant="body1" 
          color="textSecondary" 
          paragraph
          sx={{ mb: 3 }}
        >
          Desculpe, a página que você está procurando não existe ou foi movida.
          Verifique o endereço ou volte para a página inicial.
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{ 
            textTransform: 'none',
            px: 3,
            py: 1
          }}
        >
          Voltar para Início
        </Button>
      </Paper>

      {/* Detalhes técnicos opcionais */}
      <Box 
        sx={{ 
          mt: 2, 
          opacity: 0.7,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="caption" color="textSecondary">
          Código do Erro: 404
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {window.location.pathname}
        </Typography>
      </Box>
    </Container>
  );
}

export default NotFound;
