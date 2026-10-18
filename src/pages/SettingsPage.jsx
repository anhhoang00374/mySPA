import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useApp, ACCENT_THEMES } from '../context/AppContext';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
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

  const queryParamsList = Array.from(searchParams.entries());

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
              Trang số 3: Tuỳ biến giao diện động, kiểm tra Query Params và xem lịch sử điều hướng SPA
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

      {/* Query Parameters Inspector Section */}
      <div className="settings-section" style={{ border: queryParamsList.length > 0 ? '1px solid var(--primary-accent)' : undefined }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 className="settings-heading" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🔍</span> Bộ Kiểm Tra URL Query Parameters
              {queryParamsList.length > 0 && (
                <span className="badge-tag" style={{ background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary-accent)', borderColor: 'var(--primary-accent)' }}>
                  {queryParamsList.length} tham số phát hiện
                </span>
              )}
            </h2>
            <p className="settings-sub" style={{ marginBottom: 0 }}>
              Hệ thống đã hỗ trợ đầy đủ nhận Query Param ở cả <code>/setting?key=value</code> và <code>/settings?key=value</code> mà không bị lỗi trang.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              className="btn-back"
              style={{ fontSize: '0.8rem', color: 'var(--primary-accent)' }}
              onClick={() => setSearchParams({ key: 'value', pscenario: 'pscenario-SPA' })}
            >
              + Gán ?key=value
            </button>
            {queryParamsList.length > 0 && (
              <button
                className="btn-back"
                style={{ fontSize: '0.8rem' }}
                onClick={() => setSearchParams({})}
              >
                ✕ Xoá Params
              </button>
            )}
          </div>
        </div>

        {queryParamsList.length > 0 ? (
          <div className="logs-table-wrapper" style={{ marginTop: '1rem' }}>
            <table className="logs-table">
              <thead>
                <tr>
                  <th>Tên Param (Key)</th>
                  <th>Giá Trị (Value)</th>
                  <th>Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {queryParamsList.map(([key, value], idx) => (
                  <tr key={idx}>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary-accent)', fontWeight: 700 }}>
                      {key}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: '#fff' }}>
                      {value}
                    </td>
                    <td>
                      <span className="badge-tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                        ✓ Sẵn sàng cho Kuzen Tag & SPA
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.02)', 
            padding: '1rem', 
            borderRadius: '10px', 
            marginTop: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-dim)'
          }}>
            ℹ️ Hiện chưa có query param nào trên URL. Bạn có thể gõ trực tiếp trên thanh địa chỉ ví dụ: <code>/setting?key=value</code> hoặc bấm nút <strong>"+ Gán ?key=value"</strong> ở trên.
          </div>
        )}
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
