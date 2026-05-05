
const fs = require('fs');
const path = require('path');

const filePath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign', 'houseware.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the remnant modal code (lines 561-588 in previous view)
// We look for the div with class "modal-details" that is not part of the global modal_system
// Actually, it's safer to just look for the block following the comment.
const remnantStart = '<!-- Modal managed by modal_system.js -->';
const remnantEnd = '<!-- Footer -->';

const regex = new RegExp(remnantStart + '[\\s\\S]*?' + remnantEnd);
content = content.replace(regex, remnantStart + '\n\n    ' + remnantEnd);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleaned up houseware.html');

// 2. Fix the CSS properly this time
const cssPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\css', 'style.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Fix Search Bubble colors (White background, Dark text)
cssContent = cssContent.replace(/\.search-bubble\s*\{[\s\S]*?\}/, `.search-bubble {
  display: flex;
  align-items: center;
  background: #ffffff !important;
  border-radius: 8px !important;
  padding: 12px 25px;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  transition: all 0.3s ease;
}`);

cssContent = cssContent.replace(/\.search-bubble input\s*\{[\s\S]*?\}/, `.search-bubble input {
  flex-grow: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #0A2540 !important;
}`);

cssContent = cssContent.replace(/\.search-bubble input::placeholder\s*\{[\s\S]*?\}/, `.search-bubble input::placeholder {
  color: #64748b !important;
}`);

cssContent = cssContent.replace(/\.search-btn-icon\s*\{[\s\S]*?\}/, `.search-btn-icon {
  background: transparent;
  border: none;
  color: #0A2540 !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  padding-right: 5px;
  transition: all 0.3s;
}`);

cssContent = cssContent.replace(/\.mic-btn-icon\s*\{[\s\S]*?\}/, `.mic-btn-icon {
  background: transparent;
  border: none;
  color: #0A2540 !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}`);

// Ensure ts-card styles at the end (the force_ts_styles.js might have missed something if ts-card was already briefly there)
// I'll just remove any existing .ts-card block and re-add at the end to be sure.
cssContent = cssContent.split('/* ===== GLOBAL PRODUCT CARD STYLES')[0];
const tsStyles = `
/* ===== GLOBAL PRODUCT CARD STYLES (MATCHING SERVICES.HTML) ===== */
.ts-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
    gap: 25px !important;
    margin: 40px auto !important;
}

.ts-card {
    background: white !important;
    border-radius: 12px !important;
    overflow: hidden !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
    transition: all 0.3s ease !important;
    border: 1px solid #edf2f7 !important;
    display: flex !important;
    flex-direction: column !important;
}

.ts-card:hover { transform: translateY(-5px) !important; box-shadow: 0 12px 30px rgba(0,0,0,0.1) !important; }

.ts-img-wrap {
    height: 220px !important;
    position: relative !important;
    background: #f8fafc !important;
    overflow: hidden !important;
}

.ts-img { width: 100% !important; height: 100% !important; object-fit: cover !important; transition: transform 0.5s !important; }
.ts-card:hover .ts-img { transform: scale(1.05) !important; }

.ts-sold-badge {
    position: absolute !important;
    top: 15px !important;
    right: 15px !important;
    background: #FFB900 !important;
    color: #000 !important;
    padding: 4px 10px !important;
    border-radius: 6px !important;
    font-size: 0.7rem !important;
    font-weight: 800 !important;
    z-index: 2 !important;
    display: flex !important;
    align-items: center !important;
    gap: 5px !important;
}

.ts-body { padding: 20px !important; flex: 1 !important; display: flex !important; flex-direction: column !important; }
.ts-logo-row { display: flex !important; align-items: center !important; justify-content: space-between !important; margin-bottom: 15px !important; }
.ts-company-logo-box { display: flex !important; align-items: center !important; gap: 8px !important; background: #0A2540 !important; color: #fff !important; padding: 5px 10px !important; border-radius: 6px !important; font-size: 0.7rem !important; font-weight: 700 !important; }
.ts-company-logo-box i { color: #FFB900 !important; }
.ts-cat-tag { font-size: 0.7rem !important; font-weight: 700 !important; color: #64748b !important; text-transform: uppercase !important; letter-spacing: 0.5px !important; }

.ts-name { font-size: 1.1rem !important; font-weight: 800 !important; color: #0A2540 !important; margin-bottom: 8px !important; }
.ts-pieces { font-size: 0.75rem !important; color: #FFB900 !important; font-weight: 700 !important; }
.ts-desc { font-size: 0.85rem !important; color: #64748b !important; margin-bottom: 15px !important; display: -webkit-box !important; -webkit-line-clamp: 2 !important; -webkit-box-orient: vertical !important; overflow: hidden !important; }

.ts-sold-bar-wrap { margin-bottom: 20px !important; }
.ts-sold-label { display: flex !important; justify-content: space-between !important; font-size: 0.75rem !important; color: #94a3b8 !important; margin-bottom: 5px !important; font-weight: 600 !important; }
.ts-sold-label strong { color: #0A2540 !important; }
.ts-sold-bar { height: 6px !important; background: #f1f5f9 !important; border-radius: 10px !important; overflow: hidden !important; }
.ts-sold-fill { height: 100% !important; background: #FFB900 !important; border-radius: 10px !important; }

.ts-footer { padding-top: 15px !important; border-top: 1px solid #f1f5f9 !important; display: flex !important; justify-content: space-between !important; align-items: center !important; margin-top: auto !important; }
.ts-price { font-size: 1.1rem !important; font-weight: 800 !important; color: #0A2540 !important; }
.ts-price span { font-size: 0.75rem !important; color: #94a3b8 !important; font-weight: 500 !important; }

.ts-actions { display: flex !important; gap: 10px !important; }
.ts-btn-detail, .ts-btn-enquire { border: none !important; padding: 10px 15px !important; border-radius: 8px !important; font-size: 0.8rem !important; font-weight: 700 !important; cursor: pointer !important; transition: all 0.2s !important; display: flex !important; align-items: center !important; gap: 8px !important; }
.ts-btn-detail { background: #f1f5f9 !important; color: #0A2540 !important; }
.ts-btn-detail:hover { background: #e2e8f0 !important; }
.ts-btn-enquire { background: #0A2540 !important; color: #fff !important; }
.ts-btn-enquire:hover { background: #1a2c41 !important; transform: scale(1.05) !important; }
`;

cssContent += tsStyles;
fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Final fix for style.css applied');
