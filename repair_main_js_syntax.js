
const fs = require('fs');
const path = require('path');

const jsPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\js', 'main.js');
let content = fs.readFileSync(jsPath, 'utf8');

let beforeInitAuth = content.substring(0, content.indexOf('function initAuthModal() {'));

let searchInputsIdx = content.indexOf('    searchInputs.forEach(input => {');
let afterSearchInputs = content.substring(searchInputsIdx);

const vibrantAuthLogicAndCheckNavbarAuth = `function initAuthModal() {
        if (!document.getElementById('auth-overlay')) {
            document.body.insertAdjacentHTML('beforeend', \`
    <!-- ════════ VIBRANT AUTH MODAL ════════ -->
    <div class="auth-overlay" id="auth-overlay">
        <div class="vibrant-auth-card">
            <!-- Orange Header -->
            <div class="vibrant-auth-header">
                <div class="v-auth-title">
                    <i class="fa-regular fa-user"></i>
                    <span>Sign In</span>
                </div>
                <button class="v-auth-close" id="closeAuthModal"><i class="fa-solid fa-xmark"></i></button>
            </div>
            
            <div class="vibrant-auth-body">
                <h2 class="v-brand-name">VIBRANT INDIA TRADE</h2>
                <h3 class="v-welcome-text">Great to have you back!</h3>
                <p class="v-instruction">Enter your registered email to receive OTP</p>

                <div id="auth-email-view">
                    <div class="v-field">
                        <label>Enter your email</label>
                        <input type="email" id="vibrantEmail" placeholder="Enter your email address" required>
                    </div>
                    <button id="getOtpBtn" class="v-primary-btn">
                        <i class="fa-regular fa-envelope"></i> Get OTP
                    </button>
                </div>

                <div id="auth-otp-view" style="display:none;">
                    <div class="v-field">
                        <label>Enter OTP</label>
                        <input type="text" id="vibrantOtp" placeholder="Enter 6-digit OTP" maxLength="6">
                    </div>
                    <button id="verifyOtpBtn" class="v-primary-btn">
                        Verify & Login
                    </button>
                    <p class="v-resend">Didn't receive? <a href="#">Resend OTP</a></p>
                </div>

                <div class="v-footer">
                    <p class="v-footer-label">Don't have an account?</p>
                    <button class="v-register-btn" id="showJoinView">
                        <i class="fa-solid fa-user-plus"></i> Register Now
                    </button>
                    <p class="v-b2b-link">For B2B wholesale access? <span>Free Join with GST</span></p>
                </div>
            </div>
        </div>
    </div>
\`);
        }

        const overlay = document.getElementById('auth-overlay');
        const emailView = document.getElementById('auth-email-view');
        const otpView = document.getElementById('auth-otp-view');

        document.getElementById('closeAuthModal').onclick = () => overlay.classList.remove('active');
        
        // Handle "Get OTP"
        document.getElementById('getOtpBtn').onclick = () => {
            const email = document.getElementById('vibrantEmail').value;
            if(!email) return alert("Please enter your email");
            
            // Switch to OTP view
            emailView.style.display = 'none';
            otpView.style.display = 'block';
        };

        // Handle "Verify OTP"
        document.getElementById('verifyOtpBtn').onclick = () => {
            const email = document.getElementById('vibrantEmail').value;
            const name = email.split('@')[0];
            const profile = { name: name.charAt(0).toUpperCase() + name.slice(1), email, phone: '+91 85111 72099' };
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userProfile', JSON.stringify(profile));
            overlay.classList.remove('active');
            checkNavbarAuth(); // Refresh UI
            window.location.reload(); 
        };
        
        // Placeholder for "Register Now"
        document.getElementById('showJoinView').onclick = () => {
            alert("Registration form would appear here - redirected to Login for demo");
        };
    }

    function openAuthModal() {
        const overlay = document.getElementById('auth-overlay');
        overlay.classList.add('active');
    }

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
                            <div class="user-dropdown-info-avatar" style="background: linear-gradient(135deg, #f36b41, #e04e1e); color: white; display: flex; align-items: center; justify-content: center;">\${initials}</div>
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
                    window.location.reload();
                });
            }
        } else {
            topNavActions.innerHTML = \`
                <a href="#" class="login-link" onclick="openAuthModal(); return false;"><i class="fa-regular fa-user"></i> Sign In</a>
                <a href="#" class="action-btn glow-btn" onclick="openAuthModal(); return false;">Join Free</a>
            \`;
        }
    }

`;

const finalContent = beforeInitAuth + vibrantAuthLogicAndCheckNavbarAuth + '\n' + afterSearchInputs;

fs.writeFileSync(jsPath, finalContent, 'utf8');

// Ensure that DOMContentLoaded has initAuthModal() and checkNavbarAuth()
let newCheck = fs.readFileSync(jsPath, 'utf8');
if (!newCheck.includes('initAuthModal();')) {
    newCheck = newCheck.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', () => {\\n        initAuthModal();");
}
if (!newCheck.includes('checkNavbarAuth();')) {
    let toReplace = "document.addEventListener('DOMContentLoaded', () => {";
    if(newCheck.includes("document.addEventListener('DOMContentLoaded', () => {\\n        initAuthModal();")) {
        toReplace = "document.addEventListener('DOMContentLoaded', () => {\\n        initAuthModal();";
    }
    newCheck = newCheck.replace(toReplace, toReplace + "\\n        checkNavbarAuth();");
}
fs.writeFileSync(jsPath, newCheck, 'utf8');

console.log('Fixed main.js syntax and correctly restored checkNavbarAuth.');
