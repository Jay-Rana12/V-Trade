import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import Brands from './pages/Brands';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Businesses from './pages/Businesses';
import Joiners from './pages/Joiners';
import Users from './pages/Users';
import { Menu, X } from 'lucide-react';

import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('admin_auth') === 'true');
  const [activeTab, setActiveTab] = useState(localStorage.getItem('admin_active_tab') || 'dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('admin_active_tab', tab);
    setIsSidebarOpen(false); // Close sidebar on selection (mobile)
  };

  const handleLogin = () => {
    localStorage.setItem('admin_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'brands':
        return <Brands />;
      case 'categories':
        return <Categories />;
      case 'products':
        return <Products />;
      case 'blogs':
        return <Blogs />;
      case 'profiles':
        return <Businesses />;
      case 'joiners':
        return <Joiners />;
      case 'users':
        return <Users />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="mobile-toggle"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: '#0f172a',
          color: 'white',
          border: 'none',
          zIndex: 10001,
          display: 'none', // Shown via media query
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          cursor: 'pointer'
        }}
      >
        {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        onLogout={handleLogout} 
        isOpen={isSidebarOpen} 
      />

      <main className="main-content">
        {renderContent()}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .mobile-toggle { display: flex !important; }
        }
      `}} />
    </div>
  );
}

const PlaceholderSection = ({ title, subtitle }) => (
  <div className="fade-in">
    <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{title}</h1>
    <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>{subtitle}</p>
    <div className="stat-card" style={{ textAlign: 'center', padding: '100px 20px', borderStyle: 'dashed' }}>
      <h2 style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>Module Coming Soon</h2>
      <p style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>This section is currently being integrated with the database schema.</p>
    </div>
  </div>
);

export default App;
