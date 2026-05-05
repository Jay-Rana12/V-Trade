import React, { useState, useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';

const ImageUpload = ({ name, defaultValue }) => {
    const [preview, setPreview] = useState(defaultValue || '');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const [isUploading, setIsUploading] = useState(false);

    const handleFile = async (file) => {
        if (file && file.type.startsWith('image/')) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('image', file);
            try {
                const response = await fetch('http://localhost:5001/api/upload', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (data.url) {
                    setPreview(data.url);
                } else {
                    alert('Upload failed: ' + (data.error || 'Unknown error'));
                }
            } catch (err) {
                console.error("Upload failed", err);
                alert('Upload failed: ' + err.message);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    return (
        <div style={{ width: '100%' }}>
            <input type="hidden" name={name} value={preview} />
            <div 
                style={{
                    border: `2px dashed ${isDragging ? '#4f46e5' : '#cbd5e1'}`,
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    background: isDragging ? '#eef2ff' : '#f8fafc',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '120px'
                }}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                {isUploading ? (
                    <div style={{ padding: '20px', color: '#4f46e5', fontWeight: 600 }}>Uploading Image...</div>
                ) : preview ? (
                    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <img src={preview} alt="Preview" style={{ maxHeight: '100px', borderRadius: '8px', objectFit: 'contain' }} />
                        <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); setPreview(''); }}
                            style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >
                            <X size={14} />
                        </button>
                    </div>
                ) : (
                    <>
                        <UploadCloud size={32} color={isDragging ? '#4f46e5' : '#94a3b8'} style={{ marginBottom: '10px' }} />
                        <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                            <span style={{ color: '#4f46e5' }}>Click to upload</span> or drag and drop
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '5px' }}>SVG, PNG, JPG or GIF (max. 800x400px)</div>
                    </>
                )}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    accept="image/*"
                    onChange={(e) => handleFile(e.target.files[0])}
                />
            </div>
        </div>
    );
};

export default ImageUpload;
