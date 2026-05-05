
const fs = require('fs');
const path = require('path');

const jsPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\js', 'main.js');
const cssPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\css', 'style.css');

// 1. Create the Auth Modal Injection Logic in JS
let jsContent = fs.readFileSync(jsPath, 'utf8');

const authModalHtml = `
    <!-- ════════ PREMIUM AUTH MODAL ════════ -->
    <div class="auth-overlay" id="auth-overlay">
        <div class="auth-modal">
            <button class="auth-close" id="closeAuthModal"><i class="fa-solid fa-xmark"></i></button>
            <div class="auth-modal-content">
                <div class="auth-logo">
                    <div class="auth-logo-v">V</div>
                    <div class="auth-logo-text">GLOBALTRADE <span>INDIA</span></div>
                </div>
                
                <div id="auth-login-view">
                    <h2>Welcome Back</h2>
                    <p class="auth-subtitle">Access your premium B2B dashboard</p>
                    <form id="modalLoginForm">
                        <div class="auth-field">
                            <label>Email Address</label>
                            <div class="auth-input">
                                <i class="fa-solid fa-envelope"></i>
                                <input type="email" id="modalEmail" placeholder="name@company.com" required>
                            </div>
                        </div>
                        <div class="auth-field">
                            <label>Password</label>
                            <div class="auth-input">
                                <i class="fa-solid fa-lock"></i>
                                <input type="password" id="modalPass" placeholder="••••••••" required>
                            </div>
                        </div>
                        <button type="submit" class="auth-submit-btn">Continue to Dashboard</button>
                    </form>
                    <div class="auth-switch">Don’t have an account? <a href="#" id="showJoinView">Join Free Now</a></div>
                </div>

                <div id="auth-join-view" style="display:none;">
                    <h2>Create Account</h2>
                    <p class="auth-subtitle">Join the largest B2B network in India</p>
                    <form id="modalJoinForm">
                        <div class="auth-field-row">
                            <div class="auth-field">
                                <label>First Name</label>
                                <input type="text" id="joinFname" placeholder="John" required>
                            </div>
                            <div class="auth-field">
                                <label>Last Name</label>
                                <input type="text" id="joinLname" placeholder="Dave" required>
                            </div>
                        </div>
                        <div class="auth-field">
                            <label>Work Email</label>
                            <div class="auth-input">
                                <i class="fa-solid fa-envelope"></i>
                                <input type="email" id="joinEmail" placeholder="email@company.com" required>
                            </div>
                        </div>
                        <button type="submit" class="auth-submit-btn">Join Now</button>
                    </form>
                    <div class="auth-switch">Already a member? <a href="#" id="showLoginView">Sign In</a></div>
                </div>
            </div>
        </div>
    </div>
`;

// Add init function and Modal listeners
const authLogic = `
    function initAuthModal() {
        if (!document.getElementById('auth-overlay')) {
            document.body.insertAdjacentHTML('beforeend', \`${authModalHtml}\`);
        }

        const overlay = document.getElementById('auth-overlay');
        const loginView = document.getElementById('auth-login-view');
        const joinView = document.getElementById('auth-join-view');

        document.getElementById('closeAuthModal').onclick = () => overlay.classList.remove('active');
        document.getElementById('showJoinView').onclick = (e) => { e.preventDefault(); loginView.style.display='none'; joinView.style.display='block'; };
        document.getElementById('showLoginView').onclick = (e) => { e.preventDefault(); joinView.style.display='none'; loginView.style.display='block'; };

        // Handle Login
        document.getElementById('modalLoginForm').onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('modalEmail').value;
            const name = email.split('@')[0];
            const profile = { name: name.charAt(0).toUpperCase() + name.slice(1), email, phone: '+91 91372 07026' };
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userProfile', JSON.stringify(profile));
            overlay.classList.remove('active');
            checkNavbarAuth(); // Refresh UI
        };

         // Handle Join
         document.getElementById('modalJoinForm').onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('joinEmail').value;
            const fname = document.getElementById('joinFname').value;
            const lname = document.getElementById('joinLname').value;
            const profile = { name: fname + ' ' + lname, email, phone: '+91 91372 07026' };
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userProfile', JSON.stringify(profile));
            overlay.classList.remove('active');
            checkNavbarAuth(); // Refresh UI
        };
    }

    function openAuthModal(mode = 'login') {
        const overlay = document.getElementById('auth-overlay');
        const loginView = document.getElementById('auth-login-view');
        const joinView = document.getElementById('auth-join-view');
        
        if (mode === 'login') {
            loginView.style.display='block'; joinView.style.display='none';
        } else {
            loginView.style.display='none'; joinView.style.display='block';
        }
        overlay.classList.add('active');
    }
`;

// Patch main.js
if (!jsContent.includes('initAuthModal();')) {
    jsContent = jsContent.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', () => {\n        initAuthModal();");
}

// Add the auth logic at the bottom or before checkNavbarAuth
jsContent = jsContent.replace('// --- Navbar Authentication UI Update & Restore ---', authLogic + '\n    // --- Navbar Authentication UI Update & Restore ---');

// Update checkNavbarAuth to use the modal instead of href
jsContent = jsContent.replace('href="login.html" class="login-link"', 'href="#" class="login-link" onclick="openAuthModal(\\\'login\\\'); return false;"');
jsContent = jsContent.replace('href="join.html" class="action-btn glow-btn"', 'href="#" class="action-btn glow-btn" onclick="openAuthModal(\\\'join\\\'); return false;"');

fs.writeFileSync(jsPath, jsContent, 'utf8');

// 2. Add Auth Modal CSS
let cssContent = fs.readFileSync(cssPath, 'utf8');
const authModalStyles = `
/* ===== PREMIUM AUTH MODAL STYLES ===== */
.auth-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(10, 37, 64, 0.6);
    backdrop-filter: blur(8px);
    z-index: 99999;
    display: none;
    align-items: center; justify-content: center;
    padding: 20px;
}
.auth-overlay.active { display: flex; animation: authFadeIn 0.3s ease; }
@keyframes authFadeIn { from { opacity: 0; } to { opacity: 1; } }

.auth-modal {
    background: #ffffff; width: 100%; max-width: 440px;
    border-radius: 24px; padding: 40px; position: relative;
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.2);
    transform: translateY(20px);
    transition: transform 0.3s ease;
}
.auth-overlay.active .auth-modal { transform: translateY(0); }

.auth-close {
    position: absolute; top: 20px; right: 20px;
    width: 32px; height: 32px; border-radius: 50%;
    border: none; background: #f1f5f9; cursor: pointer;
    font-size: 0.9rem; color: #64748b; transition: all 0.2s;
}
.auth-close:hover { background: #e2e8f0; color: #0a2540; transform: rotate(90deg); }

.auth-logo { text-align: center; margin-bottom: 30px; }
.auth-logo-v { background: #0A2540; color: #F26B43; width: 44px; height: 44px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: 800; margin-bottom: 10px; }
.auth-logo-text { font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 1.2rem; color: #0A2540; letter-spacing: -0.5px; }
.auth-logo-text span { color: #F26B43; }

.auth-modal-content h2 { font-family: 'Poppins', sans-serif; font-size: 1.6rem; font-weight: 800; text-align: center; color: #0f172a; margin-bottom: 8px; }
.auth-subtitle { text-align: center; font-size: 0.9rem; color: #64748b; margin-bottom: 25px; }

.auth-field { margin-bottom: 18px; }
.auth-field label { display: block; font-size: 0.75rem; font-weight: 750; color: #0a2540; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
.auth-input { position: relative; }
.auth-input i { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 0.9rem; }
.auth-input input, .auth-field input:not(.auth-input input) {
    width: 100%; padding: 12px 12px 12px 40px; border-radius: 12px;
    border: 1px solid #e2e8f0; font-size: 1rem; transition: all 0.2s;
    background: #fdfdfd;
}
.auth-field input:not(.auth-input input) { padding-left: 15px; }
.auth-input input:focus { border-color: #F26B43; outline: none; box-shadow: 0 0 0 4px rgba(242, 107, 67, 0.1); background: #fff; }

.auth-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }

.auth-submit-btn {
    width: 100%; border: none; padding: 14px; border-radius: 12px;
    background: #0A2540; color: #fff; font-size: 1rem; font-weight: 700;
    cursor: pointer; transition: all 0.2s; margin-top: 10px;
}
.auth-submit-btn:hover { background: #1a365d; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(10, 37, 64, 0.2); }

.auth-switch { text-align: center; margin-top: 25px; font-size: 0.9rem; color: #64748b; }
.auth-switch a { color: #F26B43; text-decoration: none; font-weight: 700; }
`;

cssContent += authModalStyles;
fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log('Auth Modal System implemented successfully.');
