
const fs = require('fs');
const path = require('path');

const jsPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\js', 'main.js');
const cssPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\css', 'style.css');

// 1. Revert JS to a cleaner 'Official' format - remove email from the top row, keep it for the dropdown
let jsContent = fs.readFileSync(jsPath, 'utf8');

// Pattern for the complex stack I just added
const complexHtmlPattern = /topNavActions\.innerHTML = `\s*<div class="user-profile-nav">[\s\S]*?<\/div>[\s\S]*?<i class="fa-solid fa-chevron-down user-avatar-chevron"><\/i>/;

const officialHtml = `topNavActions.innerHTML = \`
                <div class="user-profile-nav">
                    <div class="user-avatar-circle">\${initials}</div>
                    <span class="user-avatar-name">\${firstName}</span>
                    <i class="fa-solid fa-chevron-down user-avatar-chevron"></i>`;

jsContent = jsContent.replace(complexHtmlPattern, officialHtml);
fs.writeFileSync(jsPath, jsContent, 'utf8');

// 2. Official CSS Styles (Minimalist, Clean, High-End)
let cssContent = fs.readFileSync(cssPath, 'utf8');
const officialStyles = `
/* ===== OFFICIAL CORPORATE USER PROFILE NAV ===== */
.user-profile-nav {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    padding: 2px 5px !important; /* Tighter padding for official look */
    background: transparent !important;
    cursor: pointer !important;
    position: relative !important;
    transition: all 0.2s ease !important;
    margin-left: 20px !important;
}

.user-profile-nav:hover {
    opacity: 0.8 !important;
}

.user-avatar-circle {
    width: 34px !important;
    height: 34px !important;
    background: #0A2540 !important; /* Solid Brand Blue */
    color: #ffffff !important;
    border: 2px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-weight: 600 !important;
    font-size: 0.8rem !important;
    font-family: 'Poppins', sans-serif !important;
    text-transform: uppercase !important;
}

.user-avatar-name {
    color: #ffffff !important;
    font-weight: 500 !important;
    font-size: 0.9rem !important;
    font-family: 'Inter', sans-serif !important;
}

.user-avatar-chevron {
    color: rgba(255, 255, 255, 0.5) !important;
    font-size: 0.7rem !important;
    margin-left: 2px !important;
}

.user-profile-nav:hover .user-avatar-chevron {
    color: #ffffff !important;
}
`;

const marker = '/* ===== USER PROFILE NAV STYLES ===== */';
const officialMarker = '/* ===== OFFICIAL CORPORATE USER PROFILE NAV ===== */';

if (cssContent.includes(marker)) {
    cssContent = cssContent.split(marker)[0] + officialStyles;
} else if (cssContent.includes(officialMarker)) {
    cssContent = cssContent.split(officialMarker)[0] + officialStyles;
} else {
    cssContent += officialStyles;
}

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Official corporate user profile styles applied.');
