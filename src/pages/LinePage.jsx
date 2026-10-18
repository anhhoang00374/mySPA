import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function LinePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lineId = searchParams.get('line_id') || 'Chưa cung cấp line_id';
  const { globalCounter } = useApp();

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Xin chào! Tôi là Kuzen AI Bot. Tôi đã nhận diện phiên truy cập của bạn với LINE ID: "${lineId}".`,
      time: 'Vừa xong',
    },
    {
      id: 2,
      sender: 'user',
      text: 'Đây là trang thử nghiệm SPA, trang được chuyển tức thì mà không hề bị reload!',
      time: 'Vừa xong',
    },
    {
      id: 3,
      sender: 'bot',
      text: 'Chính xác! Tham số ?line_id trên URL được đọc trực tiếp qua React Router useSearchParams.',
      time: 'Vừa xong',
    },
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [newLineInput, setNewLineInput] = useState(lineId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputMsg,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [
      ...prev,
      newMsg,
      {
        id: Date.now() + 1,
        sender: 'bot',
        text: `Đã ghi nhận phản hồi từ ${lineId}: "${inputMsg}"`,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInputMsg('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(lineId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpdateLineId = (e) => {
    e.preventDefault();
    if (newLineInput.trim()) {
      setSearchParams({ line_id: newLineInput.trim() });
    }
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
            <h1 className="page-title">💬 LINE Integration & Messaging Hub</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Trang đích kiểm tra nhận diện tham số <code>?line_id</code> từ URL trên nền tảng SPA
            </p>
          </div>
        </div>

        <div className="page-actions">
          <Link to="/analytics" className="btn-back">
            📊 Analytics
          </Link>
          <Link to="/showcase" className="btn-back">
            🎨 Showcase
          </Link>
          <Link to="/settings" className="btn-back">
            ⚙️ Cài Đặt
          </Link>
        </div>
      </div>

      {/* Main Received LINE ID Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(6, 199, 85, 0.15), rgba(16, 185, 129, 0.05))',
        border: '1px solid rgba(6, 199, 85, 0.4)',
        borderRadius: '18px',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: '0 10px 30px -10px rgba(6, 199, 85, 0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span style={{ 
                background: '#06C755', 
                color: '#fff', 
                fontWeight: 800, 
                fontSize: '0.75rem', 
                padding: '3px 10px', 
                borderRadius: '6px' 
              }}>
                LINE PARAM DETECTED
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Query Param trên thanh địa chỉ URL:
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.95rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                ?line_id =
              </span>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '1.85rem', 
                fontWeight: 800, 
                color: '#06C755',
                wordBreak: 'break-all'
              }}>
                {lineId}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <button
              className="btn-back"
              onClick={handleCopy}
              style={{ background: 'rgba(6, 199, 85, 0.15)', borderColor: 'rgba(6, 199, 85, 0.3)', color: '#06C755' }}
            >
              {copied ? '✓ Đã Copy' : '📋 Copy line_id'}
            </button>
          </div>
        </div>

        {/* Quick change input right on this page */}
        <form onSubmit={handleUpdateLineId} style={{ marginTop: '1.25rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={newLineInput}
            onChange={(e) => setNewLineInput(e.target.value)}
            placeholder="Thay đổi line_id khác để thử nghiệm..."
            style={{
              flex: '1',
              minWidth: '240px',
              padding: '0.6rem 1rem',
              borderRadius: '10px',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            className="btn-navigate"
            style={{ width: 'auto', padding: '0.6rem 1.25rem', background: '#06C755', borderColor: '#06C755' }}
          >
            Cập Nhật URL
          </button>
        </form>
      </div>

      {/* Grid of LINE Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* User Profile Card */}
        <div className="nav-card">
          <div className="card-top">
            <span className="card-badge" style={{ background: 'rgba(6, 199, 85, 0.15)', color: '#06C755' }}>
              LINE User Profile
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #06C755, #10b981)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '1.75rem',
                boxShadow: '0 4px 15px rgba(6, 199, 85, 0.4)'
              }}>
                👤
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700 }}>LINE User #{lineId.slice(0, 8)}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  Trạng thái: <strong style={{ color: 'var(--success)' }}>Active Follower</strong>
                </span>
              </div>
            </div>

            <ul className="card-features">
              <li><span>🆔</span> LINE ID: <code>{lineId}</code></li>
              <li><span>🏷️</span> Phân loại tag: <strong>Khách hàng Tiềm Năng (VIP)</strong></li>
              <li><span>📱</span> Nền tảng: <strong>LINE Official Account (OA)</strong></li>
              <li><span>⚡</span> Global App State hiện tại: <strong>{globalCounter}</strong></li>
            </ul>
          </div>
        </div>

        {/* Kuzen Tag Tracking Parameters */}
        <div className="nav-card">
          <div className="card-top">
            <span className="card-badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary-accent)' }}>
              Kuzen Tag Tracker Status
            </span>
            <h3 className="card-title" style={{ marginTop: '0.5rem' }}>Kịch Bản Đo Đạc Kuzen Tag</h3>
            <p className="card-summary">
              Khi người dùng truy cập trang này với tham số <code>?line_id</code>, Kuzen Tag có thể đọc query parameter để liên kết định danh người dùng.
            </p>

            <ul className="card-features">
              <li><span>✔</span> Tracking Code: <code>KT_G514U5PqiIXBfA==339</code></li>
              <li><span>✔</span> pscenario: <code>pscenario-SPA</code></li>
              <li><span>✔</span> line_param: <code>{lineId}</code></li>
              <li><span>✔</span> URL Tracking: <code>window.location.search</code></li>
            </ul>
          </div>
        </div>
      </div>

      {/* LINE Chat Simulator Box */}
      <div style={{ 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border-subtle)', 
        borderRadius: '16px', 
        padding: '1.75rem', 
        marginBottom: '2rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>💬</span> Trình Giả Lập Tương Tác LINE Chat
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Mô phỏng tin nhắn phản hồi tự động gửi tới tài khoản có <code>line_id={lineId}</code>
            </p>
          </div>
          <span className="badge-tag" style={{ background: 'rgba(6, 199, 85, 0.15)', color: '#06C755' }}>
            ● Trực Tuyến
          </span>
        </div>

        {/* Chat message history */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.25)',
          borderRadius: '12px',
          padding: '1.25rem',
          minHeight: '220px',
          maxHeight: '320px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1rem',
        }}>
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  background: msg.sender === 'user' 
                    ? '#06C755' 
                    : 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  padding: '0.65rem 1rem',
                  borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  fontSize: '0.9rem',
                  lineHeight: '1.45',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                {msg.text}
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                {msg.time}
              </span>
            </div>
          ))}
        </div>

        {/* Input to send test chat */}
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.6rem' }}>
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Gõ tin nhắn thử nghiệm tương tác với bot..."
            style={{
              flex: '1',
              padding: '0.75rem 1.1rem',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              fontSize: '0.92rem',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            className="btn-navigate"
            style={{ width: 'auto', padding: '0.75rem 1.5rem', background: '#06C755', borderColor: '#06C755' }}
          >
            Gửi Tin Nhắn
          </button>
        </form>
      </div>

      {/* Quick Nav Footer */}
      <div className="quick-nav-panel">
        <div>
          <div style={{ fontWeight: 700, color: '#fff' }}>Đang ở Trang LINE (?line_id={lineId})</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Tiếp tục thử nghiệm điều hướng:</div>
        </div>
        <div className="quick-nav-buttons">
          <button className="btn-back" onClick={() => navigate('/')}>🏠 Về Trang Chủ</button>
          <button className="btn-back" onClick={() => navigate('/analytics')}>📊 Sang Trang Analytics</button>
          <button className="btn-back" onClick={() => navigate('/showcase')}>🎨 Sang Trang Showcase</button>
          <button className="btn-back" onClick={() => navigate('/settings')}>⚙️ Sang Trang Cài Đặt</button>
        </div>
      </div>
    </div>
  );
}
