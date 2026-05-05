
const fs = require('fs');
const path = require('path');

const cssPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\css', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

const updatedOverrides = `
/* ===== MASTER UI OVERRIDES FOR PREMIUM LOOK (FINAL ICON FIX) ===== */

/* Search Bar - Pure White & Elegant */
.search-bubble {
    background: #ffffff !important;
    border: 1px solid rgba(0, 0, 0, 0.08) !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
    padding: 6px 10px 6px 22px !important; /* Optimized padding for button */
    display: flex !important;
    align-items: center !important;
}

.search-bubble input {
    color: #0A2540 !important;
    background: transparent !important;
    font-weight: 500 !important;
    flex-grow: 1 !important;
}

.search-bubble input::placeholder {
    color: #94a3b8 !important;
}

/* White Icons with Pro Dark Backgrounds */
.search-btn-icon {
    background: #0A2540 !important;
    color: #ffffff !important;
    width: 42px !important;
    height: 42px !important;
    border-radius: 10px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-left: 10px !important;
    transition: all 0.3s ease !important;
    cursor: pointer !important;
}

.search-btn-icon:hover {
    background: #f26b43 !important; /* Coral on hover */
    transform: scale(1.05) !important;
}

.mic-btn-icon {
    background: #0A2540 !important;
    color: #ffffff !important;
    width: 36px !important;
    height: 36px !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 0 5px !important;
    transition: all 0.3s ease !important;
    cursor: pointer !important;
}

.mic-btn-icon:hover {
    background: #f26b43 !important;
}

/* Fix for locations badge text */
.location-indicator span, .user-city {
    color: #0A2540 !important; /* Dark text for white bar */
}

/* Category Grid & Cards Fix */
.ts-grid {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 30px !important;
    margin: 40px auto !important;
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

.ts-body { padding: 22px !important; flex: 1 !important; display: flex !important; flex-direction: column !important; }
.ts-logo-row { display: flex !important; align-items: center !important; justify-content: space-between !important; margin-bottom: 15px !important; }
.ts-company-logo-box { display: flex !important; align-items: center !important; gap: 8px !important; background: #0A2540 !important; color: #fff !important; padding: 5px 10px !important; border-radius: 6px !important; font-size: 0.7rem !important; font-weight: 700 !important; }
.ts-company-logo-box i { color: #FFB900 !important; }
.ts-cat-tag { font-size: 0.7rem !important; font-weight: 700 !important; color: #64748b !important; text-transform: uppercase !important; letter-spacing: 0.5px !important; }

.ts-name { font-size: 1.15rem !important; font-weight: 800 !important; color: #0A2540 !important; margin-bottom: 8px !important; }
.ts-pieces { font-size: 0.75rem !important; color: #FFB900 !important; font-weight: 700 !important; }
.ts-desc { font-size: 0.85rem !important; color: #64748b !important; margin-bottom: 15px !important; display: -webkit-box !important; -webkit-line-clamp: 2 !important; -webkit-box-orient: vertical !important; overflow: hidden !important; }

.ts-sold-bar-wrap { margin-bottom: 20px !important; }
.ts-sold-label { display: flex !important; justify-content: space-between !important; font-size: 0.75rem !important; color: #94a3b8 !important; margin-bottom: 5px !important; font-weight: 600 !important; }
.ts-sold-label strong { color: #0A2540 !important; }
.ts-sold-bar { height: 6px !important; background: #f1f5f9 !important; border-radius: 10px !important; overflow: hidden !important; }
.ts-sold-fill { height: 100% !important; background: #FFB900 !important; border-radius: 10px !important; }

.ts-footer { padding-top: 15px !important; border-top: 1px solid #f1f5f9 !important; display: flex !important; justify-content: space-between !important; align-items: center !important; margin-top: auto !important; }
.ts-price { font-size: 1.15rem !important; font-weight: 800 !important; color: #0A2540 !important; }
.ts-price span { font-size: 0.75rem !important; color: #94a3b8 !important; font-weight: 500 !important; }

.ts-actions { display: flex !important; gap: 10px !important; }
.ts-btn-detail, .ts-btn-enquire { border: none !important; padding: 10px 15px !important; border-radius: 8px !important; font-size: 0.8rem !important; font-weight: 700 !important; cursor: pointer !important; transition: all 0.2s !important; display: flex !important; align-items: center !important; gap: 8px !important; }
.ts-btn-detail { background: #f1f5f9 !important; color: #0A2540 !important; }
.ts-btn-detail:hover { background: #e2e8f0 !important; }
.ts-btn-enquire { background: #0A2540 !important; color: #fff !important; }
.ts-btn-enquire:hover { background: #1a2c41 !important; transform: scale(1.05) !important; }

@media (max-width: 992px) {
    .ts-grid { grid-template-columns: 1fr !important; }
}
`;

const marker = '/* ===== MASTER UI OVERRIDES';
if (content.includes(marker)) {
    content = content.split(marker)[0];
}
content += updatedOverrides;

fs.writeFileSync(cssPath, content, 'utf8');
console.log('Final Master UI Overrides (White Icons on Dark Buttons) applied.');
