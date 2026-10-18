import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { globalCounter, setGlobalCounter, routeTransitions } = useApp();

  return (
    <div className="page-wrapper">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-tag">
          <span>🚀</span> Kiểm Thử Cơ Chế Điều Hướng SPA (Single Page Application)
        </div>
        <h1 className="hero-title">
          Trải Nghiệm Chuyển Trang <span className="gradient-text">Siêu Tốc Không Reload</span>
        </h1>
        <p className="hero-desc">
          Trong mô hình Single Page Application (SPA), toàn bộ ứng dụng chỉ tải một file HTML duy nhất. 
          Khi bạn nhấn chuyển trang, JavaScript (React Router) sẽ chặn tải lại trình duyệt, cập nhật URL 
          thông qua History API và hoán đổi thành phần hiển thị ngay lập tức trong chớp mắt!
        </p>
      </section>

      {/* 3 Main Navigation Buttons Section */}
      <section className="nav-cards-section">
        <div className="section-label">
          <div className="section-title">
            <span>🎯</span> 3 Nút Chuyển Trang Trực Quan (Index Navigation)
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Chọn 1 trong 3 nút bên dưới để kiểm tra tốc độ chuyển trang
          </span>
        </div>

        <div className="cards-grid">
          {/* Card 1: Analytics */}
          <div 
            className="nav-card" 
            style={{ 
              '--card-accent': '#06b6d4', 
              '--card-glow': 'rgba(6, 182, 212, 0.35)' 
            }}
          >
            <div className="card-top">
              <span className="card-badge" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                Trang 1 • /analytics
              </span>
              <div className="card-icon-box" style={{ color: '#06b6d4' }}>
                📊
              </div>
              <h2 className="card-title">Analytics & Metrics Hub</h2>
              <p className="card-summary">
                Màn hình thống kê dữ liệu thời gian thực, biểu đồ so sánh độ trễ giữa SPA (15ms) và MPA truyền thống (850ms).
              </p>
              <ul className="card-features">
                <li><span>✔</span> Biểu đồ so sánh tốc độ tải trang</li>
                <li><span>✔</span> Đồng hồ đo FPS và thông số Virtual DOM</li>
                <li><span>✔</span> Thêm dữ liệu mô phỏng theo thời gian thực</li>
              </ul>
            </div>
            
            <button 
              id="btn-goto-analytics"
              className="btn-navigate" 
              onClick={() => navigate('/analytics')}
            >
              <span>1. Chuyển Tới Trang Analytics</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Card 2: Showcase */}
          <div 
            className="nav-card" 
            style={{ 
              '--card-accent': '#a855f7', 
              '--card-glow': 'rgba(168, 85, 247, 0.35)' 
            }}
          >
            <div className="card-top">
              <span className="card-badge" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
                Trang 2 • /showcase
              </span>
              <div className="card-icon-box" style={{ color: '#a855f7' }}>
                🎨
              </div>
              <h2 className="card-title">Creative Showcase</h2>
              <p className="card-summary">
                Bộ sưu tập các dự án giao diện nghệ thuật, ứng dụng bộ lọc tương tác tức thì và hệ thống thả tim thời gian thực.
              </p>
              <ul className="card-features">
                <li><span>✔</span> Lọc danh mục động không cần fetch lại trang</li>
                <li><span>✔</span> Hiệu ứng Glassmorphism & tương tác hover</li>
                <li><span>✔</span> Thả tim từng thẻ và lưu trạng thái cục bộ</li>
              </ul>
            </div>

            <button 
              id="btn-goto-showcase"
              className="btn-navigate" 
              onClick={() => navigate('/showcase')}
            >
              <span>2. Chuyển Tới Trang Showcase</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Card 3: Settings */}
          <div 
            className="nav-card" 
            style={{ 
              '--card-accent': '#10b981', 
              '--card-glow': 'rgba(16, 185, 129, 0.35)' 
            }}
          >
            <div className="card-top">
              <span className="card-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                Trang 3 • /settings
              </span>
              <div className="card-icon-box" style={{ color: '#10b981' }}>
                ⚙️
              </div>
              <h2 className="card-title">System & Settings</h2>
              <p className="card-summary">
                Bảng điều khiển tuỳ biến giao diện: đổi màu chủ đạo (Accent Color) trực tiếp toàn trang và xem lịch sử điều hướng SPA.
              </p>
              <ul className="card-features">
                <li><span>✔</span> Đổi tông màu Neon toàn ứng dụng tức thì</li>
                <li><span>✔</span> Bảng nhật ký ghi lại các lượt chuyển trang (0ms)</li>
                <li><span>✔</span> Nút reset dữ liệu kiểm thử</li>
              </ul>
            </div>

            <button 
              id="btn-goto-settings"
              className="btn-navigate" 
              onClick={() => navigate('/settings')}
            >
              <span>3. Chuyển Tới Trang Cài Đặt</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive SPA Proof Box */}
      <section style={{ 
        background: 'rgba(255, 255, 255, 0.02)', 
        border: '1px solid var(--border-subtle)', 
        borderRadius: '16px', 
        padding: '1.75rem', 
        margin: '2rem 0' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.35rem' }}>
              🧪 Thử Nghiệm Giữ Trạng Thái (State Persistence Test)
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Hãy thử bấm tăng giá trị bộ đếm này, sau đó dùng 1 trong 3 nút trên để chuyển trang. Khi bạn quay lại, giá trị vẫn còn nguyên vẹn vì trang web chưa từng bị tải lại!
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              className="counter-btn" 
              style={{ width: '38px', height: '38px', fontSize: '1.2rem' }}
              onClick={() => setGlobalCounter(c => c - 1)}
            >
              -
            </button>
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '1.75rem', 
              fontWeight: 800, 
              minWidth: '50px', 
              textAlign: 'center', 
              color: 'var(--primary-accent)' 
            }}>
              {globalCounter}
            </span>
            <button 
              className="counter-btn" 
              style={{ width: '38px', height: '38px', fontSize: '1.2rem' }}
              onClick={() => setGlobalCounter(c => c + 1)}
            >
              +
            </button>
          </div>
        </div>
      </section>

      {/* How SPA Works Explanation Box */}
      <section className="spa-guide-box">
        <div className="guide-header">
          <div className="guide-icon">💡</div>
          <div className="guide-title">SPA (Single Page Application) Hoạt Động Như Thế Nào Dưới Hậu Trường?</div>
        </div>

        <div className="guide-grid">
          <div className="guide-item">
            <div className="guide-num">1</div>
            <div className="guide-heading">Không Reload HTML</div>
            <div className="guide-text">
              Trong website truyền thống (MPA), mỗi lần click link trình duyệt sẽ gửi request tải lại nguyên trang HTML trắng. Trong SPA, trình duyệt chỉ tải bundle một lần duy nhất lúc bắt đầu.
            </div>
          </div>

          <div className="guide-item">
            <div className="guide-num">2</div>
            <div className="guide-heading">HTML5 History API</div>
            <div className="guide-text">
              React Router gọi <code>history.pushState()</code> để cập nhật thanh địa chỉ URL mà không kích hoạt trình duyệt fetch lại trang mới từ server. Nút Back / Forward vẫn hoạt động chuẩn xác!
            </div>
          </div>

          <div className="guide-item">
            <div className="guide-num">3</div>
            <div className="guide-heading">Virtual DOM Swapping</div>
            <div className="guide-text">
              React so sánh sự khác biệt (diffing) và chỉ hoán đổi component nội dung tương ứng vào thẻ <code>&lt;div id="root"&gt;</code> trong vài mili-giây với hiệu ứng mượt mà.
            </div>
          </div>

          <div className="guide-item">
            <div className="guide-num">4</div>
            <div className="guide-heading">Bảo Toàn State Toàn Cục</div>
            <div className="guide-text">
              Các biến bộ nhớ JavaScript (như biến đếm, thông tin đăng nhập, nhạc đang phát ngầm, bộ đếm uptime) vẫn tồn tại nguyên vẹn xuyên suốt mọi thao tác chuyển trang.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
