
const fs = require('fs');
const path = require('path');

const jsPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\js', 'main.js');
const cssPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\css', 'style.css');

// 1. Update JS for the "Vibrant India" Navbar & Dropdown structure
let jsContent = fs.readFileSync(jsPath, 'utf8');

const oldPattern = /topNavActions\.innerHTML = `[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*`;/;

const vibrantHtml = `topNavActions.innerHTML = \`
                <div class="user-profile-nav-vibrant">
                    <div class="user-avatar-circle-vibrant">\${initials}</div>
                    <div class="user-welcome-text">
                        <span class="welcome-label">Welcome,</span>
                        <span class="user-name-bold">\${firstName}</span>
                    </div>
                    <i class="fa-solid fa-chevron-down vibrant-chevron"></i>

                    <div class="vibrant-dropdown">
                        <div class="vibrant-dropdown-header">
                            <div class="vibrant-avatar-large">\${initials}</div>
                            <div class="vibrant-header-text">
                                <span class="vibrant-full-name">\${userProfile.name}</span>
                                <span class="vibrant-email">\${userProfile.email || ''}</span>
                            </div>
                        </div>

                        <div class="vibrant-dropdown-body">
                            <div class="vibrant-info-row">
                                <i class="fa-solid fa-phone vibr-icon"></i>
                                <div class="vibr-row-content">
                                    <span class="vibr-label">Phone</span>
                                    <span class="vibr-value">\${userProfile.phone || 'Not set'}</span>
                                </div>
                            </div>
                            
                            <a href="#" id="logoutBtn" class="vibrant-logout-link">
                                <i class="fa-solid fa-right-from-bracket"></i>
                                <span>Logout</span>
                            </a>
                        </div>
                    </div>
                </div>\`;`;

// Using a more robust replace for the checkNavbarAuth function content
const checkNavbarAuthMatch = /if \(isLoggedIn && userProfile\.name\) \{[\s\S]*?topNavActions\.innerHTML = `[\s\S]*?`;\s*}/;

jsContent = jsContent.replace(checkNavbarAuthMatch, `if (isLoggedIn && userProfile.name) {
            const firstName = userProfile.name.split(' ')[0];
            const initials = userProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2);
            ${vibrantHtml}
        }`);

fs.writeFileSync(jsPath, jsContent, 'utf8');

// 2. Add "Vibrant India" CSS (Sharp and Perfect match)
let cssContent = fs.readFileSync(cssPath, 'utf8');
const vibrantStyles = `
/* ===== VIBRANT INDIA TRADE LOGGED-IN STYLE ===== */

.user-profile-nav-vibrant {
    display: flex !important;
    align-items: center !important;
    background: #ffffff !important;
    border: 1px solid #e2e8f0 !important;
    padding: 6px 14px 6px 6px !important;
    border-radius: 50px !important;
    cursor: pointer !important;
    position: relative !important;
    gap: 12px !important;
    margin-left: 20px !important;
}

.user-avatar-circle-vibrant {
    width: 32px !important;
    height: 32px !important;
    background: #f26b43 !important;
    color: #ffffff !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-weight: 700 !important;
    font-size: 0.85rem !important;
    text-transform: uppercase !important;
}

.user-welcome-text {
    display: flex !important;
    flex-direction: column !important;
    text-align: left !important;
    line-height: 1.1 !important;
}

.welcome-label {
    font-size: 0.65rem !important;
    color: #64748b !important;
    font-weight: 500 !important;
}

.user-name-bold {
    font-size: 0.9rem !important;
    color: #0f172a !important;
    font-weight: 800 !important;
    text-transform: lowercase !important;
}

.vibrant-chevron {
    font-size: 0.75rem !important;
    color: #2563eb !important; /* Blue as seen in screenshot */
}

/* --- Vibrant Dropdown Menu --- */
.vibrant-dropdown {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    width: 280px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.25s ease;
    z-index: 9999;
    overflow: hidden;
    padding: 20px;
}

.user-profile-nav-vibrant:hover .vibrant-dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.vibrant-dropdown-header {
    display: flex !important;
    align-items: center !important;
    gap: 15px !important;
    margin-bottom: 25px !important;
    padding-bottom: 20px !important;
    border-bottom: 1px solid #f1f5f9 !important;
}

.vibrant-avatar-large {
    width: 55px !important;
    height: 55px !important;
    background: #f26b43 !important;
    color: #ffffff !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 1.4rem !important;
    font-weight: 800 !important;
    text-transform: uppercase !important;
}

.vibrant-header-text {
    display: flex !important;
    flex-direction: column !important;
    text-align: left !important;
}

.vibrant-full-name {
    font-size: 1.1rem !important;
    font-weight: 800 !important;
    color: #0f172a !important;
}

.vibrant-email {
    font-size: 0.8rem !important;
    color: #64748b !important;
}

.vibrant-info-row {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    margin-bottom: 20px !important;
}

.vibr-icon {
    font-size: 1rem !important;
    color: #475569 !important;
}

.vibr-row-content {
    display: flex !important;
    flex-direction: column !important;
    text-align: left !important;
}

.vibr-label {
    font-size: 0.75rem !important;
    color: #94a3b8 !important;
    font-weight: 600 !important;
}

.vibr-value {
    font-size: 0.9rem !important;
    color: #0f172a !important;
    font-weight: 700 !important;
}

.vibrant-logout-link {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    color: #ef4444 !important;
    font-weight: 700 !important;
    font-size: 0.95rem !important;
    text-decoration: none !important;
    margin-top: 10px !important;
    transition: opacity 0.2s !important;
}

.vibrant-logout-link:hover {
    opacity: 0.7 !important;
}
`;

// Replace older profile blocks
const oldMarker = '/* ===== OFFICIAL CORPORATE USER PROFILE NAV ===== */';
const squareMarker = '/* ===== SQUARE & LARGE OFFICIAL DROPDOWN ===== */';

if (cssContent.includes(oldMarker)) {
    cssContent = cssContent.split(oldMarker)[0] + vibrantStyles;
} else if (cssContent.includes(squareMarker)) {
    cssContent = cssContent.split(squareMarker)[0] + vibrantStyles;
} else {
    cssContent += vibrantStyles;
}

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Vibrant India Trade profile style (Perfect Match) applied.');
