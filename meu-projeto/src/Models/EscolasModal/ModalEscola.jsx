import { useState, useEffect } from 'react';
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
import { useEscola } from '../../hooks/useEscola';
import { EscolaValidators } from '../../core/utils/validation';
import { masks, validateWithMask } from '../../core/utils/masks';

function ModalEscola({ escola, onClose }) {
  const { createEscola, updateEscola } = useEscola();
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    regiao: '',
    classificacao: '',
    tipoEnsino: '',
    cnpj: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (escola) {
      setFormData({
        nome: escola.nome || '',
        endereco: escola.endereco || '',
        regiao: escola.regiao || '',
        classificacao: escola.classificacao || '',
        tipoEnsino: escola.tipoEnsino || '',
        cnpj: escola.cnpj || ''
      });
    }
  }, [escola]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let maskedValue = value;

    // Aplicar máscara de CNPJ
    if (name === 'cnpj') {
      maskedValue = masks.cnpj(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: maskedValue
    }));
  };

  const handleSubmit = async () => {
    // Remover máscara para validação
    const formDataUnmasked = {
      ...formData,
      cnpj: masks.unmask(formData.cnpj)
    };

    const validationErrors = EscolaValidators.validateEscola(formDataUnmasked);
    
    // Validação adicional de CNPJ com máscara
    if (!validateWithMask.cnpj(formData.cnpj)) {
      validationErrors.cnpj = 'CNPJ inválido';
    }
    
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (escola) {
        await updateEscola(escola.id, formDataUnmasked);
      } else {
        await createEscola(formDataUnmasked);
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar escola:', error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {escola ? 'Editar Escola' : 'Nova Escola'}
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
          name="endereco"
          label="Endereço"
          fullWidth
          margin="dense"
          value={formData.endereco}
          onChange={handleChange}
          error={!!errors.endereco}
          helperText={errors.endereco}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Região</InputLabel>
          <Select
            name="regiao"
            value={formData.regiao}
            label="Região"
            onChange={handleChange}
            error={!!errors.regiao}
          >
            <MenuItem value="norte">Norte</MenuItem>
            <MenuItem value="sul">Sul</MenuItem>
            <MenuItem value="leste">Leste</MenuItem>
            <MenuItem value="oeste">Oeste</MenuItem>
            <MenuItem value="central">Central</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>Classificação</InputLabel>
          <Select
            name="classificacao"
            value={formData.classificacao}
            label="Classificação"
            onChange={handleChange}
            error={!!errors.classificacao}
          >
            <MenuItem value="municipal">Municipal</MenuItem>
            <MenuItem value="estadual">Estadual</MenuItem>
            <MenuItem value="privada">Privada</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>Tipo de Ensino</InputLabel>
          <Select
            name="tipoEnsino"
            value={formData.tipoEnsino}
            label="Tipo de Ensino"
            onChange={handleChange}
            error={!!errors.tipoEnsino}
          >
            <MenuItem value="fundamental">Fundamental</MenuItem>
            <MenuItem value="medio">Médio</MenuItem>
            <MenuItem value="infantil">Infantil</MenuItem>
          </Select>
        </FormControl>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">
          {escola ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalEscola;
