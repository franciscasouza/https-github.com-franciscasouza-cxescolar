import api from '../core/config/axios';

class RepasseEscolarService {
  // Buscar todos os repasses escolares com paginação
  static async getAllRepassesEscolares(page = 1, pageSize = 10, sortBy = 'data', sortOrder = 'desc') {
    try {
      const response = await api.get('/RepasseEscolar', {
        params: {
          page,
          pageSize,
          sortBy,
          sortOrder
        }
      });
      return {
        data: response.data.data,
        total: response.data.total,
        page: response.data.page,
        pageSize: response.data.pageSize
      };
    } catch (error) {
      console.error('Erro ao buscar repasses escolares:', error);
      throw error;
    }
  }

  // Buscar repasse escolar por ID
  static async getRepasseEscolarById(id) {
    try {
      const response = await api.get(`/RepasseEscolar/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar repasse escolar ${id}:`, error);
      throw error;
    }
  }

  // Buscar repasses escolares por classificação
  static async getRepasseEscolarByClassificacao(classificacao, page = 1, pageSize = 10) {
    try {
      const response = await api.get(`/RepasseEscolar/classificacao/${classificacao}`, {
        params: { page, pageSize }
      });
      return {
        data: response.data.data,
        total: response.data.total,
        page: response.data.page,
        pageSize: response.data.pageSize
      };
    } catch (error) {
      console.error(`Erro ao buscar repasses escolares por classificação ${classificacao}:`, error);
      throw error;
    }
  }

  // Criar novo repasse escolar
  static async createRepasseEscolar(dadosRepasseEscolar) {
    try {
      const response = await api.post('/RepasseEscolar', dadosRepasseEscolar);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar repasse escolar:', error);
      throw error;
    }
  }

  // Atualizar repasse escolar
  static async updateRepasseEscolar(id, dadosRepasseEscolar) {
    try {
      const response = await api.put(`/RepasseEscolar/${id}`, dadosRepasseEscolar);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar repasse escolar ${id}:`, error);
      throw error;
    }
  }

  // Deletar repasse escolar
  static async deleteRepasseEscolar(id) {
    try {
      const response = await api.delete(`/RepasseEscolar/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar repasse escolar ${id}:`, error);
      throw error;
    }
  }
}

export default RepasseEscolarService;
