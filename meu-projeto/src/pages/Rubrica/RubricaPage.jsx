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
  DialogActions
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useRubrica } from '../../hooks/useRubrica';
import RubricaForm from '../../components/Rubrica/RubricaForm';

function RubricaPage() {
  const { 
    rubricas, 
    fetchRubricas, 
    deleteRubrica, 
    isLoading,
    pagination 
  } = useRubrica();

  const [openForm, setOpenForm] = useState(false);
  const [selectedRubrica, setSelectedRubrica] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    fetchRubricas();
  }, [fetchRubricas]);

  const handleEdit = (rubrica) => {
    setSelectedRubrica(rubrica);
    setOpenForm(true);
  };

  const handleDelete = (rubrica) => {
    setSelectedRubrica(rubrica);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedRubrica) {
      await deleteRubrica(selectedRubrica.id);
      setConfirmDeleteOpen(false);
      setSelectedRubrica(null);
    }
  };

  const handleNewRubrica = () => {
    setSelectedRubrica(null);
    setOpenForm(true);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Rubricas
      </Typography>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleNewRubrica}
        style={{ marginBottom: 16 }}
      >
        Nova Rubrica
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rubricas.map((rubrica) => (
              <TableRow key={rubrica.id}>
                <TableCell>{rubrica.nome}</TableCell>
                <TableCell>{rubrica.descricao}</TableCell>
                <TableCell>{rubrica.tipo}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(rubrica)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(rubrica)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openForm && (
        <RubricaForm 
          rubrica={selectedRubrica}
          onClose={() => setOpenForm(false)}
        />
      )}

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir a rubrica?
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

export default RubricaPage;
