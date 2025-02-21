import { api } from '../core/config/axios';
import StorageService from '../core/utils/storage';

class AuthenticationService {
  // Login
  static async login(credentials) {
    try {
      const response = await api.post('/Autenticacao/login', {
        username: credentials.username,
        password: credentials.password
      });
      
      const { token, user } = response.data;
      
      if (!token) {
        throw new Error('Token não recebido');
      }

      StorageService.setItem('token', token);
      StorageService.setItem('user', user);
      
      return user;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  // Logout
  static async logout() {
    try {
      await api.post('/Autenticacao/logout');
      StorageService.clear();
      return true;
    } catch (error) {
      console.error('Erro ao fazer logout', error);
      StorageService.clear();
      return false;
    }
  }

  // Registro de Usuário
  static async register(userData) {
    try {
      const response = await api.post('/Autenticacao/register', userData);
      return response.data;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  // Redefinição de Senha
  static async resetPassword(resetData) {
    try {
      const response = await api.post('/Autenticacao/reset-password', {
        token: resetData.token,
        newPassword: resetData.newPassword,
        confirmPassword: resetData.confirmPassword
      });
      return response.data;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  // Esqueceu a Senha
  static async forgotPassword(email) {
    try {
      const response = await api.post('/Autenticacao/forgot-password', { email });
      return response.data;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  // Ativar Conta
  static async activateAccount(activationData) {
    try {
      const response = await api.post('/Autenticacao/activate-account', {
        token: activationData.token,
        userId: activationData.userId
      });
      return response.data;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  // Método de tratamento de erros de autenticação
  static handleAuthError(error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error('Requisição inválida. Verifique os dados enviados.');
        case 401:
          throw new Error('Credenciais inválidas. Verifique seu usuário e senha.');
        case 403:
          throw new Error('Acesso negado. Você não tem permissão para realizar esta ação.');
        case 404:
          throw new Error('Recurso não encontrado. Verifique os dados.');
        case 500:
          throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
        default:
          throw new Error('Ocorreu um erro durante a autenticação.');
      }
    } else if (error.request) {
      throw new Error('Sem resposta do servidor. Verifique sua conexão de internet.');
    } else {
      throw new Error('Erro ao processar a solicitação.');
    }
  }

  // Verificar status de autenticação
  static isAuthenticated() {
    const token = StorageService.getItem('token');
    
    if (!token) return false;

    try {
      const payload = this.decodeJwtToken(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  // Decodificar token JWT
  static decodeJwtToken(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Erro ao decodificar token', error);
      return null;
    }
  }

  // Atualizar token
  static async refreshToken() {
    try {
      const currentToken = StorageService.getItem('token');
      const response = await api.post('/Autenticacao/refresh-token', {
        token: currentToken
      });

      const { token: newToken } = response.data;
      StorageService.setItem('token', newToken);
      return newToken;
    } catch (error) {
      this.logout();
      throw error;
    }
  }
}

export default AuthenticationService;
