import api from '../core/config/axios';

class EscolaService {
  // Método de busca com paginação
  static async getAllEscolas(page = 1, pageSize = 10, sortBy = 'nome', sortOrder = 'asc') {
    try {
      const response = await api.get('/Escolas', {
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
      console.error('Erro ao buscar escolas:', error);
      throw error;
    }
  }

  // Método de busca avançada com múltiplos filtros
  static async searchEscolas(filters = {}) {
    try {
      const response = await api.post('/Escolas/search', {
        nome: filters.nome,
        regiao: filters.regiao,
        classificacao: filters.classificacao,
        tipoEnsino: filters.tipoEnsino,
        page: filters.page || 1,
        pageSize: filters.pageSize || 10
      });
      return {
        data: response.data.data,
        total: response.data.total,
        page: response.data.page,
        pageSize: response.data.pageSize
      };
    } catch (error) {
      console.error('Erro na busca avançada de escolas:', error);
      throw error;
    }
  }

  // Método para criar escola
  static async createEscola(dadosEscola) {
    try {
      const response = await api.post('/Escolas', dadosEscola);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar escola:', error);
      throw error;
    }
  }

  // Método para atualizar escola
  static async updateEscola(id, dadosEscola) {
    try {
      const response = await api.put(`/Escolas/${id}`, dadosEscola);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar escola:', error);
      throw error;
    }
  }
}

export default EscolaService;
