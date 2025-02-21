import { useState, useCallback } from 'react';

export const useNotification = () => {
  const [notification, setNotification] = useState({
    open: false,
    severity: 'info',
    message: ''
  });

  const showNotification = useCallback((message, severity = 'info') => {
    setNotification({
      open: true,
      severity,
      message
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, open: false }));
  }, []);

  return {
    notification,
    showNotification,
    hideNotification
  };
};
