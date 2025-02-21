import api from '../core/config/axios';
import { masks } from '../core/utils/masks';

class FornecedorService {
  // Buscar todos os fornecedores com paginação
  static async getAllFornecedores(page = 1, pageSize = 10, sortBy = 'nome', sortOrder = 'asc') {
    try {
      const response = await api.get('/Fornecedor', {
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
      console.error('Erro ao buscar fornecedores:', error);
      throw error;
    }
  }

  // Buscar fornecedor por ID
  static async getFornecedorById(id) {
    try {
      const response = await api.get(`/Fornecedor/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar fornecedor ${id}:`, error);
      throw error;
    }
  }

  // Buscar fornecedor por CNPJ
  static async getFornecedorByCNPJ(cnpj) {
    try {
      // Remove máscara antes de enviar
      const cleanCNPJ = masks.unmask(cnpj);
      const response = await api.get(`/Fornecedor/get/${cleanCNPJ}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar fornecedor por CNPJ ${cnpj}:`, error);
      throw error;
    }
  }

  // Busca por nome
  static async searchFornecedoresByNome(nome, page = 1, pageSize = 10) {
    try {
      const response = await api.get(`/Fornecedor/search/${nome}`, {
        params: { page, pageSize }
      });
      return {
        data: response.data.data,
        total: response.data.total,
        page: response.data.page,
        pageSize: response.data.pageSize
      };
    } catch (error) {
      console.error(`Erro ao buscar fornecedores por nome ${nome}:`, error);
      throw error;
    }
  }

  // Criar novo fornecedor
  static async createFornecedor(dadosFornecedor) {
    try {
      // Remove máscara de CNPJ antes de enviar
      const fornecedorData = {
        ...dadosFornecedor,
        cnpj: masks.unmask(dadosFornecedor.cnpj)
      };

      const response = await api.post('/Fornecedor', fornecedorData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar fornecedor:', error);
      throw error;
    }
  }

  // Atualizar fornecedor
  static async updateFornecedor(id, dadosFornecedor) {
    try {
      // Remove máscara de CNPJ antes de enviar
      const fornecedorData = {
        ...dadosFornecedor,
        cnpj: masks.unmask(dadosFornecedor.cnpj)
      };

      const response = await api.put(`/Fornecedor/${id}`, fornecedorData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar fornecedor ${id}:`, error);
      throw error;
    }
  }

  // Deletar fornecedor
  static async deleteFornecedor(id) {
    try {
      const response = await api.delete(`/Fornecedor/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar fornecedor ${id}:`, error);
      throw error;
    }
  }
}

export default FornecedorService;
