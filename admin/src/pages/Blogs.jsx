import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, ChevronLeft, ChevronRight, X, Save, Search, Filter, Eye, Loader2, Upload, BookOpen, Calendar, Mail, Image as ImageIcon, Database, Tag, User, Hash } from 'lucide-react';
import { useWindowSize } from '../hooks/useWindowSize';
import ImportModal from '../components/ImportModal';
import ImageUpload from '../components/ImageUpload';

const API_URL = 'http://localhost:5001/api/blogs';

const BlogsManagement = () => {
    const { isMobile } = useWindowSize();
    const [blogs, setBlogs] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [syncing, setSyncing] = useState(false);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchBlogs();
    }, [currentPage, searchTerm, categoryFilter]);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const url = `${API_URL}?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}&category=${categoryFilter}`;
            const response = await fetch(url);
            const result = await response.json();
            setBlogs(result.data || []);
            setTotalCount(result.total || 0);
        } catch (err) {
            console.error('FETCH_BLOGS_ERROR:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this article?')) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                fetchBlogs();
            } catch (err) {
                console.error('DELETE_BLOG_ERROR:', err);
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSyncing(true);
        const formData = new FormData(e.target);
        const blogData = Object.fromEntries(formData.entries());
        if (editingBlog) blogData.id = editingBlog.id;
        
        blogData.is_published = blogData.status === 'Published' ? 1 : 0;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogData)
            });
            if (response.ok) {
                fetchBlogs();
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
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Editorial Engine</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{totalCount} Articles Published</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontWeight: 700, fontSize: '0.9rem' }}>
                    <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%' }}></div>
                    Live CMS Node
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
                <div>
                    <h1 className="huge-title">Editorial Hub</h1>
                    <p style={{ marginTop: '10px' }}>Advanced management of technical documentation and articles.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => setShowImportModal(true)} className="btn-premium-ghost">
                        <Upload size={18} /> Bulk Import
                    </button>
                    <button onClick={() => { setEditingBlog(null); setShowModal(true); }} className="btn-premium-navy">
                        <Plus size={24} /> New Article
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                <div className="search-bar-premium">
                    <Search size={22} color="#94a3b8" />
                    <input 
                        type="text" 
                        placeholder="Scan hub for articles..." 
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
                    {blogs.map((blog) => (
                        <div key={blog.id} className="premium-card" style={{ padding: 0, overflow: 'hidden' }}>
                            {/* Thumbnail */}
                            <div style={{ height: '110px', background: '#f8fafc', overflow: 'hidden', position: 'relative' }}>
                                <img src={blog.image || 'https://placehold.co/400x110/f1f5f9/94a3b8?text=Blog'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#4f46e5', color: 'white', fontSize: '0.6rem', fontWeight: 800, padding: '2px 7px', borderRadius: '4px' }}>{blog.category?.toUpperCase() || 'GENERAL'}</div>
                                <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.9)', color: '#94a3b8', fontSize: '0.6rem', fontWeight: 800, padding: '2px 7px', borderRadius: '4px' }}>ID: {blog.id}</div>
                            </div>
                            {/* Body */}
                            <div style={{ padding: '14px' }}>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{blog.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8', fontSize: '0.72rem', fontWeight: 600, marginBottom: '12px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Calendar size={11} /> {blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-IN') : '—'}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>• <User size={11} /> {blog.author || 'Admin'}</span>
                                </div>
                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button onClick={() => { setEditingBlog(blog); setShowModal(true); }} className="btn-action" style={{ flex: 1, padding: '8px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}><Edit3 size={15} /></button>
                                    <button onClick={() => handleDelete(blog.id)} className="btn-action" style={{ flex: 1, padding: '8px', background: '#fff1f2', border: '1px solid #fee2e2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={15} /></button>
                                </div>
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
                            <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>{editingBlog ? 'Refine Manuscript' : 'Compose Publication'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: '#f8fafc', border: 'none', color: '#94a3b8', cursor: 'pointer', width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={28} /></button>
                        </div>
                        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div><label style={{ fontWeight: 700 }}>Headline</label><input name="title" defaultValue={editingBlog?.title} required className="input-premium-field" /></div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div><label style={{ fontWeight: 700 }}>URL Slug</label><input name="slug" defaultValue={editingBlog?.slug} className="input-premium-field" /></div>
                                    <div><label style={{ fontWeight: 700 }}>Category</label><input name="category" defaultValue={editingBlog?.category} className="input-premium-field" /></div>
                                </div>
                                <div><label style={{ fontWeight: 700 }}>Manuscript Content</label><textarea name="content" defaultValue={editingBlog?.content} className="input-premium-field" style={{ height: '300px', paddingTop: '15px' }}></textarea></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div><label style={{ fontWeight: 700 }}>Featured Image (Drag & Drop)</label><ImageUpload name="image" defaultValue={editingBlog?.image} /></div>
                                <div><label style={{ fontWeight: 700 }}>Author Attribution</label><input name="author" defaultValue={editingBlog?.author || 'Admin'} className="input-premium-field" /></div>
                                <div><label style={{ fontWeight: 700 }}>Discovery Tags (comma separated)</label><input name="tags" defaultValue={editingBlog?.tags} className="input-premium-field" placeholder="tech, news, industry" /></div>
                                <div><label style={{ fontWeight: 700 }}>Short Excerpt</label><textarea name="excerpt" defaultValue={editingBlog?.excerpt} className="input-premium-field" style={{ height: '120px', paddingTop: '15px' }}></textarea></div>
                                <div><label style={{ fontWeight: 700 }}>Distribution Status</label><select name="status" defaultValue={editingBlog?.is_published ? 'Published' : 'Draft'} className="input-premium-field"><option value="Draft">Draft Mode</option><option value="Published">Live Distribution</option></select></div>
                            </div>
                            <div style={{ gridColumn: isMobile ? 'auto' : 'span 2', display: 'flex', gap: '20px', marginTop: '10px' }}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn-premium-ghost" style={{ flex: 1 }}>Abort</button>
                                <button type="submit" disabled={syncing} className="btn-premium-navy" style={{ flex: 2, background: '#4f46e5', justifyContent: 'center' }}>
                                    {syncing ? 'SYNCING...' : 'COMMIT PUBLICATION'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showImportModal && (
                <ImportModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} type="blogs" onImport={fetchBlogs} />
            )}
        </div>
    );
};

export default BlogsManagement;
