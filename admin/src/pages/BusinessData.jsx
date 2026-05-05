import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, MoreHorizontal, User, Mail, MapPin, Phone, Database } from 'lucide-react';

const API_URL = 'http://localhost:5001/api/profiles';

const BusinessData = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBusinesses(data);
      setLoading(false);
    } catch (err) {
      console.error('FETCH_PROFILES_ERROR:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this business profile permanently?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            setBusinesses(businesses.filter(b => b.id !== id));
        } catch (err) {
            console.error('DELETE_PROFILE_ERROR:', err);
        }
    }
  };

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading Live Content...</div>;

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Business Data</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage all Traders, Manufacturers, and Global Partners.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="btn-action" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={18} /> Export CSV
          </button>
          <button className="btn-action" style={{ background: 'var(--accent)', color: '#000', fontWeight: 700, padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} /> Add Partner
          </button>
        </div>
      </div>

      <div className="data-table-container">
        <div className="table-header" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
              <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="text" 
                placeholder="Search businesses..." 
                style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 15px 12px 45px', color: 'white', outline: 'none' }}
              />
            </div>
            <button className="btn-action" style={{ border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} /> Filters
            </button>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Showing <b>5</b> of <b>452</b> entries</p>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Business Name</th>
              <th>Contact Info</th>
              <th>Type</th>
              <th>Location</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((biz) => (
              <tr key={biz.id}>
                <td>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>{biz.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Database size={12} /> ID: BIZ-{1000 + biz.id}
                  </div>
                </td>
                <td style={{ fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Mail size={14} color="var(--accent)" /> {biz.email}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={14} color="var(--accent)" /> {biz.phone}
                  </div>
                </td>
                <td>
                  <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>{biz.type}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} /> {biz.city}
                  </div>
                </td>
                <td>
                  <span className={`badge ${biz.status.toLowerCase()}`}>
                    {biz.status}
                  </span>
                </td>
                <style dangerouslySetInnerHTML={{ __html: `
                  .badge.verified { background: rgba(16, 185, 129, 0.1); color: var(--success); }
                  .badge.pending { background: rgba(245, 158, 11, 0.1); color: var(--accent); }
                  .badge.flagged { background: rgba(239, 68, 68, 0.1); color: var(--danger); }
                `}} />
                <td>
                  <button className="btn-action"><MoreHorizontal size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={{ padding: '20px 30px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center', gap: '8px' }}>
             <button className="btn-action" disabled>Prev</button>
             <button className="btn-action" style={{ background: 'var(--accent)', color: '#000' }}>1</button>
             <button className="btn-action">2</button>
             <button className="btn-action">3</button>
             <button className="btn-action">Next</button>
        </div>
      </div>
    </div>
  );
};

export default BusinessData;
