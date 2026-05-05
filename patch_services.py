import re
import os

target_file = r"c:\Users\AE\OneDrive\Desktop\redesign\services.html"

with open(target_file, "r", encoding="utf-8") as f:
    content = f.read()

css_replacement = """        /* ════════ ENHANCED PRODUCT DETAIL MODAL ════════ */
        .pd-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(8px);
            z-index: 9999;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .pd-overlay.active { display: flex; animation: pdFadeIn 0.3s ease; }
        @keyframes pdFadeIn { from { opacity: 0; } to { opacity: 1; } }

        .pd-modal {
            background: #fff;
            width: 100%;
            max-width: 1100px;
            max-height: 90vh;
            border-radius: 20px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            display: flex;
        }

        @media(max-width: 900px) { .pd-modal { flex-direction: column; overflow-y: auto; } }

        .pd-img-panel { 
            flex: 1;
            background: #f8fafc; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            padding: 60px; 
            position: relative; 
        }
        .pd-img-panel img { 
            max-width: 100%; 
            max-height: 450px; 
            object-fit: contain; 
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .pd-close {
            position: absolute; top: 20px; right: 20px;
            width: 36px; height: 36px; border-radius: 50%;
            background: #f1f5f9; border: none; cursor: pointer;
            z-index: 10; font-size: 1rem; color: #64748b;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.2s;
        }
        .pd-close:hover { background: #e2e8f0; color: #0f172a; }

        .pd-info-panel { flex: 1.3; padding: 40px; overflow-y: auto; }

        .pd-header-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: #f8fafc;
            padding: 5px 15px 5px 5px;
            border-radius: 8px;
            margin-bottom: 15px;
            border: 1px solid #e2e8f0;
        }
        .pd-badge-icon { background: #1e293b; color: #fff; padding: 6px 10px; border-radius: 6px; font-weight: 800; font-size: 0.75rem; }
        .pd-badge-name { font-size: 0.8rem; font-weight: 700; color: #1e293b; text-transform: uppercase; }

        .pd-main-title { font-size: 1.8rem; font-weight: 800; color: #0f172a; margin: 0 0 15px; }

        .pd-chip-row { display: flex; gap: 10px; margin-bottom: 30px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; flex-wrap: wrap; }
        .pd-chip { 
            display: flex; align-items: center; gap: 6px; 
            padding: 8px 16px; border-radius: 50px; 
            font-size: 0.8rem; font-weight: 700;
        }
        .pd-chip.yellow { background: #fef9c3; color: #854d0e; border: 1px solid #fde68a; }
        .pd-chip.red { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
        .pd-chip.green { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
        .pd-chip.blue { background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; }

        .pd-grid-specs {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 30px;
        }
        .pd-grid-cell { background: #f8fafc; padding: 12px 15px; border-radius: 10px; border: 1px solid #f1f5f9; }
        .pd-grid-label { font-size: 0.65rem; font-weight: 750; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px; }
        .pd-grid-val { font-size: 0.85rem; font-weight: 750; color: #1e293b; }

        .pd-tab-navigation {
            display: flex;
            gap: 25px;
            border-bottom: 2px solid #f1f5f9;
            margin-bottom: 20px;
        }
        .pd-tab-trigger {
            background: none; border: none; padding: 0 0 12px;
            font-size: 0.8rem; font-weight: 800; color: #94a3b8;
            cursor: pointer; text-transform: uppercase;
            position: relative; top: 2px;
            transition: all 0.3s;
        }
        .pd-tab-trigger.active { color: #f26b43; border-bottom: 2px solid #f26b43; }

        .pd-tab-content-area { font-size: 0.9rem; line-height: 1.6; color: #475569; min-height: 120px; }
        .pd-tab-pane { display: none; }
        .pd-tab-pane.active { display: block; }

        .pd-co-info { background: #f8fafc; padding: 25px; border-radius: 15px; border: 1px solid #e2e8f0; }
        .pd-co-info h4 { color: #2563eb; margin: 0 0 15px; font-size: 1rem; }
        .pd-co-info p { margin-bottom: 10px; display: flex; gap: 10px; font-weight: 600; font-size: 0.85rem; }
        .pd-co-info i { color: #94a3b8; width: 14px; }
"""

html_replacement = """    <!-- ════════ ENHANCED PRODUCT DETAIL MODAL ════════ -->
    <div class="pd-overlay" id="pd-overlay" onclick="if(event.target === this) closeModal()">
        <div class="pd-modal">
            <!-- Left Panel: Image -->
            <div class="pd-img-panel">
                <img id="pd-img" src="" alt="Product" style="max-height: 380px;">
            </div>

            <!-- Right Panel: Info -->
            <div class="pd-info-panel">
                <button class="pd-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>

                <!-- Company Badge -->
                <div class="pd-header-badge">
                    <span class="pd-badge-icon" id="pd-co-initials">IT</span>
                    <span class="pd-badge-name" id="pd-co-name">INDIATRADE</span>
                </div>

                <!-- Title -->
                <h2 class="pd-main-title" id="pd-title"></h2>

                <!-- Chip Badges -->
                <div class="pd-chip-row" id="pd-chip-row">
                    <!-- Populated dynamically -->
                </div>

                <!-- 3x3 Grid of Specs -->
                <div class="pd-grid-specs" id="pd-specs-grid">
                    <!-- Populated dynamically -->
                </div>

                <!-- Tabs Section -->
                <div class="pd-tabbed-area">
                    <div class="pd-tab-navigation">
                        <button class="pd-tab-trigger active" onclick="switchTab(this, 'tab-co')">Company Detail</button>
                        <button class="pd-tab-trigger" onclick="switchTab(this, 'tab-spec')">Specification</button>
                        <button class="pd-tab-trigger" onclick="switchTab(this, 'tab-desc')">Description</button>
                        <button class="pd-tab-trigger" onclick="switchTab(this, 'tab-notes')">Notes</button>
                    </div>
                    <div class="pd-tab-content-area">
                        <div class="pd-tab-pane active" id="tab-co">
                            <div class="pd-co-info">
                                <h4 id="co-tab-name">INDIATRADE</h4>
                                <p><i class="fa-solid fa-phone"></i> <span>Phone:</span> <span id="co-tab-phone"></span></p>
                                <p><i class="fa-solid fa-envelope"></i> <span>Email:</span> <span id="co-tab-email"></span></p>
                                <p><i class="fa-solid fa-location-dot"></i> <span>Address:</span> <span id="co-tab-address"></span></p>
                                <hr style="margin: 15px 0; border: none; border-top: 1px solid #e2e8f0;">
                                <div style="display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 0.75rem; color: #94a3b8; text-transform: uppercase;">
                                    <i class="fa-solid fa-circle-nodes"></i> About Company
                                </div>
                                <p style="font-size: 0.85rem; color: #475569; margin-top: 8px; display: block;" id="co-tab-about"></p>
                            </div>
                        </div>
                        <div class="pd-tab-pane" id="tab-spec">
                            <div id="spec-full-text"></div>
                        </div>
                        <div class="pd-tab-pane" id="tab-desc">
                            <p id="desc-full-text"></p>
                        </div>
                        <div class="pd-tab-pane" id="tab-notes">
                            <div id="tab-notes-content"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>"""

js_replacement = """        function switchTab(btn, paneId) {
            document.querySelectorAll('.pd-tab-trigger').forEach(b => b.classList.remove('active'));
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
            document.getElementById('pd-title').textContent = p.title;

            const iconMap = {
                '⭐': '<i class="fa-solid fa-star"></i>',
                '🛒': '<i class="fa-solid fa-shopping-cart"></i>',
                '🛡': '<i class="fa-solid fa-shield-halved"></i>'
            };

            document.getElementById('pd-chip-row').innerHTML = p.badges
                .map(b => {
                    let text = b.text;
                    let iconHtml = '<i class="fa-solid fa-star"></i>';
                    for(let k in iconMap) {
                        if(text.includes(k)) {
                            iconHtml = iconMap[k];
                            text = text.replace(k, '').trim();
                        }
                    }
                    if(text.includes('Warranty')) iconHtml = '<i class="fa-solid fa-shield-halved"></i>'; 
                    if(text.includes('Sold')) iconHtml = '<i class="fa-solid fa-shopping-cart"></i>'; 
                    return `<div class="pd-chip ${b.cls}">${iconHtml} <span>${text}</span></div>`;
                }).join('');

            document.getElementById('pd-specs-grid').innerHTML = p.specsTable
                .map((s,i) => `<div class="pd-grid-cell" style="animation: pdFadeIn ${0.1 + i*0.05}s ease;"><div class="pd-grid-label">${s.label}</div><div class="pd-grid-val">${s.val}</div></div>`).join('');

            document.getElementById('co-tab-name').textContent = p.company.name;
            document.getElementById('co-tab-phone').textContent = p.company.phone;
            document.getElementById('co-tab-email').textContent = p.company.email || 'vibrantindiatech515@gmail.com';
            document.getElementById('co-tab-address').textContent = p.company.address;
            document.getElementById('co-tab-about').textContent = p.company.about;

            document.getElementById('spec-full-text').innerHTML = p.specs
                .map(s => `<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f1f5f9;"><span style="color:#94a3b8;font-weight:700;font-size:0.75rem;text-transform:uppercase;">${s.key}</span><span style="color:#0f172a;font-weight:700;font-size:0.85rem;">${s.val}</span></div>`).join('');

            document.getElementById('desc-full-text').textContent = p.description;

            let notesHtml = '<div style="font-weight:800;color:#94a3b8;font-size:0.7rem;text-transform:uppercase;margin-bottom:10px;">Certifications</div>';
            notesHtml += p.certs.map(c => `<span style="display:inline-flex;align-items:center;gap:5px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:20px;padding:5px 14px;font-size:.75rem;font-weight:700;color:#15803d;margin:0 6px 10px 0;"><i class="fa-solid fa-check"></i>${c}</span>`).join('');
            notesHtml += '<div style="font-weight:800;color:#94a3b8;font-size:0.7rem;text-transform:uppercase;margin:15px 0 10px;">Export Destinations</div>';
            notesHtml += p.exports.map(e => `<span style="display:inline-flex;align-items:center;gap:5px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:20px;padding:5px 14px;font-size:.75rem;font-weight:700;color:#1d4ed8;margin:0 6px 10px 0;"><i class="fa-solid fa-globe"></i>${e}</span>`).join('');
            document.getElementById('tab-notes-content').innerHTML = notesHtml;

            document.querySelectorAll('.pd-tab-trigger').forEach((b, i) => b.classList.toggle('active', i === 0));
            document.querySelectorAll('.pd-tab-pane').forEach((p, i) => p.classList.toggle('active', i === 0));

            document.getElementById('pd-overlay').classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const infoPanel = document.querySelector('.pd-info-panel');
            if(infoPanel) infoPanel.scrollTop = 0;
        }

        function closeModal() {
            document.getElementById('pd-overlay').classList.remove('active');
            document.body.style.overflow = '';
        }

        function handleOverlayClick(e) {
            if (e.target === document.getElementById('pd-overlay')) closeModal();
        }"""

# 1. Replace CSS
content = re.sub(r'/\*\s*══ NEW PRODUCT DETAIL MODAL ══\s*\*/.*?(?=</style>)', css_replacement, content, flags=re.DOTALL)

# 2. Replace HTML
content = re.sub(r'<!-- ════════ PRODUCT DETAIL MODAL ════════ -->.*?</div>\s*</div>\s*</div>\s*</div>', html_replacement, content, flags=re.DOTALL)

# 3. Replace JS
content = re.sub(r'function switchTab\(btn, paneId\).*?function handleOverlayClick\(e\) \{.*?\}', js_replacement, content, flags=re.DOTALL)

with open(target_file, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated services.html")
