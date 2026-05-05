import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight, X, Save, Search, Filter, Eye, Loader2, Upload, Database, Globe, Mail, Phone, MapPin, Info } from 'lucide-react';
import ImportModal from '../components/ImportModal';
import ImageUpload from '../components/ImageUpload';
import { useWindowSize } from '../hooks/useWindowSize';

const API_URL = 'http://localhost:5001/api/brands';

const BrandsManagement = () => {
    const { isMobile } = useWindowSize();
    const [brands, setBrands] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);
    const [syncing, setSyncing] = useState(false);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchBrands();
    }, [currentPage, searchTerm]);

    const fetchBrands = async () => {
        setLoading(true);
        try {
            const url = `${API_URL}?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`;
            const response = await fetch(url);
            const result = await response.json();
            setBrands(result.data || []);
            setTotalCount(result.total || 0);
        } catch (err) {
            console.error('FETCH_BRANDS_ERROR:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this brand?')) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                fetchBrands();
            } catch (err) {
                console.error('DELETE_BRAND_ERROR:', err);
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSyncing(true);
        const formData = new FormData(e.target);
        const brandData = Object.fromEntries(formData.entries());
        if (editingBrand) brandData.id = editingBrand.id;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(brandData)
            });
            if (response.ok) {
                fetchBrands();
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
                        <Database size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>System Registry</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{totalCount} Assets Synced</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontWeight: 700, fontSize: '0.9rem' }}>
                    <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%' }}></div>
                    Production Environment
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
                <div>
                    <h1 className="huge-title">Corporate Identity</h1>
                    <p style={{ marginTop: '10px' }}>Manage global brand assets with real-time MySQL sync.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => setShowImportModal(true)} className="btn-premium-ghost">
                        <Upload size={18} /> Bulk Import
                    </button>
                    <button onClick={() => { setEditingBrand(null); setShowModal(true); }} className="btn-premium-navy">
                        <Plus size={24} /> Register Brand
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                <div className="search-bar-premium">
                    <Search size={22} color="#94a3b8" />
                    <input 
                        type="text" 
                        placeholder="Scan system for assets..." 
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
                    {brands.map((brand) => (
                        <div key={brand.id} className="premium-card">
                            <div className="card-id-badge">ID: {brand.id}</div>
                            {/* Logo + Name */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px', paddingRight: '60px' }}>
                                <div className="card-logo-box" style={{ marginBottom: 0, flexShrink: 0 }}>
                                    <img src={brand.logo || 'https://placehold.co/54x54'} alt="" style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                                </div>
                                <h3 className="card-title-main" style={{ fontSize: '1rem', lineHeight: 1.3 }}>{brand.name}</h3>
                            </div>
                            {/* Info rows */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '16px' }}>
                                <div className="card-subtitle"><Mail size={13} /> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{brand.email || '—'}</span></div>
                                <div className="card-subtitle"><Phone size={13} /> {brand.phone || '—'}</div>
                            </div>
                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => { setEditingBrand(brand); setShowModal(true); }} className="btn-action" style={{ flex: 1, padding: '10px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}><Edit2 size={17} /></button>
                                <button onClick={() => handleDelete(brand.id)} className="btn-action" style={{ flex: 1, padding: '10px', background: '#fff1f2', border: '1px solid #fee2e2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={17} /></button>
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
                            <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>{editingBrand ? 'Refine Identity' : 'New Brand'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: '#f8fafc', border: 'none', color: '#94a3b8', cursor: 'pointer', width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={28} /></button>
                        </div>
                        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div><label style={{ fontWeight: 700 }}>Brand Name</label><input name="name" defaultValue={editingBrand?.name} required className="input-premium-field" /></div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div><label style={{ fontWeight: 700 }}>Email</label><input name="email" type="email" defaultValue={editingBrand?.email} className="input-premium-field" /></div>
                                    <div><label style={{ fontWeight: 700 }}>Phone</label><input name="phone" defaultValue={editingBrand?.phone} className="input-premium-field" /></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div><label style={{ fontWeight: 700 }}>WhatsApp</label><input name="whatsapp" defaultValue={editingBrand?.whatsapp} className="input-premium-field" /></div>
                                    <div><label style={{ fontWeight: 700 }}>GST Number</label><input name="gst" defaultValue={editingBrand?.gst} className="input-premium-field" /></div>
                                </div>
                                <div><label style={{ fontWeight: 700 }}>Website URL</label><input name="website" defaultValue={editingBrand?.website} className="input-premium-field" /></div>
                                <div><label style={{ fontWeight: 700 }}>Logo (Drag & Drop)</label><ImageUpload name="logo" defaultValue={editingBrand?.logo} /></div>
                                <div><label style={{ fontWeight: 700 }}>Full Address</label><textarea name="address" defaultValue={editingBrand?.address} className="input-premium-field" style={{ height: '100px', paddingTop: '15px' }}></textarea></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div><label style={{ fontWeight: 700 }}>About Company</label><textarea name="about" defaultValue={editingBrand?.about} className="input-premium-field" style={{ height: '150px', paddingTop: '15px' }}></textarea></div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div><label style={{ fontWeight: 700 }}>Facebook URL</label><input name="fb" defaultValue={editingBrand?.fb} className="input-premium-field" /></div>
                                    <div><label style={{ fontWeight: 700 }}>Instagram URL</label><input name="insta" defaultValue={editingBrand?.insta} className="input-premium-field" /></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div><label style={{ fontWeight: 700 }}>Twitter URL</label><input name="twitter" defaultValue={editingBrand?.twitter} className="input-premium-field" /></div>
                                    <div><label style={{ fontWeight: 700 }}>LinkedIn URL</label><input name="linkedin" defaultValue={editingBrand?.linkedin} className="input-premium-field" /></div>
                                </div>
                            </div>
                            <div style={{ gridColumn: isMobile ? 'auto' : 'span 2', display: 'flex', gap: '20px', marginTop: '10px' }}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn-premium-ghost" style={{ flex: 1 }}>Abort</button>
                                <button type="submit" disabled={syncing} className="btn-premium-navy" style={{ flex: 2, background: '#4f46e5', justifyContent: 'center' }}>
                                    {syncing ? 'SYNCING...' : 'COMMIT RECORD'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showImportModal && (
                <ImportModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} type="brands" onImport={fetchBrands} />
            )}
        </div>
    );
};

export default BrandsManagement;
