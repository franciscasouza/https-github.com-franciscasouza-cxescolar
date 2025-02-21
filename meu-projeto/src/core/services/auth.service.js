import { api } from '../config/axios';
import StorageService from '../utils/storage';

class AuthService {
  static async login(credentials) {
    try {
      const response = await api.post('/Autenticacao/login', {
        username: credentials.username,
        password: credentials.password
      });
      
      const { token } = response.data;
      
      if (!token) {
        throw new Error('Token não recebido');
      }

      // Decodificar o token JWT para extrair informações do usuário
      const userPayload = this.decodeJwtToken(token);
      
      StorageService.setItem('token', token);
      StorageService.setItem('user', userPayload);
      
      return userPayload;
    } catch (error) {
      console.error('Falha no login', error);
      throw error;
    }
  }

  // Método para decodificar o token JWT
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

  static logout() {
    StorageService.clear();
    window.location.href = '/login';
  }

  static getCurrentUser() {
    return StorageService.getItem('user');
  }

  static isAuthenticated() {
    const token = StorageService.getItem('token');
    
    // Verificar se o token existe e não está expirado
    if (!token) return false;

    try {
      const payload = this.decodeJwtToken(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  // Método para atualizar o token (se necessário)
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

export default AuthService;
