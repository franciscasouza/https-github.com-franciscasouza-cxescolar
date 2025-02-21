// src/components/Modals/DetailModal.jsx
import 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const DetailModal = ({ open, handleClose, title, description, image }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-titulo"
      aria-describedby="modal-descricao"
    >
      <Box sx={style}>
        <IconButton
          aria-label="fechar"
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-titulo" variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <img src={image} alt={title} style={{ width: '100%', borderRadius: '8px' }} />
        <Typography id="modal-descricao" sx={{ mt: 2 }}>
          {description}
        </Typography>
      </Box>
    </Modal>
  );
};

DetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default DetailModal;
