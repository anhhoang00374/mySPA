import { NavLink, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { sessionUptime, globalCounter, setGlobalCounter, routeTransitions } = useApp();

  const formatUptime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <header className="main-header">
      <Link to="/" className="brand-section">
        <div className="brand-icon">⚡</div>
        <div>
          <div className="brand-title">React SPA Lab</div>
          <div className="brand-subtitle">Single Page Application Testbed</div>
        </div>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span>🏠</span> Trang Chủ
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span>📊</span> Analytics
        </NavLink>
        <NavLink to="/showcase" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span>🎨</span> Showcase
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <span>⚙️</span> Cài Đặt
        </NavLink>
      </nav>

      <div className="header-telemetry">
        {/* Global State Counter test */}
        <div className="global-counter-widget" title="Biến state toàn cục - Chứng minh không bị mất khi đổi trang!">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Global State:</span>
          <button 
            className="counter-btn" 
            onClick={() => setGlobalCounter((c) => c - 1)}
            title="Giảm 1"
          >
            -
          </button>
          <span className="counter-value">{globalCounter}</span>
          <button 
            className="counter-btn" 
            onClick={() => setGlobalCounter((c) => c + 1)}
            title="Tăng 1"
          >
            +
          </button>
        </div>

        {/* Persistent Session Timer */}
        <div className="uptime-badge" title="Bộ đếm thời gian liên tục - Không bao giờ reset khi chuyển trang!">
          <div className="pulse-dot"></div>
          <span>Uptime: {formatUptime(sessionUptime)}</span>
        </div>
      </div>
    </header>
  );
}
