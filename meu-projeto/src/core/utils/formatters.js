// Formatadores de dados

// Formatar valor monetário para exibição
export const formatCurrency = (value) => {
  if (!value) return '';
  
  // Converte para número se for string
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(/[^\d.-]/g, '')) 
    : value;
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numericValue);
};

// Converter valor monetário formatado para número
export const parseCurrency = (formattedValue) => {
  if (!formattedValue) return 0;
  
  // Remove caracteres não numéricos, exceto ponto decimal
  const cleanValue = formattedValue.replace(/[^\d,.-]/g, '').replace(',', '.');
  return parseFloat(cleanValue) || 0;
};

// Formatar data
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};
