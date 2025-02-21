// Validações específicas para o formulário de Escola
export const EscolaValidators = {
  // Validação de nome da escola
  validateNome: (nome) => {
    if (!nome) return 'Nome da escola é obrigatório';
    if (nome.length < 3) return 'Nome deve ter no mínimo 3 caracteres';
    if (nome.length > 100) return 'Nome não pode exceder 100 caracteres';
    return null;
  },

  // Validação de endereço
  validateEndereco: (endereco) => {
    if (!endereco) return 'Endereço é obrigatório';
    if (endereco.length < 5) return 'Endereço deve ter no mínimo 5 caracteres';
    if (endereco.length > 200) return 'Endereço não pode exceder 200 caracteres';
    return null;
  },

  // Validação de região
  validateRegiao: (regiao) => {
    const regioes = ['norte', 'sul', 'leste', 'oeste', 'central'];
    if (!regiao) return 'Região é obrigatória';
    if (!regioes.includes(regiao.toLowerCase())) return 'Região inválida';
    return null;
  },

  // Validação de classificação
  validateClassificacao: (classificacao) => {
    const classificacoes = ['municipal', 'estadual', 'privada'];
    if (!classificacao) return 'Classificação é obrigatória';
    if (!classificacoes.includes(classificacao.toLowerCase())) return 'Classificação inválida';
    return null;
  },

  // Validação de tipo de ensino
  validateTipoEnsino: (tipoEnsino) => {
    const tiposEnsino = ['fundamental', 'medio', 'infantil'];
    if (!tipoEnsino) return 'Tipo de ensino é obrigatório';
    if (!tiposEnsino.includes(tipoEnsino.toLowerCase())) return 'Tipo de ensino inválido';
    return null;
  },

  // Validação de CNPJ
  validateCNPJ: (cnpj) => {
    if (!cnpj) return 'CNPJ é obrigatório';
    
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]/g, '');
    
    // Verifica se tem 14 dígitos
    if (cnpj.length !== 14) return 'CNPJ deve ter 14 dígitos';
    
    // Validação do dígito verificador (algoritmo básico)
    let soma = 0;
    let peso = 2;
    
    for (let i = 11; i >= 0; i--) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }
    
    let resto = soma % 11;
    let digitoVerificador = resto < 2 ? 0 : 11 - resto;
    
    if (parseInt(cnpj.charAt(12)) !== digitoVerificador) return 'CNPJ inválido';
    
    return null;
  },

  // Validação completa do formulário
  validateEscola: (escola) => {
    const errors = {};
    
    const nomeError = EscolaValidators.validateNome(escola.nome);
    if (nomeError) errors.nome = nomeError;
    
    const enderecoError = EscolaValidators.validateEndereco(escola.endereco);
    if (enderecoError) errors.endereco = enderecoError;
    
    const regiaoError = EscolaValidators.validateRegiao(escola.regiao);
    if (regiaoError) errors.regiao = regiaoError;
    
    const classificacaoError = EscolaValidators.validateClassificacao(escola.classificacao);
    if (classificacaoError) errors.classificacao = classificacaoError;
    
    const tipoEnsinoError = EscolaValidators.validateTipoEnsino(escola.tipoEnsino);
    if (tipoEnsinoError) errors.tipoEnsino = tipoEnsinoError;
    
    const cnpjError = EscolaValidators.validateCNPJ(escola.cnpj);
    if (cnpjError) errors.cnpj = cnpjError;
    
    return Object.keys(errors).length > 0 ? errors : null;
  }
};
