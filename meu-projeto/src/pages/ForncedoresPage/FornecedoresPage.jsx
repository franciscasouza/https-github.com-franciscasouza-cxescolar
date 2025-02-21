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
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { useFornecedor } from '../../hooks/useFornecedor';
import FornecedorForm from '../../components/Fornecedores/FornecedorForm';
import { masks } from '../../core/utils/masks';

function FornecedoresPage() {
  const { 
    fornecedores, 
    fetchFornecedores, 
    deleteFornecedor, 
    isLoading,
    pagination 
  } = useFornecedor();

  const [openForm, setOpenForm] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    fetchFornecedores();
  }, [fetchFornecedores]);

  const handleEdit = (fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setOpenForm(true);
  };

  const handleDelete = (fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedFornecedor) {
      await deleteFornecedor(selectedFornecedor.id);
      setConfirmDeleteOpen(false);
      setSelectedFornecedor(null);
    }
  };

  const handleNewFornecedor = () => {
    setSelectedFornecedor(null);
    setOpenForm(true);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Fornecedores
      </Typography>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleNewFornecedor}
        style={{ marginBottom: 16 }}
      >
        Novo Fornecedor
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fornecedores.map((fornecedor) => (
              <TableRow key={fornecedor.id}>
                <TableCell>{fornecedor.nome}</TableCell>
                <TableCell>{masks.cnpj(fornecedor.cnpj)}</TableCell>
                <TableCell>{fornecedor.telefone}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(fornecedor)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(fornecedor)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openForm && (
        <FornecedorForm 
          fornecedor={selectedFornecedor}
          onClose={() => setOpenForm(false)}
        />
      )}

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir o fornecedor {selectedFornecedor?.nome}?
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

export default FornecedoresPage;
