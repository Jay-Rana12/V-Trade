
const fs = require('fs');
const path = require('path');

const cssPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\css', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

// 1. Remove the solid background override at the end
// I'll look for my previous "Master UI Overrides" comment
const marker = '/* ===== MASTER UI OVERRIDES';
if (content.includes(marker)) {
    content = content.split(marker)[0];
}

// 2. Define the NEW Unified Premium Header Styles
const unifiedHeaderStyles = `
/* ===== UNIFIED PREMIUM HEADER (SYNCED WITH HOME PAGE) ===== */

.extended-header {
    background: linear-gradient(to bottom, rgba(16, 30, 44, 0.95), rgba(16, 30, 44, 0.85)) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    padding-bottom: 5px !important;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.extended-header.scrolled {
    background: rgba(16, 30, 44, 0.98) !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
}

.header-main-row {
    padding: 20px 0 !important;
    display: flex !important;
    align-items: center !important;
    gap: 40px !important;
}

/* Search Bar - Capsule Style like Home Page */
.search-bubble {
    background: #ffffff !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 50px !important; /* Pill shape */
    padding: 10px 25px !important;
    max-width: 650px !important; /* Wider for premium feel */
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
    transition: all 0.3s ease !important;
}

.search-bubble:focus-within {
    box-shadow: 0 12px 40px rgba(242, 107, 67, 0.25) !important;
    transform: translateY(-1px) !important;
    border-color: #F26B43 !important;
}

.search-bubble input {
    color: #0A2540 !important;
    font-size: 1rem !important;
    font-weight: 500 !important;
}

.search-bubble input::placeholder {
    color: #64748b !important;
}

.search-btn-icon, .mic-btn-icon {
    color: #0A2540 !important;
    font-size: 1.2rem !important;
    transition: color 0.3s !important;
}

.search-btn-icon:hover, .mic-btn-icon:hover {
    color: #F26B43 !important;
}

/* Navbar / Nav Links */
.header-nav-row {
    padding: 12px 0 !important;
    border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.premium-nav-links {
    gap: 35px !important;
}

.nav-item {
    font-size: 0.82rem !important;
    letter-spacing: 1.2px !important;
    opacity: 0.9;
}

.nav-item:hover, .nav-item.active {
    opacity: 1;
    color: #F26B43 !important;
}

/* Ensure Logo Size matches Home */
.logo-icon-glass {
    width: 52px !important;
    height: 52px !important;
}

.logo-text-gradient {
    font-size: 1.7rem !important;
}

/* Category Grid & Cards Fix - Re-adding these as they were part of previous overrides */
.ts-grid {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 30px !important;
    margin: 60px auto !important;
}

.ts-card {
    background: white !important;
    border-radius: 16px !important;
    overflow: hidden !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06) !important;
    transition: transform 0.3s ease, box-shadow 0.3s ease !important;
    border: 1px solid #f1f5f9 !important;
    display: flex !important;
    flex-direction: column !important;
}

.ts-card:hover { transform: translateY(-8px) !important; box-shadow: 0 20px 45px rgba(10, 37, 64, 0.12) !important; }

.ts-img-wrap { height: 230px !important; position: relative !important; background: #f8fafc !important; }
.ts-img { width: 100% !important; height: 100% !important; object-fit: cover !important; }
.ts-sold-badge {
    position: absolute !important;
    top: 15px !important; right: 15px !important;
    background: #FFB900 !important; color: #000 !important;
    padding: 5px 12px !important; border-radius: 20px !important;
    font-size: 0.72rem !important; font-weight: 800 !important;
}

.ts-body { padding: 22px !important; flex: 1 !important; }
.ts-name { font-size: 1.15rem !important; font-weight: 800 !important; color: #0A2540 !important; }
.ts-price { font-size: 1.2rem !important; font-weight: 800 !important; }

@media (max-width: 992px) {
    .header-main-row { gap: 15px !important; padding: 15px 0 !important; }
    .top-search { max-width: 100% !important; width: 100% !important; order: 3 !important; }
    .ts-grid { grid-template-columns: 1fr !important; }
}
`;

content += unifiedHeaderStyles;

fs.writeFileSync(cssPath, content, 'utf8');
console.log('Unified Premium Header styles applied.');
