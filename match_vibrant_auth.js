
const fs = require('fs');
const path = require('path');

const jsPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\js', 'main.js');
const cssPath = path.join('c:\\Users\\AE\\OneDrive\\Desktop\\redesign\\css', 'style.css');

// 1. Update JS with the "Vibrant Auth" HTML matching the screenshot
let jsContent = fs.readFileSync(jsPath, 'utf8');

const vibrantAuthHtml = `
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
`;

// Logic for switching views and simulating OTP
const vibrantAuthLogic = `
    function initAuthModal() {
        if (!document.getElementById('auth-overlay')) {
            document.body.insertAdjacentHTML('beforeend', \`${vibrantAuthHtml}\`);
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
`;

// Replace older auth blocks in main.js
const oldAuthBlockMatch = /function initAuthModal\(\) \{[\s\S]*?function openAuthModal\([^\)]*\) \{[\s\S]*?\}\s*\}/;
jsContent = jsContent.replace(oldAuthBlockMatch, vibrantAuthLogic);

// Adjust openAuthModal call in checkNavbarAuth (mode parameter has been removed)
jsContent = jsContent.replace(/openAuthModal\('join'\)/g, "openAuthModal()");
jsContent = jsContent.replace(/openAuthModal\('login'\)/g, "openAuthModal()");

fs.writeFileSync(jsPath, jsContent, 'utf8');

// 2. Add "Vibrant Auth" CSS matching the screenshot
let cssContent = fs.readFileSync(cssPath, 'utf8');

const vibrantAuthStyles = `
/* ===== VIBRANT AUTH MODAL (SCREENSHOT MATCH) ===== */

.vibrant-auth-card {
    background: #ffffff;
    width: 100%;
    max-width: 440px;
    border-radius: 35px !important; /* Very rounded as in screenshot */
    overflow: hidden;
    position: relative;
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.25);
    animation: vibrantPopup 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes vibrantPopup {
    from { transform: scale(0.9) translateY(40px); opacity: 0; }
    to { transform: scale(1) translateY(0); opacity: 1; }
}

.vibrant-auth-header {
    background: #f26b43 !important; /* Orange Header */
    padding: 18px 30px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
}

.v-auth-title {
    color: #ffffff !important;
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    font-weight: 700 !important;
    font-size: 1.1rem !important;
}

.v-auth-close {
    background: transparent !important;
    border: none !important;
    color: #ffffff !important;
    font-size: 1.2rem !important;
    cursor: pointer !important;
    opacity: 0.8 !important;
}

.v-auth-close:hover { opacity: 1; }

.vibrant-auth-body {
    padding: 40px 35px !important;
    text-align: center !important;
}

.v-brand-name {
    font-size: 1.4rem !important;
    font-weight: 800 !important;
    color: #0f172a !important;
    letter-spacing: -0.5px !important;
    margin-bottom: 25px !important;
}

.v-welcome-text {
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: #0f172a !important;
    margin-bottom: 5px !important;
}

.v-instruction {
    font-size: 0.95rem !important;
    color: #64748b !important;
    margin-bottom: 30px !important;
}

.v-field {
    text-align: left !important;
    margin-bottom: 20px !important;
}

.v-field label {
    display: block !important;
    font-size: 0.85rem !important;
    font-weight: 700 !important;
    color: #0f172a !important;
    margin-bottom: 10px !important;
}

.v-field input {
    width: 100% !important;
    padding: 15px 20px !important;
    background: #f8fafc !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 12px !important;
    font-size: 1rem !important;
    color: #0f172a !important;
}

.v-primary-btn {
    width: 100% !important;
    padding: 18px !important;
    background: #f26b43 !important;
    color: #ffffff !important;
    border: none !important;
    border-radius: 12px !important;
    font-weight: 700 !important;
    font-size: 1.05rem !important;
    cursor: pointer !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 10px !important;
    transition: all 0.2s ease !important;
    box-shadow: 0 10px 20px rgba(242, 107, 67, 0.2) !important;
}

.v-primary-btn:hover {
    background: #e05e36 !important;
    transform: translateY(-2px) !important;
}

.v-footer {
    margin-top: 40px !important;
}

.v-footer-label {
    font-size: 0.9rem !important;
    color: #64748b !important;
    margin-bottom: 15px !important;
}

.v-register-btn {
    width: 100% !important;
    padding: 15px !important;
    background: #ffffff !important;
    border: 1px dashed #ef4444 !important; /* Red dashed as in screenshot */
    border-radius: 12px !important;
    color: #ef4444 !important;
    font-weight: 700 !important;
    font-size: 0.95rem !important;
    cursor: pointer !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 10px !important;
    transition: all 0.2s !important;
}

.v-register-btn:hover {
    background: #fef2f2 !important;
}

.v-b2b-link {
    margin-top: 15px !important;
    font-size: 0.8rem !important;
    color: #64748b !important;
}

.v-b2b-link span {
    color: #ef4444 !important;
    font-weight: 700 !important;
    cursor: pointer !important;
}

.v-resend {
    margin-top: 15px !important;
    font-size: 0.85rem !important;
    color: #64748b !important;
}

.v-resend a {
    color: #f26b43 !important;
    font-weight: 700 !important;
    text-decoration: none !important;
}
`;

// Replace older Auth CSS block
const oldAuthCssMatch = /\/\* ===== PREMIUM AUTH MODAL STYLES ===== \*\/[\s\S]*?(?=\n\n|\n$|$)/;
if (cssContent.includes('/* ===== PREMIUM AUTH MODAL STYLES ===== */')) {
    cssContent = cssContent.replace(oldAuthCssMatch, vibrantAuthStyles);
} else {
    cssContent += vibrantAuthStyles;
}

fs.writeFileSync(cssPath, cssContent, 'utf8');
console.log('Vibrant Auth Modal (Screenshot Match) applied successfully.');
