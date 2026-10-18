import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AppContext = createContext(null);

export const ACCENT_THEMES = [
  { id: 'indigo', name: 'Neon Indigo', color: '#6366f1', glow: 'rgba(99, 102, 241, 0.4)' },
  { id: 'cyan', name: 'Cyber Cyan', color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)' },
  { id: 'emerald', name: 'Matrix Emerald', color: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
  { id: 'rose', name: 'Hyper Rose', color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.4)' },
  { id: 'amber', name: 'Solar Amber', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
  { id: 'purple', name: 'Cosmic Violet', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)' },
];

export function AppProvider({ children }) {
  // Constant initial timestamp to prove page has NEVER reloaded!
  const [initialLoadTime] = useState(() => {
    const d = new Date();
    return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + 
           '.' + String(d.getMilliseconds()).padStart(3, '0');
  });

  const [sessionUptime, setSessionUptime] = useState(0);
  const [globalCounter, setGlobalCounter] = useState(0);
  const [routeTransitions, setRouteTransitions] = useState(0);
  const [activeAccent, setActiveAccent] = useState(ACCENT_THEMES[0]);
  const [navigationLogs, setNavigationLogs] = useState([]);
  const previousPathRef = useRef('/');

  // Session timer ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update CSS custom property whenever theme changes
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-accent', activeAccent.color);
    document.documentElement.style.setProperty('--primary-glow', activeAccent.glow);
  }, [activeAccent]);

  // Record route change
  const recordNavigation = (newPath) => {
    const fromPath = previousPathRef.current;
    if (fromPath !== newPath) {
      setRouteTransitions((count) => count + 1);
      const timestamp = new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setNavigationLogs((prev) => [
        {
          id: Date.now() + Math.random(),
          timestamp,
          from: fromPath,
          to: newPath,
          status: '⚡ SPA DOM Swap (0ms reload)',
        },
        ...prev.slice(0, 19), // keep last 20 logs
      ]);
      previousPathRef.current = newPath;
    }
  };

  const clearLogs = () => setNavigationLogs([]);

  return (
    <AppContext.Provider
      value={{
        initialLoadTime,
        sessionUptime,
        globalCounter,
        setGlobalCounter,
        routeTransitions,
        activeAccent,
        setActiveAccent,
        navigationLogs,
        recordNavigation,
        clearLogs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}
