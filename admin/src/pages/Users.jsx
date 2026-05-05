import React, { useState, useEffect } from 'react';
import { 
  Users as UsersIcon, Mail, Phone, Edit2, Trash2, Plus, 
  ChevronLeft, ChevronRight, X, User, Lock, Search, Loader2, Shield
} from 'lucide-react';
import { useWindowSize } from '../hooks/useWindowSize';

const API_URL = 'http://localhost:5001/api/users';

const Users = () => {
    const { isMobile } = useWindowSize();
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [syncing, setSyncing] = useState(false);
    const itemsPerPage = 12;

    useEffect(() => { fetchUsers(); }, [currentPage, searchTerm]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`);
            const result = await res.json();
            setUsers(result.data || []);
            setTotalCount(result.total || 0);
        } catch (err) {
            console.error('FETCH_USERS_ERROR:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this user permanently?')) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                fetchUsers();
            } catch (err) {
                console.error('DELETE_USER_ERROR:', err);
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSyncing(true);
        const formData = new FormData(e.target);
        const userData = {
            id: editingUser?.id || null,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            username: formData.get('username'),
            password: formData.get('password')
        };
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (res.ok) { fetchUsers(); setShowModal(false); setEditingUser(null); }
        } catch (err) {
            alert('Save failed: ' + err.message);
        } finally {
            setSyncing(false);
        }
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <div className="fade-in">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                        USER REGISTRY
                    </div>
                    <h1 className="huge-title">Platform Users</h1>
                    <p style={{ marginTop: '10px' }}>Manage registered members from the <code>app_users</code> table.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => { setEditingUser(null); setShowModal(true); }} className="btn-premium-navy">
                        <Plus size={20} /> Add User
                    </button>
                </div>
            </div>

            {/* Search */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '35px' }}>
                <div className="search-bar-premium">
                    <Search size={22} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Search by name, username or email..."
                        className="search-input-premium"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    />
                </div>
            </div>

            {/* Count bar */}
            <div style={{ marginBottom: '20px', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>
                {totalCount} USERS FOUND
            </div>

            {/* Grid */}
            <div style={{ position: 'relative', minHeight: '400px' }}>
                {loading && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px' }}>
                        <Loader2 className="spin" size={50} color="#0f172a" />
                    </div>
                )}

                {users.length === 0 && !loading ? (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8', fontWeight: 700, fontSize: '1.1rem' }}>
                        No users found in the registry.
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '15px', width: '100%' }}>
                        {users.map((u, idx) => (
                            <div key={`user-${u.id}-${idx}`} className="premium-card">
                                <div className="card-id-badge" style={{ fontSize: '0.65rem' }}>#{u.id}</div>
                                {/* Avatar + Name */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', paddingRight: '50px' }}>
                                    <div style={{ width: '42px', height: '42px', flexShrink: 0, background: '#eef2ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', fontWeight: 800, fontSize: '1rem' }}>
                                        {u.name?.[0]?.toUpperCase() || <User size={20} />}
                                    </div>
                                    <div style={{ overflow: 'hidden' }}>
                                        <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name || 'User'}</div>
                                        <div style={{ fontSize: '0.72rem', color: '#4f46e5', fontWeight: 700 }}>@{u.username || 'no-username'}</div>
                                    </div>
                                </div>
                                {/* Info */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '14px', padding: '10px 12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        <Mail size={12} /> {u.email || '—'}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Phone size={12} /> {u.phone || '—'}
                                    </div>
                                </div>
                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => { setEditingUser(u); setShowModal(true); }} className="btn-action" style={{ flex: 1, padding: '9px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(u.id)} className="btn-action" style={{ flex: 1, padding: '9px', background: '#fff1f2', border: '1px solid #fee2e2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="btn-card" style={{ width: '55px', height: '55px', borderRadius: '16px', background: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={22} /></button>
                    <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, fontSize: '1.1rem', padding: '0 25px' }}>{currentPage} / {totalPages}</div>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="btn-card" style={{ width: '55px', height: '55px', borderRadius: '16px', background: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={22} /></button>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={(e) => { if(e.target === e.currentTarget) setShowModal(false); }}>
                    <div className="modal-premium fade-in" style={{ maxWidth: '560px', width: '95%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '35px', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.9rem', fontWeight: 900 }}>{editingUser ? 'Edit User' : 'Add User'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: '#f8fafc', border: 'none', color: '#94a3b8', cursor: 'pointer', width: '44px', height: '44px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '0.85rem' }}>Full Name</label>
                                    <input name="name" defaultValue={editingUser?.name} required className="input-premium-field" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '0.85rem' }}>Username</label>
                                    <input name="username" defaultValue={editingUser?.username} className="input-premium-field" placeholder="johndoe" />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '0.85rem' }}>Email Address</label>
                                    <input name="email" type="email" defaultValue={editingUser?.email} required className="input-premium-field" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '0.85rem' }}>Phone Number</label>
                                    <input name="phone" defaultValue={editingUser?.phone} className="input-premium-field" placeholder="+91 99999 99999" />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '0.85rem' }}>Password {editingUser && <span style={{ color: '#94a3b8', fontWeight: 500 }}>(leave blank to keep current)</span>}</label>
                                <input name="password" type="password" className="input-premium-field" placeholder="••••••••" />
                            </div>
                            <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn-premium-ghost" style={{ flex: 1 }}>Cancel</button>
                                <button type="submit" disabled={syncing} className="btn-premium-navy" style={{ flex: 2, background: '#4f46e5', justifyContent: 'center' }}>
                                    {syncing ? 'SAVING...' : (editingUser ? 'UPDATE USER' : 'CREATE USER')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
