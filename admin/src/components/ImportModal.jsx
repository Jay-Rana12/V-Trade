import React, { useState } from 'react';
import { X, Upload, Table, Check, AlertCircle, Download, FileSpreadsheet, FileText, Search } from 'lucide-react';

const ImportModal = ({ isOpen, onClose, type, onImport }) => {
    const [file, setFile] = useState(null);
    const [previewData, setPreviewData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState('file'); // 'file' or 'paste'
    const [pasteData, setPasteData] = useState({});

    if (!isOpen) return null;

    const getColumnsForType = () => {
        switch (type) {
            case 'products': return [
                { key: 'name', label: 'Product Name' },
                { key: 'price', label: 'Price (MSRP)' },
                { key: 'material', label: 'Material' },
                { key: 'unit', label: 'Unit' },
                { key: 'weight', label: 'Weight' },
                { key: 'quantity', label: 'Quantity' },
                { key: 'status', label: 'Status' },
                { key: 'min_order_qty', label: 'Min Order Qty' },
                { key: 'brand_id', label: 'Brand ID' },
                { key: 'category_id', label: 'Category ID' },
                { key: 'top_category', label: 'Top Category' },
                { key: 'dimensions', label: 'Dimensions' },
                { key: 'notes', label: 'Additional Notes' },
                { key: 'description', label: 'Description' },
                { key: 'image_path', label: 'Image URL' }
            ];
            case 'profiles': return [
                { key: 'company_name', label: 'Company Name' },
                { key: 'type', label: 'Business Type' },
                { key: 'owner', label: 'Owner Name' },
                { key: 'phone', label: 'Mobile Number' },
                { key: 'whatsapp', label: 'WhatsApp Number' },
                { key: 'email', label: 'Contact Email' },
                { key: 'address', label: 'Company Address' },
                { key: 'website', label: 'Website URL' },
                { key: 'about', label: 'About Company' }
            ];
            case 'brands': return [
                { key: 'name', label: 'Company Name' },
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone' },
                { key: 'whatsapp', label: 'WhatsApp' },
                { key: 'gst', label: 'GST' },
                { key: 'website', label: 'Website' },
                { key: 'insta', label: 'Instagram' },
                { key: 'fb', label: 'Facebook' },
                { key: 'twitter', label: 'Twitter' },
                { key: 'linkedin', label: 'LinkedIn' },
                { key: 'address', label: 'Full Address' },
                { key: 'about', label: 'Corporate Bio' },
                { key: 'logo', label: 'Logo Path' }
            ];
            case 'joiners': return [
                { key: 'name', label: 'Full Name' },
                { key: 'company', label: 'Company Name' },
                { key: 'gst', label: 'GST Number' },
                { key: 'email', label: 'Email Address' },
                { key: 'mobile', label: 'Mobile Number' },
                { key: 'whatsapp', label: 'WhatsApp Number' },
                { key: 'fb', label: 'Facebook' },
                { key: 'insta', label: 'Instagram' },
                { key: 'twitter', label: 'Twitter' },
                { key: 'linkedin', label: 'LinkedIn' },
                { key: 'logo', label: 'Logo URL' }
            ];
            case 'categories': return [
                { key: 'name', label: 'Category Name' }
            ];
            case 'blogs': return [
                { key: 'title', label: 'Blog Title' },
                { key: 'slug', label: 'Slug (URL)' },
                { key: 'category', label: 'Category' },
                { key: 'author', label: 'Author' },
                { key: 'tags', label: 'Tags' },
                { key: 'status', label: 'Status' },
                { key: 'excerpt', label: 'Short Excerpt' },
                { key: 'content', label: 'Full Content' },
                { key: 'image', label: 'Featured Image URL' }
            ];
            default: return [];
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        setError(null);
        parseFile(selectedFile);
    };

    const parseFile = (file) => {
        setLoading(true);
        const reader = new FileReader();

        const extension = file.name.split('.').pop().toLowerCase();

        if (extension === 'csv') {
            window.Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    setPreviewData(results.data);
                    setHeaders(Object.keys(results.data[0] || {}));
                    setLoading(false);
                },
                error: (err) => {
                    setError('CSV Parsing Error: ' + err.message);
                    setLoading(false);
                }
            });
        } else if (extension === 'xlsx' || extension === 'xls') {
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = window.XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const json = window.XLSX.utils.sheet_to_json(worksheet);
                    setPreviewData(json);
                    setHeaders(Object.keys(json[0] || {}));
                    setLoading(false);
                } catch (err) {
                    setError('Excel Parsing Error: ' + err.message);
                    setLoading(false);
                }
            };
            reader.readAsArrayBuffer(file);
        } else {
            setError('Unsupported file type. Please use CSV or Excel.');
            setLoading(false);
        }
    };

    const handlePastePreview = () => {
        const columns = getColumnsForType();
        let maxLines = 0;
        const parsedColumns = {};

        columns.forEach(col => {
            const lines = (pasteData[col.key] || '').split('\n').map(l => l.trim()).filter(l => l);
            parsedColumns[col.key] = lines;
            if (lines.length > maxLines) maxLines = lines.length;
        });

        if (maxLines === 0) {
            setError('No data found to preview.');
            return;
        }

        const newPreviewData = [];
        for (let i = 0; i < maxLines; i++) {
            const row = {};
            columns.forEach(col => {
                row[col.key] = parsedColumns[col.key][i] || '';
            });
            newPreviewData.push(row);
        }

        setPreviewData(newPreviewData);
        setHeaders(columns.map(c => c.key));
        setFile({ name: 'Pasted Columns Data' }); // Mock file to bypass UI logic
        setError(null);
    };

    const handleSave = () => {
        onImport(previewData);
        onClose();
        setPreviewData([]);
        setFile(null);
        setPasteData({});
    };

    const clearData = () => {
        setFile(null);
        setPreviewData([]);
        setHeaders([]);
        setError(null);
        setPasteData({});
    };

    const removeRow = (index) => {
        setPreviewData(prev => prev.filter((_, i) => i !== index));
    };

    const downloadTemplate = () => {
        let templateData = [];
        if (type === 'products') {
            templateData = [{ name: 'Example', price: '1000', material: 'Steel', unit: 'pcs', brand_id: '1', category_id: '1', quantity: '10' }];
        } else if (type === 'profiles') {
            templateData = [{ company_name: 'Corp', owner_name: 'John', email_address: 'j@example.com', profile_type: 'Dealer' }];
        } else if (type === 'brands') {
            templateData = [{ company_name: 'Brand', email: 'b@ex.com', phone: '123', whatsapp: '123', gst_number: 'GST123', website_url: 'ex.com' }];
        }

        const ws = window.XLSX.utils.json_to_sheet(templateData);
        const wb = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(wb, ws, "Template");
        window.XLSX.writeFile(wb, `${type}_template.xlsx`);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
            <div className="stat-card fade-in" style={{ width: '100%', maxWidth: '1100px', maxHeight: '90vh', background: 'white', borderRadius: '24px', padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }} onClick={(e) => e.stopPropagation()}>
                <div style={{ padding: '25px 30px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a' }}>Bulk Import {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Scan and preview data before system persistence.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={downloadTemplate} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                            <Download size={16} /> Template
                        </button>
                        <button onClick={onClose} style={{ background: '#f1f5f9', border: 'none', color: '#64748b', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
                    {previewData.length === 0 ? (
                        <>
                            <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '12px', padding: '6px', marginBottom: '25px' }}>
                                <button onClick={() => setMode('file')} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 800, background: mode === 'file' ? 'white' : 'transparent', color: mode === 'file' ? '#1d4ed8' : '#64748b', cursor: 'pointer', boxShadow: mode === 'file' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <FileSpreadsheet size={18} /> Full File/Paste
                                </button>
                                <button onClick={() => setMode('paste')} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 800, background: mode === 'paste' ? '#1d4ed8' : 'transparent', color: mode === 'paste' ? 'white' : '#64748b', cursor: 'pointer', boxShadow: mode === 'paste' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <Table size={18} /> Column Paste
                                </button>
                            </div>

                            {mode === 'file' ? (
                                <div className="fade-in" style={{ border: '2px dashed #cbd5e1', borderRadius: '20px', padding: '60px', textAlign: 'center', background: '#f8fafc' }}>
                                    <div style={{ width: '60px', height: '60px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                        <Upload size={30} color="#64748b" />
                                    </div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>Upload your Data File</h3>
                                    <p style={{ color: '#94a3b8', marginBottom: '25px', fontSize: '0.9rem' }}>Supports CSV, XLS, XLSX formats</p>
                                    <label style={{ background: '#1d4ed8', color: 'white', padding: '12px 30px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', display: 'inline-block' }}>
                                        Select File
                                        <input type="file" hidden accept=".csv,.xlsx,.xls" onChange={handleFileChange} />
                                    </label>
                                </div>
                            ) : (
                                <div className="fade-in">
                                    <div style={{ background: '#fef3c7', color: '#b45309', padding: '15px', borderRadius: '10px', marginBottom: '25px', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        💡 Paste each column from your Excel sheet into the respective boxes below.
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                                        {getColumnsForType().map(col => (
                                            <div key={col.key}>
                                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#1d4ed8', marginBottom: '8px', textTransform: 'uppercase' }}>{col.label}</label>
                                                <textarea
                                                    placeholder={`Paste ${col.label}...`}
                                                    style={{ width: '100%', height: '120px', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', resize: 'none', background: '#f8fafc', fontSize: '0.9rem', outlineColor: '#1d4ed8' }}
                                                    value={pasteData[col.key] || ''}
                                                    onChange={e => setPasteData({ ...pasteData, [col.key]: e.target.value })}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {error && <div style={{ color: '#ef4444', fontWeight: 700, marginTop: '15px' }}>{error}</div>}
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
                                        <button onClick={onClose} style={{ padding: '12px 25px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: 700, color: '#64748b', cursor: 'pointer' }}>Cancel</button>
                                        <button onClick={handlePastePreview} style={{ padding: '12px 30px', borderRadius: '12px', background: 'white', color: '#1d4ed8', border: '2px solid #1d4ed8', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Search size={18} /> Scan & Preview
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="fade-in">
                            {loading ? (
                                <div style={{ textAlign: 'center', padding: '50px' }}>
                                    <div className="spin" style={{ marginBottom: '15px' }}>⏳</div>
                                    <p style={{ fontWeight: 700, color: '#64748b' }}>Analyzing schema and mapping values...</p>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <FileSpreadsheet color="#10b981" />
                                            <span style={{ fontWeight: 800, color: '#0f172a' }}>{file?.name || 'Pasted Data'}</span>
                                            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>({previewData.length} records found)</span>
                                        </div>
                                        <button onClick={clearData} style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 700, border: 'none', background: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Clear Data</button>
                                    </div>

                                    <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                            <thead>
                                                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                                    <th style={{ padding: '12px', textAlign: 'left', color: '#64748b' }}>Action</th>
                                                    {headers.map(h => (
                                                        <th key={h} style={{ padding: '12px', textAlign: 'left', color: '#64748b', textTransform: 'capitalize' }}>{h.replace(/_/g, ' ')}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {previewData.map((row, idx) => (
                                                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                        <td style={{ padding: '10px' }}>
                                                            <button onClick={() => removeRow(idx)} style={{ border: 'none', background: '#fee2e2', color: '#ef4444', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}><X size={14} /></button>
                                                        </td>
                                                        {headers.map(h => (
                                                            <td key={h} style={{ padding: '10px', color: '#1e293b', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row[h]}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {previewData.length > 0 && !error && (
                    <div style={{ padding: '25px 30px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                        <button onClick={clearData} style={{ padding: '12px 25px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: 700, color: '#64748b', cursor: 'pointer' }}>Cancel</button>
                        <button onClick={handleSave} style={{ padding: '12px 40px', borderRadius: '12px', background: '#10b981', color: 'white', border: 'none', fontWeight: 900, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Check size={20} /> Commit to Database
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImportModal;
