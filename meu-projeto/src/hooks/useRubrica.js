import { useState, useCallback } from 'react';
import RubricaService from '../services/RubricaService';
import { useNotification } from './useNotification';
import { APIErrorHandler } from '../core/config/axios';

export function useRubrica() {
  const [rubricas, setRubricas] = useState([]);
  const [rubricaSelecionada, setRubricaSelecionada] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  // Busca paginada de rubricas
  const fetchRubricas = useCallback(async (page = 1, pageSize = 10, sortBy = 'nome', sortOrder = 'asc') => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await RubricaService.getAllRubricas(page, pageSize, sortBy, sortOrder);
      setRubricas(result.data);
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

  // Buscar rubrica por ID
  const fetchRubricaById = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const rubrica = await RubricaService.getRubricaById(id);
      setRubricaSelecionada(rubrica);
      return rubrica;
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      setError(errorMessage);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Criar rubrica
  const createRubrica = useCallback(async (dadosRubrica) => {
    setIsLoading(true);
    try {
      const novaRubrica = await RubricaService.createRubrica(dadosRubrica);
      showNotification('Rubrica criada com sucesso!', 'success');
      setRubricas(prev => [...prev, novaRubrica]);
      return novaRubrica;
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Atualizar rubrica
  const updateRubrica = useCallback(async (id, dadosRubrica) => {
    setIsLoading(true);
    try {
      const rubricaAtualizada = await RubricaService.updateRubrica(id, dadosRubrica);
      showNotification('Rubrica atualizada com sucesso!', 'success');
      setRubricas(prev => prev.map(r => r.id === id ? rubricaAtualizada : r));
      return rubricaAtualizada;
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Deletar rubrica
  const deleteRubrica = useCallback(async (id) => {
    setIsLoading(true);
    try {
      await RubricaService.deleteRubrica(id);
      showNotification('Rubrica deletada com sucesso!', 'success');
      // Remover a rubrica da lista atual
      setRubricas(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      const errorMessage = APIErrorHandler.getErrorMessage(err);
      showNotification(errorMessage, 'error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  return {
    rubricas,
    rubricaSelecionada,
    pagination,
    isLoading,
    error,
    fetchRubricas,
    fetchRubricaById,
    createRubrica,
    updateRubrica,
    deleteRubrica,
    setRubricaSelecionada
  };
}
