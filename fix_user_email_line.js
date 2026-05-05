
const fs = require('fs');
const path = require('path');

const jsPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\js', 'main.js');
const cssPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\css', 'style.css');

// 1. Update the JS to include a proper info stack for name/email
let jsContent = fs.readFileSync(jsPath, 'utf8');
const oldHtml = 'topNavActions.innerHTML = `\n                <div class="user-profile-nav">\n                    <div class="user-avatar-circle">${initials}</div>\n                    <span class="user-avatar-name">${firstName}</span>\n                    <i class="fa-solid fa-chevron-down user-avatar-chevron"></i>';

const newHtml = 'topNavActions.innerHTML = `\n                <div class="user-profile-nav">\n                    <div class="user-avatar-circle">${initials}</div>\n                    <div class="user-info-stack">\n                        <span class="user-avatar-name">${firstName}</span>\n                        <span class="user-avatar-email">${userProfile.email || ""}</span>\n                    </div>\n                    <i class="fa-solid fa-chevron-down user-avatar-chevron"></i>';

jsContent = jsContent.replace(oldHtml, newHtml);
fs.writeFileSync(jsPath, jsContent, 'utf8');

// 2. Add the missing CSS styles
let cssContent = fs.readFileSync(cssPath, 'utf8');
const userStyles = `
/* ===== USER PROFILE NAV STYLES ===== */
.user-profile-nav {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    padding: 6px 14px !important;
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 50px !important;
    cursor: pointer !important;
    position: relative !important;
    transition: all 0.3s ease !important;
    margin-left: 15px !important;
}

.user-profile-nav:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
}

.user-avatar-circle {
    width: 32px !important;
    height: 32px !important;
    background: linear-gradient(135deg, #F26B43, #FFB900) !important;
    color: white !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-weight: 700 !important;
    font-size: 0.8rem !important;
    box-shadow: 0 4px 10px rgba(242, 107, 67, 0.3) !important;
}

.user-info-stack {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    line-height: 1.2 !important;
    max-width: 120px !important;
}

.user-avatar-name {
    color: white !important;
    font-weight: 700 !important;
    font-size: 0.85rem !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    width: 100% !important;
}

.user-avatar-email {
    color: rgba(255, 255, 255, 0.6) !important;
    font-size: 0.65rem !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    width: 100% !important;
}

.user-avatar-chevron {
    color: rgba(255, 255, 255, 0.6) !important;
    font-size: 0.7rem !important;
}
`;

// Append to the end or replace existing block
const marker = '/* ===== USER PROFILE NAV STYLES ===== */';
if (cssContent.includes(marker)) {
    cssContent = cssContent.split(marker)[0] + userStyles;
} else {
    cssContent += userStyles;
}

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('User profile line alignment fix applied (JS & CSS).');
