// js/products_data.js
// Centralized Product Data for GlobalTrade India

if (!window.GLOBAL_PRODUCTS) window.GLOBAL_PRODUCTS = {};
var GLOBAL_PRODUCTS = window.GLOBAL_PRODUCTS;
Object.assign(GLOBAL_PRODUCTS, {
    // --- TOP SELLERS / FEATURED ---
    p1: {
        id: 'p1',
        category: 'kitchenware',
        img: 'images/topseller_thali.png',
        title: 'SS 304 Royal Thali Set',
        price: '₹480–720',
        rating: '4.8',
        orders: '1,450+',
        warranty: '2 Years',
        company: {
            name: 'INDIATRADE',
            initials: 'IT',
            phone: '+91 98765 43210',
            email: 'trya68855@gmail.com',
            address: '12, Steel Market, Bhuleshwar, Mumbai – 400002',
            about: 'INDIATRADE is a premium industrial supplier of stainless steel kitchenware and Horeca equipment with 20+ years of excellence.'
        },
        badges: [
            { text: '⭐ 4.8 Rating', cls: 'yellow' },
            { text: '🛒 1,450+ Orders', cls: 'red' },
            { text: '🛡 2 Year Warranty', cls: 'green' }
        ],
        specsTable: [
            { label: 'Material', val: 'SS 304' },
            { label: 'Size', val: '7 Pcs Set' },
            { label: 'Min Order Qty', val: '500' },
            { label: 'Unit', val: 'pieces' },
            { label: 'Price (Approx)', val: '₹480–720' },
            { label: 'Tags', val: 'SS 304 Thali Set' },
            { label: 'Induction', val: 'Not Applicable' },
            { label: 'Dishwasher', val: 'Safe' },
            { label: 'Warranty', val: '2 Years' }
        ],
        specs: [
            { key: 'Material', val: 'SS 304 Food Grade' },
            { key: 'Finish', val: 'Mirror High Polish' },
            { key: 'Components', val: '1 Thali, 3 Bowls, 1 Glass, 1 Spoon, 1 Halwa Plate' },
            { key: 'Weight', val: '1.2 kg approx' },
            { key: 'Certification', val: 'BIS IS 14101' }
        ],
        description: 'Elite 7-piece royal thali set designed for luxury dining. Crafted from authentic 304-grade stainless steel with a flawless mirror finish. Resistant to corrosion and heavy impact, making it ideal for high-end hospitality exports.',
        certs: ['BIS IS 14101', 'FDA Compliant', 'ISO 9001:2015'],
        exports: ['UAE', 'UK', 'USA', 'Qatar', 'Australia']
    },
    p2: {
        id: 'p2',
        category: 'kitchenware',
        img: 'images/curated_pot.png',
        title: 'Tri-Ply Heavy Bottom Cookware',
        price: '₹1,850–2,600',
        rating: '4.9',
        orders: '850+',
        warranty: '5 Years',
        company: {
            name: 'MetalPro Solutions',
            initials: 'MP',
            phone: '+91 22 4567 8900',
            email: 'sales@metalpro.in',
            address: 'Sector 5, MIDC, Pune – 411001',
            about: 'MetalPro Solutions is a market leader in high-performance heavy-gauge cookware, specializing in multi-layer metallurgy.'
        },
        badges: [
            { text: '⭐ 4.9 Rating', cls: 'yellow' },
            { text: '🛒 850+ Orders', cls: 'red' },
            { text: '🛡 5 Year Warranty', cls: 'green' }
        ],
        specsTable: [
            { label: 'Material', val: 'Tri-Ply (SS-Al-SS)' },
            { label: 'Size', val: '3–5 Liters' },
            { label: 'Min Order Qty', val: '200' },
            { label: 'Unit', val: 'sets' },
            { label: 'Price (Approx)', val: '₹1,850–2,600' },
            { label: 'Tags', val: 'Chef Cookware' },
            { label: 'Induction', val: 'Fully Compatible' },
            { label: 'Dishwasher', val: 'Safe' },
            { label: 'Warranty', val: '5 Years' }
        ],
        specs: [
            { key: 'Construction', val: '3-Layer Seamless' },
            { key: 'Base', val: 'Induction Encapsulated' },
            { key: 'Handle', val: 'Stay-Cool Riveted SS' },
            { key: 'Lid', val: 'Tempered Glass / SS' }
        ],
        description: 'Professional grade tri-ply induction cookware sets. Features an aluminum core sandwiched between two layers of premium stainless steel for even heat distribution and zero hot spots.',
        certs: ['LFGB Germany', 'FDA Compliant', 'RoHS'],
        exports: ['Germany', 'USA', 'France', 'Canada', 'UAE']
    },
    p3: {
        id: 'p3',
        category: 'horeca',
        img: 'images/curated_chafing.png',
        title: 'Horeca Buffet Chafing Dish',
        price: '₹2,100–3,400',
        rating: '4.7',
        orders: '420+',
        warranty: '1 Year',
        company: {
            name: 'HotelWare India',
            initials: 'HW',
            phone: '+91 900 456 7890',
            email: 'info@hotelware.co.in',
            address: 'Industrial Hub, NOIDA – 201301',
            about: 'HotelWare India provides premium hospitality equipment to 5-star hotel chains and large-scale catering services across Asia and Europe.'
        },
        badges: [
            { text: '⭐ 4.7 Rating', cls: 'yellow' },
            { text: '🛒 420+ Orders', cls: 'red' },
            { text: '🛡 1 Year Warranty', cls: 'green' }
        ],
        specsTable: [
            { label: 'Material', val: 'SS 304 / 202' },
            { label: 'Size', val: '9 Liters' },
            { label: 'Min Order Qty', val: '50' },
            { label: 'Unit', val: 'units' },
            { label: 'Price (Approx)', val: '₹2,100–3,400' },
            { label: 'Tags', val: 'Buffet Equipment' },
            { label: 'Induction', val: 'Not Applicable' },
            { label: 'Dishwasher', val: 'Not Recommended' },
            { label: 'Warranty', val: '1 Year' }
        ],
        specs: [
            { key: 'Lid Type', val: 'Roll-top 180°' },
            { key: 'Fuel', val: 'Sterno Holder / Electric' },
            { key: 'Frame', val: 'Reinforced Heavy Base' }
        ],
        description: 'Elegant buffet display chafing dishes with smooth roll-top lids. Engineered for maximum temperature retention and premium aesthetic in banquet halls and luxury resorts.',
        certs: ['SGS Tested', 'NSF Certified', 'CE Mark'],
        exports: ['UAE', 'UK', 'Singapore', 'Malaysia']
    },
    p4: {
        id: 'p4',
        category: 'houseware',
        img: 'images/houseware_modern.png',
        title: 'Houseware Storage Solutions',
        price: '₹950–1,400',
        rating: '4.6',
        orders: '310+',
        warranty: '1 Year',
        company: {
            name: 'ModHome Steels',
            initials: 'MS',
            phone: '+91 98234 56789',
            email: 'contact@modhome.in',
            address: 'C-10, Hosiery Complex, NOIDA',
            about: 'ModHome Steels specializes in innovative home organization and storage products with a focus on minimalist design and durability.'
        },
        badges: [
            { text: '⭐ 4.6 Rating', cls: 'yellow' },
            { text: '🛒 310+ Orders', cls: 'red' },
            { text: '🛡 1 Year Warranty', cls: 'green' }
        ],
        specsTable: [
            { label: 'Material', val: 'SS 304 + Borosilicate' },
            { label: 'Size', val: '6 Pcs Set' },
            { label: 'Min Order Qty', val: '300' },
            { label: 'Unit', val: 'sets' },
            { label: 'Price (Approx)', val: '₹950–1,400' },
            { label: 'Tags', val: 'Airtight Canister set' },
            { label: 'BPA Free', val: 'Yes' },
            { label: 'Dishwasher', val: 'Safe' },
            { label: 'Warranty', val: '1 Year' }
        ],
        specs: [
            { key: 'Material', val: 'SS 304 + Borosilicate Lid' },
            { key: 'Capacities', val: '500ml to 5L (6 sizes)' },
            { key: 'Seal', val: 'Silicone Airtight Gasket' }
        ],
        description: 'Modern airtight stainless steel kitchen canisters with borosilicate glass lids. BPA-free, food-safe, trending in European home lifestyle and décor retail markets.',
        certs: ['REACH Compliant', 'LFGB Germany', 'FDA Compliant'],
        exports: ['Germany', 'Sweden', 'France', 'Australia']
    },
    p5: {
        id: 'p5',
        category: 'tableware',
        img: 'images/curated_pitcher.png',
        title: 'Premium SS Pitchers & Jugs',
        price: '₹320–480',
        rating: '4.8',
        orders: '3,200+',
        warranty: '1 Year',
        company: {
            name: 'AirServe Metals',
            initials: 'AS',
            phone: '+91 11 2345 6789',
            email: 'sales@airserve.com',
            address: 'Wazirpur Industrial Area, Delhi',
            about: 'AirServe Metals is a specialist in precision SS tableware for airline and hospitality sectors.'
        },
        badges: [
            { text: '⭐ 4.8 Rating', cls: 'yellow' },
            { text: '🛒 3,200+ Orders', cls: 'red' },
            { text: '🛡 1 Year Warranty', cls: 'green' }
        ],
        specsTable: [
            { label: 'Material', val: 'SS 304 Inner' },
            { label: 'Capacity', val: '500ml–2L' },
            { label: 'Min Order Qty', val: '1000' },
            { label: 'Unit', val: 'pieces' },
            { label: 'Price (Approx)', val: '₹320–480' },
            { label: 'Tags', val: 'Mirror Pitcher' },
            { label: 'Induction', val: 'Not Applicable' },
            { label: 'Dishwasher', val: 'Safe' },
            { label: 'Warranty', val: '1 Year' }
        ],
        specs: [
            { key: 'Finish', val: 'Mirror Polish / Satin' },
            { key: 'Handle', val: 'Insulated Bakelite / SS' },
            { key: 'Spout', val: 'Drip-Free Precision Pour' }
        ],
        description: 'Mirror-polished stainless steel water pitchers and insulated jugs with drip-free spouts. Favored by luxury hotels and global airlines.',
        certs: ['ISO 9001:2015', 'FSSAI Compliant', 'Airline Catering Certified'],
        exports: ['UAE', 'Qatar', 'Kuwait', 'Singapore']
    },
    p6: {
        id: 'p6',
        category: 'horeca',
        img: 'images/horeca_display.png',
        title: 'Complete Horeca Display Sets',
        price: '₹3,200–5,800',
        rating: '4.9',
        orders: '156+',
        warranty: '2 Years',
        company: {
            name: 'Grand Buffet Co.',
            initials: 'GB',
            phone: '+91 22 3344 5566',
            email: 'sales@grandbuffet.com',
            address: 'Unit 7, SEEPZ SEZ, Mumbai',
            about: 'Grand Buffet Co. is a premium B2B supplier of complete hotel serving solutions.'
        },
        badges: [
            { text: '⭐ 4.9 Rating', cls: 'yellow' },
            { text: '🛒 156+ Orders', cls: 'red' },
            { text: '🛡 2 Year Warranty', cls: 'green' }
        ],
        specsTable: [
            { label: 'Material', val: 'SS 202/304' },
            { label: 'Bowl Capacity', val: '3L/5L/8L' },
            { label: 'Min Order Qty', val: '50' },
            { label: 'Unit', val: 'sets' },
            { label: 'Price (Approx)', val: '₹3,200–5,800' },
            { label: 'Tags', val: 'Horeca Display Set' },
            { label: 'Branding', val: 'Laser Engraving' },
            { label: 'Warranty', val: '2 Years' }
        ],
        specs: [
            { key: 'Contents', val: 'Bowls+Ladles+Tongs+Warmers' },
            { key: 'Finish', val: 'Mirror/Hammered' },
            { key: 'Branding', val: 'Logo Laser Engraving' }
        ],
        description: 'Full hotel-grade stainless steel serving sets including serving bowls, ladles, tongs, and warmers. Customisable finishes for luxury dining environments.',
        certs: ['ISO 9001:2015', 'NSF Certified', 'CE Mark EU'],
        exports: ['UAE', 'Saudi Arabia', 'UK', 'Australia']
    },
    p7: {
        id: 'p7',
        category: 'kitchenware',
        img: 'images/grid_thali.png', 
        title: 'SS Pro-Chef Knife Set',
        price: '₹1,250–1,800',
        rating: '4.9',
        orders: '2,100+',
        warranty: 'Lifetime',
        company: {
            name: 'INDIATRADE',
            initials: 'IT',
            phone: '+91 99244 88938',
            email: 'info@vibrantindiafair.com',
            address: 'Ahmedabad, Gujarat',
            about: 'Premium manufacturer of high-grade cutlery and kitchen tools.'
        },
        badges: [
            { text: '🔪 High Carbon Steel', cls: 'red' },
            { text: '🛡 Lifetime Warranty', cls: 'green' }
        ],
        specsTable: [
            { label: 'Material', val: 'SS 420 High Carbon' },
            { label: 'Size', val: '8 Inch Chef Knife' },
            { label: 'Min Order Qty', val: '100' }
        ],
        description: 'Professional grade high-carbon stainless steel chef knife. Ergonomic handle and laser-sharpened edge for precision cutting. Trusted by top chefs globally.',
        certs: ['NSF Certified', 'ISO 9001'],
        exports: ['USA', 'Europe', 'UAE']
    },
    p8: {
        id: 'p8',
        category: 'horeca',
        img: 'images/curated_chafing.png',
        title: 'SS Big Full Rectangular Roll Top',
        price: '₹4,500–6,200',
        rating: '5.0',
        orders: '88+',
        warranty: '3 Years',
        company: {
            name: 'HotelWare India',
            initials: 'HW',
            phone: '+91 900 456 7890',
            email: 'info@hotelware.co.in',
            address: 'Industrial Hub, NOIDA',
            about: 'Specialist in luxury banquet equipment.'
        },
        badges: [
            { text: '✨ Mirror Finish', cls: 'yellow' },
            { text: '📏 9.0L Capacity', cls: 'blue' }
        ],
        specsTable: [
            { label: 'Type', val: 'Rectangular Roll Top' },
            { label: 'Material', val: 'SS 304' },
            { label: 'Capacity', val: '9 Liters' }
        ],
        description: 'Elite rectangular roll-top chafing dish for professional catering. Featuring a smooth 180-degree roll-top lid and high-grade mirror polish.',
        certs: ['SGS Certified', 'NSF'],
        exports: ['UAE', 'Singapore']
    }
});

// --- Add gallery products (g1 to g9) for consistency with gallery.html ---
var GALLERY_PRODUCTS = {
    g1: GLOBAL_PRODUCTS.p1,
    g2: GLOBAL_PRODUCTS.p2,
    g3: GLOBAL_PRODUCTS.p3,
    g4: GLOBAL_PRODUCTS.p5, // Pitcher mapped to g4
    g5: GLOBAL_PRODUCTS.p6, // Horeca display mapped to g5
    g6: GLOBAL_PRODUCTS.p4, // Storage solution mapped to g6
    g7: {
        id: 'g7',
        category: 'industrial',
        img: 'images/steel_manufacturing.png',
        title: 'SS 304/316 Seamless Tubes',
        price: '₹85–140/kg',
        company: { name: 'INDIATRADE', initials: 'IT', about: 'Industrial manufacturing expert.' },
        badges: [{ text: '🏗 Industrial', cls: 'blue' }, { text: '🛡 Certified', cls: 'green' }],
        specsTable: [{ label: 'Grade', val: '304/316' }, { label: 'Type', val: 'Seamless' }, { label: 'Standard', val: 'ASTM' }],
        specs: [{ key: 'Standard', val: 'ASTM/EN' }],
        description: 'ASTM/EN certified seamless tubes for high-pressure industrial networks.',
        certs: ['ASTM Certified', 'ISO 14001'],
        exports: ['Germany', 'USA', 'Norway']
    },
    g8: {
        id: 'g8',
        category: 'kitchenware',
        img: 'images/kitchenware_steel.png',
        title: 'Premium SS Utensil Range',
        price: '₹650–1,100',
        company: { name: 'INDIATRADE', initials: 'IT', about: 'Kitchen basics specialist.' },
        badges: [{ text: '💎 Premium', cls: 'orange' }, { text: '🛡 1 Year Warranty', cls: 'green' }],
        specsTable: [{ label: 'Material', val: 'SS 304' }, { label: 'Unit', val: 'set' }, { label: 'Dishwasher', val: 'Safe' }],
        specs: [{ key: 'Material', val: 'SS 304' }],
        description: 'Complete kitchen utensil set featuring mirror finish and ergonomic design.',
        certs: ['BIS Certified', 'FDA Compliant'],
        exports: ['USA', 'UK', 'Australia']
    },
    g9: {
        id: 'g9',
        category: 'industrial',
        img: 'images/quality_assurance.png',
        title: 'Quality-Assured Raw Blanks',
        price: '₹70–120/kg',
        company: { name: 'INDIATRADE', initials: 'IT', about: 'Raw material supplier.' },
        badges: [{ text: '🛡 Certified', cls: 'green' }, { text: '🔍 Tested', cls: 'blue' }],
        specsTable: [{ label: 'Material', val: 'SS Coils' }, { label: 'Testing', val: 'Full' }],
        specs: [{ key: 'Test', val: 'SGS / BIS' }],
        description: 'SS coils and blanks tested to global standards for cookware manufacturing.',
        certs: ['SGS Certified', 'BIS Standard'],
        exports: ['India', 'Vietnam']
    }
};

// Merge for global access
window.GLOBAL_PRODUCTS = GLOBAL_PRODUCTS;
window.GALLERY_PRODUCTS = GALLERY_PRODUCTS;
window.ALL_PRODUCTS = { ...GLOBAL_PRODUCTS, ...GALLERY_PRODUCTS };
