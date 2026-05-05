
const fs = require('fs');
const path = require('path');

const cssPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\css', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

const tsStyles = `
/* ===== GLOBAL PRODUCT CARD STYLES (MATCHING SERVICES.HTML) ===== */
.ts-grid {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 28px !important;
    margin: 40px auto !important;
}

.ts-card {
    background: white !important;
    border-radius: 16px !important;
    overflow: hidden !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07) !important;
    transition: transform 0.3s ease, box-shadow 0.3s ease !important;
    border: 1px solid #f1f5f9 !important;
    display: flex !important;
    flex-direction: column !important;
}

.ts-card:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 16px 40px rgba(10, 37, 64, 0.13) !important;
}

.ts-img-wrap {
    position: relative !important;
    height: 210px !important;
    overflow: hidden !important;
    background: #f0f4f8 !important;
    cursor: pointer !important;
}

.ts-img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    transition: transform 0.4s ease !important;
}

.ts-card:hover .ts-img {
    transform: scale(1.06) !important;
}

.ts-sold-badge {
    position: absolute !important;
    top: 12px !important;
    right: 12px !important;
    background: linear-gradient(135deg, #F26B43, #e05a32) !important;
    color: white !important;
    padding: 5px 12px !important;
    border-radius: 20px !important;
    font-size: 0.75rem !important;
    font-weight: 700 !important;
    font-family: 'Poppins', sans-serif !important;
    display: flex !important;
    align-items: center !important;
    gap: 5px !important;
    box-shadow: 0 3px 10px rgba(242, 107, 67, 0.4) !important;
    letter-spacing: 0.3px !important;
    z-index: 2 !important;
}

.ts-body {
    padding: 18px 20px 20px !important;
    flex-grow: 1 !important;
    display: flex !important;
    flex-direction: column !important;
}

.ts-logo-row {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    margin-bottom: 12px !important;
}

.ts-company-logo-box {
    display: flex !important;
    align-items: center !important;
    gap: 7px !important;
    background: #0A2540 !important;
    color: white !important;
    padding: 6px 12px !important;
    border-radius: 8px !important;
    font-family: 'Poppins', sans-serif !important;
    font-weight: 700 !important;
    font-size: 0.72rem !important;
    letter-spacing: 0.5px !important;
    box-shadow: 0 2px 8px rgba(10, 37, 64, 0.25) !important;
}

.ts-company-logo-box i {
    color: #F26B43 !important;
    font-size: 0.85rem !important;
}

.ts-cat-tag {
    font-size: 0.72rem !important;
    font-weight: 600 !important;
    font-family: 'Poppins', sans-serif !important;
    padding: 4px 10px !important;
    border-radius: 20px !important;
    background: #e8effa !important;
    color: #0A2540 !important;
}

.ts-name {
    font-family: 'Poppins', sans-serif !important;
    font-size: 1rem !important;
    font-weight: 700 !important;
    color: #0A2540 !important;
    margin-bottom: 6px !important;
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    flex-wrap: wrap !important;
}

.ts-pieces {
    font-size: 0.72rem !important;
    font-weight: 700 !important;
    color: #F26B43 !important;
    background: #fff1ec !important;
    padding: 2px 8px !important;
    border-radius: 10px !important;
}

.ts-desc {
    font-size: 0.82rem !important;
    color: #64748b !important;
    line-height: 1.55 !important;
    margin-bottom: 14px !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
}

.ts-sold-bar-wrap {
    margin-bottom: 16px !important;
}

.ts-sold-label {
    display: flex !important;
    justify-content: space-between !important;
    font-size: 0.75rem !important;
    color: #94a3b8 !important;
    margin-bottom: 6px !important;
    font-family: 'Poppins', sans-serif !important;
    font-weight: 500 !important;
}

.ts-sold-label strong {
    color: #0A2540 !important;
    font-weight: 700 !important;
}

.ts-sold-bar {
    height: 6px !important;
    background: #e8effa !important;
    border-radius: 10px !important;
    overflow: hidden !important;
}

.ts-sold-fill {
    height: 100% !important;
    border-radius: 10px !important;
    background: linear-gradient(90deg, #F26B43, #e0992a) !important;
}

.ts-footer {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
    padding-top: 16px !important;
    border-top: 1px solid #f1f5f9 !important;
    margin-top: auto !important;
}

.ts-price {
    font-family: 'Poppins', sans-serif !important;
    font-weight: 700 !important;
    font-size: 1.05rem !important;
    color: #0A2540 !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
}

.ts-price span {
    font-weight: 400 !important;
    font-size: 0.75rem !important;
    color: #94a3b8 !important;
}

.ts-actions {
    display: flex !important;
    gap: 10px !important;
}

.ts-btn-detail {
    flex: 1 !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    padding: 10px !important;
    background: #0A2540 !important;
    color: white !important;
    border-radius: 10px !important;
    font-family: 'Poppins', sans-serif !important;
    font-weight: 700 !important;
    font-size: 0.8rem !important;
    border: none !important;
    cursor: pointer !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    text-decoration: none !important;
    box-shadow: 0 4px 10px rgba(10, 37, 64, 0.12) !important;
}

.ts-btn-detail:hover {
    background: #153a5c !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 18px rgba(10, 37, 64, 0.22) !important;
    color: white !important;
}

.ts-btn-enquire {
    flex: 1 !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    padding: 10px !important;
    background: #ffffff !important;
    color: #F26B43 !important;
    border: 2px solid #F26B43 !important;
    border-radius: 10px !important;
    font-family: 'Poppins', sans-serif !important;
    font-weight: 700 !important;
    font-size: 0.8rem !important;
    cursor: pointer !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    text-decoration: none !important;
}

.ts-btn-enquire:hover {
    background: #F26B43 !important;
    color: white !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 18px rgba(242, 107, 67, 0.15) !important;
}

@media (max-width: 768px) {
    .ts-grid {
        grid-template-columns: 1fr !important;
    }
}
`;

if (!content.includes('.ts-card')) {
    content += tsStyles;
    fs.writeFileSync(cssPath, content, 'utf8');
    console.log('Successfully added ts-card styles to style.css');
} else {
    console.log('ts-card styles already exist in style.css');
}
