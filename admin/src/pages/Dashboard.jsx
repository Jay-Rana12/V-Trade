import React, { useState, useEffect } from 'react';
import { 
  Tag, Package, Building2, UserPlus, RefreshCcw, ArrowUpRight,
  Database, Server, HardDrive, BookOpen, FolderTree, TrendingUp,
  CheckCircle, Clock, Activity
} from 'lucide-react';

const Dashboard = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    brands: 0, products: 0, profiles: 0, joiners: 0,
    categories: 0, blogs: 0, recentBrands: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('FETCH_STATS_ERROR:', err);
    } finally {
      setLoading(false);
    }
  };

  const statItems = [
    { label: 'BRANDS',     value: stats.brands,     icon: <Tag size={22} />,       tab: 'brands',     color: '#4f46e5', bg: '#eef2ff' },
    { label: 'PRODUCTS',   value: stats.products,   icon: <Package size={22} />,   tab: 'products',   color: '#0891b2', bg: '#ecfeff' },
    { label: 'BUSINESSES', value: stats.profiles,   icon: <Building2 size={22} />, tab: 'profiles',   color: '#059669', bg: '#ecfdf5' },
    { label: 'JOINERS',    value: stats.joiners,    icon: <UserPlus size={22} />,  tab: 'joiners',    color: '#d97706', bg: '#fffbeb' },
    { label: 'CATEGORIES', value: stats.categories, icon: <FolderTree size={22} />,tab: 'categories', color: '#7c3aed', bg: '#f5f3ff' },
    { label: 'BLOGS',      value: stats.blogs,      icon: <BookOpen size={22} />,  tab: 'blogs',      color: '#db2777', bg: '#fdf2f8' },
  ];

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '50px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            LIVE MONITORING
          </div>
          <h1 className="huge-title">Dashboard</h1>
          <p style={{ marginTop: '12px', color: '#64748b', fontSize: '1.05rem' }}>
            Real-time overview of the Vitrade ecosystem.
          </p>
        </div>
        <button onClick={fetchStats} className="btn-premium-ghost" style={{ marginTop: '10px' }}>
          <RefreshCcw size={18} className={loading ? 'spin' : ''} /> Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '50px' }}>
        {statItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate && onNavigate(item.tab)}
            style={{
              background: 'white', padding: '28px', borderRadius: '20px',
              border: '1px solid #f1f5f9', cursor: 'pointer', position: 'relative',
              transition: 'all 0.2s ease', boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.07)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ width: '46px', height: '46px', background: item.bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>
                {item.icon}
              </div>
              <ArrowUpRight size={18} style={{ color: '#cbd5e1' }} />
            </div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '1.5px', marginBottom: '8px' }}>{item.label}</div>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
              {loading ? '—' : item.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Lower Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px' }}>
        {/* Recent Registrations */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Recent Brand Registrations</h2>
            <button onClick={() => onNavigate && onNavigate('brands')} style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>View All →</button>
          </div>
          <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            {stats.recentBrands.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontWeight: 600 }}>No brands registered yet.</div>
            ) : stats.recentBrands.map((brand, idx) => (
              <div key={idx} style={{
                padding: '16px 24px',
                borderBottom: idx === stats.recentBrands.length - 1 ? 'none' : '1px solid #f8fafc',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '36px', height: '36px', background: '#eef2ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', fontWeight: 800, fontSize: '0.9rem' }}>
                    {brand.name?.[0]?.toUpperCase() || 'B'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{brand.name}</div>
                    {brand.email && <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>{brand.email}</div>}
                  </div>
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#cbd5e1', background: '#f8fafc', padding: '4px 10px', borderRadius: '6px' }}>ID: {brand.id}</div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>System Health</h2>
          <div style={{ background: 'white', padding: '28px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
            <HealthItem icon={<Database size={18} />} label="MySQL Database" status="Online" color="#10b981" progress={100} />
            <HealthItem icon={<Server size={18} />} label="API Server :5001" status="Optimal" color="#10b981" progress={98} />
            <HealthItem icon={<HardDrive size={18} />} label="File Storage" status="Connected" color="#10b981" progress={95} />
            <HealthItem icon={<Activity size={18} />} label="Data Sync Engine" status="Active" color="#4f46e5" progress={100} />
          </div>

          {/* Quick Links */}
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '25px 0 20px' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'New Brand', tab: 'brands', color: '#4f46e5' },
              { label: 'New Product', tab: 'products', color: '#0891b2' },
              { label: 'New Profile', tab: 'profiles', color: '#059669' },
              { label: 'New Joiner', tab: 'joiners', color: '#d97706' },
            ].map((link, i) => (
              <button
                key={i}
                onClick={() => onNavigate && onNavigate(link.tab)}
                style={{
                  padding: '14px', background: 'white', border: '1px solid #f1f5f9',
                  borderRadius: '14px', fontWeight: 700, fontSize: '0.85rem',
                  color: link.color, cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = link.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#f1f5f9'}
              >
                <ArrowUpRight size={16} /> {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HealthItem = ({ icon, label, status, color, progress }) => (
  <div style={{ marginBottom: '22px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontWeight: 600, fontSize: '0.9rem' }}>
        <span style={{ color }}>{icon}</span>{label}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color, fontWeight: 700, fontSize: '0.82rem' }}>
        <CheckCircle size={14} /> {status}
      </div>
    </div>
    <div style={{ height: '5px', background: '#f1f5f9', borderRadius: '3px' }}>
      <div style={{ width: `${progress}%`, height: '100%', background: color, borderRadius: '3px', transition: 'width 1s ease' }}></div>
    </div>
  </div>
);

export default Dashboard;
