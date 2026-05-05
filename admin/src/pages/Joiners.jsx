import React, { useState, useEffect } from 'react';
import { UserPlus, Mail, Phone, Calendar, ShieldCheck, Clock, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, X, User, Building2, Image as ImageIcon, Save, Filter, Search, Upload, Database, Globe, Loader2 } from 'lucide-react';
import ImportModal from '../components/ImportModal';
import ImageUpload from '../components/ImageUpload';
import { useWindowSize } from '../hooks/useWindowSize';

const API_URL = 'http://localhost:5001/api/joiners';

const Joiners = () => {
    const { isMobile } = useWindowSize();
    const [joiners, setJoiners] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [editingJoiner, setEditingJoiner] = useState(null);
    const [syncing, setSyncing] = useState(false);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchJoiners();
    }, [currentPage, searchTerm]);

    const fetchJoiners = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`);
            const result = await response.json();
            setJoiners(result.data || []);
            setTotalCount(result.total || 0);
        } catch (err) {
            console.error('FETCH_JOINERS_ERROR:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Wipe this registration?')) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                fetchJoiners();
            } catch (err) {
                console.error('DELETE_JOINER_ERROR:', err);
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSyncing(true);
        const formData = new FormData(e.target);
        const joinerData = Object.fromEntries(formData.entries());
        if (editingJoiner) joinerData.id = editingJoiner.id;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(joinerData)
            });
            if (response.ok) {
                fetchJoiners();
                setShowModal(false);
            }
        } catch (err) {
            alert('Save failed: ' + err.message);
        } finally {
            setSyncing(false);
        }
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <div className="fade-in">
            <div className="top-status-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(79, 70, 229, 0.08)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
                        <UserPlus size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Onboarding Queue</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{totalCount} Active Applicants</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontWeight: 700, fontSize: '0.9rem' }}>
                    <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%' }}></div>
                    Live Validation Engine
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
                <div>
                    <h1 className="huge-title">Member Registry</h1>
                    <p style={{ marginTop: '10px' }}>Manage and validate free registrations for the corporate business hub.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => setShowImportModal(true)} className="btn-premium-ghost">
                        <Upload size={18} /> Bulk Import
                    </button>
                    <button onClick={() => { setEditingJoiner(null); setShowModal(true); }} className="btn-premium-navy">
                        <Plus size={24} /> Add Applicant
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                <div className="search-bar-premium">
                    <Search size={22} color="#94a3b8" />
                    <input 
                        type="text" 
                        placeholder="Search applicants by name or entity..." 
                        className="search-input-premium"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>
            </div>

            <div style={{ position: 'relative', minHeight: '500px' }}>
                {loading && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '30px' }}>
                        <Loader2 className="spin" size={60} color="#0f172a" />
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '15px', width: '100%' }}>
                    {joiners.map((j) => (
                        <div key={j.id} className="premium-card">
                            <div className="card-id-badge" style={{ fontSize: '0.65rem' }}>ID: {j.id}</div>
                            {/* Avatar + Name */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', paddingRight: '50px' }}>
                                <div style={{ width: '42px', height: '42px', flexShrink: 0, borderRadius: '50%', background: 'rgba(79,70,229,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', overflow: 'hidden' }}>
                                    {j.logo ? <img src={j.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={20} />}
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#4f46e5', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j.company || 'Private'}</div>
                                </div>
                            </div>
                            {/* Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
                                <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><Mail size={12} /> {j.email || '—'}</div>
                                <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}><Phone size={12} /> {j.mobile || '—'}</div>
                            </div>
                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => { setEditingJoiner(j); setShowModal(true); }} className="btn-action" style={{ flex: 1, padding: '9px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(j.id)} className="btn-action" style={{ flex: 1, padding: '9px', background: '#fff1f2', border: '1px solid #fee2e2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {totalPages > 1 && (
                <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="btn-card" style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={24} /></button>
                    <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, fontSize: '1.2rem', padding: '0 30px' }}>{currentPage} / {totalPages}</div>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="btn-card" style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={24} /></button>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay" onClick={(e) => { if(e.target === e.currentTarget) setShowModal(false); }}>
                    <div className="modal-premium fade-in" style={{ maxWidth: '1000px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>{editingJoiner ? 'Update Applicant' : 'Manual Entry'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: '#f8fafc', border: 'none', color: '#94a3b8', cursor: 'pointer', width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={28} /></button>
                        </div>
                        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div><label style={{ fontWeight: 700 }}>Full Name</label><input name="name" defaultValue={editingJoiner?.name} required className="input-premium-field" /></div>
                                <div><label style={{ fontWeight: 700 }}>Company Name</label><input name="company" defaultValue={editingJoiner?.company} className="input-premium-field" /></div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div><label style={{ fontWeight: 700 }}>Email Address</label><input name="email" type="email" defaultValue={editingJoiner?.email} className="input-premium-field" /></div>
                                    <div><label style={{ fontWeight: 700 }}>Mobile Number</label><input name="mobile" defaultValue={editingJoiner?.mobile} className="input-premium-field" /></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div><label style={{ fontWeight: 700 }}>WhatsApp</label><input name="whatsapp" defaultValue={editingJoiner?.whatsapp} className="input-premium-field" /></div>
                                    <div><label style={{ fontWeight: 700 }}>GST Number</label><input name="gst" defaultValue={editingJoiner?.gst} className="input-premium-field" /></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div><label style={{ fontWeight: 700 }}>Logo / Profile (Drag & Drop)</label><ImageUpload name="logo" defaultValue={editingJoiner?.logo} /></div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div><label style={{ fontWeight: 700 }}>Facebook URL</label><input name="fb" defaultValue={editingJoiner?.fb} className="input-premium-field" /></div>
                                    <div><label style={{ fontWeight: 700 }}>Instagram URL</label><input name="insta" defaultValue={editingJoiner?.insta} className="input-premium-field" /></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div><label style={{ fontWeight: 700 }}>Twitter URL</label><input name="twitter" defaultValue={editingJoiner?.twitter} className="input-premium-field" /></div>
                                    <div><label style={{ fontWeight: 700 }}>LinkedIn URL</label><input name="linkedin" defaultValue={editingJoiner?.linkedin} className="input-premium-field" /></div>
                                </div>
                            </div>
                            <div style={{ gridColumn: isMobile ? 'auto' : 'span 2', display: 'flex', gap: '20px', marginTop: '10px' }}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn-premium-ghost" style={{ flex: 1 }}>Abort</button>
                                <button type="submit" disabled={syncing} className="btn-premium-navy" style={{ flex: 2, background: '#4f46e5', justifyContent: 'center' }}>
                                    {syncing ? 'SYNCING...' : 'COMMIT ENTRY'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showImportModal && (
                <ImportModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} type="joiners" onImport={fetchJoiners} />
            )}
        </div>
    );
};

export default Joiners;
