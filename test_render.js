const fs = require('fs');

async function testFetch() {
    try {
        const prodRes = await fetch('http://localhost:5001/api/products?limit=5000');
        const prodData = await prodRes.json();
        console.log("Products count:", prodData.data ? prodData.data.length : 0);

        const res = await fetch('http://localhost:5001/api/profiles?page=1&limit=20&type=Manufacturer');
        const data = await res.json();
        const profiles = data.data || [];
        console.log("Profiles count:", profiles.length);

        const checkNan = (v, fb) => (v && v.toString().trim().toLowerCase() !== 'nan' && v.toString().trim() !== '') ? v : fb;

        let html = '';
        for (const m of profiles) {
            const name       = (m.company_name || 'Business').trim();
            const initials   = name.substring(0, 2).toUpperCase() || 'BS';
            const phone      = checkNan(m.phone, '');
            const email      = checkNan(m.email, '');
            const address    = checkNan(m.address, '');
            const owner      = checkNan(m.owner, '');
            const about      = checkNan(m.about, '');
            const pType      = checkNan(m.type, 'Member');
            const phoneClean = String(phone).replace(/\D/g, '') || '919876543210';

            const COLORS = ['#2563eb','#0891b2','#059669','#7c3aed','#dc2626','#ea580c','#0d9488'];
            const color  = COLORS[(name.charCodeAt(0) || 0) % COLORS.length] || COLORS[0];

            html += name + " ";
        }
        console.log("Render successful. HTML length:", html.length);

    } catch (e) {
        console.error("ERROR:", e);
    }
}
testFetch();
