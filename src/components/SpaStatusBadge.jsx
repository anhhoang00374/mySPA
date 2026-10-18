import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function SpaStatusBadge() {
  const location = useLocation();
  const { initialLoadTime, routeTransitions, recordNavigation } = useApp();

  useEffect(() => {
    recordNavigation(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return (
    <footer className="spa-diagnostics-bar">
      <div className="diag-left">
        <div className="diag-item">
          <span className="badge-tag">SPA REAL-TIME TELEMETRY</span>
        </div>
        <div className="diag-item">
          <span className="diag-label">Document Khởi Động Lúc:</span>
          <span className="diag-val">{initialLoadTime}</span>
        </div>
        <div className="diag-item">
          <span className="diag-label">Route Hiện Tại:</span>
          <span className="diag-val" style={{ color: 'var(--primary-accent)' }}>
            {location.pathname}{location.search}
          </span>
        </div>
      </div>

      <div className="diag-right">
        <div className="diag-item">
          <span className="diag-label">Số Lần Chuyển Trang (DOM Swaps):</span>
          <span className="diag-val">{routeTransitions}</span>
        </div>
        <div className="diag-item">
          <span className="badge-tag" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
            ⚡ 0 Reload Trình Duyệt (SPA Active)
          </span>
        </div>
      </div>
    </footer>
  );
}
