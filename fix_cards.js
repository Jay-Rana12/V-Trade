const fs = require('fs');
let content = fs.readFileSync('blog.html', 'utf8');

// Remove ALL previously broken/injected card CSS blocks inside the <style> tag
// and replace with one clean definitive version

const cleanCardCSS = `
        /* ===== PERFECT CARD STYLES (FINAL) ===== */
        .kw-card {
            flex: 0 0 280px;
            background: #ffffff;
            border-radius: 22px;
            overflow: hidden;
            box-shadow: 0 12px 40px rgba(10, 37, 64, 0.08);
            border: 1px solid rgba(10, 37, 64, 0.06);
            transition: box-shadow 0.4s ease;
            position: relative;
            cursor: pointer;
            display: flex;
            flex-direction: column;
        }
        .kw-card:hover {
            box-shadow: 0 25px 60px rgba(10, 37, 64, 0.18);
        }
        .kw-card-img {
            width: 100%;
            height: 200px;
            overflow: hidden;
            position: relative;
            flex-shrink: 0;
        }
        .kw-card-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.8s ease;
        }
        .kw-card:hover .kw-card-img img { transform: scale(1.1); }

        .kw-trend-tag {
            position: absolute;
            top: 14px;
            left: 14px;
            color: #fff;
            font-size: 0.7rem;
            font-weight: 700;
            padding: 5px 13px;
            border-radius: 20px;
            letter-spacing: 0.8px;
            z-index: 4;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .kw-trend-tag.hot { background: linear-gradient(135deg, #ef4444, #f97316); }
        .kw-trend-tag.new { background: linear-gradient(135deg, #059669, #10b981); }
        .kw-trend-tag.top { background: linear-gradient(135deg, #7c3aed, #a855f7); }

        .kw-card-body {
            padding: 20px 22px 22px;
            display: flex;
            flex-direction: column;
            flex: 1;
        }
        .kw-product-name {
            font-size: 1rem;
            font-weight: 700;
            color: #0A2540;
            margin: 0 0 8px 0;
            line-height: 1.3;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .kw-product-sub {
            font-size: 0.82rem;
            color: #64748b;
            line-height: 1.55;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin: 0 0 16px 0;
            flex: 1;
        }
        .kw-card-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: auto;
            padding-top: 12px;
            border-top: 1px solid #f1f5f9;
        }
        .kw-stars {
            color: #f59e0b;
            font-size: 0.85rem;
            letter-spacing: 1px;
        }
        .kw-view-btn {
            font-size: 0.78rem;
            font-weight: 700;
            color: #F59E0B;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            display: flex;
            align-items: center;
            gap: 6px;
            text-decoration: none;
            transition: gap 0.25s ease;
        }
        .kw-card:hover .kw-view-btn { gap: 10px; }
`;

// Inject just before the closing </style> tag
const styleCloseIdx = content.lastIndexOf('</style>');
if (styleCloseIdx !== -1) {
    content = content.slice(0, styleCloseIdx) + cleanCardCSS + '    </style>' + content.slice(styleCloseIdx + 8);
    fs.writeFileSync('blog.html', content);
    console.log('Card styles injected successfully.');
} else {
    console.log('ERROR: </style> tag not found.');
}
