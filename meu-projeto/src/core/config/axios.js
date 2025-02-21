import axios from 'axios';
import StorageService from '../utils/storage';
import AuthService from '../services/auth.service';

// Classe de tratamento de erros de API
class APIErrorHandler {
  // Mapeia códigos de erro para mensagens amigáveis
  static errorMessages = {
    400: 'Requisição inválida. Verifique os dados enviados.',
    401: 'Não autorizado. Faça login novamente.',
    403: 'Acesso negado. Você não tem permissão.',
    404: 'Recurso não encontrado.',
    422: 'Erro de validação. Verifique os dados.',
    500: 'Erro interno do servidor. Tente novamente mais tarde.',
    503: 'Serviço indisponível. Tente novamente mais tarde.'
  };

  // Método para obter mensagem de erro personalizada
  static getErrorMessage(error) {
    const status = error.response?.status;
    
    // Mensagem padrão do backend, se disponível
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    // Mensagem de erro mapeada por status
    if (status && this.errorMessages[status]) {
      return this.errorMessages[status];
    }

    // Mensagem genérica
    return 'Ocorreu um erro inesperado. Tente novamente.';
  }

  // Método para log de erros
  static logError(error) {
    console.error('Erro de API:', {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method
    });
  }
}

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Interceptador de requisição
  instance.interceptors.request.use(
    (config) => {
      const token = StorageService.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptador de resposta
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Log de erro
      APIErrorHandler.logError(error);

      // Se for um erro de autorização (401) e não for uma tentativa de refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Tentar atualizar o token
          await AuthService.refreshToken();
          
          // Retentar a requisição original com o novo token
          const token = StorageService.getItem('token');
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          
          return instance(originalRequest);
        } catch (refreshError) {
          // Se o refresh falhar, fazer logout
          AuthService.logout();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const api = createAxiosInstance(import.meta.env.VITE_API_URL || 'https://localhost:7165/api');

export { APIErrorHandler };
