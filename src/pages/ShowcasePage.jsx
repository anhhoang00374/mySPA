import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PROJECTS = [
  {
    id: 1,
    title: 'Neural Vision AI',
    category: 'ai',
    tag: 'Trí Tuệ Nhân Tạo',
    emoji: '🧠',
    color: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    desc: 'Hệ thống nhận diện thị giác máy tính chạy trực tiếp trên trình duyệt bằng WebAssembly và WebGPU.',
    likes: 142,
  },
  {
    id: 2,
    title: 'Holographic Cyber HUD',
    category: 'ui',
    tag: 'Giao Diện Web',
    emoji: '🔮',
    color: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
    desc: 'Bộ linh kiện UI phong cách viễn tưởng 3D tương tác cảm ứng không gian ba chiều đa nền tảng.',
    likes: 89,
  },
  {
    id: 3,
    title: 'Quantum Cloud Mesh',
    category: 'tech',
    tag: 'Công Nghệ Mới',
    emoji: '⚡',
    color: 'linear-gradient(135deg, #10b981, #06b6d4)',
    desc: 'Mạng lưới tính toán phân tán không máy chủ với độ trễ cực thấp dưới 1ms cho ứng dụng thời gian thực.',
    likes: 215,
  },
  {
    id: 4,
    title: 'Autonomous Synth Lab',
    category: 'ai',
    tag: 'Trí Tuệ Nhân Tạo',
    emoji: '🎵',
    color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    desc: 'Phòng thí nghiệm âm thanh tự động hoá tổng hợp sóng hài và giai điệu bằng mô hình học sâu.',
    likes: 67,
  },
  {
    id: 5,
    title: 'Glassmorphism Design Kit',
    category: 'ui',
    tag: 'Giao Diện Web',
    emoji: '💎',
    color: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    desc: 'Thư viện CSS hiện đại mô phỏng hiệu ứng khúc xạ thuỷ tinh mờ chuẩn công nghiệp cho web hiện đại.',
    likes: 312,
  },
  {
    id: 6,
    title: 'Edge Stream Protocol',
    category: 'tech',
    tag: 'Công Nghệ Mới',
    emoji: '🌐',
    color: 'linear-gradient(135deg, #3b82f6, #10b981)',
    desc: 'Giao thức truyền dữ liệu hai chiều WebSockets tối ưu hoá băng thông cho hệ sinh thái SPA mở rộng.',
    likes: 178,
  },
];

export default function ShowcasePage() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [likesState, setLikesState] = useState(() => {
    const map = {};
    PROJECTS.forEach(p => { map[p.id] = p.likes; });
    return map;
  });

  const handleLike = (id) => {
    setLikesState((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const filteredProjects = selectedFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedFilter);

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
            <h1 className="page-title">🎨 Creative Showcase Studio</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Trang số 2: Bộ sưu tập thiết kế & tương tác lọc danh mục mượt mà không tải lại trang
            </p>
          </div>
        </div>

        <div className="page-actions">
          <Link to="/analytics" className="btn-back">
            ← Sang Analytics (Trang 1)
          </Link>
          <Link to="/settings" className="btn-back" style={{ color: 'var(--primary-accent)' }}>
            Sang Cài Đặt (Trang 3) →
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          className={`filter-tab ${selectedFilter === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('all')}
        >
          🌟 Tất Cả Dự Án ({PROJECTS.length})
        </button>
        <button
          className={`filter-tab ${selectedFilter === 'ai' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('ai')}
        >
          🧠 Trí Tuệ Nhân Tạo
        </button>
        <button
          className={`filter-tab ${selectedFilter === 'ui' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('ui')}
        >
          💎 Giao Diện Web
        </button>
        <button
          className={`filter-tab ${selectedFilter === 'tech' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('tech')}
        >
          ⚡ Công Nghệ Mới
        </button>
      </div>

      {/* Gallery Cards Grid */}
      <div className="gallery-grid">
        {filteredProjects.map((item) => (
          <div key={item.id} className="gallery-card">
            <div 
              className="gallery-preview" 
              style={{ background: item.color }}
            >
              <span>{item.emoji}</span>
              <span 
                style={{ 
                  position: 'absolute', 
                  bottom: '10px', 
                  right: '10px', 
                  fontSize: '0.72rem', 
                  background: 'rgba(0,0,0,0.6)', 
                  padding: '3px 8px', 
                  borderRadius: '12px',
                  fontWeight: 600,
                  backdropFilter: 'blur(4px)'
                }}
              >
                {item.tag}
              </span>
            </div>

            <div className="gallery-info">
              <h3 className="gallery-title">{item.title}</h3>
              <p className="gallery-desc">{item.desc}</p>

              <div className="gallery-footer">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  Project #{item.id}
                </span>

                <button 
                  className="like-btn"
                  onClick={() => handleLike(item.id)}
                  title="Bấm thả tim để thử phản hồi tức thì"
                >
                  <span>❤️</span>
                  <span style={{ fontWeight: 700 }}>{likesState[item.id]}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Nav Footer */}
      <div className="quick-nav-panel">
        <div>
          <div style={{ fontWeight: 700, color: '#fff' }}>Đang ở Trang 2 (Creative Showcase)</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Tiếp tục thử nghiệm các trang khác:</div>
        </div>
        <div className="quick-nav-buttons">
          <button className="btn-back" onClick={() => navigate('/')}>🏠 Về Trang Chủ</button>
          <button className="btn-back" onClick={() => navigate('/analytics')}>📊 Sang Trang Analytics</button>
          <button className="btn-back" onClick={() => navigate('/settings')}>⚙️ Sang Trang Cài Đặt</button>
        </div>
      </div>
    </div>
  );
}
