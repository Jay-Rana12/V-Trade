
const fs = require('fs');
const path = require('path');

const cssPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\css', 'style.css');
let content = fs.readFileSync(cssPath, 'utf8');

const squareDropdownStyles = `
/* ===== SQUARE & LARGE OFFICIAL DROPDOWN ===== */
.user-dropdown {
    width: 360px !important; /* Fixed large width */
    min-height: 400px !important; /* Substantial height for "Square" feel */
    padding: 25px !important;
    border-radius: 20px !important;
    background: #ffffff !important;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2) !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    right: -20px !important;
    border: 1px solid rgba(0,0,0,0.05) !important;
}

.user-dropdown-info {
    padding: 30px 20px !important; /* More space */
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
    border-radius: 16px !important;
    margin-bottom: 20px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important; /* Center for square look */
    text-align: center !important;
}

.user-dropdown-info-avatar {
    width: 70px !important; /* Much larger avatar */
    height: 70px !important;
    font-size: 1.8rem !important;
    margin-bottom: 15px !important;
    border: 4px solid white !important;
}

.user-dropdown-info-name {
    font-size: 1.2rem !important;
    color: #0A2540 !important;
}

.dm-info-row {
    padding: 18px 20px !important;
    margin: 10px 0 !important;
    border-radius: 14px !important;
}

.dm-info-row .dm-icon {
    width: 36px !important;
    height: 36px !important;
}

.user-dropdown-footer a {
    padding: 18px !important;
    font-size: 1rem !important;
    justify-content: center !important;
    border-radius: 14px !important;
}
`;

const marker = '/* ===== OFFICIAL PREMIUM USER DROPDOWN';
if (content.includes(marker)) {
    content = content.split(marker)[0] + squareDropdownStyles;
} else {
    content += squareDropdownStyles;
}

fs.writeFileSync(cssPath, content, 'utf8');
console.log('Square & Large Official Dropdown styles applied.');
