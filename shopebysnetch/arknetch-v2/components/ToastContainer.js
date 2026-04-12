'use client';
import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);

export default function ToastContainer({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((title, message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span className="toast-icon">{t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : t.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
            <div className="toast-body">
              <div className="toast-title">{t.title}</div>
              <div className="toast-text">{t.message}</div>
            </div>
            <span className="toast-close" onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}>✕</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
