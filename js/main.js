// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    initAuthModal();
    checkNavbarAuth();
    syncDatabaseToFrontend();


    // prioritized: Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navRow = document.querySelector('.header-nav-row');
    const navOverlay = document.querySelector('.nav-overlay');

    if (mobileToggle && navRow) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navRow.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');

            // Toggle body scroll
            if (navRow.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                navRow.classList.remove('active');
                mobileToggle.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }

    // Preloader Logic
    try {
        const preloader = document.getElementById('preloader');
        const loadingBar = document.getElementById('loadingBar');
        if (preloader && loadingBar) {
            const navEntries = performance.getEntriesByType('navigation');
            const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
            const isInitial = !sessionStorage.getItem('notFirstEntry');

            if (isReload || isInitial) {
                preloader.style.display = 'flex';
                document.body.classList.add('loading-lock');
                setTimeout(() => { loadingBar.style.width = '100%'; }, 50);
                setTimeout(() => {
                    preloader.classList.add('loaded');
                    document.body.classList.remove('loading-lock');
                    sessionStorage.setItem('notFirstEntry', 'true');
                    setTimeout(() => { preloader.style.display = 'none'; }, 800);
                }, 800);
            } else {
                preloader.style.display = 'none';
                document.body.classList.remove('loading-lock');
            }
        }
    } catch (err) {
        console.warn("Preloader failed:", err);
        document.body.classList.remove('loading-lock');
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.extended-header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (navbar && window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else if (navbar) {
            navbar.classList.remove('scrolled');
        }
    });

    if (navbar && window.scrollY > scrollThreshold) {
        navbar.classList.add('scrolled');
    }

    // Toggle Categories and Data Dropdowns (Mobile & Click Fallback)
    function setupDropdown(btnSelector, menuSelector) {
        const btns = document.querySelectorAll(btnSelector);
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // If it's a mobile view or explicit click
                if (window.innerWidth <= 992 || e.detail > 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    const menu = btn.closest('li')?.querySelector(menuSelector) ||
                        btn.parentElement?.querySelector(menuSelector);
                    if (menu) {
                        const isOpen = menu.classList.toggle('active');
                        menu.classList.toggle('mobile-open', isOpen);

                        // Force styles for immediate visual sync
                        if (isOpen) {
                            menu.style.opacity = '1';
                            menu.style.visibility = 'visible';
                            menu.style.display = 'block';
                        } else {
                            menu.style.opacity = '0';
                            menu.style.visibility = 'hidden';
                            menu.style.display = 'none';
                        }

                        const chevron = btn.querySelector('.fa-chevron-down');
                        if (chevron) {
                            chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
                        }
                    }
                }
            });
        });
    }

    setupDropdown('.btn-categories', '.dropdown-menu');
    setupDropdown('.btn-data', '.data-dropdown-menu');

    // Global Click Listener to close menus when clicking outside
    document.addEventListener('click', (e) => {
        const openMenus = document.querySelectorAll('.mobile-open, .dropdown-menu.active, .data-dropdown-menu.active');
        openMenus.forEach(menu => {
            const parent = menu.closest('li') || menu.parentElement;
            if (parent && !parent.contains(e.target)) {
                menu.classList.remove('mobile-open', 'active');
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.display = 'none';
                const chevron = parent.querySelector('.fa-chevron-down');
                if (chevron) chevron.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Active Link Highlighting
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.premium-nav-links a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });

    // Client Testimonials Slider
    const slider = document.querySelector('.testimonial-slider');
    let isDown = false, startX, scrollLeft;
    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
        slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // ────────────────────────────────────────────────
    // AUTH MODAL LOGIC
    // ────────────────────────────────────────────────
    let _generatedOtp = null;

    function initAuthModal() {
        if (document.getElementById('auth-overlay')) return;
        if (typeof emailjs !== 'undefined') {
            emailjs.init({ publicKey: 'yswvPmenzubJt3FSC' });
        }
        document.body.insertAdjacentHTML('beforeend', `
            <div class="auth-overlay" id="auth-overlay">
                <div class="vibrant-auth-card">
                    <div class="vibrant-auth-header">
                        <div class="v-auth-tabs">
                            <button class="v-tab active" id="tabSignIn"><i class="fa-regular fa-user"></i> Sign In</button>
                            <button class="v-tab" id="tabJoinFree"><i class="fa-solid fa-user-plus"></i> Join Free</button>
                        </div>
                        <button class="v-auth-close" id="closeAuthModal"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="vibrant-auth-body" id="panel-signin">
                        <h2 class="v-brand-name">VIBRANT INDIA TRADE</h2>
                        <h3 class="v-welcome-text">Great to have you back!</h3>
                        <div id="auth-email-view">
                            <div class="v-field"><label>Email Address</label><input type="email" id="vibrantEmail" placeholder="your@email.com" required></div>
                            <button id="getOtpBtn" class="v-primary-btn"><i class="fa-regular fa-envelope"></i> Get OTP</button>
                        </div>
                        <div id="auth-otp-view" style="display:none;">
                            <div class="v-field"><label>Enter OTP</label><input type="text" id="vibrantOtp" placeholder="6-digit OTP" maxlength="6" style="letter-spacing:8px; font-size:1.4rem; text-align:center;"></div>
                            <button id="verifyOtpBtn" class="v-primary-btn"><i class="fa-solid fa-lock-open"></i> Verify & Sign In</button>
                            <p class="v-resend">Didn't receive? <a href="#" id="resendOtpLink">Resend OTP</a></p>
                        </div>
                    </div>
                    <div class="vibrant-auth-body" id="panel-join" style="display:none;">
                        <h2 class="v-brand-name">VIBRANT INDIA TRADE</h2>
                        <h3 class="v-welcome-text">Create Free Account</h3>
                        <div class="v-field"><label>Full Name</label><input type="text" id="joinName" placeholder="Your name" required></div>
                        <div class="v-field"><label>Email</label><input type="email" id="joinEmail" placeholder="your@email.com" required></div>
                        <div class="v-field"><label>Mobile</label><input type="tel" id="joinPhone" placeholder="+91 XXXXX XXXXX" required></div>
                        <button id="joinSubmitBtn" class="v-primary-btn" style="background:#F26B43;"><i class="fa-solid fa-rocket"></i> Register Now</button>
                        <div class="v-footer">
                            <p class="v-footer-label">Already a member? <button class="v-register-btn" id="switchToSignIn">Sign In</button></p>
                        </div>
                    </div>
                </div>
            </div>
        `);

        const overlay = document.getElementById('auth-overlay');
        const emailView = document.getElementById('auth-email-view');
        const otpView = document.getElementById('auth-otp-view');
        const panelSignIn = document.getElementById('panel-signin');
        const panelJoin = document.getElementById('panel-join');

        document.getElementById('closeAuthModal').onclick = () => overlay.classList.remove('active');
        overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.remove('active'); };

        document.getElementById('tabSignIn').onclick = () => { panelSignIn.style.display = 'block'; panelJoin.style.display = 'none'; document.getElementById('tabSignIn').classList.add('active'); document.getElementById('tabJoinFree').classList.remove('active'); };
        document.getElementById('tabJoinFree').onclick = () => { panelJoin.style.display = 'block'; panelSignIn.style.display = 'none'; document.getElementById('tabJoinFree').classList.add('active'); document.getElementById('tabSignIn').classList.remove('active'); };
        document.getElementById('switchToSignIn').onclick = () => document.getElementById('tabSignIn').click();

        document.getElementById('getOtpBtn').onclick = () => {
            const email = document.getElementById('vibrantEmail').value.trim();
            if (!email.includes('@')) return alert('Valid email required');
            _generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log("OTP:", _generatedOtp);
            emailView.style.display = 'none';
            otpView.style.display = 'block';

            if (typeof emailjs !== 'undefined') {
                emailjs.send('service_qymzpli', 'template_zh4lufc', { to_email: email, otp_code: _generatedOtp });
            }
        };

        document.getElementById('verifyOtpBtn').onclick = () => {
            if (document.getElementById('vibrantOtp').value !== _generatedOtp) return alert('Invalid OTP');
            const email = document.getElementById('vibrantEmail').value;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userProfile', JSON.stringify({ name: email.split('@')[0], email }));
            window.location.reload();
        };

        document.getElementById('joinSubmitBtn').onclick = () => {
            const name = document.getElementById('joinName').value;
            const email = document.getElementById('joinEmail').value;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userProfile', JSON.stringify({ name, email }));
            window.location.reload();
        };
    }

    window.openAuthModal = function (tab) {
        initAuthModal();
        document.getElementById('auth-overlay').classList.add('active');
        if (tab === 'join') document.getElementById('tabJoinFree').click();
        else document.getElementById('tabSignIn').click();
    };

    function checkNavbarAuth() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const container = document.querySelector('.top-nav-actions');
        if (!container) return;

        if (isLoggedIn) {
            let profile = { name: 'User', email: '', phone: '+91 98765 43210' };
            try { profile = { ...profile, ...JSON.parse(localStorage.getItem('userProfile')) }; } catch (e) { }
            const initials = profile.name ? profile.name.charAt(0).toUpperCase() : 'U';

            container.innerHTML = `
                <div class="user-profile-nav" id="profileNavBtn" style="position:relative; cursor:pointer; display:flex; align-items:center; gap:10px;">
                    <div class="user-avatar-circle" style="width:36px; height:36px; background:#F26B43; color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1rem; border:2px solid rgba(255,255,255,0.2); shadow: 0 4px 10px rgba(0,0,0,0.1);">${initials}</div>
                    <span class="user-avatar-name" style="color:#FFFFFF; font-weight:700; font-family:'Poppins',sans-serif; text-transform:uppercase; letter-spacing:0.5px;">${profile.name}</span>
                    <i class="fa-solid fa-chevron-down" style="color:rgba(255,255,255,0.7); font-size:0.75rem;"></i>
                    
                    <div class="profile-dropdown" id="profileDropdownMenu" style="display:none; position:absolute; top:calc(100% + 15px); right:0; background:#fff; border-radius:12px; box-shadow:0 20px 40px rgba(0,0,0,0.15); min-width:240px; z-index:9999; border:1px solid #e2e8f0; overflow:hidden;">
                        <div style="padding:20px; background:#f8fafc; border-bottom:1px solid #f1f5f9;">
                            <div style="font-weight:800; color:#0A2540; font-size:1.05rem; margin-bottom:8px; font-family:'Poppins',sans-serif;">${profile.name}</div>
                            <div style="font-size:0.82rem; color:#64748b; display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                                <i class="fa-regular fa-envelope" style="color:#F26B43; width:14px;"></i> ${profile.email || 'account@vibrant.com'}
                            </div>
                            <div style="font-size:0.82rem; color:#64748b; display:flex; align-items:center; gap:10px;">
                                <i class="fa-solid fa-phone" style="color:#F26B43; width:14px;"></i> ${profile.phone || '+91 98765 43210'}
                            </div>
                        </div>
                        <div style="padding:10px;">
                            <a href="#" id="logoutBtn" style="display:flex; align-items:center; gap:12px; padding:12px 18px; color:#ef4444; text-decoration:none; font-size:0.9rem; font-weight:700; border-radius:8px; transition:all 0.2s;">
                                <i class="fa-solid fa-right-from-bracket"></i> Sign Out
                            </a>
                        </div>
                    </div>
                </div>
            `;

            const btn = document.getElementById('profileNavBtn');
            const menu = document.getElementById('profileDropdownMenu');
            btn.onclick = (e) => {
                e.stopPropagation();
                menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
            };
            document.addEventListener('click', () => { if (menu) menu.style.display = 'none'; });
            document.getElementById('logoutBtn').onclick = (e) => {
                e.preventDefault();
                localStorage.clear();
                window.location.reload();
            };
        } else {
            container.innerHTML = `
                <a href="#" class="login-link" onclick="openAuthModal('login'); return false;"><i class="fa-regular fa-user"></i> Sign In</a>
                <a href="#" class="action-btn glow-btn" onclick="openAuthModal('join'); return false;">Join Free</a>
            `;
        }
    }


    // ────────────────────────────────────────────────
    // GLOBAL INTELLIGENT SEARCH SYSTEM (V2 - ENHANCED)
    // ────────────────────────────────────────────────
    let searchSuggestions = [
        { term: "Royal Thali Set", cat: "Kitchenware" },
        { term: "Tri-Ply Pressure Cooker", cat: "Kitchenware" },
        { term: "Stainless Steel Plates", cat: "Kitchenware" }
    ];

    async function loadDynamicSuggestions() {
        try {
            const res = await fetch('http://localhost:5001/api/products?limit=100');
            if (res.ok) {
                const data = await res.json();
                const products = data.data || [];
                if (products.length > 0) {
                    searchSuggestions = products.map(p => ({
                        term: p.name || p.title,
                        cat: p.category_name || p.category || 'Product'
                    }));
                    console.log("[Search] Loaded dynamic suggestions from database.");
                }
            }
        } catch (err) { console.warn("Could not load dynamic suggestions:", err); }
    }
    loadDynamicSuggestions();

    function executeSearch(val) {
        if (!val || val.trim() === '') return;
        const query = val.trim();
        
        // Premium Visual Feedback
        const searchBubbles = document.querySelectorAll('.search-bubble');
        searchBubbles.forEach(sb => {
            sb.classList.add('search-animating');
            sb.style.borderColor = '#f26b43';
            sb.style.transform = 'scale(1.02)';
        });
        
        // Auto-save search to local storage for "Recently Searched" feature
        let history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        if (!history.includes(query)) {
            history.unshift(query);
            localStorage.setItem('searchHistory', JSON.stringify(history.slice(0, 5)));
        }

        setTimeout(() => {
            window.location.href = 'results.html?q=' + encodeURIComponent(query);
        }, 200);
    }

    function initGlobalSearch() {
        const inputs = document.querySelectorAll('.intel-search');
        inputs.forEach(input => {
            const container = input.closest('.intel-search-container');
            if (!container) return;
            
            let dropdown = container.querySelector('.search-dropdown');
            if (!dropdown) {
                dropdown = document.createElement('div');
                dropdown.className = 'search-dropdown';
                dropdown.id = (input.id || 'search') + '-autocomplete';
                container.appendChild(dropdown);
            }

            input.addEventListener('input', (e) => {
                const val = e.target.value.toLowerCase().trim();
                if (val.length < 1) {
                    dropdown.classList.remove('active');
                    return;
                }

                // Intelligent Filtering with Category Detection
                const filtered = searchSuggestions.filter(s => 
                    s.term.toLowerCase().includes(val) || s.cat.toLowerCase().includes(val)
                );
                
                let html = '';
                if (filtered.length > 0) {
                    html += '<div class="dropdown-header"><i class="fa-solid fa-wand-magic-sparkles"></i> Intelligent Suggestions</div>';
                    html += filtered.slice(0, 6).map(s => {
                        const regex = new RegExp(`(${val})`, 'gi');
                        const highlighted = s.term.replace(regex, '<span class="highlight">$1</span>');
                        return `
                            <div class="dropdown-item" data-value="${s.term}">
                                <div style="display:flex; flex-direction:column;">
                                    <span><i class="fa-solid fa-magnifying-glass" style="margin-right:10px; font-size:0.8rem;"></i>${highlighted}</span>
                                    <small style="font-size:0.7rem; color:#94a3b8; margin-left:22px;">In ${s.cat}</small>
                                </div>
                            </div>`;
                    }).join('');
                }

                // Add Category Direct Links if matched
                const cats = ["Kitchenware", "Horeca", "Houseware", "Tubes & Pipes", "Raw Materials"];
                const matchedCat = cats.find(c => c.toLowerCase().includes(val));
                if (matchedCat) {
                    html += `<div class="dropdown-header">Jump to Category</div>`;
                    html += `<div class="dropdown-item" onclick="window.location.href='${matchedCat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}.html'">
                                <i class="fa-solid fa-layer-group"></i> Explore <b>${matchedCat}</b> Section
                             </div>`;
                }
                
                html += `<div class="dropdown-header">Global Search</div>`;
                html += `<div class="dropdown-item" data-value="${val}"><i class="fa-solid fa-search"></i> Search for <b>"${val}"</b></div>`;
                
                dropdown.innerHTML = html;
                dropdown.classList.add('active');
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    executeSearch(input.value);
                    dropdown.classList.remove('active');
                }
            });

            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) dropdown.classList.remove('active');
            });

            dropdown.addEventListener('click', (e) => {
                const item = e.target.closest('.dropdown-item');
                if (item && !item.hasAttribute('onclick')) {
                    const value = item.getAttribute('data-value');
                    input.value = value;
                    executeSearch(value);
                    dropdown.classList.remove('active');
                }
            });
        });
    }

    initGlobalSearch();

    // ────────────────────────────────────────────────
    // PERFECT FILTER BAR INJECTION
    // ────────────────────────────────────────────────
    function initPerfectFilter() {
        const tsGrid = document.querySelector('.ts-grid') || document.getElementById('results-grid');
        if (tsGrid && !document.querySelector('.ts-filter-bar')) {
            const filterBar = document.createElement('div');
            filterBar.className = 'ts-filter-bar';
            filterBar.innerHTML = `
                <div class="ts-filter-search-wrap">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" class="ts-filter-input" placeholder="Search in this category..." id="ts-search-input">
                </div>
                <select class="ts-filter-select" id="ts-brand-select">
                    <option value="">All Brands</option>
                </select>
                <select class="ts-filter-select" id="ts-location-select">
                    <option value="">All Locations</option>
                </select>
                <button class="ts-btn-enquire" style="width: auto; padding: 10px 24px; border-radius: 12px; font-weight: 800; display: flex; align-items: center; gap: 8px;" onclick="if(window.toggleFilterDrawer) window.toggleFilterDrawer(); else alert('Filter drawer is coming soon!');">
                    <i class="fa-solid fa-filter"></i> Filter
                </button>
            `;
            tsGrid.parentNode.insertBefore(filterBar, tsGrid);

            // Hook up live filtering for the injected bar
            const filterInput = filterBar.querySelector('#ts-search-input');
            if (filterInput) {
                filterInput.addEventListener('input', (e) => {
                    const val = e.target.value.toLowerCase().trim();
                    const cards = tsGrid.querySelectorAll('.ts-card, .res-card');
                    cards.forEach(card => {
                        const title = card.querySelector('.ts-name, .res-card-title')?.textContent.toLowerCase() || '';
                        card.style.display = title.includes(val) ? 'flex' : 'none';
                    });
                });
            }
        }
    }

    // Removed redundant category-level filter injection in favor of the new sidebar system
    // setTimeout(initPerfectFilter, 500);

    // ────────────────────────────────────────────────
    // ROBUST SEARCH EXECUTION (CLICK + ENTER)
    // ────────────────────────────────────────────────
    document.querySelectorAll('.search-btn-icon').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const container = btn.closest('.intel-search-container');
            const input = container ? container.querySelector('.intel-search') : document.getElementById('header-search');
            if (input) executeSearch(input.value);
        });
    });

    document.querySelectorAll('.intel-search, #header-search').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                executeSearch(input.value);
                const dropdown = input.closest('.intel-search-container')?.querySelector('.search-dropdown');
                if (dropdown) dropdown.classList.remove('active');
            }
        });
    });

    // ────────────────────────────────────────────────
    // PREMIUM VOICE SEARCH LOGIC
    // ────────────────────────────────────────────────
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-IN'; 

        document.querySelectorAll('.mic-btn-icon').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (btn.classList.contains('listening')) {
                    recognition.stop();
                    return;
                }
                
                try {
                    recognition.start();
                    btn.classList.add('listening');
                    
                    const input = btn.closest('.intel-search-container')?.querySelector('.intel-search') || 
                                  document.getElementById('header-search');
                    if (input) {
                        btn._originalPlaceholder = input.placeholder;
                        input.placeholder = "Listening... Speak clearly";
                        input.focus();
                    }
                } catch (err) {
                    console.warn("Speech recognition already started or failed:", err);
                    btn.classList.remove('listening');
                }
            });

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const input = btn.closest('.intel-search-container')?.querySelector('.intel-search') || 
                              document.getElementById('header-search');
                if (input) {
                    input.value = transcript;
                    // Visual confirmation
                    gsap.to(input, { backgroundColor: 'rgba(242, 107, 67, 0.1)', duration: 0.3, yoyo: true, repeat: 1 });
                    setTimeout(() => executeSearch(transcript), 500);
                }
            };

            recognition.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                btn.classList.remove('listening');
                resetSearchInput(btn);
            };

            recognition.onend = () => {
                btn.classList.remove('listening');
                resetSearchInput(btn);
            };
        });

        function resetSearchInput(btn) {
            const input = btn.closest('.intel-search-container')?.querySelector('.intel-search') || 
                          document.getElementById('header-search');
            if (input && btn._originalPlaceholder) {
                input.placeholder = btn._originalPlaceholder;
            }
        }
    } else {
        // Fallback: hide mic icons if browser doesn't support it
        document.querySelectorAll('.mic-btn-icon').forEach(b => b.style.display = 'none');
    }
    // ─── HELPER: Render Product Card ──────────────────────────
    function getProductCardHtml(p) {
        let brandLogo = p.brand_logo && p.brand_logo.trim() !== '' ? p.brand_logo : '';
        if (brandLogo && brandLogo.startsWith('assets/uploads/')) brandLogo = 'admin/dist/' + brandLogo;

        const dbId = `db_${p.id}`;
        if (!window.GLOBAL_PRODUCTS) window.GLOBAL_PRODUCTS = {};

        // Parse JSON specifications field if present
        let extraSpecs = [];
        try {
            if (p.specifications && p.specifications !== '[]') {
                const parsed = JSON.parse(p.specifications);
                if (Array.isArray(parsed)) {
                    extraSpecs = parsed.map(s => ({ key: s.key || s.label || '', val: s.value || s.val || '' })).filter(s => s.key && s.val);
                }
            }
        } catch (e) { }

        // Build comprehensive specs for detail tab
        const fullSpecsList = [
            { key: 'Material', val: p.material || 'Stainless Steel' },
            { key: 'Size', val: p.size || 'Standard' },
            { key: 'Unit', val: p.unit || 'Pieces' },
            { key: 'Min. Order Qty', val: p.min_order_qty ? `${p.min_order_qty} ${p.unit || 'pcs'}` : '1 pc' },
            { key: 'Weight', val: p.weight && p.weight !== '1' ? `${p.weight} kg` : 'N/A' },
            { key: 'Dimensions', val: p.dimensions && p.dimensions !== '111' ? p.dimensions : 'N/A' },
            { key: 'Category', val: p.category_name || 'General' },
            { key: 'Tags', val: p.tags || p.name },
            ...extraSpecs
        ];

        // Build the 6-cell quick spec grid shown at top of modal
        const cleanPrice = p.price ? Math.round(Number(p.price)) : 0;
        const displayPrice = cleanPrice ? '₹' + cleanPrice.toLocaleString('en-IN') : 'Inquire';

        const specTableCells = [
            { label: 'Material', val: p.material || 'Stainless Steel' },
            { label: 'Size', val: p.size || 'Standard' },
            { label: 'Min Order Qty', val: p.min_order_qty ? String(p.min_order_qty) : '1' },
            { label: 'Unit', val: p.unit || 'Pieces' },
            // { label: 'Price (Approx)', val: displayPrice },
            { label: 'Tags', val: p.tags || p.name },
        ];

        window.GLOBAL_PRODUCTS[dbId] = {
            id: dbId,
            title: p.name,
            img: (p.image_path && p.image_path.trim() !== '') ? (p.image_path.startsWith('assets/uploads/') ? 'admin/dist/' + p.image_path : p.image_path) : 'images/default_product.png',
            price: displayPrice,
            description: p.description || 'Premium quality product.',
            rating: '4.5',
            orders: p.min_order_qty ? `${p.min_order_qty}+` : '100+',
            warranty: '1 Year',
            company: {
                name: p.brand_name || 'IndiaTrade',
                phone: p.brand_phone || '+91 91372 07026',
                email: p.brand_email || 'vibrantindiatech515@gmail.com',
                address: p.brand_address || 'New Delhi, India',
                about: p.brand_about || `${p.brand_name || 'IndiaTrade'} is a trusted supplier of premium quality stainless steel products with years of export experience.`,
                website: p.brand_website || 'www.vibrantindiatrade.com',
                initials: (p.brand_name || 'IT').substring(0, 2).toUpperCase(),
                logo: brandLogo
            },
            specs: fullSpecsList,
            specsTable: specTableCells,
            certs: ['BIS Certified', 'ISO 9001:2015', 'FSSAI Approved'],
            exports: ['UAE', 'USA', 'UK', 'Germany', 'Australia'],
            additionalNotes: p.additional_notes || ''
        };

        let img = p.image_path && p.image_path.trim() !== '' ? p.image_path : 'images/default_product.png';
        if (img.startsWith('assets/uploads/')) img = 'admin/dist/' + img;

        let displayCat = p.category_name || 'Export Product';
        let filterCat = displayCat.toLowerCase().replace(/ & /g, '').replace(/ /g, '');
        if (filterCat === 'tubespipes') filterCat = 'tubes';

        // Show new-arrival badge for new arrivals
        const topCat = (p.top_category || '').toLowerCase();
        const isTopSelling = topCat.includes('top');
        const isNewArrival = topCat.includes('new');
        const isTrending = topCat.includes('trend');

        let badgeLabel = '';
        if (isTopSelling) badgeLabel = 'TOP CATEGORY';
        else if (isNewArrival) badgeLabel = 'NEW ARRIVAL';
        else if (isTrending) badgeLabel = 'TRENDING';

        const badgeHtml = badgeLabel ? `
            <div style="position:absolute;top:14px;left:14px;background:#F26B43 !important;color:#fff !important;padding:5px 14px !important;border-radius:6px !important;font-size:0.68rem !important;font-weight:800 !important;display:flex !important;align-items:center !important;gap:6px !important;z-index:2 !important;box-shadow:0 4px 12px rgba(242,107,67,0.3) !important;letter-spacing:0.3px !important;">
                ${badgeLabel}
            </div>
        ` : '';

        // Price display — show price range style like reference
        const priceNum = p.price ? Math.round(Number(p.price)) : 0;
        const unitLabel = p.unit ? p.unit.replace(/s$/, '') : 'piece'; // "pieces" → "piece"
        // Price display — hidden per request
        const priceHtml = '';
        /*
        const priceHtml = priceNum ? `
            <div style="margin:14px 0 18px;display:flex;align-items:baseline;gap:6px;flex-wrap:wrap;">
                <span style="font-size:1.2rem;font-weight:900;color:#0A2540;font-family:'Poppins',sans-serif;">₹${priceNum.toLocaleString('en-IN')}</span>
                <span style="font-size:0.85rem;color:#94a3b8;font-weight:600;">/${unitLabel}</span>
            </div>` : '';
        */

        return `
            <div class="ts-card" data-cat="${filterCat}" style="
                border-radius:18px !important;
                overflow:hidden !important;
                background:#fff !important;
                border:1px solid #edf2f7 !important;
                box-shadow:0 4px 24px rgba(10,37,64,0.07) !important;
                display:flex !important;
                flex-direction:column !important;
                transition:transform 0.3s ease,box-shadow 0.3s ease !important;
                cursor:default !important;
                height: 100% !important;
            " onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 16px 48px rgba(10,37,64,0.12)'"
               onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 24px rgba(10,37,64,0.07)'">

                <!-- IMAGE SECTION: full-width top -->
                <div class="ts-img-wrap" style="
                    position:relative !important;
                    width:100% !important;
                    height:220px !important;
                    background:#ffffff !important;
                    overflow:hidden !important;
                    flex-shrink:0 !important;
                    cursor:pointer !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                " onclick="openModal('${dbId}')">
                    <img src="${img}" alt="${p.name}"
                         style="max-width:100% !important; max-height:100% !important; object-fit:contain !important; padding:18px !important; box-sizing:border-box !important; transition:transform 0.5s ease !important;"
                         onerror="this.src='images/default_product.png'"
                         onmouseover="this.style.transform='scale(1.06)'"
                         onmouseout="this.style.transform='scale(1)'">
                    ${badgeHtml}

                    <div style="position:absolute !important; top:14px !important; right:14px !important; width:42px !important; height:42px !important; background:#fff !important; border-radius:50% !important; display:flex !important; align-items:center !important; justify-content:center !important; box-shadow:0 4px 12px rgba(0,0,0,0.12) !important; border:1.5px solid #fff !important; padding:6px !important; z-index:3 !important;">
                        ${brandLogo ? `<img src="${brandLogo}" style="max-width:100%; max-height:100%; object-fit:contain;" onerror="this.style.display='none'">` : `<i class="fa-solid fa-gem" style="color:#f26b43; font-size:1rem;"></i>`}
                    </div>
                </div>

                <!-- DETAILS SECTION: everything below image -->
                <div class="ts-body" style="padding:18px 20px 20px !important; display:flex !important; flex-direction:column !important; flex-grow:1 !important;">

                    <!-- Category Pill -->
                    <div style="margin-bottom:12px !important;">
                        <span style="background:#fff1ec !important; color:#f26b43 !important; padding:4px 14px !important; border-radius:100px !important; font-size:0.75rem !important; font-weight:700 !important; display:inline-block !important; letter-spacing:0.3px !important;">${displayCat}</span>
                    </div>

                    <!-- Product Name -->
                    <h3 style="font-family:'Poppins',sans-serif !important; font-size:1rem !important; font-weight:800 !important; color:#0A2540 !important; margin:0 0 8px !important; line-height:1.3 !important;">${p.name}</h3>

                    <!-- Description -->
                    <p style="font-size:0.82rem !important; color:#64748b !important; line-height:1.6 !important; margin:0 0 12px !important; display:-webkit-box !important; -webkit-line-clamp:2 !important; -webkit-box-orient:vertical !important; overflow:hidden !important; flex-grow:1 !important;">${p.description || 'Premium quality ' + displayCat + ' product.'}</p>

                    <!-- Price -->
                    ${priceHtml}

                    <!-- Buttons -->
                    <div style="display:grid !important; grid-template-columns:1fr 1fr !important; gap:10px !important; margin-top:auto !important;">
                        <button onclick="openModal('${dbId}')"
                            style="height:44px !important; background:#0A2540 !important; color:#fff !important; border:none !important; border-radius:10px !important; font-family:'Poppins',sans-serif !important; font-size:0.82rem !important; font-weight:700 !important; cursor:pointer !important; display:flex !important; align-items:center !important; justify-content:center !important; gap:6px !important; transition:background 0.2s !important;"
                            onmouseover="this.style.background='#183760'" onmouseout="this.style.background='#0A2540'">
                            <i class="fa-solid fa-circle-info"></i> Details
                        </button>
                        <button onclick="window.location.href='contact.html?product=${encodeURIComponent(p.name)}'"
                            style="height:44px !important; background:#fff !important; color:#f26b43 !important; border:2px solid #f26b43 !important; border-radius:10px !important; font-family:'Poppins',sans-serif !important; font-size:0.82rem !important; font-weight:700 !important; cursor:pointer !important; display:flex !important; align-items:center !important; justify-content:center !important; gap:6px !important; transition:background 0.2s !important;"
                            onmouseover="this.style.background='#fff1ec'" onmouseout="this.style.background='#fff'">
                            <i class="fa-solid fa-paper-plane"></i> Enquire
                        </button>
                    </div>

                </div>
            </div>`;
    }

    // New Elite Card specifically for homepage category navigator
    function getHomeCatProductCardHtml(p) {
        var img = (p.image_path && p.image_path.trim() !== '') ? p.image_path : 'images/default_product.png';
        if (img.indexOf('assets/uploads/') === 0) img = 'admin/dist/' + img;
        
        var dbId = 'home_cat_' + p.id;
        if (!window.GLOBAL_PRODUCTS) window.GLOBAL_PRODUCTS = {};
        
        window.GLOBAL_PRODUCTS[dbId] = {
            id: dbId,
            title: p.name,
            img: img,
            description: p.description || 'Premium export grade product.',
            price: 'Inquire',
            company: { name: p.brand_name || 'IndiaTrade' }
        };

        var html = '<div class="elite-home-card" style="background:rgba(255,255,255,0.03);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:20px;transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);position:relative;overflow:hidden;display:flex;flex-direction:column;gap:15px;color:white;height:100%;" onmouseover="this.style.background=\'rgba(255,255,255,0.08)\';this.style.transform=\'translateY(-10px) scale(1.02)\';this.style.borderColor=\'rgba(242,107,67,0.5)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.03)\';this.style.transform=\'translateY(0) scale(1)\';this.style.borderColor=\'rgba(255,255,255,0.1)\'">';
        html += '<div style="position:absolute;top:-50px;right:-50px;width:120px;height:120px;background:radial-gradient(circle,rgba(242,107,67,0.15) 0%,transparent 70%);border-radius:50%;"></div>';
        html += '<div class="elite-img-wrap" style="width:100%;height:180px;background:white;border-radius:18px;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:15px;" onclick="openModal(\'' + dbId + '\')">';
        html += '<img src="' + img + '" style="max-width:100%;max-height:100%;object-fit:contain;transition:transform 0.5s ease;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'">';
        html += '</div>';
        html += '<div style="flex-grow:1;">';
        html += '<div style="font-size:0.7rem;font-weight:800;color:#F26B43;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:5px;">' + (p.category_name || 'Premium Export') + '</div>';
        html += '<h4 style="font-size:1.1rem;font-weight:700;margin:0 0 10px;font-family:\'Poppins\',sans-serif;">' + p.name + '</h4>';
        html += '<p style="font-size:0.8rem;color:rgba(255,255,255,0.6);line-height:1.5;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + (p.description || 'Superior quality stainless steel product.') + '</p>';
        html += '</div>';
        html += '<div style="display:flex;gap:10px;margin-top:10px;">';
        html += '<button onclick="openModal(\'' + dbId + '\')" style="flex:1;height:40px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:white;border-radius:12px;font-size:0.8rem;font-weight:700;cursor:pointer;transition:all 0.3s;" onmouseover="this.style.background=\'#fff\';this.style.color=\'#0A2540\'">Details</button>';
        html += '<button onclick="window.location.href=\'contact.html?product=' + encodeURIComponent(p.name) + '\'" style="flex:1;height:40px;background:#F26B43;border:none;color:white;border-radius:12px;font-size:0.8rem;font-weight:700;cursor:pointer;transition:all 0.3s;" onmouseover="this.style.background=\'#ff7e5a\';this.style.transform=\'scale(1.05)\'" onmouseout="this.style.transform=\'scale(1)\'">Enquire</button>';
        html += '</div></div>';
        return html;
    }


    // ─── SYNC DATABASE TO FRONTEND ────────────────────────────────────────────
    async function syncDatabaseToFrontend() { // START
        const path = window.location.pathname.toLowerCase();
        const isBusinessPage = ['manufacturers', 'wholesalers', 'retailers', 'distributors', 'dealers', 'traders', 'importers', 'exporters'].some(p => path.includes(p));
        const isHomePage = path === '/' || path.endsWith('index.html') || path === '' || path.endsWith('index.php');
        const isResultsPage = path.includes('results.html');

        if (isResultsPage) return;

        // 1. Specialized Tag-Based Pages
        const isNewArrivalPage = path.includes('products.html');
        const isTrendingPage = path.includes('gallery.html');
        const isTopCategoryPage = path.includes('services.html');

        if (isNewArrivalPage || isTrendingPage || isTopCategoryPage) {
            const gridId = isTrendingPage ? 'trend-grid' : (isTopCategoryPage ? 'ts-grid' : 'ts-grid');
            const container = document.getElementById(gridId) || document.querySelector('.ts-grid') || document.querySelector('.trend-grid');
            if (container) {
                let tag = 'new';
                if (isTrendingPage) tag = 'trending';
                if (isTopCategoryPage) tag = 'top';

                try {
                    const res = await fetch('http://localhost:5001/api/products?tag=' + tag + '&limit=100');
                    if (res.ok) {
                        const data = await res.json();
                        const products = data.data || [];
                        if (products.length > 0) {
                            container.innerHTML = products.map((p, idx) => {
                                // Force NEW ARRIVAL tag on first product if requested
                                if (idx === 0 && isNewArrivalPage) {
                                    p.top_category = 'new';
                                }
                                // Force TOP CATEGORY tag for all on services page
                                if (isTopCategoryPage) {
                                    p.top_category = 'top';
                                }
                                return getProductCardHtml(p);
                            }).join('');
                        }
                    }
                } catch (err) { console.error("Specialized grid load fail:", err); }
                return;
            }
        }

        // ── 2. PRODUCTS (Home Page Arc Navigator) ──
        if (isHomePage) {
            async function loadHomePageProducts(catId) {
                const grid = document.getElementById('home-dynamic-cat-grid');
                if (!grid) return;
                grid.style.opacity = '0.5';
                try {
                    const res = await fetch(`http://localhost:5001/api/products?categoryId=${catId}&limit=6`);
                    if (res.ok) {
                        const data = await res.json();
                        const products = data.data || [];
                        grid.innerHTML = products.length > 0
                            ? products.map(p => getProductCardHtml(p)).join('')
                            : '<div style="grid-column:1/-1; text-align:center; padding:80px; color:#94a3b8; background:white; border-radius:20px; border:1px dashed #eee;"><i class="fa-solid fa-box-open" style="font-size:3rem; margin-bottom:15px; opacity:0.5;"></i><br>No products found for this category yet.</div>';
                        grid.style.opacity = '1';
                    }
                } catch (err) { console.error("Home grid load fail:", err); grid.style.opacity = '1'; }
            }
            const arcItems = document.querySelectorAll('.arc-item');
            const cycleBtn = document.getElementById('category-cycle-btn');
            let currentIdx = 0;

            function updateActiveCategory(idx) {
                arcItems.forEach(item => item.classList.remove('active'));
                const item = arcItems[idx];
                if (!item) return;
                item.classList.add('active');
                const catId = item.getAttribute('data-cat');
                const title = item.getAttribute('data-title');
                const desc = item.getAttribute('data-desc');
                const link = item.getAttribute('data-link');

                const nameEl = document.getElementById('active-cat-name');
                const descEl = document.getElementById('active-cat-desc');
                const linkEl = document.getElementById('active-cat-link');
                if (nameEl) nameEl.textContent = title;
                if (descEl) descEl.textContent = desc;
                if (linkEl) linkEl.setAttribute('href', link);

                const rotateDeg = -72 * idx;
                const arcEl = document.getElementById('category-arc');
                if (arcEl) arcEl.style.transform = `rotate(${rotateDeg}deg)`;

                arcItems.forEach((child, cIdx) => {
                    child.style.transform = `rotate(${72 * cIdx + (-rotateDeg)}deg)`;
                });

                loadHomePageProducts(catId);
            }

            arcItems.forEach((item, idx) => {
                item.onclick = () => { currentIdx = idx; updateActiveCategory(idx); };
            });

            if (cycleBtn) {
                cycleBtn.onclick = () => {
                    currentIdx = (currentIdx + 1) % arcItems.length;
                    updateActiveCategory(currentIdx);
                };
            }

            if (arcItems.length > 0) setTimeout(() => updateActiveCategory(0), 100);
            return;
        }


        if (!isBusinessPage) {
            const LIMIT = 18;
            let currentProdPage = 1;

            const CATEGORY_IDS = {
                kitchenware: [1],
                hotelware: [2],
                horeca: [2],
                houseware: [3],
                'tubes-pipes': [4],
                'tube-pipe': [4],
                'raw-materials': [5],
                'raw-material': [5]
            };

            const path = window.location.pathname.toLowerCase();
            const pageTitle = document.title.toLowerCase();
            const h1Text = document.querySelector('h1')?.textContent.toLowerCase() || '';
            const breadcrumbText = document.querySelector('.breadcrumb')?.textContent.toLowerCase() || '';

            let targetCategoryIds = null;
            // First priority: Exact match in path
            for (const [key, ids] of Object.entries(CATEGORY_IDS)) {
                if (path.includes(key)) { targetCategoryIds = ids; break; }
            }
            // Second priority: Fuzzy match in title/h1 if path failed
            if (!targetCategoryIds) {
                for (const [key, ids] of Object.entries(CATEGORY_IDS)) {
                    if (pageTitle.includes(key) || h1Text.includes(key) || breadcrumbText.includes(key)) {
                        targetCategoryIds = ids;
                        break;
                    }
                }
            }

            let currentSearch = '';
            let currentBrand = '';
            let currentLocation = '';

            // Inject Top Filter Bar
            const tsGrid = document.querySelector('.ts-grid');
            if (tsGrid && !document.querySelector('.ts-filter-bar')) {
                const filterBar = document.createElement('div');
                filterBar.className = 'ts-filter-bar';
                filterBar.innerHTML = `
                    <div class="ts-filter-search-wrap">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" class="ts-filter-input" placeholder="Search in this category..." id="ts-search-input">
                    </div>
                    <select class="ts-filter-select" id="ts-brand-select">
                        <option value="">All Brands</option>
                    </select>
                    <select class="ts-filter-select" id="ts-location-select">
                        <option value="">All Locations</option>
                    </select>
                    <button class="ts-btn-enquire" style="width: auto; padding: 10px 24px; border-radius: 12px; font-weight: 800; display: flex; align-items: center; gap: 8px;" onclick="window.toggleFilterDrawer()">
                        <i class="fa-solid fa-filter"></i> Filter
                    </button>

                `;
                tsGrid.parentNode.insertBefore(filterBar, tsGrid);
                // Populate Top Bar Brands Dynamically
                async function fillTopBarBrands() {
                    const brandSelect = document.getElementById('ts-brand-select');
                    if (!brandSelect) return;

                    try {
                        const catId = (targetCategoryIds && targetCategoryIds.length > 0) ? targetCategoryIds[0] : '';
                        console.log(`[DEBUG] Category Detected: ${catId} for page: ${window.location.pathname}`);

                        // Debug indicator in title
                        if (!document.title.startsWith('(')) {
                            document.title = `(${catId || 'ALL'}) ` + document.title;
                        }

                        // Check server version
                        const EXPECTED_VERSIONS = ['1.3-v14-STRICT', '1.4-v1-BLOG-SYNC'];
                        fetch('http://localhost:5001/api/ping').then(r => r.json()).then(v => {
                            console.log("[DEBUG] Server Version:", v.version);
                            if (!EXPECTED_VERSIONS.includes(v.version)) {
                                console.error(`!!! SERVER VERSION MISMATCH !!! Found: ${v.version}. Please restart node admin_server.js`);
                                // Visually alert the user in development
                                const alertBox = document.createElement('div');
                                alertBox.style.cssText = 'position:fixed; top:0; left:0; width:100%; background:red; color:white; padding:10px; z-index:99999; text-align:center; font-weight:bold; border-bottom: 2px solid white;';
                                alertBox.innerHTML = `
                                    <div style="display:flex; flex-direction:column; gap:5px; align-items:center;">
                                        <span style="font-size:16px;">⚠️ <b>SERVER OUTDATED (Found: ${v.version})</b></span>
                                        <span style="font-size:14px;">Filters will not work until you restart the backend.</span>
                                        <code style="background:rgba(0,0,0,0.2); padding:4px 12px; border-radius:4px; margin:5px 0; border:1px solid rgba(255,255,255,0.3);">node admin_server.js</code>
                                    </div>
                                `;
                                document.body.appendChild(alertBox);
                            }
                        });

                        // Use catId if available, ensuring it's not 'all'
                        const fetchUrl = new URL('http://localhost:5001/api/brands');
                        fetchUrl.searchParams.append('limit', '1000');
                        if (catId && catId !== 'all') {
                            fetchUrl.searchParams.append('categoryId', catId);
                        }
                        fetchUrl.searchParams.append('_cb', Date.now());

                        const res = await fetch(fetchUrl.toString());
                        if (res.ok) {
                            const data = await res.json();
                            const brands = data.data || [];

                            // Explicit clear and update
                            brandSelect.options.length = 0;
                            brandSelect.add(new Option('All Brands', ''));
                            if (brands.length > 0) {
                                brands.forEach(b => {
                                    brandSelect.add(new Option(b.company_name || b.name, b.id));
                                });
                            }
                        }


                    } catch (err) { console.error("Top bar brands failed:", err); }
                }

                async function fillTopBarLocations() {
                    const locSelect = document.getElementById('ts-location-select');
                    if (!locSelect) return;
                    try {
                        const res = await fetch(`http://localhost:5001/api/locations?_cb=${Date.now()}`);
                        if (res.ok) {
                            const data = await res.json();
                            const locs = data.data || [];
                            locSelect.innerHTML = '<option value="">All Locations</option>';
                            locSelect.innerHTML += locs.map(l => `<option value="${l}">${l}</option>`).join('');
                        }
                    } catch (err) { console.error("Top bar locations failed:", err); }
                }

                fillTopBarBrands();
                fillTopBarLocations();


                const brandSelect = document.getElementById('ts-brand-select');
                const locationSelect = document.getElementById('ts-location-select');
                const sidebarLocationSelect = document.getElementById('location-filter');

                if (brandSelect) {
                    brandSelect.onchange = () => {
                        currentBrand = brandSelect.value;
                        if (window.loadProductPage) window.loadProductPage(1);
                    };
                }
                if (locationSelect) {
                    locationSelect.onchange = () => {
                        currentLocation = locationSelect.value;
                        if (sidebarLocationSelect) sidebarLocationSelect.value = currentLocation;
                        if (window.loadProductPage) window.loadProductPage(1);
                    };
                }
                if (sidebarLocationSelect) {
                    sidebarLocationSelect.onchange = () => {
                        currentLocation = sidebarLocationSelect.value;
                        if (locationSelect) locationSelect.value = currentLocation;
                        // Don't auto-load here as user might be clicking "Apply"
                    };
                }


                // Real-time search listeners
                const searchInput = document.getElementById('ts-search-input');
                searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        currentSearch = e.target.value;
                        window.loadProductPage(1);
                    }
                });

                document.getElementById('ts-brand-select').addEventListener('change', (e) => {
                    currentBrand = e.target.value;
                    window.loadProductPage(1);
                });

                // Ensure the Filter button works
                const filterBtn = filterBar.querySelector('.ts-btn-enquire');
                if (filterBtn) {
                    filterBtn.onclick = (e) => {
                        e.preventDefault();
                        if (window.toggleFilterDrawer) window.toggleFilterDrawer();
                    };
                }
            }

            // Pagination bar for products
            let prodPaginationBar = document.getElementById('product-pagination-bar');
            if (!prodPaginationBar) {
                prodPaginationBar = document.createElement('div');
                prodPaginationBar.id = 'product-pagination-bar';
                prodPaginationBar.className = 'pagination-container';
                if (tsGrid) {
                    tsGrid.parentNode.insertBefore(prodPaginationBar, tsGrid.nextSibling);
                }
            }


            window.loadProductPage = async function (page) {
                if (page < 1) return;
                currentProdPage = page;
                const tsGrids = document.querySelectorAll('.ts-grid');
                if (tsGrids.length === 0) return;
                tsGrids.forEach(g => g.style.opacity = '0.5');

                try {
                    const checkedCats = Array.from(document.querySelectorAll('#category-filters input:checked')).map(i => i.value);
                    const checkedBrands = Array.from(document.querySelectorAll('#brand-filters input:checked')).map(i => i.value);

                    const queryParams = new URLSearchParams();
                    queryParams.append('page', page);
                    queryParams.append('limit', LIMIT);
                    if (checkedCats.length > 0) queryParams.append('categories', checkedCats.join(','));
                    else if (targetCategoryIds) queryParams.append('categoryId', targetCategoryIds[0]);
                    if (currentSearch) queryParams.append('search', currentSearch);

                    const topBrandSelect = document.getElementById('ts-brand-select');
                    const topLocationSelect = document.getElementById('ts-location-select');
                    const sideLocationSelect = document.getElementById('location-filter');

                    if (checkedBrands.length > 0) queryParams.append('brands', checkedBrands.join(','));
                    else if (topBrandSelect && topBrandSelect.value) queryParams.append('brandId', topBrandSelect.value);
                    else if (currentBrand) queryParams.append('brandId', currentBrand);

                    if (topLocationSelect && topLocationSelect.value) queryParams.append('location', topLocationSelect.value);
                    else if (sideLocationSelect && sideLocationSelect.value) queryParams.append('location', sideLocationSelect.value);
                    else if (currentLocation) queryParams.append('location', currentLocation);

                    const materialGradeSelect = document.getElementById('material-grade-filter');
                    if (materialGradeSelect && materialGradeSelect.value) queryParams.append('materialGrade', materialGradeSelect.value);

                    const sizeSelect = document.getElementById('size-filter');
                    if (sizeSelect && sizeSelect.value) queryParams.append('size', sizeSelect.value);

                    const piecesSelect = document.getElementById('pieces-filter');
                    if (piecesSelect && piecesSelect.value) queryParams.append('pieces', piecesSelect.value);

                    const res = await fetch(`http://localhost:5001/api/products?${queryParams.toString()}`);
                    if (res.ok) {
                        const data = await res.json();
                        const products = data.data || [];
                        const total = data.total || 0;
                        const html = products.map(p => getProductCardHtml(p)).join('');
                        tsGrids.forEach(g => {
                            g.innerHTML = html || `<div class="no-products">No products found.</div>`;
                            g.style.opacity = '1';
                        });
                        renderProductPagination(total, page);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                    }
                } catch (err) {
                    console.error('Products fetch error:', err);
                    tsGrids.forEach(g => g.style.opacity = '1');
                }
            };

            function renderProductPagination(total, page) {
                const totalPages = Math.ceil(total / LIMIT);
                if (totalPages <= 1) { prodPaginationBar.innerHTML = ''; return; }
                const btn = (label, pg, active, disabled) => `<button onclick="window.loadProductPage(${pg})" ${disabled ? 'disabled' : ''} class="pagination-btn ${active ? 'active' : ''}">${label}</button>`;
                let start = Math.max(1, page - 2);
                let end = Math.min(totalPages, start + 4);
                if (end - start < 4) start = Math.max(1, end - 4);
                let html = btn('<i class="fa-solid fa-chevron-left"></i> Prev', page - 1, false, page === 1);
                if (start > 1) html += btn('1', 1, false, false) + '<span class="pagination-ellipsis">...</span>';
                for (let i = start; i <= end; i++) html += btn(i, i, i === page, false);
                if (end < totalPages) html += '<span class="pagination-ellipsis">...</span>' + btn(totalPages, totalPages, false, false);
                html += btn('Next <i class="fa-solid fa-chevron-right"></i>', page + 1, false, page === totalPages);
                html += `<div class="pagination-info" style="background:#f1f5f9; color:#475569; padding:8px 16px; border-radius:100px; font-size:0.85rem; font-weight:700; margin-left:15px;">${total.toLocaleString()} products</div>`;
                prodPaginationBar.innerHTML = html;
            }

            // --- Home Page Category Loader ---
            window.loadProductPage(1);
        }


        // ── 2. PROFILES – server-side pagination, 20 per page ──────────────────
        try {
            const networkGrids = document.querySelectorAll('.network-grid');
            if (networkGrids.length > 0) {
                const path = window.location.pathname.toLowerCase();

                // Inject compact 3-column grid CSS once
                if (!document.getElementById('profile-grid-style')) {
                    const s = document.createElement('style');
                    s.id = 'profile-grid-style';
                    s.textContent = `
                        .network-grid{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:16px!important;margin-top:24px!important;}
                        @media(max-width:1100px){.network-grid{grid-template-columns:repeat(2,1fr)!important;}}
                        @media(max-width:680px){.network-grid{grid-template-columns:1fr!important;}}
                    `;
                    document.head.appendChild(s);
                }

                // Map page URL → business type for API ?type= filter
                const TYPE_MAP = [
                    { key: 'manufacturer', type: 'Manufacturer' },
                    { key: 'dealer', type: 'Dealer' },
                    { key: 'retailer', type: 'Retailer' },
                    { key: 'distributor', type: 'Distributor' },
                    { key: 'trader', type: 'Trader' },
                    { key: 'importer', type: 'Importer' },
                    { key: 'exporter', type: 'Exporter' },
                    { key: 'wholesaler', type: 'Wholesaler' },
                    { key: 'corporate', type: '' },
                ];
                const matched = TYPE_MAP.find(m => path.includes(m.key));
                const businessType = matched ? matched.type : '';

                const LIMIT = 20;
                let currentPage = 1;

                // Pagination bar – injected once below the grid
                let paginationBar = document.getElementById('profile-pagination-bar');
                if (!paginationBar) {
                    paginationBar = document.createElement('div');
                    paginationBar.id = 'profile-pagination-bar';
                    paginationBar.style.cssText = 'display:flex;justify-content:center;align-items:center;gap:8px;padding:32px 20px;flex-wrap:wrap;';
                    networkGrids[0].parentNode.insertBefore(paginationBar, networkGrids[0].nextSibling);
                }

                const checkNan = (v, fb) => (v && v.toString().trim().toLowerCase() !== 'nan' && v.toString().trim() !== '') ? v : fb;

                // ── Card template ──────────────────────────────────────────────────
                function renderProfileCard(m) {
                    const name = (m.company_name || 'Business').trim();
                    const initials = name.substring(0, 2).toUpperCase() || 'BS';
                    const phone = checkNan(m.phone, '');
                    const email = checkNan(m.email, '');
                    const address = checkNan(m.address, '');
                    const owner = checkNan(m.owner, '');
                    const about = checkNan(m.about, '');
                    const pType = checkNan(m.type, 'Member');
                    const pDesc = about || 'Wholesale Distributor and Manufacturer of premium kitchen appliances, industrial metal products, and electronics with international export compliance.';
                    const phoneClean = String(phone).replace(/\D/g, '') || '919876543210';

                    const COLORS = ['#2563eb', '#0891b2', '#059669', '#7c3aed', '#dc2626', '#ea580c', '#0d9488'];
                    const color = COLORS[(name.charCodeAt(0) || 0) % COLORS.length] || COLORS[0];

                    const row = (icon, val) => val ? `
                        <div style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid #f1f5f9;">
                            <i class="fa-solid ${icon}" style="color:${color};font-size:0.72rem;margin-top:3px;flex-shrink:0;width:14px;"></i>
                            <span style="font-size:0.8rem;color:#374151;line-height:1.3;word-break:break-word;">${val}</span>
                        </div>` : '';

                    return `
                    <div style="background:#fff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;
                                box-shadow:0 2px 12px rgba(0,0,0,0.06);transition:transform .2s,box-shadow .2s;
                                display:flex;flex-direction:column;"
                         onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'"
                         onmouseout="this.style.transform='';this.style.boxShadow='0 2px 12px rgba(0,0,0,0.06)'">
                        <div style="height:4px;background:linear-gradient(90deg,${color},${color}88);"></div>
                        <div style="padding:14px 14px 10px;display:flex;align-items:center;gap:10px;">

                            <div style="min-width:0;">
                                <div style="font-weight:700;font-size:0.9rem;color:#111827;white-space:nowrap;
                                            overflow:hidden;text-overflow:ellipsis;" title="${name}">${name}</div>
                                <span style="font-size:0.68rem;font-weight:600;color:${color};background:${color}15;
                                             padding:2px 7px;border-radius:20px;display:inline-block;margin-top:2px;">
                                    <i class="fa-solid fa-circle-check" style="font-size:0.6rem;"></i> ${pType}
                                </span>
                            </div>
                        </div>
                        <div style="padding:0 14px 10px;flex:1;">
                            ${row('fa-user-tie', owner)}
                            ${row('fa-phone', phone)}
                            ${row('fa-envelope', email)}
                            ${row('fa-location-dot', address)}
                            ${about ? `<div style="margin-top:7px;font-size:0.73rem;color:#6b7280;line-height:1.4;
                                display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${about}</div>` : ''}
                        </div>
                        <div style="padding:10px 14px;border-top:1px solid #f1f5f9;display:flex;gap:8px;">
                            <a href="https://wa.me/${phoneClean}" target="_blank"
                               style="flex:1;display:flex;align-items:center;justify-content:center;gap:5px;
                                      padding:7px 0;border-radius:8px;background:#25d366;color:#fff;
                                      font-size:0.78rem;font-weight:700;text-decoration:none;">
                                <i class="fa-brands fa-whatsapp"></i> Chat
                            </a>
                            <button style="flex:1;display:flex;align-items:center;justify-content:center;gap:5px;
                                           padding:7px 0;border-radius:8px;background:${color};color:#fff;
                                           font-size:0.78rem;font-weight:700;border:none;cursor:pointer;">
                                <i class="fa-solid fa-paper-plane"></i> Enquire
                            </button>
                        </div>
                    </div>`;
                }

                // ── Pagination renderer ────────────────────────────────────────────
                function renderPagination(total, page) {
                    const totalPages = Math.ceil(total / LIMIT);
                    if (totalPages <= 1) { paginationBar.innerHTML = ''; return; }

                    const btn = (label, pg, active, disabled) => `
                        <button onclick="window.loadProfilePage(${pg})" ${disabled ? 'disabled' : ''}
                            style="padding:8px 14px;border-radius:8px;border:2px solid ${active ? '#2563eb' : '#e2e8f0'};
                                   background:${active ? '#2563eb' : '#fff'};color:${active ? '#fff' : '#374151'};
                                   font-weight:700;font-size:0.85rem;cursor:${disabled || active ? 'default' : 'pointer'};
                                   opacity:${disabled ? 0.4 : 1};transition:all .15s;">
                            ${label}
                        </button>`;

                    let start = Math.max(1, page - 2);
                    let end = Math.min(totalPages, start + 4);
                    if (end - start < 4) start = Math.max(1, end - 4);

                    let html = btn('&#8592; Prev', page - 1, false, page === 1);
                    if (start > 1) html += btn('1', 1, false, false) + '<span style="color:#9ca3af;padding:0 2px;">…</span>';
                    for (let i = start; i <= end; i++) html += btn(i, i, i === page, false);
                    if (end < totalPages) html += '<span style="color:#9ca3af;padding:0 2px;">…</span>' + btn(totalPages, totalPages, false, false);
                    html += btn('Next &#8594;', page + 1, false, page === totalPages);
                    html += `<div style="background:#f1f5f9; color:#475569; padding:8px 16px; border-radius:100px; font-size:0.85rem; font-weight:700; margin-left:15px;">${total.toLocaleString()} profiles</div>`;
                    paginationBar.innerHTML = html;
                }

                // ── Load a page ────────────────────────────────────────────────────
                window.loadProfilePage = async function (page) {
                    if (page < 1) return;
                    currentPage = page;

                    const targetGrids = document.querySelectorAll('.network-grid');
                    const searchInput = document.getElementById('profile-search-text');

                    if (!targetGrids.length) return;

                    const rawSearch = searchInput ? searchInput.value.trim() : '';
                    const qSearch = encodeURIComponent(rawSearch);

                    // Show premium loading state
                    targetGrids.forEach(g => {
                        g.innerHTML = `
                        <div class="loading-box" style="grid-column:1/-1;text-align:center;padding:80px;background:#f8fafc;border-radius:30px;border:2px dashed #cbd5e1;">
                            <i class="fa-solid fa-spinner fa-spin" style="font-size:3rem;color:#2563eb;margin-bottom:20px;"></i>
                            <div style="font-size:1.2rem;font-weight:700;color:#1e293b;">Searching Vitrade Database...</div>
                            <div style="color:#64748b;margin-top:8px;">Finding results for "${rawSearch || 'All'}"</div>
                        </div>`;
                    });

                    try {
                        const queryParams = new URLSearchParams();
                        queryParams.append('page', page);
                        queryParams.append('limit', LIMIT);
                        if (businessType) queryParams.append('type', businessType);
                        if (rawSearch) queryParams.append('search', rawSearch);

                        const apiUrl = `http://127.0.0.1:5001/api/profiles?${queryParams.toString()}`;

                        console.log('%c API CALL ', 'background:#2563eb;color:#fff;padding:2px 5px;', apiUrl);

                        const res = await fetch(apiUrl);
                        if (!res.ok) throw new Error('API unreachable');
                        const data = await res.json();
                        const profiles = data.data || [];
                        const total = data.total || 0;

                        // Inject Results Summary
                        const resultHeader = document.getElementById('search-results-summary') || document.createElement('div');
                        resultHeader.id = 'search-results-summary';
                        resultHeader.style.cssText = 'grid-column:1/-1;margin-bottom:20px;padding:15px 25px;background:#f0f9ff;border-radius:16px;color:#0369a1;font-weight:700;display:flex;align-items:center;gap:15px;border:1px solid #bae6fd;';

                        resultHeader.innerHTML = `
                            <div style="display:flex;align-items:center;gap:10px;flex:1;">
                                <i class="fa-solid fa-database" style="color:#0ea5e9;"></i> 
                                <span>Found ${total.toLocaleString()} ${businessType || 'Business'} results</span>
                                ${rawSearch ? `<span style="color:#64748b;font-weight:400;">matching "<b>${rawSearch}</b>"</span>` : ''}
                            </div>
                        `;

                        if (profiles.length === 0) {
                            targetGrids.forEach(g => g.innerHTML = `
                                <div style="grid-column:1/-1;text-align:center;padding:120px 20px;background:#fff;border-radius:30px;box-shadow:0 10px 40px rgba(0,0,0,0.04);">
                                    <div style="font-size:5rem;margin-bottom:25px;filter:grayscale(1);opacity:0.5;">🏢</div>
                                    <h3 style="font-size:2rem;color:#1e293b;margin-bottom:12px;">No businesses found</h3>
                                    <p style="color:#64748b;max-width:500px;margin:0 auto;line-height:1.7;font-size:1.1rem;">
                                        We couldn't find any <b>${businessType || 'business'}</b> 
                                        matching "<b>${rawSearch}</b>".
                                    </p>
                                    <button onclick="document.getElementById('profile-search-text').value='';window.loadProfilePage(1);" style="margin-top:35px;background:#2563eb;color:white;border:none;padding:14px 40px;border-radius:50px;font-weight:800;cursor:pointer;transition:0.3s;box-shadow:0 10px 20px rgba(37,99,235,0.25);">Reset Search</button>
                                </div>`);
                        } else {
                            // Data-density sorting: Count populated fields (out of 7 core columns)
                            const fields = ['company_name', 'phone', 'email', 'address', 'owner', 'about', 'type'];
                            const getScore = (m) => fields.reduce((acc, f) => {
                                const val = m[f];
                                const isPopulated = val && val.toString().trim().toLowerCase() !== 'nan' && val.toString().trim() !== '';
                                return acc + (isPopulated ? 1 : 0);
                            }, 0);

                            const sortedProfiles = [...profiles].sort((a, b) => {
                                const scoreA = getScore(a);
                                const scoreB = getScore(b);
                                if (scoreB !== scoreA) return scoreB - scoreA;
                                // Secondary sort: Reverse Alphabetical (Z to A)
                                return (b.company_name || '').localeCompare(a.company_name || '');
                            });

                            const html = sortedProfiles.map(renderProfileCard).join('');
                            targetGrids.forEach(g => {
                                g.innerHTML = html;
                                g.prepend(resultHeader);
                            });
                        }
                        renderPagination(total, page);
                    } catch (e) {
                        console.error('Vitrade Search Error:', e);
                        targetGrids.forEach(g => g.innerHTML = `
                            <div style="grid-column:1/-1;text-align:center;padding:80px;background:#fef2f2;color:#991b1b;border-radius:30px;border:1px solid #fecaca;">
                                <i class="fa-solid fa-server" style="font-size:3rem;margin-bottom:20px;"></i>
                                <div style="font-weight:800;font-size:1.5rem;">Connection Failed</div>
                                <div style="margin-top:15px;font-size:1.1rem;">The search bar is ready, but your backend server (port 5001) is not responding.</div>
                                <div style="margin-top:10px;background:#fff;display:inline-block;padding:8px 20px;border-radius:10px;font-family:monospace;font-size:0.9rem;border:1px solid #fca5a5;">Run: node admin_server.js</div>
                            </div>`);
                    }
                };

                // Inject Simplified Master Search Bar
                if (!document.getElementById('profile-top-search') && networkGrids.length > 0) {
                    const searchBar = document.createElement('div');
                    searchBar.id = 'profile-top-search';
                    searchBar.innerHTML = `
                        <div style="background: white; padding: 12px 20px; border-radius: 60px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 15px; margin: 0 auto 50px auto; max-width: 800px; border: 1px solid #f1f5f9; transition: 0.3s; border: 2px solid #eff6ff;">
                            <div style="flex: 1; display: flex; align-items: center; gap: 15px; padding: 0 10px;">
                                <i class="fa-solid fa-magnifying-glass" style="color: #2563eb; font-size: 1.2rem;"></i>
                                <input type="text" id="profile-search-text" placeholder="Search by company, product or city..." style="border: none; outline: none; width: 100%; font-size: 1.1rem; font-family: inherit; color:#1e293b; background:transparent; font-weight: 500;">
                            </div>
                            <button id="profile-filter-submit" style="background: #2563eb; color: white; border: none; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(37,99,235,0.3);">
                                <i class="fa-solid fa-arrow-right" style="font-size: 1.2rem;"></i>
                            </button>
                        </div>
                    `;
                    networkGrids[0].parentNode.insertBefore(searchBar, networkGrids[0]);

                    const btn = document.getElementById('profile-filter-submit');
                    const inp = document.getElementById('profile-search-text');

                    if (btn) btn.addEventListener('click', () => window.loadProfilePage(1));
                    if (inp) {
                        inp.addEventListener('keypress', (e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                window.loadProfilePage(1);
                            }
                        });
                        let typingTimer;
                        inp.addEventListener('input', () => {
                            clearTimeout(typingTimer);
                            typingTimer = setTimeout(() => window.loadProfilePage(1), 600);
                        });
                    }
                }

                // Initial load
                window.loadProfilePage(1);
            }
        } catch (err) {
            console.error('Profiles sync error:', err);
        }
    }

    // TEMPORARY SEEDING SCRIPT for Dealers, Retailers, Distributors
    const typesToSeed = ['Dealer', 'Retailer', 'Distributor'];
    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Ahmedabad', 'Pune'];
    const profilesToSeed = [];
    let idCounter = 99000;
    typesToSeed.forEach(type => {
        for (let i = 1; i <= 6; i++) {
            const city = cities[i % cities.length];
            profilesToSeed.push({
                id: (idCounter++).toString(),
                company_name: `${city} ${type}s Network ${i}`,
                owner_name: `Owner Name ${i}`,
                email_address: `contact${i}@${city.toLowerCase()}${type.toLowerCase()}s.com`,
                mobile_number: `+91 98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
                whatsapp_number: `+91 98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
                company_address: `${Math.floor(Math.random() * 100)}, Industrial Area, ${city}, India`,
                about_company: `Leading ${type} in ${city} region specializing in premium stainless steel and hotelware products. Providing bulk supply and B2B services.`,
                profile_type: type,
                status: 'active',
                website: `www.${city.toLowerCase()}${type.toLowerCase()}s.com`
            });
        }
    });

    const isTargetPage = ['dealers', 'retailers', 'distributors'].some(p => window.location.pathname.toLowerCase().includes(p));
    if (isTargetPage && !localStorage.getItem('profiles_seeded_v1')) {
        console.log('Seeding profile data via API...');
        fetch('http://localhost:5001/api/profiles/bulk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profiles: profilesToSeed })
        }).then(res => res.json()).then(data => {
            console.log('Seeding success:', data);
            localStorage.setItem('profiles_seeded_v1', 'true');
            // Reload the grid
            setTimeout(() => window.location.reload(), 1000);
        }).catch(err => console.error('Seeding failed:', err));
    }



    // Run after a short delay so sidebar_filter.js has already
    // moved .network-grid into its final DOM position
    setTimeout(syncDatabaseToFrontend, 600);

    // --- Interactive Category Arc Navigator (HORIZON RE-ENGINEERED) ---
    function initArcNavigator() {
        const arcContainer = document.getElementById('category-arc');
        if (!arcContainer) return;

        const items = Array.from(arcContainer.querySelectorAll('.arc-item'));
        const nextBtn = document.getElementById('category-cycle-btn');
        const activeName = document.getElementById('active-cat-name');
        const activeDesc = document.getElementById('active-cat-desc');
        const activeLink = document.getElementById('active-cat-link');
        const dynamicGrid = document.getElementById('home-dynamic-cat-grid');

        let currentIndex = 0;
        const totalItems = items.length;
        const radius = 850; // Large radius for a majestic horizon curve

        function updateArcPositions(animate = false) {
            // Horizon Curve: icons form an upward-opening arc (top of a circle with center below)
            // Centered at 90 degrees (top of unit circle)
            const startAngle = 120; // Left side
            const endAngle = 60;   // Right side (clockwise order for next button)
            const step = (endAngle - startAngle) / (totalItems - 1);

            items.forEach((item, index) => {
                const angle = startAngle + (step * index);
                const radian = angle * (Math.PI / 180);

                // x = r * cos, y = r * sin
                const x = radius * Math.cos(radian);
                const y = radius * Math.sin(radian);

                // Center is below, so we subtract Y from the radius to bring it to top
                // targetY will be relative to the bottom center
                const targetX = `calc(50% + ${x}px - 75px)`;
                const targetY = `calc(100% - ${y}px - 75px)`;

                if (animate && window.gsap) {
                    gsap.to(item, {
                        left: targetX,
                        top: targetY,
                        rotation: 0, // Icons always upright
                        scale: index === currentIndex ? 1.2 : 0.85,
                        opacity: 1,
                        duration: 1.2,
                        ease: "expo.out"
                    });
                } else {
                    item.style.left = targetX;
                    item.style.top = targetY;
                    item.style.transform = `scale(${index === currentIndex ? 1.2 : 0.85})`;
                    item.style.opacity = '1';
                }

                item.classList.toggle('active', index === currentIndex);
            });
        }

        async function switchCategory(index) {
            if (index < 0) index = totalItems - 1;
            if (index >= totalItems) index = 0;
            currentIndex = index;

            const activeItem = items[currentIndex];
            const catId = activeItem.dataset.cat;
            const title = activeItem.dataset.title;
            const desc = activeItem.dataset.desc;
            const link = activeItem.dataset.link;

            updateArcPositions(true);

            if (window.gsap) {
                const tl = gsap.timeline();
                tl.to([activeName, activeDesc], { y: 20, opacity: 0, duration: 0.35, ease: "power2.in" })
                    .call(() => {
                        activeName.textContent = title;
                        activeDesc.textContent = desc;
                        if (activeLink) activeLink.href = link;
                    })
                    .to([activeName, activeDesc], { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "expo.out" });
            }

            if (dynamicGrid) {
                gsap.to(dynamicGrid, { opacity: 0, y: 30, duration: 0.4 });
                try {
                    const res = await fetch(`http://localhost:5001/api/products?categoryId=${catId}&limit=5`);
                    if (res.ok) {
                        const data = await res.json();
                        const products = data.data || [];

                        // Register in Global products for the modal system
                        if (!window.GLOBAL_PRODUCTS) window.GLOBAL_PRODUCTS = {};
                        products.forEach(p => {
                            // Map DB product to the format expected by modal_system.js
                            window.GLOBAL_PRODUCTS[p.id] = {
                                id: p.id,
                                title: p.title,
                                img: p.image ? `http://localhost:5001/${p.image}` : 'images/placeholder_product.png',
                                price: p.price || "Contact for price",
                                unit: p.unit || "piece",
                                specs: p.specifications || [],
                                specsTable: [
                                    { label: 'Category', val: p.category_name || 'Kitchenware' },
                                    { label: 'Brand', val: p.brand_name || 'Generic' },
                                    { label: 'Origin', val: p.location_name || 'India' }
                                ],
                                company: {
                                    name: p.profile_name || "IndiaTrade Manufacturer",
                                    logo: p.profile_logo ? `http://localhost:5001/${p.profile_logo}` : null,
                                    phone: p.profile_phone,
                                    email: p.profile_email,
                                    website: p.profile_website,
                                    about: p.profile_description
                                }
                            };
                        });

                        if (typeof getHomeCatProductCardHtml === 'function') {
                            const productsHtml = products.map(p => getHomeCatProductCardHtml(p)).join('');
                            dynamicGrid.innerHTML = productsHtml;
                            
                            // AUTO-SCROLL TO PRODUCTS
                            setTimeout(() => {
                                dynamicGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 500);

                            // Notification for the user
                            const notify = document.createElement('div');
                            notify.id = "cat-load-notify";
                            notify.innerHTML = `
                                <div style="position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px); background: #0A2540; color: white; padding: 12px 25px; border-radius: 50px; font-weight: 700; box-shadow: 0 10px 30px rgba(10,37,64,0.4); display: flex; align-items: center; gap: 10px; z-index: 10000; transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                                    <i class="fa-solid fa-chevron-down fa-bounce"></i>
                                    <span>Viewing ${title} Collection</span>
                                </div>
                            `;
                            document.body.appendChild(notify);
                            
                            setTimeout(() => {
                                notify.firstElementChild.style.transform = 'translateX(-50%) translateY(0)';
                            }, 100);

                            setTimeout(() => {
                                notify.firstElementChild.style.transform = 'translateX(-50%) translateY(100px)';
                                setTimeout(() => notify.remove(), 600);
                            }, 3500);

                            // Custom 'Pop and Stagger' Entrance Animation
                            gsap.fromTo("#home-dynamic-cat-grid .elite-home-card",
                                {
                                    opacity: 0,
                                    y: 60,
                                    scale: 0.8,
                                    rotation: (i) => i % 2 === 0 ? -3 : 3
                                },
                                {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    rotation: 0,
                                    stagger: {
                                        each: 0.1,
                                        from: "center"
                                    },
                                    duration: 1,
                                    ease: "back.out(1.5)",
                                    delay: 0.1
                                }
                            );
                        }
                    }
                } catch (err) { }
                gsap.to(dynamicGrid, { opacity: 1, y: 0, duration: 0.5, delay: 0.3 });
            }
        }

        items.forEach((item, index) => {
            item.onclick = () => switchCategory(index);
        });

        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.preventDefault();
                gsap.to(nextBtn, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
                switchCategory(currentIndex + 1);
            };
        }

        updateArcPositions(false);
        switchCategory(0);
    }

    if (document.getElementById('category-arc')) {
        setTimeout(initArcNavigator, 1000);
    }

    // Helper for robust image resolution
    function getFullImageUrl(path) {
        if (!path) return null;
        if (path.startsWith('http')) return path;

        // Ensure path starts with / for consistency
        const normalizedPath = path.startsWith('/') ? path : '/' + path;

        // If it already has /public, just prepend the server
        if (normalizedPath.startsWith('/public/')) {
            return `http://localhost:5001${normalizedPath}`;
        }

        // Otherwise assume it needs /public/ prefix for assets in admin/public
        return `http://localhost:5001/public${normalizedPath}`;
    }

    let globalBlogs = [];

    const blogGrid = document.getElementById('blog-grid-dynamic');
    if (blogGrid) {
        async function loadBlogs() {
            try {
                // Fetch ALL blogs — no artificial limit
                const response = await fetch(`http://localhost:5001/api/blogs?limit=100&_t=${Date.now()}`);
                if (!response.ok) throw new Error('Failed to fetch blogs');

                const result = await response.json();
                const blogs = result.data || [];
                globalBlogs = blogs;
                console.log(`[Blog] Fetched ${blogs.length} posts from DB`);
                console.table(blogs.map(b => ({ id: b.id, title: b.title, status: b.status })));

                // Visual debug for the user
                const badge = document.createElement('div');
                badge.style.cssText = 'position:absolute; top:-60px; right:0; background:#0A2540; color:white; padding:6px 15px; border-radius:20px; font-size:0.75rem; font-weight:800; z-index:100; box-shadow:0 10px 30px rgba(0,0,0,0.3); border:2px solid #F26B43;';
                badge.innerHTML = `<i class="fa-solid fa-database"></i> DB: ${blogs.length} ARTICLES | IDs: ${blogs.map(b => b.id).join(', ')} | SYNC: ACTIVE`;
                blogGrid.parentElement.style.position = 'relative';
                blogGrid.parentElement.appendChild(badge);

                if (blogs.length === 0) {
                    blogGrid.innerHTML = '<div style="text-align:center;padding:80px 20px;color:#64748b;width:400px;"><i class="fa-solid fa-newspaper" style="font-size:3rem;margin-bottom:15px;display:block;opacity:0.3;"></i>No blog posts yet. Check back later!</div>';
                    return;
                }

                // ALL blogs go into the slider — duplicate for infinite loop effect
                const displayBlogs = [...blogs, ...blogs];

                const localPool = [
                    'images/blog_kitchenware_export.png',
                    'images/blog_horeca_market.png',
                    'images/blog_quality_control.png',
                    'images/blog_steel_mfg.png',
                    'images/blog_supply_chain.png',
                    'images/blog_trade_compliance.png'
                ];

                blogGrid.innerHTML = displayBlogs.map((blog, idx) => {
                    const date = new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const dbPath = blog.image || blog.image_path;
                    const dbImage = getFullImageUrl(dbPath);
                    const finalImageUrl = dbImage || localPool[idx % localPool.length];

                    return `
                        <article class="modern-blog-slider-card" onclick="openBlogModal('${blog.id}')" style="cursor:pointer;">
                            <div class="blog-slider-img">
                                <img src="${finalImageUrl}" alt="${blog.title}" loading="lazy" onerror="this.src='images/blog_banner.png'">
                            </div>
                            <div class="blog-slider-content">
                                <span class="blog-slider-category">${blog.category || 'General'}</span>
                                <h3>${blog.title}</h3>
                                <div class="blog-slider-meta">
                                    <span><i class="fa-regular fa-calendar"></i> ${date}</span>
                                    <span><i class="fa-regular fa-user"></i> ${blog.author || 'Admin'}</span>
                                </div>
                            </div>
                        </article>
                    `;
                }).join('');

                initBlogSlider();

            } catch (err) {
                console.error('[Blog] Error loading blogs:', err);
                blogGrid.innerHTML = '<div style="text-align:center;padding:80px 20px;color:#ef4444;width:400px;"><i class="fa-solid fa-triangle-exclamation" style="font-size:3rem;margin-bottom:15px;display:block;"></i>Could not connect to server.</div>';
            }
        }

        // Global Modal Functions
        window.openBlogModal = function (id) {
            const blog = globalBlogs.find(b => b.id.toString() === id.toString());
            if (!blog) return;

            const overlay = document.getElementById('blog-modal-overlay');
            const img = document.getElementById('modal-blog-img');
            const category = document.getElementById('modal-blog-category');
            const title = document.getElementById('modal-blog-title');
            const date = document.getElementById('modal-blog-date');
            const author = document.getElementById('modal-blog-author');
            const content = document.getElementById('modal-blog-content');

            if (overlay) {
                img.src = getFullImageUrl(blog.image || blog.image_path) || 'images/blog_banner.png';
                category.innerText = blog.category || 'General';
                title.innerText = blog.title;
                date.innerText = new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                author.innerText = blog.author || 'Admin';
                content.innerHTML = blog.content || '<p>No content available for this article.</p>';

                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeBlogModal = function () {
            const overlay = document.getElementById('blog-modal-overlay');
            if (overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        // Close on overlay click
        document.getElementById('blog-modal-overlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'blog-modal-overlay') closeBlogModal();
        });
        document.getElementById('blog-modal-close')?.addEventListener('click', closeBlogModal);

        function initBlogSlider() {
            const track = document.getElementById('blog-grid-dynamic');
            if (!track) return;
            
            // Wait a tiny bit for layout
            setTimeout(() => {
                const cards = track.querySelectorAll('.modern-blog-slider-card');
                if (cards.length === 0) return;
                
                // Calculate EXACT half width based on children
                const halfCount = Math.floor(cards.length / 2);
                let scrollWidth = 0;
                for(let i=0; i<halfCount; i++) {
                    scrollWidth += cards[i].offsetWidth + 28; // card width + gap
                }
                
                if (scrollWidth === 0) scrollWidth = track.scrollWidth / 2;

                let currentX = 0;
                let isPaused = false;
                let speed = 0.8; 

                function animate() {
                    if (!isPaused) {
                        currentX -= speed;
                        if (Math.abs(currentX) >= scrollWidth) currentX = 0;
                        gsap.set(track, { x: currentX });
                    }
                    requestAnimationFrame(animate);
                }
                animate();
                document.getElementById('blog-prev')?.addEventListener('click', () => {
                    currentX += 320;
                    if (currentX > 0) currentX = -scrollWidth + 320;
                    gsap.to(track, { x: currentX, duration: 0.5 });
                });
                document.getElementById('blog-next')?.addEventListener('click', () => {
                    currentX -= 320;
                    if (Math.abs(currentX) >= scrollWidth) currentX = 0;
                    gsap.to(track, { x: currentX, duration: 0.5 });
                });
                const pauseBtn = document.getElementById('blog-pause');
                pauseBtn?.addEventListener('click', () => {
                    isPaused = !isPaused;
                    pauseBtn.innerHTML = isPaused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>';
                });
                track.addEventListener('mouseenter', () => isPaused = true);
                track.addEventListener('mouseleave', () => { if (document.querySelector('#blog-pause i')?.classList.contains('fa-pause')) isPaused = false; });
            }, 100);
        }
        loadBlogs();
    }
});



