import { useState, useCallback } from 'react';
import FornecedorService from '../services/FornecedorService';
import { useNotification } from './useNotification';
import { APIErrorHandler } from '../core/config/axios';

export function useFornecedor() {
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  // Busca paginada de fornecedores
  const fetchFornecedores = useCallback(async (page = 1, pageSize = 10, sortBy = 'nome', sortOrder = 'asc') => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await FornecedorService.getAllFornecedores(page, pageSize, sortBy, sortOrder);
      setFornecedores(result.data);
      setPagination({
        page: result.page,
        pageSize: result.pageSize,
        total: result.total
      });
      return result;
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      setError(errorMessage);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Buscar fornecedor por ID
  const fetchFornecedorById = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const fornecedor = await FornecedorService.getFornecedorById(id);
      setFornecedorSelecionado(fornecedor);
      return fornecedor;
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      setError(errorMessage);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Buscar fornecedor por CNPJ
  const fetchFornecedorByCNPJ = useCallback(async (cnpj) => {
    setIsLoading(true);
    setError(null);
    try {
      const fornecedor = await FornecedorService.getFornecedorByCNPJ(cnpj);
      setFornecedorSelecionado(fornecedor);
      return fornecedor;
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      setError(errorMessage);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Busca por nome
  const searchFornecedoresByNome = useCallback(async (nome, page = 1, pageSize = 10) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await FornecedorService.searchFornecedoresByNome(nome, page, pageSize);
      setFornecedores(result.data);
      setPagination({
        page: result.page,
        pageSize: result.pageSize,
        total: result.total
      });
      return result;
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      setError(errorMessage);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Criar fornecedor
  const createFornecedor = useCallback(async (dadosFornecedor) => {
    setIsLoading(true);
    try {
      const novoFornecedor = await FornecedorService.createFornecedor(dadosFornecedor);
      showNotification('Fornecedor criado com sucesso!', 'success');
      return novoFornecedor;
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Atualizar fornecedor
  const updateFornecedor = useCallback(async (id, dadosFornecedor) => {
    setIsLoading(true);
    try {
      const fornecedorAtualizado = await FornecedorService.updateFornecedor(id, dadosFornecedor);
      showNotification('Fornecedor atualizado com sucesso!', 'success');
      return fornecedorAtualizado;
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Deletar fornecedor
  const deleteFornecedor = useCallback(async (id) => {
    setIsLoading(true);
    try {
      await FornecedorService.deleteFornecedor(id);
      showNotification('Fornecedor deletado com sucesso!', 'success');
      // Remover o fornecedor da lista atual
      setFornecedores(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  return {
    fornecedores,
    fornecedorSelecionado,
    pagination,
    isLoading,
    error,
    fetchFornecedores,
    fetchFornecedorById,
    fetchFornecedorByCNPJ,
    searchFornecedoresByNome,
    createFornecedor,
    updateFornecedor,
    deleteFornecedor,
    setFornecedorSelecionado
  };
}
