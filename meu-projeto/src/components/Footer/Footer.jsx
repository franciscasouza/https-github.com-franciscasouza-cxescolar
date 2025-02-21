// src/components/Layout/Footer.jsx
import "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed", // Fixar no final da página
        bottom: 0, // Alinhar no final
        left: 0,
        width: "100%",
        py: 2,
        px: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Desenvolvido por Secretaria Municipal de
        Tecnologia e Inovação. Todos os direitos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
