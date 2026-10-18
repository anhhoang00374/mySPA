import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import SpaStatusBadge from './components/SpaStatusBadge';
import Home from './pages/Home';
import AnalyticsPage from './pages/AnalyticsPage';
import ShowcasePage from './pages/ShowcasePage';
import SettingsPage from './pages/SettingsPage';
import LinePage from './pages/LinePage';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/analytic" element={<AnalyticsPage />} />
              <Route path="/showcase" element={<ShowcasePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/setting" element={<SettingsPage />} />
              <Route path="/line" element={<LinePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <SpaStatusBadge />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
