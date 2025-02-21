// src/components/HomeComponents/CardItem.jsx
import  { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import DetailModal from '../Modal/DetailModal';
import PropTypes from 'prop-types';

const CardItem = ({ title, description, image }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{
          height: '100%', // Faz com que o card ocupe toda a altura disponível
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={title}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {/* Modal de Detalhes */}
      <DetailModal
        open={open}
        handleClose={handleClose}
        title={title}
        description={description}
        image={image}
      />
    </>
  );
};

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CardItem;
