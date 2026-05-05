import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight, X, Save, Package, Search, Filter, Eye, Loader2, Upload, Database, DollarSign, Box, Tag, Layers, ClipboardList } from 'lucide-react';
import ImportModal from '../components/ImportModal';
import ImageUpload from '../components/ImageUpload';
import { useWindowSize } from '../hooks/useWindowSize';

const API_URL = 'http://localhost:5001/api/products';

const ProductsManagement = () => {
    const { isMobile } = useWindowSize();
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [syncing, setSyncing] = useState(false);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchProducts();
    }, [currentPage, searchTerm, categoryFilter]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const url = `${API_URL}?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}&categoryId=${categoryFilter}`;
            const response = await fetch(url);
            const result = await response.json();
            setProducts(result.data || []);
            setTotalCount(result.total || 0);
        } catch (err) {
            console.error('FETCH_PRODUCTS_ERROR:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this SKU?')) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                fetchProducts();
            } catch (err) {
                console.error('DELETE_PRODUCT_ERROR:', err);
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSyncing(true);
        const formData = new FormData(e.target);
        const productData = Object.fromEntries(formData.entries());
        if (editingProduct) productData.id = editingProduct.id;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
            if (response.ok) {
                fetchProducts();
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
                        <Box size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Inventory Registry</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{totalCount} SKUs Active</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
                <div>
                    <h1 className="huge-title">Master Catalog</h1>
                    <p style={{ marginTop: '10px' }}>High-fidelity management of product persistence and SKU distribution.</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => setShowImportModal(true)} className="btn-premium-ghost">
                        <Upload size={18} /> Bulk Import
                    </button>
                    <button onClick={() => { setEditingProduct(null); setShowModal(true); }} className="btn-premium-navy">
                        <Plus size={24} /> Register SKU
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                <div className="search-bar-premium">
                    <Search size={22} color="#94a3b8" />
                    <input 
                        type="text" 
                        placeholder="Scan catalog for products..." 
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
                    {products.map((product) => (
                        <div key={product.id} className="premium-card">
                            <div className="card-id-badge" style={{ background: product.status === 'active' ? '#f0fdf4' : '#fef2f2', color: product.status === 'active' ? '#10b981' : '#ef4444' }}>
                                {product.status?.toUpperCase() || 'ACTIVE'}
                            </div>
                            {/* Image */}
                            <div style={{ width: '100%', height: '120px', borderRadius: '12px', overflow: 'hidden', marginBottom: '14px', background: '#f8fafc' }}>
                                <img src={product.image || 'https://placehold.co/300x120'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            {/* Name */}
                            <h3 className="card-title-main" style={{ fontSize: '1rem', marginBottom: '8px', paddingRight: '55px' }}>{product.name}</h3>
                            {/* Price + Stock */}
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#10b981' }}>₹{product.price}</div>
                                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8', background: '#f8fafc', padding: '3px 8px', borderRadius: '6px' }}>STOCK: {product.quantity ?? '—'}</div>
                            </div>
                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => { setEditingProduct(product); setShowModal(true); }} className="btn-action" style={{ flex: 1, padding: '10px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}><Edit2 size={17} /></button>
                                <button onClick={() => handleDelete(product.id)} className="btn-action" style={{ flex: 1, padding: '10px', background: '#fff1f2', border: '1px solid #fee2e2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={17} /></button>
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
                    <div className="modal-premium fade-in" style={{ maxWidth: '1100px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>{editingProduct ? 'Commit SKU' : 'Register SKU'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: '#f8fafc', border: 'none', color: '#94a3b8', cursor: 'pointer', width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={28} /></button>
                        </div>
                        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div><label style={{ fontWeight: 700 }}>Product Name</label><input name="name" defaultValue={editingProduct?.name} required className="input-premium-field" /></div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div><label style={{ fontWeight: 700 }}>MSRP (Price)</label><input name="price" defaultValue={editingProduct?.price} className="input-premium-field" /></div>
                                    <div><label style={{ fontWeight: 700 }}>Material</label><input name="material" defaultValue={editingProduct?.material} className="input-premium-field" /></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                                    <div><label style={{ fontWeight: 700 }}>Unit</label><input name="unit" defaultValue={editingProduct?.unit} className="input-premium-field" /></div>
                                    <div><label style={{ fontWeight: 700 }}>Weight</label><input name="weight" defaultValue={editingProduct?.weight} className="input-premium-field" /></div>
                                    <div><label style={{ fontWeight: 700 }}>Stock Qty</label><input name="quantity" type="number" defaultValue={editingProduct?.quantity} className="input-premium-field" /></div>
                                </div>
                                <div><label style={{ fontWeight: 700 }}>Technical Specifications</label><textarea name="specs" defaultValue={editingProduct?.specs || editingProduct?.specifications} className="input-premium-field" style={{ height: '100px', paddingTop: '15px' }}></textarea></div>
                                <div><label style={{ fontWeight: 700 }}>Full Description</label><textarea name="description" defaultValue={editingProduct?.description} className="input-premium-field" style={{ height: '150px', paddingTop: '15px' }}></textarea></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <div><label style={{ fontWeight: 700 }}>Product Image (Drag & Drop)</label><ImageUpload name="image" defaultValue={editingProduct?.image || editingProduct?.image_path} /></div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div><label style={{ fontWeight: 700 }}>Brand ID</label><input name="brand_id" defaultValue={editingProduct?.brand_id} className="input-premium-field" /></div>
                                    <div><label style={{ fontWeight: 700 }}>Category ID</label><input name="category_id" defaultValue={editingProduct?.category_id} className="input-premium-field" /></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div>
                                        <label style={{ fontWeight: 700 }}>Top Category</label>
                                        <select name="top_category" defaultValue={editingProduct?.top_category || ''} className="input-premium-field">
                                            <option value="">None / Standard Product</option>
                                            <option value="Top Category">Top Category</option>
                                            <option value="New Arrival">New Arrival</option>
                                            <option value="Trending Product">Trending Product</option>
                                        </select>
                                    </div>
                                    <div><label style={{ fontWeight: 700 }}>Status</label><select name="status" defaultValue={editingProduct?.status || 'active'} className="input-premium-field"><option value="active">Active</option><option value="inactive">Inactive</option><option value="pending">Pending</option></select></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div><label style={{ fontWeight: 700 }}>Dimensions</label><input name="dimensions" defaultValue={editingProduct?.dimensions} className="input-premium-field" /></div>
                                    <div><label style={{ fontWeight: 700 }}>Min Order Qty</label><input name="min_order_qty" type="number" defaultValue={editingProduct?.min_order_qty} className="input-premium-field" /></div>
                                </div>
                                <div><label style={{ fontWeight: 700 }}>Additional Notes</label><textarea name="notes" defaultValue={editingProduct?.notes || editingProduct?.additional_notes} className="input-premium-field" style={{ height: '100px', paddingTop: '15px' }}></textarea></div>
                            </div>
                            <div style={{ gridColumn: isMobile ? 'auto' : 'span 2', display: 'flex', gap: '20px', marginTop: '10px' }}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn-premium-ghost" style={{ flex: 1 }}>Abort</button>
                                <button type="submit" disabled={syncing} className="btn-premium-navy" style={{ flex: 2, background: '#4f46e5', justifyContent: 'center' }}>
                                    {syncing ? 'SYNCING CATALOG...' : 'COMMIT SKU RECORD'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showImportModal && (
                <ImportModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} type="products" onImport={fetchProducts} />
            )}
        </div>
    );
};

export default ProductsManagement;
