import api from '../core/config/axios';

class RubricaService {
  // Buscar todas as rubricas com paginação
  static async getAllRubricas(page = 1, pageSize = 10, sortBy = 'nome', sortOrder = 'asc') {
    try {
      const response = await api.get('/Rubrica', {
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
      console.error('Erro ao buscar rubricas:', error);
      throw error;
    }
  }

  // Buscar rubrica por ID
  static async getRubricaById(id) {
    try {
      const response = await api.get(`/Rubrica/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar rubrica ${id}:`, error);
      throw error;
    }
  }

  // Criar nova rubrica
  static async createRubrica(dadosRubrica) {
    try {
      const response = await api.post('/Rubrica', dadosRubrica);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar rubrica:', error);
      throw error;
    }
  }

  // Atualizar rubrica
  static async updateRubrica(id, dadosRubrica) {
    try {
      const response = await api.put(`/Rubrica/${id}`, dadosRubrica);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar rubrica ${id}:`, error);
      throw error;
    }
  }

  // Deletar rubrica
  static async deleteRubrica(id) {
    try {
      const response = await api.delete(`/Rubrica/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar rubrica ${id}:`, error);
      throw error;
    }
  }
}

export default RubricaService;
