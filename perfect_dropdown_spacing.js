
const fs = require('fs');
const path = require('path');

const cssPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\css', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

const officialDropdownStyles = `
/* ===== OFFICIAL PREMIUM USER DROPDOWN (SPACING & LAYOUT) ===== */
.user-dropdown {
    width: 330px !important;
    padding: 10px !important;
    border-radius: 18px !important;
    background: #ffffff !important;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15) !important;
    right: -10px !important; /* Slight offset for better alignment */
}

.user-dropdown-info {
    padding: 24px 18px !important;
    background: #f8fafc !important;
    border-radius: 14px !important;
    margin-bottom: 12px !important;
    border: 1px solid #f1f5f9 !important;
}

.user-dropdown-info-avatar {
    width: 48px !important;
    height: 48px !important;
    font-size: 1rem !important;
    box-shadow: 0 4px 12px rgba(10, 37, 64, 0.1) !important;
}

.user-dropdown-info-name {
    font-size: 1.05rem !important;
    margin-bottom: 2px !important;
}

.user-dropdown-menu {
    padding: 5px 0 !important;
}

.dm-info-row {
    padding: 14px 16px !important;
    margin: 8px 0 !important;
    gap: 14px !important;
    background: #ffffff !important;
    border: 1px solid #f1f5f9 !important;
    border-radius: 12px !important;
    transition: all 0.2s ease !important;
}

.dm-info-row:hover {
    background: #f8fafc !important;
    border-color: #e2e8f0 !important;
}

.dm-info-row .dm-icon {
    width: 32px !important;
    height: 32px !important;
    font-size: 0.9rem !important;
    color: #475569 !important;
    background: #f1f5f9 !important;
}

.dm-info-value {
    font-size: 0.88rem !important;
    color: #334155 !important;
}

.user-dropdown-divider {
    margin: 15px 10px !important;
    background: #f1f5f9 !important;
}

.user-dropdown-footer a {
    padding: 14px 16px !important;
    background: #fef2f2 !important;
    border-radius: 12px !important;
    margin-top: 5px !important;
}

.user-dropdown-footer a:hover {
    background: #fee2e2 !important;
}

.user-dropdown-footer a .dm-icon {
    background: rgba(220, 38, 38, 0.1) !important;
}
`;

// Append to the end
const marker = '/* ===== OFFICIAL PREMIUM USER DROPDOWN';
if (content.includes(marker)) {
    content = content.split(marker)[0] + officialDropdownStyles;
} else {
    content += officialDropdownStyles;
}

fs.writeFileSync(cssPath, content, 'utf8');
console.log('Official Dropdown spacing and layout perfection applied.');
