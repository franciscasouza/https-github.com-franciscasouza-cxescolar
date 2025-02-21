// src/components/Layout/AuthLayout.jsx
import  'react';
import PropTypes from 'prop-types';
import { Box, CssBaseline } from '@mui/material';

const AuthLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Box 
        sx={{
          margin: 'auto',
          width: '100%',
          maxWidth: 400,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
