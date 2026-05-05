const fs = require('fs');
const cssPath = 'c:/Users/AE/OneDrive/Desktop/redesign/css/style.css';
let content = fs.readFileSync(cssPath, 'utf8');

const perfectCSS = `/* Extended Header Styles - Restored to Original Perfect Design */
:root {
  --nav-bg: #101e2c;
  --nav-bg-alt: #162636;
  --accent-orange: #f36b41;
  --accent-pink: #ff4d6d;
  --text-white: #ffffff;
  --text-gray: #a0aec0;
}

body {
  padding-top: 130px !important;
}

.extended-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100% !important;
  z-index: 1000;
  background: var(--nav-bg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 0 !important;
  border: none !important;
  transform: none !important;
  backdrop-filter: none !important;
  transition: all 0.3s ease;
}

.header-container {
  max-width: 1400px !important;
  width: 100% !important;
  margin: 0 auto;
  padding: 0 40px !important;
}

/* Top Row */
.header-main-row {
  padding: 15px 0 !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  gap: 30px;
}

.premium-logo {
  display: flex !important;
  align-items: center !important;
  gap: 15px !important;
  text-decoration: none;
}

.logo-icon-glass {
  width: 48px !important;
  height: 48px !important;
  background: var(--accent-orange) !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: white !important;
  box-shadow: 0 4px 10px rgba(243, 107, 65, 0.3) !important;
}

.logo-text-gradient {
  font-size: 1.8rem !important;
  color: white !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  background: none !important;
  -webkit-text-fill-color: initial !important;
}

/* Search Bubble */
.search-bubble {
  flex: 1;
  max-width: 600px;
  background: #1c2d3d !important;
  border-radius: 6px !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  padding: 8px 15px !important;
  display: flex;
  align-items: center;
}

.search-bubble input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white !important;
  font-size: 0.95rem !important;
}

.search-bubble input::placeholder {
  color: #718096 !important;
}

.search-btn-icon {
  background: transparent !important;
  color: white !important;
  border: none;
  cursor: pointer;
  padding: 0 5px;
}

/* Auth Actions */
.top-nav-actions {
  display: flex;
  align-items: center;
  gap: 30px;
}

.login-link {
  color: white !important;
  font-weight: 500 !important;
  font-size: 0.95rem !important;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.login-link i {
  color: white !important;
}

.action-btn.glow-btn {
  background: var(--accent-orange) !important;
  color: white !important;
  padding: 10px 25px !important;
  border-radius: 6px !important;
  font-weight: 700 !important;
  text-transform: uppercase;
  font-size: 0.9rem !important;
  text-decoration: none;
  border: none !important;
  box-shadow: none !important;
  transition: all 0.3s ease;
}

.action-btn.glow-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}

/* Bottom Row */
.header-nav-row {
  padding: 12px 0 !important;
  border: none !important;
  display: flex;
  align-items: center;
}

.premium-nav-links {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start !important;
  gap: 30px !important;
  list-style: none;
  margin: 0;
  padding: 0;
}

.categories-dropdown {
  margin-right: 15px;
}

.btn-categories {
  background: transparent !important;
  color: white !important;
  border: none !important;
  font-weight: 700 !important;
  font-size: 0.85rem !important;
  padding: 0 !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

/* DATA Button */
.btn-data {
  background: var(--accent-pink) !important;
  color: white !important;
  padding: 10px 24px !important;
  border-radius: 12px !important;
  font-weight: 800 !important;
  text-transform: uppercase;
  display: flex !important;
  align-items: center;
  gap: 12px !important;
  font-size: 1rem !important;
  box-shadow: 0 5px 15px rgba(255, 77, 109, 0.3) !important;
  cursor: pointer;
  border: none !important;
}

.btn-data:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.nav-item {
  color: white !important;
  font-weight: 700 !important;
  font-size: 0.85rem !important;
  letter-spacing: 0.5px !important;
  padding: 5px 0 !important;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.nav-item.active {
  color: var(--accent-orange) !important;
}

.nav-item:hover {
  color: var(--accent-orange) !important;
}

.nav-item::after, .nav-item::before {
  display: none !important;
}
`;

// Replace from line 257 to where Hero starts
const lines = content.split('\n');
const startIndex = 256; // line 257
let endIndex = -1;

for (let i = startIndex; i < lines.length; i++) {
  if (lines[i].includes('--- Redesigned Advanced Hero ---')) {
    endIndex = i;
    break;
  }
}

if (endIndex !== -1) {
  lines.splice(startIndex, endIndex - startIndex, perfectCSS);
  fs.writeFileSync(cssPath, lines.join('\n'));
  console.log('Successfully updated style.css');
} else {
  console.log('Hero section not found');
}
