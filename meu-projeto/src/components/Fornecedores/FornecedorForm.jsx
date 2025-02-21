import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button 
} from '@mui/material';
import { useFornecedor } from '../../hooks/useFornecedor';
import { masks, validateWithMask } from '../../core/utils/masks';

function FornecedorForm({ fornecedor, onClose }) {
  const { createFornecedor, updateFornecedor } = useFornecedor();
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    contato: '',
    localizacao: '',
    telefone: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (fornecedor) {
      setFormData({
        nome: fornecedor.nome || '',
        cnpj: masks.cnpj(fornecedor.cnpj) || '',
        contato: fornecedor.contato || '',
        localizacao: fornecedor.localizacao || '',
        telefone: fornecedor.telefone || ''
      });
    }
  }, [fornecedor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let maskedValue = value;

    // Aplicar máscaras específicas
    if (name === 'cnpj') {
      maskedValue = masks.cnpj(value);
    } else if (name === 'telefone') {
      maskedValue = masks.phone(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: maskedValue
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validação de CNPJ
    if (!validateWithMask.cnpj(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
    }

    // Validações básicas
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.cnpj) newErrors.cnpj = 'CNPJ é obrigatório';

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const dadosFornecedor = {
        ...formData,
        cnpj: masks.unmask(formData.cnpj)
      };

      if (fornecedor) {
        await updateFornecedor(fornecedor.id, dadosFornecedor);
      } else {
        await createFornecedor(dadosFornecedor);
      }

      onClose();
    } catch (error) {
      console.error('Erro ao salvar fornecedor:', error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {fornecedor ? 'Editar Fornecedor' : 'Novo Fornecedor'}
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
          name="cnpj"
          label="CNPJ"
          fullWidth
          margin="dense"
          value={formData.cnpj}
          onChange={handleChange}
          error={!!errors.cnpj}
          helperText={errors.cnpj}
          placeholder="00.000.000/0000-00"
        />
        <TextField
          name="contato"
          label="Contato"
          fullWidth
          margin="dense"
          value={formData.contato}
          onChange={handleChange}
        />
        <TextField
          name="localizacao"
          label="Localização"
          fullWidth
          margin="dense"
          value={formData.localizacao}
          onChange={handleChange}
        />
        <TextField
          name="telefone"
          label="Telefone"
          fullWidth
          margin="dense"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="(00) 0000-0000"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">
          {fornecedor ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FornecedorForm.propTypes = {
  fornecedor: PropTypes.shape({
    id: PropTypes.string,
    nome: PropTypes.string,
    cnpj: PropTypes.string,
    contato: PropTypes.string,
    localizacao: PropTypes.string,
    telefone: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired
};

export default FornecedorForm;
