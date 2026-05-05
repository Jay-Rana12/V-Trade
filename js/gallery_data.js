// ── Gallery product data & modal logic ──
const GD = {
    g1: {
        img: 'images/topseller_thali.png', title: 'SS 304 Royal Thali Set',
        tagline: '7-piece mirror-polished 304-grade thali with katoris & spoon. BIS certified, food-safe, restaurant-ready for bulk B2B export.',
        price: '&#8377;480&ndash;720<small style="font-weight:400;color:#94a3b8;"> /piece (MOQ 500)</small>',
        badges: [{ t: '&#128293; Trending #1', c: 'orange' }, { t: '304 Food Grade', c: 'blue' }, { t: 'BIS Certified', c: 'green' }],
        specs: [
            { i: 'fa-layer-group', k: 'Material', v: 'SS 304 Food Grade' },
            { i: 'fa-arrows-up-down', k: 'Finish', v: 'Mirror Polish' },
            { i: 'fa-cubes', k: 'Set Contents', v: '7 Pcs (Thali + 5 Katori + Spoon)' },
            { i: 'fa-weight-hanging', k: 'Weight', v: '1.2 – 1.8 kg/set' },
            { i: 'fa-arrows-maximize', k: 'Diameter Options', v: '27 / 30 / 33 cm' },
            { i: 'fa-boxes-stacked', k: 'MOQ', v: '500 Sets / Order' },
        ],
        history: [
            { d: '2001 — Launch', h: 'Original Bartan Line', p: 'Introduced as traditional thali set for local markets in Mumbai & Pune.' },
            { d: '2008 — Upgrade', h: 'SS 304 Grade Shift', p: 'Upgraded from SS 202 to 304 grade to meet European food-safety regulations.' },
            { d: '2015 — Export', h: 'GCC & UK Entry', p: 'First bulk export of 50,000 sets to UAE & UK hotel-ware buyers.' },
            { d: '2024 — Redesign', h: 'Modern Edition', p: 'Slim-profile deep-draw katoris and laser-engraved logo editions launched.' },
        ],
        company: { name: 'IndiaSteel Co.', initials: 'IS', email: 'export@indiasteel.co.in' },
        certs: ['BIS IS 14101', 'FDA Food Grade', 'FSSAI Compliant', 'CE Mark (EU)', 'ISO 9001:2015'],
        exports: ['UAE', 'UK', 'Australia', 'Germany', 'Singapore', 'USA', 'Canada', 'Saudi Arabia']
    },
    g2: {
        img: 'images/curated_pot.png', title: 'Tri-Ply Cookware Set',
        tagline: '5-piece three-layer SS-Al-SS encapsulated base cookware. Induction-compatible, oven-safe up to 260°C, exported to EU & GCC.',
        price: '&#8377;1,850&ndash;2,600<small style="font-weight:400;color:#94a3b8;"> /set (MOQ 200)</small>',
        badges: [{ t: '&#128293; Hot Pick', c: 'orange' }, { t: 'Induction Ready', c: 'blue' }, { t: 'EU Compliant', c: 'green' }],
        specs: [
            { i: 'fa-layer-group', k: 'Construction', v: 'Tri-Ply (SS + Al + SS)' },
            { i: 'fa-fire', k: 'Compatibility', v: 'Induction / Gas / Electric' },
            { i: 'fa-temperature-high', k: 'Oven Safe', v: 'Up to 260°C' },
            { i: 'fa-cubes', k: 'Set', v: '3 Pots + 2 Pans + Glass Lids' },
            { i: 'fa-boxes-stacked', k: 'MOQ', v: '200 Sets / Order' },
            { i: 'fa-palette', k: 'Handle', v: 'Riveted SS + Silicone Grip' },
        ],
        history: [
            { d: '2010 — R&D', h: 'Tri-Ply Formula', p: 'Partnered with CSIR-NML Jamshedpur to develop the encapsulated base.' },
            { d: '2013 — Launch', h: 'Market Introduction', p: 'First 5,000 sets sold wholesale to pan-India modern trade stores.' },
            { d: '2017 — Export', h: 'European Distribution', p: 'Signed distribution deal with German kitchenware brand; 50,000 sets/year.' },
            { d: '2025 — Expansion', h: 'North America Entry', p: 'LFGB & FDA clearance enabling Amazon USA direct listings.' },
        ],
        company: { name: 'MaxFresh Metals', initials: 'MF', email: 'support@maxfreshmetals.com' },
        certs: ['LFGB Germany', 'FDA Compliant', 'ISO 9001:2015', 'SGS Tested', 'BIS Certified'],
        exports: ['Germany', 'UK', 'USA', 'Canada', 'UAE', 'France', 'Australia', 'Sweden']
    },
    g3: {
        img: 'images/curated_chafing.png', title: 'Hotel Buffet Chafing Dish',
        tagline: 'SS 202 roll-top chafing dish set used by 500+ hotel chains pan-India. Exported to UAE, UK, and Singapore in bulk.',
        price: '&#8377;2,100&ndash;3,400<small style="font-weight:400;color:#94a3b8;"> /set (MOQ 100)</small>',
        badges: [{ t: '&#9733; Horeca Favourite', c: 'green' }, { t: 'Hotel Grade', c: 'blue' }, { t: 'GCC Export', c: 'orange' }],
        specs: [
            { i: 'fa-layer-group', k: 'Material', v: 'SS 202 / SS 304 Option' },
            { i: 'fa-arrows-maximize', k: 'Capacity', v: '4L / 6L / 9L Options' },
            { i: 'fa-fire', k: 'Heating', v: 'Chafing Fuel / Electric Option' },
            { i: 'fa-cubes', k: 'Contents', v: 'Dish + Lid + Stand + Tongs' },
            { i: 'fa-palette', k: 'Finish', v: 'Satin / Mirror / Hammered' },
            { i: 'fa-boxes-stacked', k: 'MOQ', v: '100 Sets / Order' },
        ],
        history: [
            { d: '2005 — Origin', h: 'Hospitality Line', p: 'Launched as budget hotel-grade chafing dish for Indian catering.' },
            { d: '2011 — Export', h: 'First GCC Shipment', p: 'Exported 5,000 sets to Dubai hotel groups for Ramadan season.' },
            { d: '2016 — Patent', h: 'Roll-Top Design', p: 'Received design patent for ergonomic roll-top lid mechanism.' },
            { d: '2024 — Electric', h: 'Plug-In Variant', p: 'Launched electric chafing dish for airline kitchen & hospital dining.' },
        ],
        company: { name: 'HotelWare India', initials: 'HW', email: 'info@hotelware.in' },
        certs: ['ISO 9001:2015', 'NSIC Certified', 'Halal Facility', 'SGS Inspected', 'CE Mark EU'],
        exports: ['UAE', 'Kuwait', 'Qatar', 'Oman', 'Saudi Arabia', 'UK', 'Singapore', 'Australia']
    },
    g4: {
        img: 'images/curated_pitcher.png', title: 'Mirror-Polish Pitcher Jug',
        tagline: '3,100+ units sold. Drip-free precision spout, insulated bakelite handle. Luxury hotel & airline catering approved.',
        price: '&#8377;320&ndash;480<small style="font-weight:400;color:#94a3b8;"> /piece (MOQ 1000)</small>',
        badges: [{ t: '&#127758; Best Export', c: 'green' }, { t: '304 Grade', c: 'blue' }, { t: 'Airline Approved', c: 'orange' }],
        specs: [
            { i: 'fa-layer-group', k: 'Material', v: 'SS 304 Inner / SS 202 Outer' },
            { i: 'fa-arrows-maximize', k: 'Capacity', v: '500ml / 1L / 1.5L / 2L' },
            { i: 'fa-arrows-up-down', k: 'Finish', v: 'Mirror Polish / Satin' },
            { i: 'fa-shield-halved', k: 'Handle', v: 'Insulated Bakelite' },
            { i: 'fa-tag', k: 'Spout', v: 'Drip-Free Precision Pour' },
            { i: 'fa-boxes-stacked', k: 'MOQ', v: '1,000 Pcs / Order' },
        ],
        history: [
            { d: '2003 — Original', h: 'Classic Jug', p: 'First 10,000 simple SS water jugs sold to dhaba chains in Gujarat.' },
            { d: '2010 — Horeca', h: 'Hotel Segment', p: 'Began supply to Taj, ITC & Marriott chains across India.' },
            { d: '2015 — Export', h: 'Middle East Boom', p: 'Annual exports to UAE, Qatar & Kuwait reached 500,000 pieces.' },
            { d: '2023 — Airline', h: 'Catering Supply', p: 'Certified for IndiGo & Air India catering kit supply program.' },
        ],
        certs: ['ISO 9001:2015', 'FSSAI Compliant', 'FDA Compliant', 'Halal Facility', 'Airline Catering Cert'],
        exports: ['UAE', 'Qatar', 'Kuwait', 'Saudi Arabia', 'Oman', 'Singapore', 'Australia', 'USA']
    },
    g5: {
        img: 'images/horeca_display.png', title: 'Full Horeca Display Set',
        tagline: 'Complete hotel-grade SS serving set — bowls, ladles, tongs & warmers. Laser-engraved logo options for luxury hotels.',
        price: '&#8377;3,200&ndash;5,800<small style="font-weight:400;color:#94a3b8;"> /set (MOQ 50)</small>',
        badges: [{ t: '&#9733; Top Rated', c: 'orange' }, { t: 'Hotel Grade', c: 'blue' }, { t: 'Customizable', c: 'green' }],
        specs: [
            { i: 'fa-layer-group', k: 'Material', v: 'SS 202 / SS 304' },
            { i: 'fa-cubes', k: 'Contents', v: 'Bowls + Ladles + Tongs + Warmers' },
            { i: 'fa-arrows-maximize', k: 'Bowl Capacity', v: '3L / 5L / 8L' },
            { i: 'fa-palette', k: 'Finish', v: 'Mirror / Hammered / Satin' },
            { i: 'fa-tag', k: 'Branding', v: 'Hotel Logo Laser Engraving' },
            { i: 'fa-boxes-stacked', k: 'MOQ', v: '50 Sets / Order' },
        ],
        history: [
            { d: '2007 — Concept', h: '5-Star Solution', p: 'Designed as all-in-one buffet solution for luxury hotel procurement.' },
            { d: '2012 — Adoption', h: 'Taj Group Tie-up', p: 'Signed 3-year supply agreement with Taj Group Mumbai.' },
            { d: '2020 — Export', h: 'GCC Programme', p: 'First bulk shipment of 5,000 sets to Dubai & Riyadh luxury hotels.' },
            { d: '2025 — Premium', h: 'Hammered Gold Edition', p: 'Premium hammered-finish with gold accent for boutique hotel market.' },
        ],
        certs: ['ISO 9001:2015', 'SGS Inspected', 'Halal Facility', 'NSF Certified', 'CE Mark EU'],
        exports: ['UAE', 'Saudi Arabia', 'Qatar', 'UK', 'France', 'Singapore', 'Australia', 'Kenya']
    },
    g6: {
        img: 'images/houseware_modern.png', title: 'SS Airtight Canister Set',
        tagline: '6-piece graduated stainless steel canisters with borosilicate glass lids. BPA-free, LFGB certified — trending across European home markets.',
        price: '&#8377;950&ndash;1,400<small style="font-weight:400;color:#94a3b8;"> /set (MOQ 300)</small>',
        badges: [{ t: '&#10003; Europe Trend', c: 'green' }, { t: 'BPA Free', c: 'blue' }, { t: 'LFGB Certified', c: 'orange' }],
        specs: [
            { i: 'fa-layer-group', k: 'Material', v: 'SS 304 + Borosilicate Lid' },
            { i: 'fa-cubes', k: 'Set', v: '6 Graduated Canisters' },
            { i: 'fa-arrows-maximize', k: 'Capacities', v: '500ml to 5L' },
            { i: 'fa-shield-halved', k: 'Seal', v: 'Silicone Airtight Gasket' },
            { i: 'fa-palette', k: 'Finish', v: 'Brushed Satin / Matte Black' },
            { i: 'fa-boxes-stacked', k: 'MOQ', v: '300 Sets / Order' },
        ],
        history: [
            { d: '2014 — Concept', h: 'Modern Kitchen Line', p: 'Developed as premium take on traditional steel dabbas for urban kitchens.' },
            { d: '2017 — Retail', h: 'Amazon India Launch', p: 'Listed on Amazon IN; sold 100,000+ sets in Year 1.' },
            { d: '2019 — Export', h: 'European Entry', p: 'Exports to Germany & Scandinavia via lifestyle home-goods distributors.' },
            { d: '2025 — Premium', h: 'Matte Black Edition', p: 'Launched matte black powder-coat finish for premium lifestyle retail.' },
        ],
        certs: ['REACH Compliant', 'RoHS Certified', 'LFGB Germany', 'BIS IS 14101', 'FDA Compliant'],
        exports: ['Germany', 'Sweden', 'Denmark', 'France', 'Australia', 'Canada', 'Singapore', 'Kenya']
    },
    g7: {
        img: 'images/steel_manufacturing.png', title: 'SS 304/316 Seamless Tubes',
        tagline: 'Industrial-grade seamless SS tubes in 6m/12m lengths. ASTM/EN certified. 780 MT sold this season. Available in all custom grades.',
        price: '&#8377;85&ndash;140<small style="font-weight:400;color:#94a3b8;"> /kg (MOQ 1 MT)</small>',
        badges: [{ t: '&#127981; Industrial', c: 'blue' }, { t: 'ASTM Certified', c: 'green' }, { t: 'Bulk Supply', c: 'orange' }],
        specs: [
            { i: 'fa-layer-group', k: 'Grade', v: 'SS 304 / SS 316 / SS 202' },
            { i: 'fa-arrows-maximize', k: 'Length', v: '6m / 12m Standard' },
            { i: 'fa-arrows-up-down', k: 'OD Range', v: '6mm to 168mm' },
            { i: 'fa-weight-hanging', k: 'Wall Thickness', v: '0.5mm to 10mm' },
            { i: 'fa-shield-halved', k: 'Standards', v: 'ASTM A213 / EN 10216-5' },
            { i: 'fa-boxes-stacked', k: 'MOQ', v: '1 Metric Ton' },
        ],
        history: [
            { d: '2000 — Sourcing', h: 'Raw Material Base', p: 'Established direct mill partnerships with Jindal & Salem Steel.' },
            { d: '2008 — Export', h: 'Industrial Export', p: 'First bulk export of 50 MT seamless tubes to Middle East oil sector.' },
            { d: '2016 — Certify', h: 'ASTM Certification', p: 'Obtained ASTM A213 & EN 10216-5 dual certification for EU export.' },
            { d: '2024 — Scale', h: '780 MT Season', p: 'Record 780 MT sold in a single quarter to GCC infrastructure projects.' },
        ],
        certs: ['ASTM A213', 'EN 10216-5', 'ISO 9001:2015', 'PED 2014/68/EU', 'BIS Certified'],
        exports: ['UAE', 'Saudi Arabia', 'Qatar', 'USA', 'Germany', 'UK', 'Singapore', 'Australia']
    },
    g8: {
        img: 'images/kitchenware_steel.png', title: 'Premium SS Utensil Range',
        tagline: 'Complete kitchen utensil set — ladles, spatulas, tongs in SS 304 mirror finish. Bulk export to kitchenware brands worldwide.',
        price: '&#8377;650&ndash;1,100<small style="font-weight:400;color:#94a3b8;"> /set (MOQ 500)</small>',
        badges: [{ t: '&#128142; Premium', c: 'orange' }, { t: '304 Grade', c: 'blue' }, { t: 'Export Ready', c: 'green' }],
        specs: [
            { i: 'fa-layer-group', k: 'Material', v: 'SS 304 Food Grade' },
            { i: 'fa-cubes', k: 'Contents', v: 'Ladles + Spatulas + Tongs + Turner' },
            { i: 'fa-arrows-up-down', k: 'Finish', v: 'Mirror Polish' },
            { i: 'fa-weight-hanging', k: 'Handle', v: 'Long Riveted SS Handle' },
            { i: 'fa-palette', k: 'Pack', v: 'Gift Box / Bulk Pack Options' },
            { i: 'fa-boxes-stacked', k: 'MOQ', v: '500 Sets / Order' },
        ],
        history: [
            { d: '2006 — Origin', h: 'Utensil Range Launch', p: 'Introduced as standalone kitchen tool set for Indian retail market.' },
            { d: '2012 — OEM', h: 'White-Label Export', p: 'Started OEM supply to European kitchenware brands under their labels.' },
            { d: '2018 — Premium', h: 'Gift Pack Edition', p: 'Launched premium gift packaging for retail & corporate orders.' },
            { d: '2024 — Expand', h: 'North America Push', p: 'FDA-cleared sets now listed on Amazon US & Walmart Marketplace.' },
        ],
        certs: ['BIS IS 14101', 'FDA Compliant', 'FSSAI', 'ISO 9001:2015', 'SGS Tested'],
        exports: ['USA', 'Canada', 'UK', 'Germany', 'Australia', 'UAE', 'Singapore', 'France']
    },
    g9: {
        img: 'images/quality_assurance.png', title: 'Quality-Assured SS Raw Blanks',
        tagline: 'SS 304/202 coils and blanks for cookware manufacturers. SGS & BIS tested. Direct mill supply with full quality assurance documentation.',
        price: '&#8377;70&ndash;120<small style="font-weight:400;color:#94a3b8;"> /kg (MOQ 5 MT)</small>',
        badges: [{ t: '&#128737; SGS Certified', c: 'green' }, { t: 'Mill Direct', c: 'blue' }, { t: 'Bulk Supply', c: 'orange' }],
        specs: [
            { i: 'fa-layer-group', k: 'Grade', v: 'SS 304 / SS 202 / SS 316' },
            { i: 'fa-arrows-maximize', k: 'Width', v: '500mm to 1500mm' },
            { i: 'fa-arrows-up-down', k: 'Thickness', v: '0.3mm to 4mm' },
            { i: 'fa-weight-hanging', k: 'Surface', v: '2B / BA / No.4 Finish' },
            { i: 'fa-shield-halved', k: 'Testing', v: 'SGS + BIS + Mill Cert' },
            { i: 'fa-boxes-stacked', k: 'MOQ', v: '5 Metric Tons' },
        ],
        history: [
            { d: '1998 — Founded', h: 'Raw Material Trading', p: 'Started as stainless steel coil trader supplying local cookware units.' },
            { d: '2005 — Network', h: 'Mill Partnerships', p: 'Signed direct supply agreements with Jindal Stainless & SAIL.' },
            { d: '2014 — QA', h: 'SGS Tie-Up', p: 'Partnered with SGS for third-party quality inspection on all outgoing lots.' },
            { d: '2023 — Scale', h: 'Export Grade Stock', p: 'Added ASTM & EN certified stock specifically for export-focused clients.' },
        ],
        certs: ['BIS Certified', 'SGS Inspected', 'ISO 9001:2015', 'ASTM A240', 'EN 10088'],
        exports: ['India (Local)', 'UAE', 'Qatar', 'UK', 'Germany', 'USA', 'Singapore', 'Bangladesh']
    }
};

function openGD(id) {
    const p = GD[id]; if (!p) return;
    // Store for enquiry buttons
    if (typeof currentGalleryId !== 'undefined') window.currentGalleryId = id;
    window.currentGalleryId = id;
    document.getElementById('gd-img').src = p.img;
    document.getElementById('gd-img').alt = p.title;
    document.getElementById('gd-title').innerHTML = p.title;
    document.getElementById('gd-tagline').innerHTML = p.tagline;
    document.getElementById('gd-price').innerHTML = p.price;
    document.getElementById('gd-badges').innerHTML = p.badges.map(b => `<span class="gd-badge ${b.c}">${b.t}</span>`).join('');
    document.getElementById('gd-specs').innerHTML = p.specs.map(s => `
    <div class="gd-spec"><i class="fa-solid ${s.i}"></i><div><div class="gd-spec-k">${s.k}</div><div class="gd-spec-v">${s.v}</div></div></div>`).join('');
    document.getElementById('gd-timeline').innerHTML = p.history.map(h => `
    <div class="gd-tl"><div class="gd-tl-dot"></div><div class="gd-tl-date">${h.d}</div><div class="gd-tl-h">${h.h}</div><div class="gd-tl-p">${h.p}</div></div>`).join('');
    document.getElementById('gd-certs').innerHTML = p.certs.map(c => `<span class="gd-cert"><i class="fa-solid fa-circle-check"></i>${c}</span>`).join('');
    document.getElementById('gd-exports').innerHTML = p.exports.map(e => `<span class="gd-export"><i class="fa-solid fa-plane-departure"></i>${e}</span>`).join('');
    const ov = document.getElementById('gd-overlay');
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.getElementById('gd-modal').scrollTop = 0;
}
function closeGD() {
    document.getElementById('gd-overlay').classList.remove('open');
    document.body.style.overflow = '';
}
function handleOC(e) { if (e.target === document.getElementById('gd-overlay')) closeGD(); }
function filterTrend(cat, btn) {
    document.querySelectorAll('.gal-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.trend-card').forEach(c => {
        c.classList.toggle('tc-hidden', cat !== 'all' && c.dataset.cat !== cat);
    });
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeGD(); });
