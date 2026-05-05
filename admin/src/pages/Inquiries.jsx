import React, { useState } from 'react';
import { realData } from '../data/realData';
import { MessageSquare, User, Mail, Calendar, Eye, Reply, Trash2, Plus, ChevronLeft, ChevronRight, X, Send, Search, Filter } from 'lucide-react';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState(realData.inquiries);
  const [currentPage, setCurrentPage] = useState(1);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [activeInquiry, setActiveInquiry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 8;

  const filteredInquiries = inquiries.filter(inq =>
    inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInquiries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);

  const handleDelete = (id) => {
    if (window.confirm('Archive this message?')) {
      setInquiries(inquiries.filter(i => i.id !== id));
    }
  };

  const handleReply = (e) => {
    e.preventDefault();
    alert('Reply sent to: ' + activeInquiry.email);
    setInquiries(inquiries.map(i => i.id === activeInquiry.id ? { ...i, status: 'Replied' } : i));
    setShowReplyModal(false);
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Business Inquiries</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage B2B leads and customer service communications.</p>
        </div>
        <button
          className="btn-action btn-primary"
          style={{ height: '54px', padding: '0 30px', borderRadius: '14px', fontSize: '1rem', fontWeight: 800, background: '#10b981' }}>
          <MessageSquare size={20} style={{ marginRight: '8px' }} /> New Archive
        </button>
      </div>

      <div style={{ background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '30px', display: 'flex', gap: '15px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
          <input
            type="text"
            placeholder="Search leads by name, email or subject..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            style={{ width: '100%', height: '54px', padding: '0 54px', borderRadius: '12px', border: '1px solid #f1f5f9', background: '#f8fafc', fontSize: '1rem', fontWeight: 600, color: '#1e293b', outline: 'none' }}
          />
        </div>
        <button
          className="btn-action"
          style={{ height: '54px', padding: '0 20px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.3s' }}>
          <Filter size={18} /> More Filters
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
        {currentItems.map(inq => (
          <div key={inq.id} className="stat-card" style={{ padding: '25px', position: 'relative', border: inq.status === 'Replied' ? '1px solid var(--success)' : '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', background: 'var(--bg-tertiary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={20} color={inq.status === 'Replied' ? 'var(--success)' : 'var(--accent)'} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{inq.name}</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="flex-center" style={{ gap: '4px' }}><Mail size={12} /> {inq.email}</span>
                  </div>
                </div>
              </div>
              {inq.status === 'Replied' ? (
                <span className="badge verified">Replied</span>
              ) : (
                <span className="badge pending">New</span>
              )}
            </div>

            <div style={{ background: 'var(--bg-primary)', padding: '15px', borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--border)', height: '120px', overflowY: 'auto' }}>
              <strong style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--accent)' }}>Subject: {inq.subject}</strong>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6' }}>{inq.message}</p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setActiveInquiry(inq); setShowReplyModal(true); }} className="btn-action" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '8px', background: 'var(--accent)', color: '#000' }}><Reply size={16} /> Reply</button>
              <button onClick={() => handleDelete(inq.id)} className="btn-action" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '10px' }}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="btn-action" style={{ padding: '12px 25px' }}><ChevronLeft size={20} /></button>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="btn-action" style={{ padding: '12px 25px' }}><ChevronRight size={20} /></button>
        </div>
      )}

      {showReplyModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={(e) => { if(e.target === e.currentTarget) setShowReplyModal(false); }}>
          <div className="stat-card" style={{ width: '100%', maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Reply to {activeInquiry?.name}</h2>
              <button onClick={() => setShowReplyModal(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <div style={{ marginBottom: '20px', padding: '15px', background: 'var(--bg-primary)', borderRadius: '10px', fontSize: '0.85rem' }}>
              <strong>Message:</strong> {activeInquiry?.message}
            </div>
            <form onSubmit={handleReply}>
              <textarea required placeholder="Type your response..." style={{ width: '100%', height: '200px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '10px', padding: '15px', color: 'white', outline: 'none', marginBottom: '20px', resize: 'none' }}></textarea>
              <button type="submit" style={{ width: '100%', padding: '15px', background: 'var(--success)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <Send size={18} /> Send Reply
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiries;
