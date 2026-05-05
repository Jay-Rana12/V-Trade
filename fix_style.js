const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'css', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

// The file ends at `  60% {\n}`. Let's find this and fix it properly.
const badEndingRegex = /@keyframes scaleIn\s*{\s*0%\s*{\s*transform:\s*scale\(0\);\s*opacity:\s*0;\s*}\s*60%\s*{\s*}\s*$/;

if (content.match(badEndingRegex)) {
    content = content.replace(badEndingRegex, `
@keyframes scaleIn {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

.success-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}`);
} else {
    // If it doesn't strictly match the bad ending, just append.
    // However, Let's ensure we append cleanly.
}

content += `
/* ══ EXACT MATCH SEARCH BAR ══ */
.search-bubble {
  background: #ffffff !important;
  border-radius: 50px !important;
  border: 1px solid #e2e8f0 !important;
  padding: 4px 6px 4px 20px !important;
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  height: 48px !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
  margin: 0 auto !important;
  width: 100% !important;
  max-width: 550px !important; /* Exact fit */
}
.search-bubble input {
  flex: 1 !important;
  background: transparent !important;
  border: none !important;
  outline: none !important;
  color: #334155 !important;
  font-size: 0.95rem !important;
  font-weight: 400 !important;
}
.search-bubble input::placeholder { color: #94a3b8 !important; }

#header-location-badge { display: none !important; }

.mic-btn-icon {
  background: #f8fafc !important;
  color: #64748b !important;
  width: 36px !important;
  height: 36px !important;
  border-radius: 50% !important;
  border: none !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
.mic-btn-icon:hover { background: #e2e8f0 !important; }
.mic-btn-icon i { font-size: 1rem !important; }

.search-btn-icon {
  background: #0B1120 !important;
  color: #ffffff !important;
  width: 40px !important;
  height: 38px !important;
  border-radius: 10px !important;
  border: none !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
.search-btn-icon:hover { background: #1e293b !important; }
.search-btn-icon i { font-size: 1rem !important; }
`;

fs.writeFileSync(cssPath, content, 'utf8');
console.log('Appended the exact image CSS match successfully.');
