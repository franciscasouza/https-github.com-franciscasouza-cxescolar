import { useState, useCallback } from 'react';
import RepasseEscolarService from '../services/RepasseEscolarService';
import { useNotification } from './useNotification';
import { APIErrorHandler } from '../core/config/axios';

export function useRepasseEscolar() {
  const [repassesEscolares, setRepassesEscolares] = useState([]);
  const [repasseEscolarSelecionado, setRepasseEscolarSelecionado] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  // Busca paginada de repasses escolares
  const fetchRepassesEscolares = useCallback(async (page = 1, pageSize = 10, sortBy = 'data', sortOrder = 'desc') => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await RepasseEscolarService.getAllRepassesEscolares(page, pageSize, sortBy, sortOrder);
      setRepassesEscolares(result.data);
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

  // Buscar repasse escolar por ID
  const fetchRepasseEscolarById = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const repasseEscolar = await RepasseEscolarService.getRepasseEscolarById(id);
      setRepasseEscolarSelecionado(repasseEscolar);
      return repasseEscolar;
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      setError(errorMessage);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Buscar repasses escolares por classificação
  const fetchRepasseEscolarByClassificacao = useCallback(async (classificacao, page = 1, pageSize = 10) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await RepasseEscolarService.getRepasseEscolarByClassificacao(classificacao, page, pageSize);
      setRepassesEscolares(result.data);
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

  // Criar repasse escolar
  const createRepasseEscolar = useCallback(async (dadosRepasseEscolar) => {
    setIsLoading(true);
    try {
      const novoRepasseEscolar = await RepasseEscolarService.createRepasseEscolar(dadosRepasseEscolar);
      showNotification('Repasse escolar criado com sucesso!', 'success');
      return novoRepasseEscolar;
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Atualizar repasse escolar
  const updateRepasseEscolar = useCallback(async (id, dadosRepasseEscolar) => {
    setIsLoading(true);
    try {
      const repasseEscolarAtualizado = await RepasseEscolarService.updateRepasseEscolar(id, dadosRepasseEscolar);
      showNotification('Repasse escolar atualizado com sucesso!', 'success');
      return repasseEscolarAtualizado;
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Deletar repasse escolar
  const deleteRepasseEscolar = useCallback(async (id) => {
    setIsLoading(true);
    try {
      await RepasseEscolarService.deleteRepasseEscolar(id);
      showNotification('Repasse escolar deletado com sucesso!', 'success');
      // Remover o repasse escolar da lista atual
      setRepassesEscolares(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  return {
    repassesEscolares,
    repasseEscolarSelecionado,
    pagination,
    isLoading,
    error,
    fetchRepassesEscolares,
    fetchRepasseEscolarById,
    fetchRepasseEscolarByClassificacao,
    createRepasseEscolar,
    updateRepasseEscolar,
    deleteRepasseEscolar,
    setRepasseEscolarSelecionado
  };
}
