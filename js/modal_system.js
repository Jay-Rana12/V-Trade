// js/modal_system.js
// Centralized Modal Management for GlobalTrade India

const MODAL_HTML = `
    <!-- ════════ CENTERED PREMIUM PRODUCT MODAL ════════ -->
    <div class="pd-overlay" id="pd-overlay" onclick="handleOverlayClick(event)">
        <div class="pd-modal" id="pd-modal">
            <button class="pd-close" onclick="closeModal()" title="Close"><i class="fa-solid fa-xmark"></i></button>
            <div class="pd-columns">
                <!-- LEFT: Image + CTAs -->
                <div class="pd-left-panel">
                    <div class="pd-img-container">
                        <!-- zoom btn removed -->
                        <!-- <button class="pd-img-inquiry-btn" onclick="sendProductEnquiry('bulk')">
                            <i class="fa-solid fa-paper-plane"></i> Quick Enquiry
                        </button> -->
                        <img id="pd-img" src="" alt="">
                    </div>
                    <div class="pd-left-cta">
                        <button id="btn-send-enquiry" class="pd-inquiry-btn" onclick="sendProductEnquiry('bulk')">
                            PRODUCT INQUIRY
                        </button>
                        <button class="pd-icon-btn whatsapp" onclick="openWhatsApp()">
                            <i class="fa-brands fa-whatsapp"></i>
                        </button>
                        <button id="btn-request-sample" class="pd-icon-btn email" onclick="sendProductEnquiry('sample')">
                            <i class="fa-solid fa-envelope"></i>
                        </button>
                        <button class="pd-icon-btn phone" onclick="openPhone()">
                            <i class="fa-solid fa-phone"></i>
                        </button>
                    </div>
                </div>

                <!-- RIGHT: Info + Tabs -->
                <div class="pd-info-panel">
                    <div class="pd-company-row">
                        <div class="pd-company-logo" id="pd-co-initials">IT</div>
                        <div class="pd-company-name-text" id="pd-co-name">INDIATRADE</div>
                    </div>
                    
                    <div class="pd-new-title" id="pd-title">Loading Product...</div>
                    <div class="pd-badge-strip" id="pd-badge-strip"></div>
                    <div class="pd-spec-table" id="pd-spec-table"></div>

                    <div class="pd-tabs">
                        <div class="pd-tab-nav">
                            <button class="pd-tab-btn active" onclick="handleTabSwitch(this,'pd-tab-company')">COMPANY DETAIL</button>
                            <button class="pd-tab-btn" onclick="handleTabSwitch(this,'pd-tab-spec')">SPECIFICATION</button>
                            <button class="pd-tab-btn" onclick="handleTabSwitch(this,'pd-tab-desc')">DESCRIPTION</button>
                            <button class="pd-tab-btn" onclick="handleTabSwitch(this,'pd-tab-notes')">NOTES</button>
                        </div>

                        <div class="pd-tab-pane active" id="pd-tab-company">
                            <div class="pd-co-card">
                                <h4 id="co-tab-name">Gupta Iron & Steel Co.</h4>
                                <p><i class="fa-solid fa-phone"></i> <strong>Phone:</strong> <span id="co-tab-phone">8048959476</span></p>
                                <p><i class="fa-solid fa-envelope"></i> <strong>Email:</strong> <span id="co-tab-email">vibrantindiatech515@gmail.com</span></p>
                                <p><i class="fa-solid fa-location-dot"></i> <strong>Address:</strong> <span id="co-tab-address">New Delhi, Delhi, 110028</span></p>
                            </div>
                            <div class="pd-co-card">
                                <div class="pd-label-small"><i class="fa-solid fa-building"></i> About Company</div>
                                <h4 id="co-tab-about-name">Gupta Iron & Steel Co.</h4>
                                <div class="pd-co-about" id="co-tab-about">Leading manufacturer of industrial items...</div>
                                <a href="#" target="_blank" class="pd-website-btn" id="pd-website-link">
                                    <i class="fa-solid fa-globe"></i> <span id="pd-website-text">www.vibrantindiatrade.com</span>
                                </a>
                            </div>
                        </div>

                        <div class="pd-tab-pane" id="pd-tab-spec">
                            <div class="pd-co-card">
                                <div id="pd-full-specs"></div>
                            </div>
                        </div>

                        <div class="pd-tab-pane" id="pd-tab-desc">
                            <div class="pd-co-card">
                                <div class="pd-co-about" id="pd-description"></div>
                            </div>
                        </div>

                        <div class="pd-tab-pane" id="pd-tab-notes">
                            <div class="pd-co-card">
                                <div id="pd-certs-tab"></div>
                                <div id="pd-exports-tab" style="margin-top:20px;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Moved: Related Products Section inside info panel to allow sticky left -->
                    <div class="pd-related-section">
                        <div class="pd-related-header">
                            <div class="pd-related-title">People also viewed</div>
                        </div>
                        <div class="pd-related-grid" id="pd-related-grid">
                            <!-- Dynamic Related Cards -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Global Enquiry Toast -->
    <div id="enquiry-toast" class="pd-toast">
        <span id="enquiry-toast-icon"></span>
        <span id="enquiry-toast-msg"></span>
    </div>

    <!-- Centered Success Popup Overlay -->
    <div class="success-popup-overlay" id="success-popup-overlay">
        <div class="success-popup-card">
            <div class="success-icon-container">
                <i class="fa-solid fa-check"></i>
            </div>
            <h2 id="success-popup-title">Inquiry Sent!</h2>
            <p id="success-popup-msg">Your inquiry has been successfully sent to the supplier. They will contact you shortly.</p>
            <button class="success-close-btn" onclick="closeSuccessPopup()">Great!</button>
        </div>
    </div>
`;

let currentProductId = null;
let autoScrollInterval = null;

function startRelatedAutoScroll() {
    const grid = document.getElementById('pd-related-grid');
    if (!grid) return;
    
    clearInterval(autoScrollInterval);
    
    // Auto scroll every 12ms
    autoScrollInterval = setInterval(() => {
        if (grid.matches(':hover')) return; // Pause on hover
        
        grid.scrollLeft += 2;
        // Reset if reached the end
        if (grid.scrollLeft >= (grid.scrollWidth - grid.clientWidth - 1)) {
            grid.scrollLeft = 0;
        }
    }, 12);
}

function stopRelatedAutoScroll() {
    clearInterval(autoScrollInterval);
}

function initModalSystem() {
    // Inject Modal HTML if not present
    if (!document.getElementById('pd-overlay')) {
        document.body.insertAdjacentHTML('beforeend', MODAL_HTML);
    }
}

function handleTabSwitch(btn, paneId) {
    document.querySelectorAll('.pd-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.pd-tab-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById(paneId);
    if (target) target.classList.add('active');
}

window.openModal = function(id) {
    initModalSystem();
    
    // Check all potential global product stores
    const products = window.GLOBAL_PRODUCTS || window.ALL_PRODUCTS || window.PRODUCTS || {};
    const p = products[id];
    
    if (!p) {
        console.warn("Product not found in GLOBAL_PRODUCTS, checking ALL_PRODUCTS/PRODUCTS directly...");
        // Fallback for some legacy setups
        const fallback = (typeof GLOBAL_PRODUCTS !== 'undefined' ? GLOBAL_PRODUCTS : (typeof ALL_PRODUCTS !== 'undefined' ? ALL_PRODUCTS : (typeof PRODUCTS !== 'undefined' ? PRODUCTS : {})));
        const p2 = fallback[id];
        if (!p2) {
            console.error("Modal Product not found! ID:", id);
            return;
        }
        window.openModalWithData(p2, id);
        return;
    }
    
    window.openModalWithData(p, id);
};

// Refactored helper to avoid code duplication
window.openModalWithData = function(p, id) {
    currentProductId = id;

    // Core Info
    document.getElementById('pd-img').src = p.img;
    
    const initialsEl = document.getElementById('pd-co-initials');
    if (p.company.logo) {
        initialsEl.innerHTML = `<img src="${p.company.logo}" alt="Logo" style="width:100%; height:100%; object-fit:contain; border-radius:10px;">`;
        initialsEl.style.background = '#ffffff';
        initialsEl.style.border = '1px solid #f1f5f9';
    } else {
        initialsEl.textContent = p.company.initials || 'IT';
        initialsEl.style.background = ''; 
        initialsEl.style.border = '';
    }

    const coNameElements = document.querySelectorAll('#pd-co-name, #co-tab-name, #co-tab-about-name');
    coNameElements.forEach(el => el.textContent = p.company.name);

    document.getElementById('pd-title').textContent = p.title;

    // Badges (Using specific colors from screenshot)
    const badgeContainer = document.getElementById('pd-badge-strip');
    if (badgeContainer) {
        badgeContainer.innerHTML = [
            { text: `⭐ ${p.rating || '4.5'} Rating`, cls: 'blue' },
            { text: `🛒 ${p.orders || '200+'} Orders`, cls: 'red' },
            { text: `🛡 ${p.warranty || '1 Year'} Warranty`, cls: 'green' }
        ].map(b => `<span class="pd-strip-badge ${b.cls}">${b.text}</span>`).join('');
    }

    // Spec Grid (3 columns)
    const specTable = document.getElementById('pd-spec-table');
    if (specTable) {
        specTable.innerHTML = (p.specsTable || []).map(s => `
            <div class="pd-st-cell">
                <div class="pd-st-label">${s.label}</div>
                <div class="pd-st-val">${s.val}</div>
            </div>
        `).join('');
    }

    // Tabs - Company
    document.getElementById('co-tab-phone').textContent = p.company.phone || '8048959476';
    document.getElementById('co-tab-email').textContent = p.company.email || 'vibrantindiatech515@gmail.com';
    document.getElementById('co-tab-address').textContent = p.company.address || 'New Delhi, Delhi, 110028';
    document.getElementById('co-tab-about').textContent = p.company.about || 'Manufacturer of premium grade industrial items and steel structures.';
    
    // Website Link
    const websiteLink = document.getElementById('pd-website-link');
    const websiteText = document.getElementById('pd-website-text');
    const website = p.company.website || 'www.vibrantindiatrade.com';
    websiteLink.href = website.startsWith('http') ? website : `https://${website}`;
    websiteText.textContent = website;

    // Tabs - Detailed Specs
    const fullSpecs = document.getElementById('pd-full-specs');
    if (fullSpecs) {
        fullSpecs.innerHTML = (p.specs || []).map(s => `
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #f1f5f9; font-size:.85rem;">
                <span style="color:#64748b; font-weight:600;">${s.key}</span>
                <span style="color:#0f172a; font-weight:700;">${s.val}</span>
            </div>
        `).join('');
    }

    // Tabs - Description
    document.getElementById('pd-description').textContent = p.description || p.title;

    // Tabs - Notes (Certs & Exports)
    const certsTab = document.getElementById('pd-certs-tab');
    if (certsTab) {
        const notesHtml = p.additionalNotes ? `
            <div style="background:#fffbeb;border:1px solid #fef3c7;border-radius:10px;padding:14px 16px;margin-bottom:16px;">
                <div class="pd-label-small" style="margin-bottom:8px;"><i class="fa-solid fa-note-sticky"></i> Product Notes</div>
                <p style="font-size:.85rem;color:#374151;line-height:1.6;margin:0;">${p.additionalNotes}</p>
            </div>` : '';
        certsTab.innerHTML = notesHtml + '<div class="pd-label-small"><i class="fa-solid fa-certificate"></i> Certifications</div>' + (p.certs || []).map(c => `
            <span style="display:inline-flex; align-items:center; gap:5px; background:#f0fdf4; border:1px solid #dcfce7; border-radius:20px; padding:4px 12px; font-size:.75rem; font-weight:700; color:#166534; margin:3px;">
                <i class="fa-solid fa-circle-check"></i> ${c}
            </span>
        `).join('');
    }
    const exportsTab = document.getElementById('pd-exports-tab');
    if (exportsTab) {
        exportsTab.innerHTML = '<div class="pd-label-small">Export Destinations</div>' + (p.exports || []).map(e => `
            <span style="display:inline-flex; align-items:center; gap:5px; background:#eff6ff; border:1px solid #dbeafe; border-radius:20px; padding:4px 12px; font-size:.75rem; font-weight:600; color:#1e40af; margin:3px;">
                <i class="fa-solid fa-plane-departure"></i> ${e}
            </span>
        `).join('');
    }

    // Related Products Logic
    const relatedGrid = document.getElementById('pd-related-grid');
    if (relatedGrid) {
        const products = window.GLOBAL_PRODUCTS || window.ALL_PRODUCTS || window.PRODUCTS || {};
        const cat = p.category;
        const related = Object.keys(products)
            .filter(key => key !== id && products[key].category === cat)
            .slice(0, 5); // Show top 5
        
        if (related.length > 0) {
            relatedGrid.innerHTML = related.map(key => {
                const rp = products[key];
                const rLogo = rp.company.logo ? `
                    <div style="position:absolute; top:8px; right:8px; width:28px; height:28px; background:white; border-radius:6px; padding:3px; box-shadow:0 2px 8px rgba(0,0,0,0.1); display:flex; align-items:center; justify-content:center;">
                        <img src="${rp.company.logo}" style="max-width:100%; max-height:100%; object-fit:contain;">
                    </div>
                ` : '';
                return `
                    <div class="pd-related-card" onclick="openModal('${key}')" style="position:relative;">
                        <img src="${rp.img}" class="pd-related-img" alt="${rp.title}">
                        ${rLogo}
                        <div class="pd-related-name">${rp.title}</div>
                    </div>
                `;
            }).join('');
            document.querySelector('.pd-related-section').style.display = 'block';
            setTimeout(startRelatedAutoScroll, 500); // Start scroll after modal opens
        } else {
            document.querySelector('.pd-related-section').style.display = 'none';
        }
    }

    // Reset Tabs to first one
    document.querySelectorAll('.pd-tab-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
    document.querySelectorAll('.pd-tab-pane').forEach((pane, i) => pane.classList.toggle('active', i === 0));

    // Show Modal
    const overlay = document.getElementById('pd-overlay');
    const infoPanel = document.querySelector('.pd-info-panel');
    if (overlay) overlay.classList.add('open');
    if (infoPanel) infoPanel.scrollTop = 0; 
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    stopRelatedAutoScroll();
    const overlay = document.getElementById('pd-overlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
}

function handleOverlayClick(e) {
    if (e.target.id === 'pd-overlay') closeModal();
    if (e.target.id === 'success-popup-overlay') closeSuccessPopup();
}

function showSuccessPopup(title, msg) {
    const overlay = document.getElementById('success-popup-overlay');
    if (!overlay) return;
    
    document.getElementById('success-popup-title').textContent = title;
    document.getElementById('success-popup-msg').textContent = msg;
    
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeSuccessPopup() {
    const overlay = document.getElementById('success-popup-overlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
}

function openWhatsApp() {
    const products = typeof ALL_PRODUCTS !== 'undefined' ? ALL_PRODUCTS : (typeof PRODUCTS !== 'undefined' ? PRODUCTS : {});
    const p = products[currentProductId];
    const phone = (p && p.company && p.company.phone) ? p.company.phone.replace(/\D/g, '') : '919137207026';
    const text = encodeURIComponent(`Hello, I am interested in "${p ? p.title : 'your products'}" from website.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

function openPhone() {
    const products = typeof ALL_PRODUCTS !== 'undefined' ? ALL_PRODUCTS : (typeof PRODUCTS !== 'undefined' ? PRODUCTS : {});
    const p = products[currentProductId];
    const phone = (p && p.company && p.company.phone) ? p.company.phone : '+91 91372 07026';
    window.open(`tel:${phone}`);
}

function showEnquiryToast(msg, type = 'success') {
    const toast = document.getElementById('enquiry-toast');
    if (!toast) return;
    const icon = document.getElementById('enquiry-toast-icon');
    
    icon.innerHTML = type === 'success' ? '<i class="fa-solid fa-circle-check" style="color:#10b981;"></i>' : '<i class="fa-solid fa-circle-exclamation" style="color:#f43f5e;"></i>';
    document.getElementById('enquiry-toast-msg').textContent = msg;
    
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

function sendProductEnquiry(type, targetBtnElement = null) {

    const products = typeof GLOBAL_PRODUCTS !== 'undefined' ? GLOBAL_PRODUCTS : (typeof ALL_PRODUCTS !== 'undefined' ? ALL_PRODUCTS : (typeof PRODUCTS !== 'undefined' ? PRODUCTS : {}));
    const p = products[currentProductId];
    if (!p) {
        console.error("Product not found! ID:", currentProductId);
        return;
    }

    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const DEFAULT_ADMIN_EMAIL = 'vibrantindiatech515@gmail.com';
    const destinationEmail = p.company.email || DEFAULT_ADMIN_EMAIL;
    const enquiryTitle = type === 'bulk' ? 'Bulk Order Inquiry' : 'Sample Request';

    // Map parameters EXACTLY to the Universal Template (template_zh4lufc)
    const params = {
        type_badge: 'Product Enquiry',
        subject_title: `Inquiry for ${p.title}`,
        main_description: `A new business inquiry has been received for the following product from your IndiaTrade catalog.`,
        
        user_name: userProfile.name || 'B2B Client',
        user_email: userProfile.email || 'No email provided',
        user_phone: userProfile.phone || 'N/A',
        
        product_name: p.title,
        product_price: p.price || "Contact for Price",
        enquiry_type: enquiryTitle,
        
        message_content: `I am interested in buying this product.\n\n` + 
                         `Product Name: ${p.title}\n` + 
                         `Price: ${p.price}\n` + 
                         `Product Details: ${(p.specs || []).map(s => s.key + ': ' + s.val).join(', ')}\n\n` +
                         `Please contact me regarding this inquiry.`,
        
        otp_display_style: 'display:none;',
        product_display_style: 'display:block;',
        message_display_style: 'display:block;',
        
        action_url: window.location.href,
        action_text: 'View Product Details',
        
        to_name: p.company.name || "IndiaTrade Admin",
        to_email: destinationEmail 
    };

    const ENQUIRY_PUBLIC_KEY = "yswvPmenzubJt3FSC";
    const ENQUIRY_SERVICE_ID = "service_qymzpli";
    const ENQUIRY_TEMPLATE_ID = "template_zh4lufc";

    let btn = targetBtnElement;
    if (!btn) {
        btn = type === 'bulk' ? document.getElementById('btn-send-enquiry') : document.getElementById('btn-request-sample');
    }
    if(!btn) return;
    
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
    btn.disabled = true;

    if (window.emailjs) {
        try {
            emailjs.init({ publicKey: ENQUIRY_PUBLIC_KEY });
        } catch(e) {}
        
        emailjs.send(ENQUIRY_SERVICE_ID, ENQUIRY_TEMPLATE_ID, params)
            .then(() => {
                showSuccessPopup(`${enquiryTitle} Sent!`, `Your inquiry for "${p.title}" has been successfully delivered to the supplier's Gmail. They will contact you shortly.`);
                
                // Show immediate success on the button itself for "fast" feel
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
                btn.style.background = '#10b981';
                btn.style.color = '#fff';

                setTimeout(() => closeModal(), 1500); // Close detail modal after brief success view
            })
            .catch(err => {
                console.error("EmailJS Error:", err);
                showEnquiryToast('Error sending. Check console.', 'error');
            })
            .finally(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
    } else {
        showEnquiryToast('Service currently unavailable.', 'error');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// Global shorthand for sending from any static product card
window.quickEnquiry = function(id, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation(); // Stop the card click from opening the Details modal!
    }

    currentProductId = id;
    sendProductEnquiry('bulk', event ? event.currentTarget : null);
}

// Global listeners
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

// Auto-init on load
document.addEventListener('DOMContentLoaded', initModalSystem);
