import { useNavigate, Link } from 'react-router-dom';
import { useApp, ACCENT_THEMES } from '../context/AppContext';

export default function SettingsPage() {
  const navigate = useNavigate();
  const {
    activeAccent,
    setActiveAccent,
    globalCounter,
    setGlobalCounter,
    navigationLogs,
    clearLogs,
    routeTransitions,
    initialLoadTime,
  } = useApp();

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-left">
          <button 
            id="btn-back-home"
            className="btn-back" 
            onClick={() => navigate('/')}
            title="Quay lại trang chủ"
          >
            ← Quay lại Trang Chủ
          </button>
          <div>
            <h1 className="page-title">⚙️ System Control & Settings</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Trang số 3: Tuỳ biến giao diện động và xem lịch sử điều hướng SPA thời gian thực
            </p>
          </div>
        </div>

        <div className="page-actions">
          <Link to="/analytics" className="btn-back">
            ← Sang Analytics (Trang 1)
          </Link>
          <Link to="/showcase" className="btn-back">
            ← Sang Showcase (Trang 2)
          </Link>
        </div>
      </div>

      {/* Theme Accent Picker */}
      <div className="settings-section">
        <h2 className="settings-heading">🎨 Thay Đổi Màu Sắc Chủ Đạo (Theme Accent)</h2>
        <p className="settings-sub">
          Khi bạn chọn màu mới, CSS Variable <code>--primary-accent</code> được cập nhật toàn bộ ứng dụng ngay lập tức mà không cần reload trang.
        </p>

        <div className="color-swatches">
          {ACCENT_THEMES.map((theme) => (
            <button
              key={theme.id}
              className={`color-swatch-btn ${activeAccent.id === theme.id ? 'active' : ''}`}
              onClick={() => setActiveAccent(theme)}
            >
              <div 
                className="swatch-circle" 
                style={{ background: theme.color, boxShadow: `0 0 10px ${theme.color}` }}
              />
              <span>{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SPA State Management */}
      <div className="settings-section">
        <h2 className="settings-heading">🧪 Điều Khiển State Khắp Ứng Dụng</h2>
        <p className="settings-sub">
          Kiểm tra giá trị biến toàn cục và điều chỉnh trực tiếp từ trang Cài Đặt này.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Giá trị Global Counter:</span>
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '1.4rem', 
              fontWeight: 800, 
              color: 'var(--primary-accent)',
              minWidth: '40px' 
            }}>
              {globalCounter}
            </span>
          </div>

          <button
            className="btn-back"
            onClick={() => setGlobalCounter((c) => c + 5)}
            style={{ color: 'var(--primary-accent)' }}
          >
            + Tăng 5 đơn vị
          </button>

          <button
            className="btn-back"
            onClick={() => setGlobalCounter(0)}
          >
            ↺ Đặt lại về 0
          </button>
        </div>
      </div>

      {/* Real-time SPA Navigation Logs */}
      <div className="settings-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 className="settings-heading" style={{ marginBottom: '0.2rem' }}>
              📜 Nhật Ký Lịch Sử Điều Hướng SPA (Real-time Audit Log)
            </h2>
            <p className="settings-sub" style={{ marginBottom: 0 }}>
              Ghi lại mỗi khi bạn nhấn nút chuyển trang. Tất cả đều là Client-side DOM Swap với thời gian reload = 0ms.
            </p>
          </div>

          <button
            className="btn-back"
            onClick={clearLogs}
            style={{ fontSize: '0.8rem' }}
          >
            🗑 Xoá Nhật Ký
          </button>
        </div>

        <div className="logs-table-wrapper">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Thời Gian</th>
                <th>Từ Route (From)</th>
                <th>Đến Route (To)</th>
                <th>Hình Thức Chuyển Đổi</th>
              </tr>
            </thead>
            <tbody>
              {navigationLogs.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-dim)' }}>
                    Chưa có lượt chuyển trang nào được ghi lại. Hãy thử bấm chuyển qua các trang khác!
                  </td>
                </tr>
              ) : (
                navigationLogs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{log.timestamp}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{log.from}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary-accent)', fontWeight: 700 }}>
                      {log.to}
                    </td>
                    <td>
                      <span className="badge-tag">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Nav Footer */}
      <div className="quick-nav-panel">
        <div>
          <div style={{ fontWeight: 700, color: '#fff' }}>Đang ở Trang 3 (Cài Đặt Hệ Thống)</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Tiếp tục thử nghiệm chuyển trang:</div>
        </div>
        <div className="quick-nav-buttons">
          <button className="btn-back" onClick={() => navigate('/')}>🏠 Về Trang Chủ</button>
          <button className="btn-back" onClick={() => navigate('/analytics')}>📊 Sang Trang Analytics</button>
          <button className="btn-back" onClick={() => navigate('/showcase')}>🎨 Sang Trang Showcase</button>
        </div>
      </div>
    </div>
  );
}
