
const fs = require('fs');
const path = require('path');

const jsPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\js', 'main.js');
let content = fs.readFileSync(jsPath, 'utf8');

// 1. Updated checkNavbarAuth with robust Logout and Restore logic
const newCheckNavbarAuth = `
    // --- Navbar Authentication UI Update & Restore ---
    function checkNavbarAuth() {
        const topNavActions = document.querySelector('.top-nav-actions');
        if (!topNavActions) return;

        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

        if (isLoggedIn && userProfile.name) {
            const firstName = userProfile.name.split(' ')[0];
            const initials = userProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2);
            topNavActions.innerHTML = \`
                <div class="user-profile-nav">
                    <div class="user-avatar-circle">\${initials}</div>
                    <span class="user-avatar-name">\${firstName}</span>
                    <i class="fa-solid fa-chevron-down user-avatar-chevron"></i>

                    <div class="user-dropdown">
                        <div class="user-dropdown-info">
                            <div class="user-dropdown-info-avatar" style="background: linear-gradient(135deg, #f36b41, #e04e1e); color: white;">\${initials}</div>
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

            // Initialize Logout Listener
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userProfile');
                    window.location.reload(); // Refresh to restore Sign In buttons
                });
            }
        } else {
            // Restore Sign In and Join Free buttons exactly from index.html original process
            topNavActions.innerHTML = \`
                <a href="login.html" class="login-link"><i class="fa-regular fa-user"></i> Sign In</a>
                <a href="join.html" class="action-btn glow-btn">Join Free</a>
            \`;
        }
    }
`;

// Replace the old function
const oldFnMatch = /\/\/ --- Navbar Authentication UI Update ---[\s\S]*?function checkNavbarAuth\(\) \{[\s\S]*?\}\s*}/;
content = content.replace(oldFnMatch, newCheckNavbarAuth);

// Ensure checkNavbarAuth is called inside DOMContentLoaded
const domMatch = /document\.addEventListener\('DOMContentLoaded', \(.*\) => \{/;
if (!content.includes('checkNavbarAuth();')) {
    content = content.replace(domMatch, \`document.addEventListener('DOMContentLoaded', () => {
        checkNavbarAuth();\`);
}

fs.writeFileSync(jsPath, content, 'utf8');
console.log('Restored Login/Sign-In process and fixed Logout logic in main.js');
