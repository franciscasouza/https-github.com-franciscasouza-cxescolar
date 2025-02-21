import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { useRepasseEscolar } from '../../hooks/useRepasseEscolar';
import RepasseEscolarForm from '../../components/RepasseEscolar/RepasseEscolarForm';
import { formatCurrency, formatDate } from '../../core/utils/formatters';

function RepasseEscolarPage() {
  const { 
    repassesEscolares, 
    fetchRepassesEscolares, 
    deleteRepasseEscolar, 
    fetchRepasseEscolarByClassificacao,
    isLoading,
    pagination 
  } = useRepasseEscolar();

  const [openForm, setOpenForm] = useState(false);
  const [selectedRepasseEscolar, setSelectedRepasseEscolar] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [classificacaoFiltro, setClassificacaoFiltro] = useState('');

  useEffect(() => {
    fetchRepassesEscolares();
  }, [fetchRepassesEscolares]);

  const handleEdit = (repasseEscolar) => {
    setSelectedRepasseEscolar(repasseEscolar);
    setOpenForm(true);
  };

  const handleDelete = (repasseEscolar) => {
    setSelectedRepasseEscolar(repasseEscolar);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedRepasseEscolar) {
      await deleteRepasseEscolar(selectedRepasseEscolar.id);
      setConfirmDeleteOpen(false);
      setSelectedRepasseEscolar(null);
    }
  };

  const handleNewRepasseEscolar = () => {
    setSelectedRepasseEscolar(null);
    setOpenForm(true);
  };

  const handleClassificacaoFilter = (event) => {
    const classificacao = event.target.value;
    setClassificacaoFiltro(classificacao);
    
    if (classificacao) {
      fetchRepasseEscolarByClassificacao(classificacao);
    } else {
      fetchRepassesEscolares();
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Repasses Escolares
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleNewRepasseEscolar}
        >
          Novo Repasse
        </Button>

        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel>Filtrar por Classificação</InputLabel>
          <Select
            value={classificacaoFiltro}
            onChange={handleClassificacaoFilter}
            label="Filtrar por Classificação"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="ALIMENTACAO">Alimentação</MenuItem>
            <MenuItem value="TRANSPORTE">Transporte</MenuItem>
            <MenuItem value="MATERIAL_DIDATICO">Material Didático</MenuItem>
            <MenuItem value="MANUTENCAO">Manutenção</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Escola</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Classificação</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repassesEscolares.map((repasseEscolar) => (
              <TableRow key={repasseEscolar.id}>
                <TableCell>{repasseEscolar.escola?.nome || 'N/A'}</TableCell>
                <TableCell>{formatCurrency(repasseEscolar.valor)}</TableCell>
                <TableCell>{formatDate(repasseEscolar.data)}</TableCell>
                <TableCell>{repasseEscolar.classificacao}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(repasseEscolar)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(repasseEscolar)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openForm && (
        <RepasseEscolarForm 
          repasseEscolar={selectedRepasseEscolar}
          onClose={() => setOpenForm(false)}
        />
      )}

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir o repasse escolar?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default RepasseEscolarPage;
