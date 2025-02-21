// src/pages/TipologiaDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance"; // Importe a instância do Axios

const TipologiaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tipologia, setTipologia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTipologia = async () => {
      try {
        const response = await axiosInstance.get(`/tipologias/${id}`); // Ajuste o caminho conforme a API
        setTipologia(response.data); // Supondo que a resposta da API seja um objeto tipologia
      } catch (err) {
        console.error("Erro ao buscar tipologia:", err);
        setError(
          "Falha ao carregar a tipologia. Por favor, tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTipologia();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert severity="error">{error}</Alert>
        <Button
          variant="contained"
          onClick={() => navigate("/tipologias")}
          sx={{ mt: 2 }}
        >
          Voltar à Lista
        </Button>
      </Box>
    );
  }

  if (!tipologia) {
    return (
      <Box mt={4}>
        <Alert severity="warning">Tipologia não encontrada.</Alert>
        <Button
          variant="contained"
          onClick={() => navigate("/tipologias")}
          sx={{ mt: 2 }}
        >
          Voltar à Lista
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Detalhes da Tipologia
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">ID: {tipologia.id}</Typography>
          <Typography variant="h6">
            Classificação: {tipologia.classificacao}
          </Typography>
          <Typography variant="h6">
            Data de Criação: {new Date(tipologia.dataCriacao).toLocaleString()}
          </Typography>
          <Typography variant="h6">
            Valor Aporte: R$ {tipologia.valorAporte.toLocaleString()}
          </Typography>
          <Typography variant="h6">
            Índice Correção: {(tipologia.indiceCorrecao * 100).toFixed(2)}%
          </Typography>
          <Typography variant="h6">
            Índice Repasse: {tipologia.indiceRepasse}%
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/tipologias")}
        sx={{ mt: 2 }}
      >
        Voltar à Lista
      </Button>
    </Box>
  );
};

export default TipologiaDetail;
