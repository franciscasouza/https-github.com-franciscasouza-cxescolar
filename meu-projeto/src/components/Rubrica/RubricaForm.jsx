import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useRubrica } from '../../hooks/useRubrica';

function RubricaForm({ rubrica, onClose }) {
  const { createRubrica, updateRubrica } = useRubrica();
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (rubrica) {
      setFormData({
        nome: rubrica.nome || '',
        descricao: rubrica.descricao || '',
        tipo: rubrica.tipo || ''
      });
    }
  }, [rubrica]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validações básicas
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.tipo) newErrors.tipo = 'Tipo é obrigatório';

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (rubrica) {
        await updateRubrica(rubrica.id, formData);
      } else {
        await createRubrica(formData);
      }

      onClose();
    } catch (error) {
      console.error('Erro ao salvar rubrica:', error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {rubrica ? 'Editar Rubrica' : 'Nova Rubrica'}
      </DialogTitle>
      <DialogContent>
        <TextField
          name="nome"
          label="Nome"
          fullWidth
          margin="dense"
          value={formData.nome}
          onChange={handleChange}
          error={!!errors.nome}
          helperText={errors.nome}
        />

        <TextField
          name="descricao"
          label="Descrição"
          fullWidth
          margin="dense"
          multiline
          rows={3}
          value={formData.descricao}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="dense" error={!!errors.tipo}>
          <InputLabel>Tipo</InputLabel>
          <Select
            name="tipo"
            value={formData.tipo}
            label="Tipo"
            onChange={handleChange}
          >
            <MenuItem value="DESPESA">Despesa</MenuItem>
            <MenuItem value="RECEITA">Receita</MenuItem>
            <MenuItem value="INVESTIMENTO">Investimento</MenuItem>
          </Select>
          {errors.tipo && <span style={{ color: 'red', fontSize: '0.75rem' }}>{errors.tipo}</span>}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">
          {rubrica ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

RubricaForm.propTypes = {
  rubrica: PropTypes.shape({
    id: PropTypes.string,
    nome: PropTypes.string,
    descricao: PropTypes.string,
    tipo: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired
};

export default RubricaForm;
