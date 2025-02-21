// src/components/AnimatedButton.jsx
import  'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const MotionButton = motion(Button);

const AnimatedButton = ({ children, ...props }) => {
  return (
    <MotionButton
      {...props}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </MotionButton>
  );
};

AnimatedButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnimatedButton;
