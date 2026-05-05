const fs = require('fs');
const path = require('path');

const dir = "c:\\\\Users\\\\AE\\\\OneDrive\\\\Desktop\\\\redesign";
const files = ['services.html', 'products.html', 'gallery.html', 'index.html'];

const oldCss = `        /* ══ NEW PRODUCT DETAIL MODAL ══ */
        .pd-overlay {
            position: fixed;
            inset: 0;
            background: rgba(5, 15, 30, 0.72);
            backdrop-filter: blur(6px);
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            opacity: 0;
            visibility: hidden;
            transition: opacity .35s ease, visibility .35s ease;
        }

        .pd-overlay.open {
            opacity: 1;
            visibility: visible;
        }

        .pd-modal {
            background: #f8fafc;
            border-radius: 18px;
            width: 100%;
            max-width: 980px;
            max-height: 94vh;
            overflow-y: auto;
            box-shadow: 0 30px 80px rgba(0, 0, 0, .38);
            transform: translateY(40px) scale(.97);
            transition: transform .35s cubic-bezier(.23, 1.01, .32, 1);
            scrollbar-width: thin;
            scrollbar-color: #e2e8f0 transparent;
        }

        .pd-overlay.open .pd-modal {
            transform: translateY(0) scale(1);
        }

        .pd-modal::-webkit-scrollbar {
            width: 5px;
        }

        .pd-modal::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 3px;
        }

        .pd-columns {
            display: grid;
            grid-template-columns: 380px 1fr;
            min-height: 460px;
        }

        @media (max-width: 720px) {
            .pd-columns {
                grid-template-columns: 1fr;
            }
        }

        .pd-img-panel {
            position: relative;
            background: #fff;
            border-radius: 18px 0 0 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            border-right: 1px solid #e2e8f0;
        }

        @media (max-width: 720px) {
            .pd-img-panel {
                border-radius: 18px 18px 0 0;
                border-right: none;
                border-bottom: 1px solid #e2e8f0;
            }
        }

        .pd-img-panel img {
            width: 100%;
            max-height: 340px;
            object-fit: contain;
            border-radius: 10px;
        }

        .pd-close {
            position: absolute;
            top: 14px;
            right: 14px;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: rgba(10, 37, 64, .08);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            color: #0A2540;
            transition: all .2s ease;
            z-index: 2;
        }

        .pd-close:hover {
            background: #F26B43;
            color: #fff;
            transform: rotate(90deg);
        }

        .pd-info-panel {
            background: #fff;
            border-radius: 0 18px 18px 0;
            padding: 24px 28px;
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        @media (max-width: 720px) {
            .pd-info-panel {
                border-radius: 0 0 18px 18px;
            }
        }

        .pd-company-row {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .pd-company-logo {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background: #0A2540;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: .75rem;
            color: #F26B43;
            font-family: 'Poppins', sans-serif;
            letter-spacing: .5px;
            flex-shrink: 0;
        }

        .pd-company-name {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            font-size: .8rem;
            color: #0A2540;
        }

        .pd-new-title {
            font-family: 'Poppins', sans-serif;
            font-size: 1.25rem;
            font-weight: 800;
            color: #0A2540;
            line-height: 1.3;
        }

        .pd-badge-strip {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .pd-strip-badge {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 5px 13px;
            border-radius: 20px;
            font-family: 'Poppins', sans-serif;
            font-size: .74rem;
            font-weight: 700;
        }

        .pd-strip-badge.yellow {
            background: #fef9c3;
            color: #92400e;
            border: 1.5px solid #fde68a;
        }

        .pd-strip-badge.red {
            background: #fee2e2;
            color: #b91c1c;
            border: 1.5px solid #fca5a5;
        }

        .pd-strip-badge.green {
            background: #dcfce7;
            color: #15803d;
            border: 1.5px solid #86efac;
        }

        .pd-strip-badge.blue {
            background: #dbeafe;
            color: #1e40af;
            border: 1.5px solid #93c5fd;
        }

        .pd-strip-badge.orange {
            background: #ffedd5;
            color: #c2410c;
            border: 1.5px solid #fdba74;
        }

        .pd-spec-table {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
        }

        @media (max-width: 500px) {
            .pd-spec-table {
                grid-template-columns: 1fr 1fr;
            }
        }

        .pd-st-cell {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 10px 12px;
        }

        .pd-st-label {
            font-family: 'Poppins', sans-serif;
            font-size: .65rem;
            font-weight: 600;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: .4px;
            margin-bottom: 3px;
        }

        .pd-st-val {
            font-family: 'Poppins', sans-serif;
            font-size: .8rem;
            font-weight: 700;
            color: #0A2540;
        }

        .pd-tabs {
            border-top: 1px solid #e2e8f0;
            padding-top: 12px;
        }

        .pd-tab-nav {
            display: flex;
            gap: 0;
            border-bottom: 2px solid #e2e8f0;
            margin-bottom: 14px;
        }

        .pd-tab-btn {
            background: none;
            border: none;
            padding: 8px 14px;
            font-family: 'Poppins', sans-serif;
            font-size: .75rem;
            font-weight: 700;
            color: #94a3b8;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            margin-bottom: -2px;
            transition: color .2s, border-color .2s;
            text-transform: uppercase;
            letter-spacing: .5px;
        }

        .pd-tab-btn.active {
            color: #F26B43;
            border-bottom-color: #F26B43;
        }

        .pd-tab-pane {
            display: none;
        }

        .pd-tab-pane.active {
            display: block;
        }

        .pd-co-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 14px 16px;
            margin-bottom: 10px;
        }

        .pd-co-card h4 {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
            color: #1d4ed8;
            font-size: .9rem;
            margin: 0 0 6px;
        }

        .pd-co-card p {
            font-size: .82rem;
            color: #374151;
            margin: 0 0 3px;
            line-height: 1.6;
        }

        .pd-co-about {
            font-size: .82rem;
            color: #64748b;
            line-height: 1.7;
        }

        .pd-cta-bar {
            background: #fff;
            border-top: 1px solid #e2e8f0;
            padding: 16px 28px;
            border-radius: 0 0 18px 18px;
            display: flex;
            gap: 10px;
            align-items: center;
        }

        @media (max-width: 720px) {
            .pd-cta-bar {
                flex-wrap: wrap;
            }
        }

        .pd-inquiry-btn {
            background: #F5B800;
            color: #0A2540;
            border: none;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            font-weight: 800;
            font-size: .85rem;
            padding: 11px 28px;
            border-radius: 8px;
            letter-spacing: .5px;
            transition: all .25s;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .pd-inquiry-btn:hover {
            background: #e6ac00;
            transform: translateY(-2px);
        }

        .pd-icon-btn {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            transition: all .2s;
        }

        .pd-icon-btn.whatsapp {
            background: #25D366;
            color: #fff;
        }

        .pd-icon-btn.email {
            background: #3b82f6;
            color: #fff;
        }

        .pd-icon-btn.phone {
            background: #F26B43;
            color: #fff;
        }

        .pd-icon-btn:hover {
            transform: translateY(-2px);
            filter: brightness(1.1);
        }`;

const oldHtml = `    <!-- ════════ PRODUCT DETAIL MODAL ════════ -->
    <div class="pd-overlay" id="pd-overlay" onclick="handleOverlayClick(event)">
        <div class="pd-modal" id="pd-modal">
            <div class="pd-columns">
                <div class="pd-img-panel">
                    <button class="pd-close" onclick="closeModal()" title="Close"><i
                            class="fa-solid fa-xmark"></i></button>
                    <img id="pd-img" src="" alt="">
                </div>
                <div class="pd-info-panel">
                    <div class="pd-company-row">
                        <div class="pd-company-logo" id="pd-co-initials">IT</div>
                        <div>
                            <div class="pd-company-name" id="pd-co-name">INDIATRADE</div>
                        </div>
                    </div>
                    <div class="pd-new-title" id="pd-title"></div>
                    <div class="pd-badge-strip" id="pd-badge-strip"></div>
                    <div class="pd-spec-table" id="pd-spec-table"></div>
                    <div class="pd-tabs">
                        <div class="pd-tab-nav">
                            <button class="pd-tab-btn active" onclick="switchTab(this,'pd-tab-company')">Company
                                Detail</button>
                            <button class="pd-tab-btn" onclick="switchTab(this,'pd-tab-spec')">Specification</button>
                            <button class="pd-tab-btn" onclick="switchTab(this,'pd-tab-desc')">Description</button>
                            <button class="pd-tab-btn" onclick="switchTab(this,'pd-tab-notes')">Notes</button>
                        </div>
                        <div class="pd-tab-pane active" id="pd-tab-company">
                            <div class="pd-co-card">
                                <h4 id="co-tab-name"></h4>
                                <p><strong>Phone:</strong> <span id="co-tab-phone"></span></p>
                                <p><strong>Email:</strong> <span id="co-tab-email"></span></p>
                                <p><strong>Address:</strong> <span id="co-tab-address"></span></p>
                            </div>
                            <div class="pd-co-card">
                                <p
                                    style="font-size:.68rem;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;">
                                    &#127968; About Company</p>
                                <h4 id="co-tab-about-name"></h4>
                                <div class="pd-co-about" id="co-tab-about"></div>
                            </div>
                        </div>
                        <div class="pd-tab-pane" id="pd-tab-spec">
                            <div class="pd-co-card">
                                <div id="pd-full-specs"></div>
                            </div>
                        </div>
                        <div class="pd-tab-pane" id="pd-tab-desc">
                            <div class="pd-co-card">
                                <p class="pd-co-about" id="pd-description"></p>
                            </div>
                        </div>
                        <div class="pd-tab-pane" id="pd-tab-notes">
                            <div class="pd-co-card">
                                <div id="pd-certs-tab"></div>
                                <div id="pd-exports-tab" style="margin-top:10px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pd-cta-bar">
                <button id="btn-send-enquiry" class="pd-inquiry-btn" onclick="sendProductEnquiry('bulk')">
                    <i class="fa-solid fa-paper-plane"></i> PRODUCT INQUIRY
                </button>
                <button class="pd-icon-btn whatsapp" title="WhatsApp"
                    onclick="window.open('https://wa.me/919876543210','_blank')"><i
                        class="fa-brands fa-whatsapp"></i></button>
                <button id="btn-request-sample" class="pd-icon-btn email" title="Email Enquiry"
                    onclick="sendProductEnquiry('sample')"><i class="fa-solid fa-envelope"></i></button>
                <button class="pd-icon-btn phone" title="Call Us" onclick="window.open('tel:+919876543210')"><i
                        class="fa-solid fa-phone"></i></button>
            </div>
        </div>
    </div>`;

const oldJs = `        function switchTab(btn, paneId) {
            document.querySelectorAll('.pd-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.pd-tab-pane').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(paneId).classList.add('active');
        }

        function openModal(id) {
            const p = PRODUCTS[id];
            if (!p) return;
            currentProductId = id;

            document.getElementById('pd-img').src = p.img;
            document.getElementById('pd-co-initials').textContent = p.company.initials;
            document.getElementById('pd-co-name').textContent = p.company.name;
            document.getElementById('co-tab-name').textContent = p.company.name;
            document.getElementById('co-tab-phone').textContent = p.company.phone;
            document.getElementById('co-tab-email').textContent = p.company.email || 'vibrantindiatech515@gmail.com';
            document.getElementById('co-tab-address').textContent = p.company.address;
            document.getElementById('co-tab-about-name').textContent = p.company.name;
            document.getElementById('co-tab-about').textContent = p.company.about;
            document.getElementById('pd-title').textContent = p.title;

            document.getElementById('pd-badge-strip').innerHTML = p.badges
                .map(b => \\\`<span class="pd-strip-badge \${b.cls}">\${b.text}</span>\\\`).join('');

            document.getElementById('pd-spec-table').innerHTML = p.specsTable
                .map(s => \\\`<div class="pd-st-cell"><div class="pd-st-label">\${s.label}</div><div class="pd-st-val">\${s.val}</div></div>\\\`).join('');

            document.getElementById('pd-full-specs').innerHTML = p.specs
                .map(s => \\\`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;font-size:.82rem;"><span style="color:#94a3b8;font-weight:600;">\${s.key}</span><span style="color:#0A2540;font-weight:700;">\${s.val}</span></div>\\\`).join('');

            document.getElementById('pd-description').textContent = p.description;

            document.getElementById('pd-certs-tab').innerHTML = '<div style="font-size:.7rem;font-weight:700;color:#94a3b8;letter-spacing:.5px;text-transform:uppercase;margin-bottom:8px;">Certifications</div>' +
                p.certs.map(c => \\\`<span style="display:inline-flex;align-items:center;gap:5px;background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:20px;padding:4px 12px;font-size:.75rem;font-weight:700;color:#15803d;margin:3px;"><i class="fa-solid fa-circle-check"></i>\${c}</span>\\\`).join('');

            document.getElementById('pd-exports-tab').innerHTML = '<div style="font-size:.7rem;font-weight:700;color:#94a3b8;letter-spacing:.5px;text-transform:uppercase;margin-bottom:8px;">Export Destinations</div>' +
                p.exports.map(e => \\\`<span style="display:inline-flex;align-items:center;gap:5px;background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:20px;padding:4px 12px;font-size:.75rem;font-weight:600;color:#1d4ed8;margin:3px;"><i class="fa-solid fa-plane-departure"></i>\${e}</span>\\\`).join('');

            document.querySelectorAll('.pd-tab-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
            document.querySelectorAll('.pd-tab-pane').forEach((p, i) => p.classList.toggle('active', i === 0));

            document.getElementById('pd-overlay').classList.add('open');
            document.body.style.overflow = 'hidden';
            document.getElementById('pd-modal').scrollTop = 0;
        }

        function closeModal() {
            document.getElementById('pd-overlay').classList.remove('open');
            document.body.style.overflow = '';
        }

        function handleOverlayClick(e) {
            if (e.target === document.getElementById('pd-overlay')) closeModal();
        }`;


files.forEach(f => {
    let target = path.join(dir, f);
    if (!fs.existsSync(target)) return;
    let content = fs.readFileSync(target, "utf-8");

    // CSS Replacement: Find /* ════════ ENHANCED PRODUCT DETAIL MODAL ════════ */ and replace until </style>
    let c1 = content.indexOf('/* ════════ ENHANCED PRODUCT DETAIL MODAL ════════ */');
    if (c1 === -1) c1 = content.indexOf('/* ══ NEW PRODUCT DETAIL MODAL ══ */');
    
    if (c1 !== -1) {
        let e1 = content.indexOf('</style>', c1);
        if (e1 !== -1) {
            content = content.substring(0, c1) + oldCss + "\\n    " + content.substring(e1);
        } else {
            console.log("Could not find </style> in " + f);
        }
    }

    // HTML Replacement
    let h1 = content.indexOf('<!-- ════════ ENHANCED PRODUCT DETAIL MODAL ════════ -->');
    if (h1 === -1) h1 = content.indexOf('<!-- ════════ PRODUCT DETAIL MODAL ════════ -->');
    let h2 = content.indexOf('<!-- Enquiry Toast -->', h1);
    if (h1 !== -1 && h2 !== -1) {
        content = content.substring(0, h1) + oldHtml + "\\n\\n    " + content.substring(h2);
    }

    // JS Replacement
    let j1 = content.indexOf('function switchTab(btn, paneId)');
    let j2 = content.indexOf('function showEnquiryToast', j1);
    if(j1 !== -1 && j2 !== -1) {
        content = content.substring(0, j1) + oldJs + "\\n\\n        " + content.substring(j2);
    }

    fs.writeFileSync(target, content, "utf-8");
    console.log("Properly restored old modal in " + f);
});
