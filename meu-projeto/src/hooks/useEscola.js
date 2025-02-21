import { useState, useCallback } from 'react';
import EscolaService from '../services/EscolaService';
import { useNotification } from './useNotification';
import { APIErrorHandler } from '../core/config/axios';

export function useEscola() {
  const [escolas, setEscolas] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  // Busca paginada de escolas
  const fetchEscolas = useCallback(async (page = 1, pageSize = 10, sortBy = 'nome', sortOrder = 'asc') => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await EscolaService.getAllEscolas(page, pageSize, sortBy, sortOrder);
      setEscolas(result.data);
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

  // Busca avançada com múltiplos filtros
  const searchEscolas = useCallback(async (filters = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await EscolaService.searchEscolas({
        ...filters,
        page: filters.page || 1,
        pageSize: filters.pageSize || 10
      });
      setEscolas(result.data);
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

  // Método para criar escola
  const createEscola = useCallback(async (dadosEscola) => {
    setIsLoading(true);
    try {
      const novaEscola = await EscolaService.createEscola(dadosEscola);
      showNotification('Escola criada com sucesso!', 'success');
      return novaEscola;
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Método para atualizar escola
  const updateEscola = useCallback(async (id, dadosEscola) => {
    setIsLoading(true);
    try {
      const escolaAtualizada = await EscolaService.updateEscola(id, dadosEscola);
      showNotification('Escola atualizada com sucesso!', 'success');
      return escolaAtualizada;
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  return {
    escolas,
    pagination,
    isLoading,
    error,
    fetchEscolas,
    searchEscolas,
    createEscola,
    updateEscola
  };
}
