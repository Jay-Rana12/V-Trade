import React from 'react';
import { 
  LayoutDashboard, Tag, Package, Building2, UserPlus, 
  Users, ChevronRight, BookOpen, FolderTree, LogOut
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout, isOpen }) => {
  const menuItems = [
    { section: 'CORE', items: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    ]},
    { section: 'CATALOG', items: [
      { id: 'brands',     label: 'Brands',     icon: <Tag size={20} />,      hasChevron: true },
      { id: 'categories', label: 'Categories', icon: <FolderTree size={20} /> },
      { id: 'products',   label: 'Products',   icon: <Package size={20} /> },
    ]},
    { section: 'CONTENT', items: [
      { id: 'blogs', label: 'Blogs', icon: <BookOpen size={20} /> },
    ]},
    { section: 'BUSINESS HUB', items: [
      { id: 'profiles',  label: 'Profiles', icon: <Building2 size={20} /> },
      { id: 'joiners',   label: 'Joiners',  icon: <UserPlus size={20} /> },
      { id: 'users',     label: 'Users',    icon: <Users size={20} /> },
    ]}
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '2px', color: '#0f172a' }}>INDIATRADE</h2>
      </div>

      <div style={{ flex: 1 }}>
        {menuItems.map((group, idx) => (
          <div key={idx} style={{ marginBottom: '25px' }}>
            <div className="sidebar-section">{group.section}</div>
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.hasChevron && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <button onClick={onLogout} className="btn-logout">
          <LogOut size={20} style={{ transform: 'rotate(180deg)', color: '#ef4444' }} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
