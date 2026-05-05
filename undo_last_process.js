
const fs = require('fs');
const path = require('path');

const jsPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\js', 'main.js');
const cssPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\css', 'style.css');

// 1. Revert JS to the Square/Official structure (No "Welcome," text)
let jsContent = fs.readFileSync(jsPath, 'utf8');

const checkNavbarAuthMatchvibrant = /if \(isLoggedIn && userProfile\.name\) \{[\s\S]*?topNavActions\.innerHTML = `[\s\S]*?`;\s*}/;

const squareJsHtml = `if (isLoggedIn && userProfile.name) {
            const firstName = userProfile.name.split(' ')[0];
            const initials = userProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2);
            topNavActions.innerHTML = \`
                <div class="user-profile-nav">
                    <div class="user-avatar-circle">\${initials}</div>
                    <span class="user-avatar-name">\${firstName}</span>
                    <i class="fa-solid fa-chevron-down user-avatar-chevron"></i>

                    <div class="user-dropdown">
                        <div class="user-dropdown-info">
                            <div class="user-dropdown-info-avatar">\${initials}</div>
                            <div class="user-dropdown-info-text">
                                <span class="user-dropdown-info-name">\${userProfile.name}</span>
                                <span class="user-dropdown-info-role">B2B Member</span>
                            </div>
                        </div>

                        <div class="user-dropdown-menu">
                            <div class="dm-info-row">
                                <span class="dm-icon"><i class="fa-solid fa-envelope"></i></span>
                                <span class="dm-info-value">\${userProfile.email || 'No email set'}</span>
                            </div>
                            <div class="dm-info-row">
                                <span class="dm-icon"><i class="fa-solid fa-mobile-screen"></i></span>
                                <span class="dm-info-value">\${userProfile.phone || 'No mobile set'}</span>
                            </div>
                        </div>

                        <div class="user-dropdown-divider"></div>

                        <div class="user-dropdown-footer">
                            <a href="#" id="logoutBtn">
                                <span class="dm-icon"><i class="fa-solid fa-right-from-bracket"></i></span>
                                <span class="dm-label">Sign Out</span>
                            </a>
                        </div>
                    </div>
                </div>\`;
        }`;

jsContent = jsContent.replace(checkNavbarAuthMatchvibrant, squareJsHtml);
fs.writeFileSync(jsPath, jsContent, 'utf8');

// 2. Revert CSS to Square & Large styles
let cssContent = fs.readFileSync(cssPath, 'utf8');
const squareDropdownStyles = `
/* ===== SQUARE & LARGE OFFICIAL DROPDOWN ===== */
.user-profile-nav {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    padding: 2px 5px !important;
    background: transparent !important;
    cursor: pointer !important;
    position: relative !important;
    transition: all 0.2s ease !important;
    margin-left: 20px !important;
    margin-right: 120px !important;
}

.user-avatar-circle {
    width: 34px !important;
    height: 34px !important;
    background: #0A2540 !important;
    color: #ffffff !important;
    border: 2px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-weight: 600 !important;
    font-size: 0.8rem !important;
    text-transform: uppercase !important;
}

.user-avatar-name {
    color: #ffffff !important;
    font-weight: 500 !important;
    font-size: 0.9rem !important;
}

.user-avatar-chevron {
    color: rgba(255, 255, 255, 0.5) !important;
    font-size: 0.7rem !important;
}

.user-dropdown {
    width: 360px !important;
    min-height: 400px !important;
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
    padding: 30px 20px !important;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
    border-radius: 16px !important;
    margin-bottom: 20px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
}

.user-dropdown-info-avatar {
    width: 70px !important;
    height: 70px !important;
    font-size: 1.8rem !important;
    margin-bottom: 15px !important;
    background: linear-gradient(135deg, #f36b41, #e04e1e) !important;
    color: white !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border: 4px solid white !important;
}

.user-dropdown-info-name {
    font-size: 1.2rem !important;
    font-weight: 700 !important;
    color: #0A2540 !important;
}

.dm-info-row {
    padding: 18px 20px !important;
    margin: 10px 0 !important;
    display: flex !important;
    align-items: center !important;
    gap: 15px !important;
    background: #ffffff !important;
    border: 1px solid #f1f5f9 !important;
    border-radius: 14px !important;
}

.dm-info-row .dm-icon {
    width: 36px !important;
    height: 36px !important;
    background: #f1f5f9 !important;
    border-radius: 8px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

.user-dropdown-footer a {
    padding: 18px !important;
    background: #fef2f2 !important;
    color: #dc2626 !important;
    border-radius: 14px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 10px !important;
    text-decoration: none !important;
    font-weight: 700 !important;
}
`;

const vibrantMarker = '/* ===== VIBRANT INDIA TRADE LOGGED-IN STYLE ===== */';
if (cssContent.includes(vibrantMarker)) {
    cssContent = cssContent.split(vibrantMarker)[0] + squareDropdownStyles;
}

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Undone last process. Reverted to Square & Large Official Dropdown.');
