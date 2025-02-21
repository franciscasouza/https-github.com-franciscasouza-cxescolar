import { useState, useEffect } from "react";
import { 
  Container, 
  Typography, 
  Grid, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Pagination
} from "@mui/material";
import { useEscola } from "../../hooks/useEscola";
import TabelaEscolas from "../../components/Escola/TabelaEscolas";
import ModalEscola from "../../Models/EscolasModal/ModalEscola";

function EscolasPages() {
  const { 
    escolas, 
    pagination,
    isLoading, 
    fetchEscolas,
    searchEscolas
  } = useEscola();

  const [filtros, setFiltros] = useState({
    nome: '',
    regiao: '',
    classificacao: '',
    tipoEnsino: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEscola, setSelectedEscola] = useState(null);

  useEffect(() => {
    fetchEscolas();
  }, []);

  const handleSearch = () => {
    searchEscolas(filtros);
  };

  const handlePageChange = (event, value) => {
    searchEscolas({
      ...filtros,
      page: value
    });
  };

  const handleOpenModal = (escola = null) => {
    setSelectedEscola(escola);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEscola(null);
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Escolas
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Nome"
            value={filtros.nome}
            onChange={(e) => setFiltros(prev => ({ ...prev, nome: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Região"
            value={filtros.regiao}
            onChange={(e) => setFiltros(prev => ({ ...prev, regiao: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Classificação</InputLabel>
            <Select
              value={filtros.classificacao}
              label="Classificação"
              onChange={(e) => setFiltros(prev => ({ ...prev, classificacao: e.target.value }))}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="municipal">Municipal</MenuItem>
              <MenuItem value="estadual">Estadual</MenuItem>
              <MenuItem value="privada">Privada</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Tipo de Ensino</InputLabel>
            <Select
              value={filtros.tipoEnsino}
              label="Tipo de Ensino"
              onChange={(e) => setFiltros(prev => ({ ...prev, tipoEnsino: e.target.value }))}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="fundamental">Fundamental</MenuItem>
              <MenuItem value="medio">Médio</MenuItem>
              <MenuItem value="infantil">Infantil</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} container spacing={2} justifyContent="space-between">
          <Grid item>
            <Button 
              variant="contained" 
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => handleOpenModal()}
            >
              Nova Escola
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <TabelaEscolas 
        escolas={escolas} 
        isLoading={isLoading}
        onEdit={handleOpenModal}
      />

      {/* Paginação */}
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Pagination
          count={Math.ceil(pagination.total / pagination.pageSize)}
          page={pagination.page}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>

      {isModalOpen && (
        <ModalEscola 
          escola={selectedEscola} 
          onClose={handleCloseModal} 
        />
      )}
    </Container>
  );
}

export default EscolasPages;
