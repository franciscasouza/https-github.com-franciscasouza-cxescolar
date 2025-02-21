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
import { useRepasseEscolar } from '../../hooks/useRepasseEscolar';
import { useEscola } from '../../hooks/useEscola';
import { formatCurrency, parseCurrency } from '../../core/utils/formatters';

function RepasseEscolarForm({ repasseEscolar, onClose }) {
  const { createRepasseEscolar, updateRepasseEscolar } = useRepasseEscolar();
  const { escolas, fetchEscolas } = useEscola();
  const [formData, setFormData] = useState({
    escolaId: '',
    valor: '',
    data: '',
    classificacao: '',
    descricao: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchEscolas();
  }, [fetchEscolas]);

  useEffect(() => {
    if (repasseEscolar) {
      setFormData({
        escolaId: repasseEscolar.escolaId || '',
        valor: formatCurrency(repasseEscolar.valor) || '',
        data: repasseEscolar.data ? new Date(repasseEscolar.data).toISOString().split('T')[0] : '',
        classificacao: repasseEscolar.classificacao || '',
        descricao: repasseEscolar.descricao || ''
      });
    }
  }, [repasseEscolar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Formatar valor monetário
    if (name === 'valor') {
      processedValue = formatCurrency(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validações básicas
    if (!formData.escolaId) newErrors.escolaId = 'Escola é obrigatória';
    if (!formData.valor) newErrors.valor = 'Valor é obrigatório';
    if (!formData.data) newErrors.data = 'Data é obrigatória';
    if (!formData.classificacao) newErrors.classificacao = 'Classificação é obrigatória';

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const dadosRepasseEscolar = {
        ...formData,
        valor: parseCurrency(formData.valor),
        data: new Date(formData.data).toISOString()
      };

      if (repasseEscolar) {
        await updateRepasseEscolar(repasseEscolar.id, dadosRepasseEscolar);
      } else {
        await createRepasseEscolar(dadosRepasseEscolar);
      }

      onClose();
    } catch (error) {
      console.error('Erro ao salvar repasse escolar:', error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {repasseEscolar ? 'Editar Repasse Escolar' : 'Novo Repasse Escolar'}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense" error={!!errors.escolaId}>
          <InputLabel>Escola</InputLabel>
          <Select
            name="escolaId"
            value={formData.escolaId}
            label="Escola"
            onChange={handleChange}
          >
            {escolas.map((escola) => (
              <MenuItem key={escola.id} value={escola.id}>
                {escola.nome}
              </MenuItem>
            ))}
          </Select>
          {errors.escolaId && <span style={{ color: 'red', fontSize: '0.75rem' }}>{errors.escolaId}</span>}
        </FormControl>

        <TextField
          name="valor"
          label="Valor"
          fullWidth
          margin="dense"
          value={formData.valor}
          onChange={handleChange}
          error={!!errors.valor}
          helperText={errors.valor}
          placeholder="R$ 0,00"
        />

        <TextField
          name="data"
          label="Data"
          type="date"
          fullWidth
          margin="dense"
          value={formData.data}
          onChange={handleChange}
          error={!!errors.data}
          helperText={errors.data}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl fullWidth margin="dense" error={!!errors.classificacao}>
          <InputLabel>Classificação</InputLabel>
          <Select
            name="classificacao"
            value={formData.classificacao}
            label="Classificação"
            onChange={handleChange}
          >
            <MenuItem value="ALIMENTACAO">Alimentação</MenuItem>
            <MenuItem value="TRANSPORTE">Transporte</MenuItem>
            <MenuItem value="MATERIAL_DIDATICO">Material Didático</MenuItem>
            <MenuItem value="MANUTENCAO">Manutenção</MenuItem>
          </Select>
          {errors.classificacao && <span style={{ color: 'red', fontSize: '0.75rem' }}>{errors.classificacao}</span>}
        </FormControl>

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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">
          {repasseEscolar ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

RepasseEscolarForm.propTypes = {
  repasseEscolar: PropTypes.shape({
    id: PropTypes.string,
    escolaId: PropTypes.string,
    valor: PropTypes.number,
    data: PropTypes.string,
    classificacao: PropTypes.string,
    descricao: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired
};

export default RepasseEscolarForm;
