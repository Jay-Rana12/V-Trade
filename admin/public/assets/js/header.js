
// ============ SYSTEM CONFIGURATION ============

// EmailJS Configuration
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_nwkdyys',
    TEMPLATE_ID_OTP: 'template_23a9ic6',
    TEMPLATE_ID_SUCCESS: 'template_40typ15',
    TEMPLATE_ID_LOGIN_ALERT: 'template_login_alert',
    PUBLIC_KEY: 'wwAy0VWNNJFdwi6mn',

    // INQUIRY ONLY IDs
    INQUIRY_SERVICE_ID: 'service_6h1w8kp',
    INQUIRY_TEMPLATE_ID: 'template_aw3svgx',
    INQUIRY_PUBLIC_KEY: 'nH5_1xb9HqvvD4Gxt'
};

// API Configuration
const API_CONFIG = {
    BASE_URL: '/api',
    ENDPOINTS: {
        REGISTER: '/register.php',
        LOGIN: '/login.php',
        CHECK_SESSION: '/check_session.php',
        LOGOUT: '/logout.php',
        FREE_JOIN_REGISTER: '/free_join_register.php'
    }
};

// Global variables
let regOTP = "";
let freeJoinOTP = "";
let signinOTP = "";
let regData = {};
let freeJoinData = {};
let signinData = {};
let regTimerInterval;
let freeJoinTimerInterval;
let signinTimerInterval;

// Expose currentUser globally
window.currentUser = null;

// ============ INITIALIZATION ============

const initHeader = function () {
    console.log("🚀 System Initializing...");

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log("✅ EmailJS Initialized");
    }

    // Check if user is already logged in
    checkLoginStatus();

    // Setup modal navigation
    setupModalNavigation();

    // Initialize system
    initializeSystem();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
} else {
    initHeader();
}

// ============ API FUNCTIONS ============

async function makeRequest(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method: method,
            credentials: 'include'
        };

        if (data instanceof FormData) {
            options.body = data;
        } else {
            options.headers = { 'Content-Type': 'application/json' };
            if (data) options.body = JSON.stringify(data);
        }

        const response = await fetch(API_CONFIG.BASE_URL + endpoint, options);
        return await response.json();
    } catch (error) {
        console.error('API Request error:', error);
        return { success: false, message: 'Network error. Please try again.' };
    }
}

async function registerUser(name, email, phone) {
    return await makeRequest(API_CONFIG.ENDPOINTS.REGISTER, 'POST', { name, email, phone });
}

async function loginUser(email, otpVerified = false) {
    return await makeRequest(API_CONFIG.ENDPOINTS.LOGIN, 'POST', { email, otp_verified: otpVerified });
}

async function checkLoginStatus() {
    const result = await makeRequest(API_CONFIG.ENDPOINTS.CHECK_SESSION, 'GET');

    if (result.success && result.data.logged_in) {
        window.currentUser = result.data.user;
        showUserProfile();
    } else {
        window.currentUser = null;
        hideUserProfile();
    }
    updateNavButtons();
    return result;
}

async function logout() {
    try {
        const result = await makeRequest(API_CONFIG.ENDPOINTS.LOGOUT, 'POST');
        console.log('🚪 Sign out processed:', result);
    } catch (error) {
        console.error('Logout request failed:', error);
    } finally {
        // Always reset client state and reload page to ensure clean state
        window.currentUser = null;
        if (typeof hideUserProfile === 'function') hideUserProfile();
        if (typeof updateNavButtons === 'function') updateNavButtons();

        console.log('♻️ Reloading page after sign out...');
        window.location.reload();
    }
}

async function freeJoinRegister(data) {
    return await makeRequest(API_CONFIG.ENDPOINTS.FREE_JOIN_REGISTER, 'POST', data);
}

// ============ USER PROFILE FUNCTIONS ============

function showUserProfile() {
    if (!window.currentUser) return;

    const user = window.currentUser;
    const firstLetter = user.full_name.charAt(0).toUpperCase();

    // Update Header Dropdown Trigger
    const headerAvatar = document.getElementById('headerUserAvatar');
    const headerName = document.getElementById('headerUserName');
    if (headerAvatar) headerAvatar.textContent = firstLetter;
    if (headerName) headerName.textContent = user.full_name.split(' ')[0]; // First name only for header

    // Update Dropdown Content
    const dropdownAvatar = document.getElementById('dropdownUserAvatar');
    const dropdownName = document.getElementById('dropdownUserName');
    const dropdownEmail = document.getElementById('dropdownUserEmail');
    const dropdownPhone = document.getElementById('dropdownUserPhone');

    if (dropdownAvatar) dropdownAvatar.textContent = firstLetter;
    if (dropdownName) dropdownName.textContent = user.full_name;
    if (dropdownEmail) dropdownEmail.textContent = user.email;
    if (dropdownPhone) dropdownPhone.textContent = user.phone || 'Not available';

    // Toggle Visibility
    const authButtons = document.getElementById('authButtons');
    const userProfileNav = document.getElementById('userProfileNav');

    console.log('👤 Showing User Profile:', user.full_name);
    console.log('🔍 authButtons element:', authButtons);
    console.log('🔍 userProfileNav element:', userProfileNav);

    if (authButtons) {
        authButtons.classList.remove('d-flex');
        authButtons.classList.add('d-none');
        authButtons.style.setProperty('display', 'none', 'important');
    }
    if (userProfileNav) {
        userProfileNav.style.setProperty('display', 'list-item', 'important');
    }
}

function hideUserProfile() {
    // Toggle Visibility Reversed
    const authButtons = document.getElementById('authButtons');
    const userProfileNav = document.getElementById('userProfileNav');

    console.log('👤 Hiding User Profile (Sign Out)');

    if (authButtons) {
        authButtons.classList.remove('d-none');
        authButtons.classList.add('d-flex');
        authButtons.style.removeProperty('display');
    }
    if (userProfileNav) {
        userProfileNav.style.setProperty('display', 'none', 'important');
    }
}

function updateNavButtons() {
    // Handled in showUserProfile/hideUserProfile now based on state
    if (!window.currentUser) hideUserProfile();
    else showUserProfile();
}

// ============ EMAILJS FUNCTIONS ============

async function sendOTPviaEmailJS(email, name, otp, type) {
    try {
        console.log(`📧 Sending ${type} OTP to:`, email);
        const companyName = type === 'freeJoin' ? 'VINDIATRADE' : 'VIBRANT INDIA TRADE';

        const templateParams = {
            to_email: email,
            to_name: name || 'User',
            otp_code: otp,
            company_name: companyName,
            message: `Your ${type} OTP code is ${otp}`,
            type: type
        };

        await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID_OTP,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
        );

        console.log(`✅ ${type} OTP sent successfully!`);
        return { success: true, message: 'OTP sent successfully!' };

    } catch (error) {
        console.error(`❌ ${type} OTP Error:`, error);
        return { success: false, message: 'Failed to send OTP. Please try again.' };
    }
}

async function sendRegistrationSuccessEmail(email, name) {
    try {
        const templateParams = {
            to_email: email,
            to_name: name || 'User',
            company_name: 'VIBRANT INDIA TRADE',
            message: 'Welcome to VIBRANT INDIA TRADE! Your account has been created successfully.',
            registration_date: new Date().toLocaleDateString()
        };

        await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID_SUCCESS,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
        );
        return { success: true, message: 'Welcome email sent!' };
    } catch (error) {
        console.error('❌ Registration Success Email Error:', error);
        return { success: false, message: 'Failed to send welcome email.' };
    }
}

async function sendGSTSuccessEmail(email, name, gstNumber, companyName) {
    try {
        const templateParams = {
            to_email: email,
            to_name: name || 'User',
            gst_number: gstNumber,
            company_name: companyName,
            business_name: companyName,
            company_name_email: 'VINDIATRADE',
            message: `Welcome to VINDIATRADE B2B Platform! Your GST ${gstNumber} has been verified.`,
            verification_date: new Date().toLocaleDateString()
        };

        await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID_SUCCESS,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
        );
        return { success: true, message: 'Welcome email sent!' };
    } catch (error) {
        console.error('❌ GST Success Email Error:', error);
        return { success: false, message: 'Failed to send welcome email.' };
    }
}

// Globally Exposed Inquiry Function
window.sendInquiryEmail = async function (companyEmail, companyName, userData, productData) {
    // Strict Check: User MUST be logged in (userData must be valid and NOT guest)
    if (!userData || !userData.email || userData.email === 'guest@example.com' || !userData.full_name) {
        console.error("❌ Send Inquiry Blocked: Invalid or Guest User Data");
        return { success: false, message: 'User must be logged in to send inquiries.' };
    }

    try {
        console.log(`📧 Sending Inquiry to: ${companyEmail} from ${userData.email}`);

        // Generate current day, date and time
        const now = new Date();
        const timestamp = now.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        const templateParams = {
            to_email: companyEmail,
            to_name: companyName,
            from_name: userData.full_name,
            from_email: userData.email,
            from_phone: userData.phone,
            product_title: productData.title,
            product_id: productData.id,
            product_link: window.location.origin + window.location.pathname + '?id=' + productData.id,
            timestamp: timestamp, // Added timestamp parameter
            message: `User ${userData.full_name} is interested in ${productData.title}. Contact: ${userData.phone}`
        };

        console.log('📝 Inquiry Template Params:', templateParams);

        await emailjs.send(
            EMAILJS_CONFIG.INQUIRY_SERVICE_ID,
            EMAILJS_CONFIG.INQUIRY_TEMPLATE_ID,
            templateParams,
            EMAILJS_CONFIG.INQUIRY_PUBLIC_KEY
        );

        console.log(`✅ Inquiry sent successfully!`);
        return { success: true, message: 'Inquiry sent successfully!' };

    } catch (error) {
        console.error(`❌ Inquiry Error:`, error);
        return { success: false, message: 'Failed to send inquiry. Please try again later.' };
    }
};

// ============ COMMON FUNCTIONS AND EVENT LISTENERS ============

function setupModalNavigation() {
    // Go from Registration to Free Join
    document.getElementById('goToFreeJoin')?.addEventListener('click', function (e) {
        e.preventDefault();
        const modal = bootstrap.Modal.getInstance(document.getElementById('registrationModal1'));
        if (modal) modal.hide();
        setTimeout(() => {
            new bootstrap.Modal(document.getElementById('freeJoinModal1')).show();
        }, 300);
    });

    // Go from Free Join to Registration
    document.getElementById('goToRegistration')?.addEventListener('click', function (e) {
        e.preventDefault();
        const modal = bootstrap.Modal.getInstance(document.getElementById('freeJoinModal1'));
        if (modal) modal.hide();
        setTimeout(() => {
            new bootstrap.Modal(document.getElementById('registrationModal1')).show();
        }, 300);
    });

    // Go from Sign In to Registration
    document.getElementById('signinGoToRegistration')?.addEventListener('click', function (e) {
        e.preventDefault();
        const modal = bootstrap.Modal.getInstance(document.getElementById('signinEmailModal'));
        if (modal) modal.hide();
        setTimeout(() => {
            new bootstrap.Modal(document.getElementById('registrationModal1')).show();
        }, 300);
    });

    // Go from Sign In to Free Join
    document.getElementById('signinGoToFreeJoin')?.addEventListener('click', function (e) {
        e.preventDefault();
        const modal = bootstrap.Modal.getInstance(document.getElementById('signinEmailModal'));
        if (modal) modal.hide();
        setTimeout(() => {
            new bootstrap.Modal(document.getElementById('freeJoinModal1')).show();
        }, 300);
    });

    // Go from Sign In OTP to Registration
    document.getElementById('signinOtpGoToRegistration')?.addEventListener('click', function (e) {
        e.preventDefault();
        const modal = bootstrap.Modal.getInstance(document.getElementById('signinOtpModal'));
        if (modal) modal.hide();
        setTimeout(() => {
            new bootstrap.Modal(document.getElementById('registrationModal1')).show();
        }, 300);
    });
}

// Header shadow on scroll
const header = document.querySelector('.main-header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    });
}

// Typing effect for search placeholder
const input = document.getElementById('searchInput');
if (input) {
    const phrases = ["Search Kitchenware...", "Search Horeca...", "Search Houseware...", "Search Pipes & Tubes...", "Search Raw Materials..."];
    let i = 0, j = 0, deleting = false;

    function type() {
        const current = phrases[i];
        if (!deleting) {
            input.placeholder = current.substring(0, ++j);
            if (j === current.length) {
                deleting = true;
                setTimeout(type, 1500);
                return;
            }
        } else {
            input.placeholder = current.substring(0, --j);
            if (j === 0) {
                deleting = false;
                i = (i + 1) % phrases.length;
            }
        }
        setTimeout(type, deleting ? 40 : 80);
    }
    type();
}

// ============ SEARCH & SUGGESTIONS LOGIC ============
let searchProducts = [];
let searchTimeout = null;
let selectedIndex = -1;

function getEditDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost);
            }
        }
    }
    return matrix[a.length][b.length];
}

function phoneticNormalize(text) {
    if (!text) return "";
    return text.toLowerCase()
        .replace(/ch/g, 'c').replace(/k/g, 'c').replace(/q/g, 'c')
        .replace(/ph/g, 'f').replace(/v/g, 'f')
        .replace(/z/g, 's').replace(/j/g, 's')
        .replace(/oo/g, 'u').replace(/ee/g, 'i')
        .replace(/sh/g, 's').replace(/th/g, 't')
        .replace(/y/g, 'i').replace(/w/g, 'u')
        .replace(/[^a-z0-9]/g, '');
}

function getRelevanceScore(p, query) {
    if (!query) return 0;
    const q = query.toLowerCase();
    const qPhone = phoneticNormalize(q);
    const name = (p.name || p.title || "").toLowerCase();
    const namePhone = phoneticNormalize(name);

    let score = 0;

    // 1. Exact Name Match (Highest priority)
    if (name === q) score += 2000;
    else if (name.startsWith(q)) score += 1000;
    else if (name.includes(q)) score += 500;

    // 2. Phonetic Name Match
    if (namePhone === qPhone) score += 800;
    else if (namePhone.includes(qPhone)) score += 400;

    // 3. Typo Match (Edit Distance)
    if (q.length > 3) {
        const words = name.split(/\s+/);
        for (const word of words) {
            if (word.length < 3) continue;
            const dist = getEditDistance(q, word);
            if (dist === 0) score += 1000;
            else if (dist === 1) score += 600;
            else if (dist === 2 && q.length > 5) score += 300;
        }
    }

    // 4. Other Fields Match
    const otherText = [
        p.category_name, p.category, p.brand, p.company_name,
        p.tags, p.description, p.material
    ].map(v => (v || "").toLowerCase()).join(" ");

    if (otherText.includes(q)) score += 100;
    if (phoneticNormalize(otherText).includes(qPhone)) score += 50;

    return score;
}

async function fetchSearchProducts() {
    if (searchProducts.length > 0) return searchProducts;
    console.log("🔍 Fetching products for search index...");
    try {
        const response = await fetch('/api/products.php');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // Normalize products: handle different data structures
        if (Array.isArray(data)) {
            searchProducts = data;
        } else if (data && data.success && Array.isArray(data.data)) {
            searchProducts = data.data;
        } else if (data && Array.isArray(data.products)) {
            searchProducts = data.products;
        } else {
            console.warn("⚠️ Unexpected product data format:", data);
            searchProducts = [];
        }

        console.log(`✅ Search products indexed: ${searchProducts.length} items`);
        return searchProducts;
    } catch (error) {
        console.error("❌ Failed to fetch search products:", error);
        // Fallback to empty array to prevent further errors
        searchProducts = [];
        return [];
    }
}

const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('searchSuggestions');
const searchBtn = document.querySelector('.search-submit-btn');

if (searchInput && suggestionsBox) {
    // Fetch products as soon as user focuses or starts typing
    searchInput.addEventListener('focus', () => {
        fetchSearchProducts();
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        selectedIndex = -1;

        clearTimeout(searchTimeout);
        if (query.length < 2) {
            suggestionsBox.style.display = 'none';
            return;
        }

        searchTimeout = setTimeout(async () => {
            const products = await fetchSearchProducts();
            const tokens = query.split(/\s+/).filter(t => t.length > 0);

            const filtered = products.map(p => {
                p._score = getRelevanceScore(p, query);
                return p;
            }).filter(p => {
                if (p._score > 5) return true;

                const searchableText = [
                    p.name, p.title, p.category_name, p.category,
                    p.company_name, p.brand, p.material, p.size,
                    p.description, p.tags, p.specifications, p.additional_notes
                ].map(v => (v || "").toLowerCase()).join(" ");

                return tokens.every(token => searchableText.includes(token));
            })
                .sort((a, b) => b._score - a._score)
                .slice(0, 8);

            if (filtered.length > 0) {
                renderSuggestions(filtered);
                suggestionsBox.style.display = 'block';
            } else {
                suggestionsBox.style.display = 'none';
            }
        }, 300);
    });

    searchInput.addEventListener('keydown', (e) => {
        const items = suggestionsBox.querySelectorAll('.suggestion-item');

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % items.length;
            updateSelection(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + items.length) % items.length;
            updateSelection(items);
        } else if (e.key === 'Enter') {
            if (selectedIndex > -1 && items[selectedIndex]) {
                items[selectedIndex].click();
            } else {
                performSearch(searchInput.value.trim());
            }
        } else if (e.key === 'Escape') {
            suggestionsBox.style.display = 'none';
        }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.style.display = 'none';
        }
    });

    // Handle Enter key (original, now mostly handled by keydown)
    // searchInput.addEventListener('keypress', (e) => {
    //     if (e.key === 'Enter') {
    //         performSearch(searchInput.value.trim());
    //     }
    // });
}

function updateSelection(items) {
    items.forEach((item, index) => {
        if (index === selectedIndex) {
            item.classList.add('active');
            item.scrollIntoView({ block: 'nearest' });
            // Optional: Update input value to selected item's title
            // const title = item.querySelector('.item-name').textContent;
            // searchInput.value = title; 
        } else {
            item.classList.remove('active');
        }
    });
}

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value.trim());
    });
}

function renderSuggestions(products) {
    if (!suggestionsBox) return;

    if (products.length === 0) {
        suggestionsBox.style.display = 'none';
        return;
    }

    suggestionsBox.innerHTML = products.map((p, index) => {
        const name = p.name || p.title || "Product";
        const category = p.category_name || p.category || "General";

        // Handle image path normalization
        let rawImage = p.image_path || p.image || p.img || '';
        let image = 'https://placehold.co/100x100?text=No+Image';

        if (rawImage) {
            rawImage = rawImage.trim();
            if (rawImage.startsWith('http')) {
                image = rawImage;
            } else if (rawImage.startsWith('data:')) {
                image = rawImage;
            } else if (rawImage.startsWith('assets/uploads/')) {
                // Map database assets/uploads/ to public/assets/uploads/
                image = '/public/' + rawImage;
            } else if (rawImage.startsWith('/')) {
                image = rawImage;
            } else {
                image = '/' + rawImage;
            }
        }

        const brand = p.company_name || p.brand || "";
        const price = p.price > 0 ? `₹${parseFloat(p.price).toLocaleString()}` : 'Price on request';

        return `
            <div class="suggestion-item" data-index="${index}" onclick="performSearch('${name.replace(/'/g, "\\'")}')">
                <div class="item-image">
                    <img src="${image}" alt="${name}" onerror="this.src='https://placehold.co/100x100?text=No+Image'">
                </div>
                <div class="item-info">
                    <div class="item-name">${name}</div>
                    <div class="item-meta">
                        <span class="item-category">${category}</span>
                        ${brand ? `<span class="item-brand">• ${brand}</span>` : ''}
                    </div>
                </div>
                <div class="item-price" style="font-weight: 700; color: var(--primary); font-size: 13px; margin-left: auto;">
                    ${price}
                </div>
            </div>
        `;
    }).join('') + `
        <div class="suggestion-footer" onclick="performSearch('${searchInput.value.trim().replace(/'/g, "\\'")}')">
            See all results for "${searchInput.value.trim()}" <br>
            <small style="font-weight: 400; font-size: 11px; opacity: 0.8;">Including related text/sentence matches</small>
        </div>
    `;
}

function performSearch(query) {
    if (!query) return;
    if (suggestionsBox) suggestionsBox.style.display = 'none';
    // Redirect to correct filter path
    const targetUrl = `/filter?search=${encodeURIComponent(query)}`;
    if (window.performSearch) {
        window.performSearch(query);
    } else {
        window.location.href = targetUrl;
    }
}

// Voice Search Implementation (Moved to Header.jsx)
/*
const voiceSearchBtn = document.getElementById('voiceSearchBtn');
...
*/

function showAlert(alertId, message, type = 'error') {
    const alertDiv = document.getElementById(alertId);
    if (alertDiv) {
        alertDiv.textContent = message;
        alertDiv.style.display = 'block';

        // Auto-scroll to alert so user sees the message
        alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        if (type === 'success' || type === 'warning') {
            setTimeout(() => { alertDiv.style.display = 'none'; }, 5000);
        }
    }
}

function hideAlert(alertId) {
    const alertDiv = document.getElementById(alertId);
    if (alertDiv) alertDiv.style.display = 'none';
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function moveToNext(current, nextId) {
    if (current.value.length === 1) {
        current.classList.add('filled');
        if (nextId) document.getElementById(nextId)?.focus();
        checkOTPCompletion(current.id.includes('freeJoin') ? 'freeJoin' : (current.id.includes('signin') ? 'signin' : 'reg'));
    } else {
        current.classList.remove('filled');
        checkOTPCompletion(current.id.includes('freeJoin') ? 'freeJoin' : (current.id.includes('signin') ? 'signin' : 'reg'));
    }
}

function checkOTPCompletion(type = 'reg') {
    let isComplete = true;
    for (let i = 1; i <= 6; i++) {
        const otpField = document.getElementById(`${type}Otp${i}`);
        if (!otpField || !otpField.value) { isComplete = false; break; }
    }
    const verifyBtn = document.getElementById(`${type}VerifyBtn`);
    if (verifyBtn) verifyBtn.disabled = !isComplete;
    return isComplete;
}

function getEnteredOTP(type = 'reg') {
    let otp = '';
    for (let i = 1; i <= 6; i++) {
        const val = document.getElementById(`${type}Otp${i}`)?.value;
        if (val) otp += val;
    }
    return otp;
}

function clearOTPFields(type = 'reg') {
    for (let i = 1; i <= 6; i++) {
        const otpField = document.getElementById(`${type}Otp${i}`);
        if (otpField) { otpField.value = ''; otpField.classList.remove('filled'); }
    }
    const verifyBtn = document.getElementById(`${type}VerifyBtn`);
    if (verifyBtn) verifyBtn.disabled = true;
}

function startTimer(duration, displayId, resendSectionId, type = 'reg') {
    if (type === 'reg' && regTimerInterval) clearInterval(regTimerInterval);
    else if (type === 'freeJoin' && freeJoinTimerInterval) clearInterval(freeJoinTimerInterval);
    else if (type === 'signin' && signinTimerInterval) clearInterval(signinTimerInterval);

    let timer = duration;
    const updateDisplay = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        const displayElement = document.querySelector(`#${displayId} .countdown`);
        if (displayElement) displayElement.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

        if (--timer < 0) {
            if (type === 'reg') clearInterval(regTimerInterval);
            else if (type === 'freeJoin') clearInterval(freeJoinTimerInterval);
            else clearInterval(signinTimerInterval);

            if (document.getElementById(displayId)) document.getElementById(displayId).style.display = 'none';
            if (document.getElementById(resendSectionId)) document.getElementById(resendSectionId).style.display = 'block';
        }
    };
    updateDisplay();
    const interval = setInterval(updateDisplay, 1000);
    if (type === 'reg') regTimerInterval = interval;
    else if (type === 'freeJoin') freeJoinTimerInterval = interval;
    else signinTimerInterval = interval;
}

function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function validatePhone(phone) { return /^\d{10}$/.test(phone); }
function validateGST(gst) { return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst); }

function initializeSystem() {
    console.log("✅ System Initialized");
    document.querySelectorAll('.otp-input').forEach((input, index, inputs) => {
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Backspace' && !this.value && index > 0) inputs[index - 1].focus();
        });
    });
    document.querySelectorAll('.alert').forEach(alert => alert.style.display = 'none');

    // Prevent default dropdown close on click inside
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.addEventListener('click', e => e.stopPropagation());
    });
}

// ============ REGISTRATION FLOW ============

document.getElementById('registrationForm1')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const phone = document.getElementById('regPhone').value.trim();
    const terms = document.getElementById('regTerms').checked;

    if (!name || !email || !phone) {
        showAlert('regAlert1', 'Please fill all required fields', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showAlert('regAlert1', 'Please enter a valid email address', 'error');
        return;
    }

    if (!validatePhone(phone)) {
        showAlert('regAlert1', 'Please enter a valid 10-digit phone number', 'error');
        return;
    }

    if (!terms) {
        showAlert('regAlert1', 'Please agree to Terms & Conditions', 'error');
        return;
    }

    regData = { name, email, phone };

    const btn = document.getElementById('regContinueBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending OTP...';
    btn.disabled = true;

    try {
        // Step 1: Save user to database
        const registerResult = await registerUser(name, email, phone);

        // Check if API call failed (e.g., running on Live Server instead of PHP server)
        if (!registerResult.success) {
            // Show warning but allow proceeding to OTP for testing
            console.warn('⚠️ API Registration failed:', registerResult.message);
            console.warn('⚠️ Make sure you are running on XAMPP/PHP server, not Live Server');
            console.warn('⚠️ Proceeding to OTP step for testing purposes...');

            // Show warning to user but don't block the flow
            showAlert('regAlert1', '⚠️ Warning: Running in test mode. Please use XAMPP server for production.', 'warning');

            // Continue to OTP step anyway for testing
        }

        // Step 2: Generate OTP
        regOTP = generateOTP();
        console.log('📱 Registration OTP Generated:', regOTP);

        // Step 3: Send OTP via EmailJS
        const emailResult = await sendOTPviaEmailJS(email, name, regOTP, 'reg');

        if (!emailResult.success) {
            showAlert('regAlert1', emailResult.message, 'error');
            btn.innerHTML = originalText;
            btn.disabled = false;
            return;
        }

        showAlert('regAlert1', '✅ Registration successful! OTP sent to your email.', 'success');

        // Smooth transition without hiding modal backdrop
        setTimeout(() => {
            // Hide modal 1 and show modal 2 simultaneously
            const modal1 = bootstrap.Modal.getInstance(document.getElementById('registrationModal1'));
            const modal2Element = document.getElementById('registrationModal2');

            // Update email display
            document.getElementById('regEmailDisplay').textContent = email;
            clearOTPFields('reg');

            // Create or get modal 2 instance
            let modal2 = bootstrap.Modal.getInstance(modal2Element);
            if (!modal2) {
                modal2 = new bootstrap.Modal(modal2Element, {
                    backdrop: 'static',
                    keyboard: false
                });
            }

            // Hide modal 1 and immediately show modal 2
            if (modal1) {
                modal1.hide();
            }

            // Show modal 2 with minimal delay to prevent backdrop flicker
            setTimeout(() => {
                modal2.show();
                startTimer(120, 'regTimer', 'regResendSection', 'reg');
                setTimeout(() => {
                    document.getElementById('regOtp1')?.focus();
                }, 300);
            }, 150);

            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 800);

    } catch (error) {
        console.error('Registration error:', error);
        showAlert('regAlert1', 'An error occurred. Please try again.', 'error');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});

document.getElementById('regVerifyBtn')?.addEventListener('click', async function () {
    const enteredOTP = getEnteredOTP('reg');

    if (enteredOTP.length !== 6) {
        showAlert('regAlert2', 'Please enter complete 6-digit OTP', 'error');
        return;
    }

    if (enteredOTP !== regOTP) {
        showAlert('regAlert2', 'Invalid OTP. Please try again.', 'error');
        return;
    }

    if (regTimerInterval) clearInterval(regTimerInterval);

    const btn = document.getElementById('regVerifyBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Completing...';
    btn.disabled = true;

    try {
        // Send registration success email - DISABLED by request to prevent GST email trigger
        // await sendRegistrationSuccessEmail(regData.email, regData.name);

        // Login the user
        const loginResult = await loginUser(regData.email, true);

        if (!loginResult.success) {
            // Show warning but allow completing registration for testing
            console.warn('⚠️ API Login failed:', loginResult.message);
            console.warn('⚠️ Make sure you are running on XAMPP/PHP server, not Live Server');
            console.warn('⚠️ Completing registration in test mode...');

            // Create a mock user for testing
            window.currentUser = {
                id: 'test-' + Date.now(),
                full_name: regData.name,
                email: regData.email,
                phone: regData.phone
            };

            showAlert('regAlert2', '⚠️ Test mode: Registration completed without database save', 'warning');
        } else {
            // Update current user from API
            window.currentUser = loginResult.data.user;
        }

        showUserProfile();
        updateNavButtons();

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;

            const modal2 = bootstrap.Modal.getInstance(document.getElementById('registrationModal2'));
            if (modal2) modal2.hide();

            document.getElementById('registrationForm1')?.reset();
            clearOTPFields('reg');

            // alert(`✅ Registration Successful!\n\nWelcome ${regData.name} to VIBRANT INDIA TRADE!\n\nYour account has been created successfully.\n\nYou are now logged in.`);

            // RELOAD to ensure all components recognize the new session
            window.location.reload();

            regData = {};
            regOTP = "";
        }, 1000);

    } catch (error) {
        console.error('Registration completion error:', error);
        showAlert('regAlert2', 'An error occurred. Please try again.', 'error');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});

document.getElementById('regResendOtp')?.addEventListener('click', async function () {
    if (!regData.email || !regData.name) {
        showAlert('regAlert2', 'User data not found. Please go back to step 1.', 'error');
        return;
    }

    const resendLink = document.getElementById('regResendOtp');
    const originalText = resendLink.textContent;
    resendLink.textContent = 'Sending...';
    resendLink.style.pointerEvents = 'none';

    try {
        regOTP = generateOTP();
        console.log('🔄 New Registration OTP:', regOTP);

        const emailResult = await sendOTPviaEmailJS(regData.email, regData.name, regOTP, 'reg');

        if (!emailResult.success) {
            showAlert('regAlert2', emailResult.message, 'error');
            resendLink.textContent = originalText;
            resendLink.style.pointerEvents = 'auto';
            return;
        }

        document.getElementById('regTimer').style.display = 'block';
        document.getElementById('regResendSection').style.display = 'none';

        startTimer(120, 'regTimer', 'regResendSection', 'reg');

        clearOTPFields('reg');

        document.getElementById('regOtp1')?.focus();

        showAlert('regAlert2', '✅ New OTP sent successfully!', 'success');

    } catch (error) {
        console.error('Resend OTP error:', error);
        showAlert('regAlert2', 'Failed to resend OTP. Please try again.', 'error');
    } finally {
        resendLink.textContent = originalText;
        resendLink.style.pointerEvents = 'auto';
    }
});

document.getElementById('regBackToStep1')?.addEventListener('click', function () {
    const modal2 = bootstrap.Modal.getInstance(document.getElementById('registrationModal2'));
    if (modal2) modal2.hide();

    setTimeout(() => {
        const modal1 = new bootstrap.Modal(document.getElementById('registrationModal1'));
        modal1.show();
    }, 300);
});

// ============ FREE JOIN FLOW ============

document.getElementById('freeJoinForm1')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('freeJoinName').value.trim();
    const phone = document.getElementById('freeJoinPhone').value.trim();
    const email = document.getElementById('freeJoinEmail').value.trim().toLowerCase();

    if (!name || !phone || !email) {
        showAlert('freeJoinAlert1', 'Please fill all required fields', 'error');
        return;
    }

    if (!validatePhone(phone)) {
        showAlert('freeJoinAlert1', 'Please enter a valid 10-digit phone number', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showAlert('freeJoinAlert1', 'Please enter a valid email address', 'error');
        return;
    }

    freeJoinData = {
        full_name: name,
        email: email,
        mobile: phone,
        whatsapp_number: phone,
        step1_completed: true
    };

    const btn = document.getElementById('freeJoinContinueBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending OTP...';
    btn.disabled = true;

    try {
        freeJoinOTP = generateOTP();
        console.log('📱 Free Join OTP Generated:', freeJoinOTP);

        const emailResult = await sendOTPviaEmailJS(email, name, freeJoinOTP, 'freeJoin');

        if (!emailResult.success) {
            showAlert('freeJoinAlert1', emailResult.message, 'error');
            btn.innerHTML = originalText;
            btn.disabled = false;
            return;
        }

        showAlert('freeJoinAlert1', '✅ OTP sent successfully! Check your email.', 'success');

        const modal1 = bootstrap.Modal.getInstance(document.getElementById('freeJoinModal1'));
        if (modal1) modal1.hide();

        setTimeout(() => {
            document.getElementById('freeJoinEmailDisplay').textContent = email;
            clearOTPFields('freeJoin');
            const modal2 = new bootstrap.Modal(document.getElementById('freeJoinModal2'));
            modal2.show();
            startTimer(120, 'freeJoinTimer', 'freeJoinResendSection', 'freeJoin');
            setTimeout(() => {
                document.getElementById('freeJoinOtp1')?.focus();
            }, 300);
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1000);

    } catch (error) {
        console.error('Free Join error:', error);
        showAlert('freeJoinAlert1', 'An error occurred. Please try again.', 'error');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});

document.getElementById('freeJoinVerifyBtn')?.addEventListener('click', function () {
    const enteredOTP = getEnteredOTP('freeJoin');

    if (enteredOTP.length !== 6) {
        showAlert('freeJoinAlert2', 'Please enter complete 6-digit OTP', 'error');
        return;
    }

    if (enteredOTP !== freeJoinOTP) {
        showAlert('freeJoinAlert2', 'Invalid OTP. Please try again.', 'error');
        return;
    }

    if (freeJoinTimerInterval) clearInterval(freeJoinTimerInterval);
    showAlert('freeJoinAlert2', '✅ Email verified successfully!', 'success');

    document.getElementById('freeJoinDisplayName').textContent = freeJoinData.full_name;
    document.getElementById('freeJoinDisplayEmail').textContent = freeJoinData.email;
    document.getElementById('freeJoinDisplayMobile').textContent = freeJoinData.mobile;

    setTimeout(() => {
        const modal2 = bootstrap.Modal.getInstance(document.getElementById('freeJoinModal2'));
        if (modal2) modal2.hide();

        setTimeout(() => {
            const modal3 = new bootstrap.Modal(document.getElementById('freeJoinModal3'));
            modal3.show();

            setTimeout(() => {
                document.getElementById('freeJoinCompanyName').focus();
            }, 300);
        }, 300);
    }, 1000);
});

document.getElementById('freeJoinForm3')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const company_name = document.getElementById('freeJoinCompanyName').value.trim();
    const gst = document.getElementById('freeJoinGst').value.trim().toUpperCase();
    const terms = document.getElementById('freeJoinTerms').checked;

    // Social Media
    const facebook = document.getElementById('freeJoinFacebook').value.trim();
    const instagram = document.getElementById('freeJoinInstagram').value.trim();
    const twitter = document.getElementById('freeJoinTwitter').value.trim();
    const linkedin = document.getElementById('freeJoinLinkedin').value.trim();

    // Logo
    const logoInput = document.getElementById('freeJoinLogo');
    const logoFile = logoInput.files[0];

    if (!company_name || !gst) {
        showAlert('freeJoinAlert3', 'Please fill all required fields', 'error');
        return;
    }

    if (!validateGST(gst)) {
        showAlert('freeJoinAlert3', '❌ Invalid GST Number. Format should be like: 27ABCDE1234F1Z5 (15 characters)', 'error');
        return;
    }

    if (!terms) {
        showAlert('freeJoinAlert3', 'Please accept the terms', 'error');
        return;
    }

    // Build FormData
    const formData = new FormData();
    formData.append('full_name', freeJoinData.full_name);
    formData.append('email', freeJoinData.email);
    formData.append('mobile', freeJoinData.mobile);
    formData.append('gst', gst);
    formData.append('company_name', company_name);
    formData.append('whatsapp_number', freeJoinData.mobile);

    if (facebook) formData.append('facebook_link', facebook);
    if (instagram) formData.append('instagram_link', instagram);
    if (twitter) formData.append('twitter_link', twitter);
    if (linkedin) formData.append('linkedin_link', linkedin);

    if (logoFile) {
        formData.append('logo', logoFile);
    }

    const btn = document.getElementById('freeJoinCompleteBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Registering...';
    btn.disabled = true;

    try {
        const registerResult = await freeJoinRegister(formData);

        if (!registerResult.success) {
            showAlert('freeJoinAlert3', registerResult.message, 'error');
            btn.innerHTML = originalText;
            btn.disabled = false;
            return;
        }

        await sendGSTSuccessEmail(
            freeJoinData.email,
            freeJoinData.full_name,
            gst,
            company_name
        );

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;

            const modal3 = bootstrap.Modal.getInstance(document.getElementById('freeJoinModal3'));
            if (modal3) modal3.hide();

            document.getElementById('freeJoinForm1')?.reset();
            document.getElementById('freeJoinForm3')?.reset();
            clearOTPFields('freeJoin');

            // reset logo preview
            const logoPreview = document.getElementById('freeJoinLogoPreview');
            const logoPlaceholder = document.getElementById('logoPlaceholder');
            if (logoPreview) {
                logoPreview.src = "";
                logoPreview.style.display = 'none';
            }
            if (logoPlaceholder) logoPlaceholder.style.display = 'block';

            alert(`🎉 FREE JOIN SUCCESSFUL!\n\n✅ Welcome ${freeJoinData.full_name} to VINDIATRADE!\n\n✅ Your B2B account has been created\n✅ GST Verified: ${gst}\n✅ Company: ${company_name}\n✅ WhatsApp: ${freeJoinData.mobile}\n\n📧 Check your email for welcome details!\n\n📱 Contact: +91 99244 88938`);

            freeJoinData = {};
            freeJoinOTP = "";
        }, 2000);

    } catch (error) {
        console.error('Free Join completion error:', error);
        showAlert('freeJoinAlert3', 'An error occurred. Please try again.', 'error');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});

document.getElementById('freeJoinResendOtp')?.addEventListener('click', async function () {
    if (!freeJoinData.email || !freeJoinData.full_name) {
        showAlert('freeJoinAlert2', 'User data not found. Please go back to step 1.', 'error');
        return;
    }

    const resendLink = document.getElementById('freeJoinResendOtp');
    const originalText = resendLink.textContent;
    resendLink.textContent = 'Sending...';
    resendLink.style.pointerEvents = 'none';

    try {
        freeJoinOTP = generateOTP();
        console.log('🔄 New Free Join OTP:', freeJoinOTP);

        const emailResult = await sendOTPviaEmailJS(freeJoinData.email, freeJoinData.full_name, freeJoinOTP, 'freeJoin');

        if (!emailResult.success) {
            showAlert('freeJoinAlert2', emailResult.message, 'error');
            resendLink.textContent = originalText;
            resendLink.style.pointerEvents = 'auto';
            return;
        }

        document.getElementById('freeJoinTimer').style.display = 'block';
        document.getElementById('freeJoinResendSection').style.display = 'none';

        startTimer(120, 'freeJoinTimer', 'freeJoinResendSection', 'freeJoin');

        clearOTPFields('freeJoin');

        document.getElementById('freeJoinOtp1')?.focus();

        showAlert('freeJoinAlert2', '✅ New OTP sent successfully!', 'success');

    } catch (error) {
        console.error('Resend OTP error:', error);
        showAlert('freeJoinAlert2', 'Failed to resend OTP. Please try again.', 'error');
    } finally {
        resendLink.textContent = originalText;
        resendLink.style.pointerEvents = 'auto';
    }
});

document.getElementById('freeJoinBackToStep1')?.addEventListener('click', function () {
    const modal2 = bootstrap.Modal.getInstance(document.getElementById('freeJoinModal2'));
    if (modal2) modal2.hide();

    setTimeout(() => {
        const modal1 = new bootstrap.Modal(document.getElementById('freeJoinModal1'));
        modal1.show();
    }, 300);
});

document.getElementById('freeJoinBackToStep2')?.addEventListener('click', function () {
    const modal3 = bootstrap.Modal.getInstance(document.getElementById('freeJoinModal3'));
    if (modal3) modal3.hide();

    setTimeout(() => {
        const modal2 = new bootstrap.Modal(document.getElementById('freeJoinModal2'));
        modal2.show();
    }, 300);
});

// ============ SIGN IN FLOW ============

document.getElementById('signinEmailForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('signinEmail').value.trim().toLowerCase();

    if (!email) {
        showAlert('signinAlert1', 'Please enter your email address', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showAlert('signinAlert1', 'Please enter a valid email address', 'error');
        return;
    }

    signinData.email = email;

    const btn = document.getElementById('signinGetOtpBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending OTP...';
    btn.disabled = true;

    try {
        signinOTP = generateOTP();
        console.log('📱 Sign In OTP Generated:', signinOTP);

        const emailResult = await sendOTPviaEmailJS(email, 'User', signinOTP, 'signin');

        if (!emailResult.success) {
            showAlert('signinAlert1', emailResult.message, 'error');
            btn.innerHTML = originalText;
            btn.disabled = false;
            return;
        }

        showAlert('signinAlert1', '✅ OTP sent successfully! Check your email.', 'success');

        const modal1 = bootstrap.Modal.getInstance(document.getElementById('signinEmailModal'));
        if (modal1) modal1.hide();

        setTimeout(() => {
            document.getElementById('signinEmailDisplay').textContent = email;
            clearOTPFields('signin');
            const modal2 = new bootstrap.Modal(document.getElementById('signinOtpModal'));
            modal2.show();
            startTimer(120, 'signinTimer', 'signinResendSection', 'signin');
            setTimeout(() => {
                document.getElementById('signinOtp1')?.focus();
            }, 300);
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1000);

    } catch (error) {
        console.error('Sign In error:', error);
        showAlert('signinAlert1', 'An error occurred. Please try again.', 'error');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});

document.getElementById('signinVerifyBtn')?.addEventListener('click', async function () {
    const enteredOTP = getEnteredOTP('signin');

    if (enteredOTP.length !== 6) {
        showAlert('signinAlert2', 'Please enter complete 6-digit OTP', 'error');
        return;
    }

    if (enteredOTP !== signinOTP) {
        showAlert('signinAlert2', 'Invalid OTP. Please try again.', 'error');
        return;
    }

    if (signinTimerInterval) clearInterval(signinTimerInterval);

    const btn = document.getElementById('signinVerifyBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Signing In...';
    btn.disabled = true;

    try {
        const loginResult = await loginUser(signinData.email, true);

        if (!loginResult.success) {
            showAlert('signinAlert2', loginResult.message, 'error');
            btn.innerHTML = originalText;
            btn.disabled = false;
            return;
        }

        window.currentUser = loginResult.data.user;
        showUserProfile();
        updateNavButtons();

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;

            const modal2 = bootstrap.Modal.getInstance(document.getElementById('signinOtpModal'));
            if (modal2) modal2.hide();

            document.getElementById('signinEmailForm')?.reset();
            clearOTPFields('signin');

            // alert(`✅ Sign In Successful!\n\nWelcome back ${window.currentUser.full_name}!\n\nYou have been successfully signed in.\n\nRedirecting to your dashboard...`);

            // RELOAD to ensure all components recognize the new session
            window.location.reload();

            signinData = {};
            signinOTP = "";
        }, 1000);

    } catch (error) {
        console.error('Sign In error:', error);
        showAlert('signinAlert2', 'An error occurred. Please try again.', 'error');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});

document.getElementById('signinResendOtp')?.addEventListener('click', async function () {
    if (!signinData.email) {
        showAlert('signinAlert2', 'Email not found. Please go back to email step.', 'error');
        return;
    }

    const resendLink = document.getElementById('signinResendOtp');
    const originalText = resendLink.textContent;
    resendLink.textContent = 'Sending...';
    resendLink.style.pointerEvents = 'none';

    try {
        signinOTP = generateOTP();
        console.log('🔄 New Sign In OTP:', signinOTP);

        const emailResult = await sendOTPviaEmailJS(signinData.email, 'User', signinOTP, 'signin');

        if (!emailResult.success) {
            showAlert('signinAlert2', emailResult.message, 'error');
            resendLink.textContent = originalText;
            resendLink.style.pointerEvents = 'auto';
            return;
        }

        document.getElementById('signinTimer').style.display = 'block';
        document.getElementById('signinResendSection').style.display = 'none';

        startTimer(120, 'signinTimer', 'signinResendSection', 'signin');

        clearOTPFields('signin');

        document.getElementById('signinOtp1')?.focus();

        showAlert('signinAlert2', '✅ New OTP sent successfully!', 'success');

    } catch (error) {
        console.error('Resend OTP error:', error);
        showAlert('signinAlert2', 'Failed to resend OTP. Please try again.', 'error');
    } finally {
        resendLink.textContent = originalText;
        resendLink.style.pointerEvents = 'auto';
    }
});

document.getElementById('signinBackToEmail')?.addEventListener('click', function () {
    const modal2 = bootstrap.Modal.getInstance(document.getElementById('signinOtpModal'));
    if (modal2) modal2.hide();

    setTimeout(() => {
        const modal1 = new bootstrap.Modal(document.getElementById('signinEmailModal'));
        modal1.show();
    }, 300);
});

// System Ready
console.log("🎯 Vibrant India Trade Registration System Ready!");
console.log("📧 EmailJS Service ID:", EMAILJS_CONFIG.SERVICE_ID);
console.log("📧 OTP Template ID:", EMAILJS_CONFIG.TEMPLATE_ID_OTP);
console.log("📧 Success Template ID:", EMAILJS_CONFIG.TEMPLATE_ID_SUCCESS);
console.log("🌐 API Base URL:", API_CONFIG.BASE_URL);

// Logo Preview Function
window.previewLogo = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('freeJoinLogoPreview').src = e.target.result;
            document.getElementById('freeJoinLogoPreview').style.display = 'block';
            document.getElementById('logoPlaceholder').style.display = 'none';
        }
        reader.readAsDataURL(input.files[0]);
    }
}
