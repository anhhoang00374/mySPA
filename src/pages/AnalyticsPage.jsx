import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const { routeTransitions, globalCounter, setGlobalCounter } = useApp();
  const [events, setEvents] = useState([
    { id: 1, name: 'Khởi tạo client bundle', time: '00:00:01', status: 'Hoàn tất' },
    { id: 2, name: 'Mount React Router DOM', time: '00:00:02', status: 'Hoàn tất' },
  ]);

  const addSimulatedEvent = () => {
    const d = new Date();
    const timeStr = d.toLocaleTimeString('vi-VN');
    const newId = events.length + 1;
    setEvents((prev) => [
      { id: newId, name: `Tác vụ xử lý dữ liệu #${newId}`, time: timeStr, status: 'Đang chạy ngầm' },
      ...prev,
    ]);
  };

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
            <h1 className="page-title">📊 Analytics & Performance Lab</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Trang số 1: Giám sát hiệu năng và so sánh tốc độ SPA với MPA truyền thống
            </p>
          </div>
        </div>

        <div className="page-actions">
          <Link to="/showcase" className="btn-back" style={{ color: 'var(--primary-accent)' }}>
            Sang Showcase (Trang 2) →
          </Link>
          <Link to="/settings" className="btn-back">
            Sang Cài Đặt (Trang 3) →
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-top">
            <span>TỐC ĐỘ CHUYỂN ROUTE</span>
            <span>⚡ Tối ưu</span>
          </div>
          <div className="metric-value">~12 ms</div>
          <div className="metric-delta">
            <span>↑ Nhanh hơn 98% so với tải lại toàn trang</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span>TỔNG LẦN SPA SWAP</span>
            <span>Bộ nhớ RAM</span>
          </div>
          <div className="metric-value">{routeTransitions}</div>
          <div className="metric-delta" style={{ color: 'var(--primary-accent)' }}>
            <span>Số lần hoán đổi DOM mà không reload</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span>TRẠNG THÁI TOÀN CỤC</span>
            <span>Preserved</span>
          </div>
          <div className="metric-value">{globalCounter}</div>
          <div className="metric-delta">
            <span>Giá trị đếm từ trang chủ vẫn còn!</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <span>YÊU CẦU MẠNG LẠI HTML</span>
            <span>Network Cost</span>
          </div>
          <div className="metric-value" style={{ color: 'var(--success)' }}>0 KB</div>
          <div className="metric-delta">
            <span>Không gửi thêm request HTML nào</span>
          </div>
        </div>
      </div>

      {/* Visual Speed Comparison Bar */}
      <div className="chart-box">
        <h2 className="chart-title">So Sánh Tốc Độ Điều Hướng: SPA vs MPA Truyền Thống</h2>
        <p className="chart-sub">
          Khi chuyển sang trang này, trình duyệt của bạn không hề tải lại HTML, CSS hay các thư viện JS. 
          Chỉ có component React của trang này được render vào DOM.
        </p>

        <div className="speed-comparison-row">
          <div className="speed-label">
            <span style={{ color: 'var(--success)', fontWeight: 700 }}>
              ⚡ SPA (Trang Hiện Tại) - Client Side Routing
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>12 ms</span>
          </div>
          <div className="speed-bar-track">
            <div className="speed-bar-fill fill-spa" style={{ width: '8%' }}></div>
          </div>
        </div>

        <div className="speed-comparison-row">
          <div className="speed-label">
            <span style={{ color: '#f43f5e', fontWeight: 700 }}>
              🐢 MPA (Mô hình cũ) - Full Page HTML Reload
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#f43f5e' }}>850 ms</span>
          </div>
          <div className="speed-bar-track">
            <div className="speed-bar-fill fill-mpa" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>

      {/* Interactive Local State Logger */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.25rem' }}>
              Danh Sách Sự Kiện Mô Phỏng Trong Trang Này
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Bấm nút bên phải để thêm sự kiện, sau đó chuyển sang trang khác và quay lại để xem phản ứng của React.
            </p>
          </div>
          <button 
            className="btn-navigate" 
            style={{ width: 'auto', padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
            onClick={addSimulatedEvent}
          >
            + Thêm Sự Kiện Mới
          </button>
        </div>

        <div className="logs-table-wrapper">
          <table className="logs-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên Tác Vụ</th>
                <th>Thời Gian Ghi Nhận</th>
                <th>Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.id}>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>#{ev.id}</td>
                  <td style={{ color: '#fff', fontWeight: 600 }}>{ev.name}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{ev.time}</td>
                  <td>
                    <span className="badge-tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                      {ev.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Nav Footer */}
      <div className="quick-nav-panel">
        <div>
          <div style={{ fontWeight: 700, color: '#fff' }}>Đang ở Trang 1 (Analytics)</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Bạn muốn kiểm tra tiếp chuyển hướng nào?</div>
        </div>
        <div className="quick-nav-buttons">
          <button className="btn-back" onClick={() => navigate('/')}>🏠 Về Trang Chủ</button>
          <button className="btn-back" onClick={() => navigate('/showcase')}>🎨 Sang Trang Showcase</button>
          <button className="btn-back" onClick={() => navigate('/settings')}>⚙️ Sang Trang Cài Đặt</button>
        </div>
      </div>
    </div>
  );
}
