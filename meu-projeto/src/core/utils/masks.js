// Utilitários de máscara para campos de input

export const masks = {
  // Máscara para CNPJ
  cnpj: (value) => {
    // Remove caracteres não numéricos
    const cleanValue = value.replace(/\D/g, '');
    
    // Aplica máscara de CNPJ
    if (cleanValue.length <= 14) {
      return cleanValue
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/\/(\d{4})(\d)/, '/$1-$2')
        .replace(/\-(\d{2})(\d+)/, '-$1');
    }
    
    // Limita para 14 dígitos
    return cleanValue.slice(0, 14);
  },

  // Máscara para remover máscara (útil para validação)
  unmask: (value) => {
    return value.replace(/\D/g, '');
  },

  // Máscara para telefone
  phone: (value) => {
    const cleanValue = value.replace(/\D/g, '');
    
    if (cleanValue.length <= 11) {
      return cleanValue
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d{4})$/, '$1-$2');
    }
    
    return cleanValue.slice(0, 11);
  }
};

// Função de validação com máscara
export const validateWithMask = {
  cnpj: (value) => {
    // Remove máscara
    const cleanValue = masks.unmask(value);
    
    // Validações padrão de CNPJ
    if (cleanValue.length !== 14) return false;
    
    // Algoritmo de validação de CNPJ
    let soma = 0;
    let peso = 2;
    
    for (let i = 11; i >= 0; i--) {
      soma += parseInt(cleanValue.charAt(i)) * peso;
      peso = peso === 9 ? 2 : peso + 1;
    }
    
    let resto = soma % 11;
    let digitoVerificador = resto < 2 ? 0 : 11 - resto;
    
    return parseInt(cleanValue.charAt(12)) === digitoVerificador;
  }
};
