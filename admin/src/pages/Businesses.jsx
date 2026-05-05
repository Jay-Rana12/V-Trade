import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight, X, Save, Search, Filter, Eye, Loader2, Upload, Building2, Mail, Phone, Globe, Database, User, MapPin, Info } from 'lucide-react';
import ImportModal from '../components/ImportModal';
import { useWindowSize } from '../hooks/useWindowSize';

const API_URL = 'http://localhost:5001/api/profiles';

const BusinessesManagement = () => {
    const { isMobile } = useWindowSize();
    const [profiles, setProfiles] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [editingProfile, setEditingProfile] = useState(null);
    const [syncing, setSyncing] = useState(false);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchProfiles();
    }, [currentPage, searchTerm, typeFilter]);

    const fetchProfiles = async () => {
        setLoading(true);
        try {
            const url = `${API_URL}?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}&type=${typeFilter}`;
            const response = await fetch(url);
            const result = await response.json();
            setProfiles(result.data || []);
            setTotalCount(result.total || 0);
        } catch (err) {
            console.error('FETCH_PROFILES_ERROR:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Wipe this profile?')) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                fetchProfiles();
            } catch (err) {
                console.error('DELETE_PROFILE_ERROR:', err);
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSyncing(true);
        const formData = new FormData(e.target);
        const profileData = Object.fromEntries(formData.entries());
        if (editingProfile) profileData.id = editingProfile.id;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData)
            });
            if (response.ok) {
                fetchProfiles();
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
                        <Building2 size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Network</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{totalCount} Nodes Onboarded</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
                <div>
                    <h1 className="huge-title">Corporate Network</h1>
                    <p style={{ marginTop: '10px' }}>High-fidelity management of global corporate profiles and directory listings.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => setShowImportModal(true)} className="btn-premium-ghost">
                        <Upload size={18} /> Bulk Import
                    </button>
                    <button onClick={() => { setEditingProfile(null); setShowModal(true); }} className="btn-premium-navy">
                        <Plus size={24} /> Onboard Node
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                <div className="search-bar-premium">
                    <Search size={22} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Scan network for profiles..."
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
                    {profiles.map((profile) => (
                        <div key={profile.id} className="premium-card">
                            <div className="card-id-badge" style={{ fontSize: '0.65rem' }}>ID: {profile.id}</div>
                            {/* Type tag */}
                            <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 800, color: '#4f46e5', background: '#eef2ff', padding: '2px 8px', borderRadius: '4px', marginBottom: '12px' }}>{profile.type?.toUpperCase() || 'CORPORATE'}</div>
                            {/* Icon + Name */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                                <div style={{ width: '40px', height: '40px', flexShrink: 0, background: 'rgba(79,70,229,0.07)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}><Building2 size={20} /></div>
                                <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile.company_name}</h3>
                            </div>
                            {/* Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
                                {profile.owner && <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><User size={12} /> {profile.owner}</div>}
                                <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><Mail size={12} /> {profile.email || '—'}</div>
                                <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}><Phone size={12} /> {profile.phone || '—'}</div>
                            </div>
                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => { setEditingProfile(profile); setShowModal(true); }} className="btn-action" style={{ flex: 1, padding: '9px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(profile.id)} className="btn-action" style={{ flex: 1, padding: '9px', background: '#fff1f2', border: '1px solid #fee2e2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
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
                <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
                    <div className="modal-premium fade-in" style={{ maxWidth: '900px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>{editingProfile ? 'Refine Node' : 'Onboard Node'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: '#f8fafc', border: 'none', color: '#94a3b8', cursor: 'pointer', width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={28} /></button>
                        </div>
                        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div><label style={{ fontWeight: 700 }}>Company Name</label><input name="company_name" defaultValue={editingProfile?.company_name} required className="input-premium-field" /></div>
                                <div><label style={{ fontWeight: 700 }}>Profile Classification</label><select name="type" defaultValue={editingProfile?.type} className="input-premium-field"><option value="Manufacturer">Manufacturer</option><option value="Wholesaler">Wholesaler</option><option value="Distributor">Distributor</option><option value="Retailer">Retailer</option><option value="Importer">Importer</option><option value="Exporter">Exporter</option><option value="Dealer">Dealer</option></select></div>
                                <div><label style={{ fontWeight: 700 }}>Owner / Principal</label><input name="owner" defaultValue={editingProfile?.owner} className="input-premium-field" /></div>
                                <div><label style={{ fontWeight: 700 }}>Corporate Address</label><textarea name="address" defaultValue={editingProfile?.address} className="input-premium-field" style={{ height: '100px', paddingTop: '15px' }}></textarea></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div><label style={{ fontWeight: 700 }}>Corporate Email</label><input name="email" type="email" defaultValue={editingProfile?.email} className="input-premium-field" /></div>
                                <div><label style={{ fontWeight: 700 }}>Primary Contact</label><input name="phone" defaultValue={editingProfile?.phone} className="input-premium-field" /></div>
                                <div><label style={{ fontWeight: 700 }}>Digital Footprint (Website)</label><input name="website" defaultValue={editingProfile?.website} className="input-premium-field" /></div>
                                <div><label style={{ fontWeight: 700 }}>About Corporate Entity</label><textarea name="about" defaultValue={editingProfile?.about} className="input-premium-field" style={{ height: '100px', paddingTop: '15px' }}></textarea></div>
                            </div>
                            <div style={{ gridColumn: isMobile ? 'auto' : 'span 2', display: 'flex', gap: '20px', marginTop: '10px' }}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn-premium-ghost" style={{ flex: 1 }}>Abort</button>
                                <button type="submit" disabled={syncing} className="btn-premium-navy" style={{ flex: 2, background: '#4f46e5', justifyContent: 'center' }}>
                                    {syncing ? 'UPDATING...' : 'COMMIT PROFILE'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showImportModal && (
                <ImportModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} type="profiles" onImport={fetchProfiles} />
            )}
        </div>
    );
};

export default BusinessesManagement;
