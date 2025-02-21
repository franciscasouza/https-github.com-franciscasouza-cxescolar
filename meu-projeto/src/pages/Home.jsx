// src/pages/Home.jsx
import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Skeleton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CardItem from "../components/HomeComponents/CardItem";
import PieChartComponent from "../components/ChartsComponents/PieChartComponent";
import LineChartComponent from "../components/ChartsComponents/LineChartComponent";
import BarChartComponent from "../components/ChartsComponents/BarChartComponent";
import AnimatedButton from "../components/Animations/AnimatedButton";
import NotificationSnackbar from "../components/Notifications/NotificationSnackbar";
import axios from "axios";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success", // 'success' | 'error' | 'warning' | 'info'
    message: "",
  });

  // Configurando a base URL para o axios
  axios.defaults.baseURL = "https://localhost:7165";

  const fetchAPI = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Erro ao carregar dados"
      );
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cards, line, bar, pie] = await Promise.all([
        fetchAPI("/cards"),
        fetchAPI("/line-data"),
        fetchAPI("/bar-data"),
        fetchAPI("/pie-data"),
      ]);
      setCards(cards);
      setLineData(line);
      setBarData(bar);
      setPieData(pie);
      setSnackbar({
        open: true,
        severity: "success",
        message: "Dados atualizados com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao buscar os dados:", error.message);
      setSnackbar({
        open: true,
        severity: "error",
        message: "Erro ao atualizar os dados.",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: 2,
        boxSizing: "border-box",
      }}
    >
      {/* Título e botão de atualização */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Tooltip title="Atualizar Dados" placement="left">
          <IconButton color="primary" onClick={fetchData}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Grid principal */}
      <Grid container spacing={2} sx={{ flexGrow: 1, overflow: "auto" }}>
        {/* Renderizando os Cards ou Skeletons */}
        {loading
          ? Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" width="100%" height={150} />
              </Grid>
            ))
          : cards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CardItem
                  title={card.title}
                  description={card.description}
                  image={card.image || "url/to/default/image.jpg"}
                />
              </Grid>
            ))}

        {/* Botão Animado para Ação Especial */}
        {!loading && (
          <Grid item xs={12}>
            <AnimatedButton variant="contained" color="secondary" fullWidth>
              Ação Especial
            </AnimatedButton>
          </Grid>
        )}

        {/* Renderizando os Gráficos */}
        {!loading && (
          <>
            <Grid item xs={12} md={6}>
              <LineChartComponent data={lineData} title="Vendas Mensais" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BarChartComponent data={barData} title="Vendas por Produto" />
            </Grid>
            <Grid item xs={12} md={6}>
              <PieChartComponent
                data={pieData}
                title="Distribuição de Grupos"
              />
            </Grid>
          </>
        )}
      </Grid>

      {/* Snackbar de Notificação */}
      <NotificationSnackbar
        open={snackbar.open}
        handleClose={handleSnackbarClose}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Box>
  );
};

export default Home;
