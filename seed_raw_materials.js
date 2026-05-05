
const mysql = require('mysql2/promise');

async function seedRawMaterials() {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'u728463759_Vitrade'
    };

    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to database.');

        const rawMaterials = [
            { name: 'SS 304 Hot Rolled Plate', mat: 'Stainless Steel', desc: 'Industrial grade hot rolled plates for heavy manufacturing.' },
            { name: 'Cold Rolled SS Coil', mat: 'SS 304/316', desc: 'Precision cold rolled coils with superior surface finish.' },
            { name: 'Industrial Aluminum Billet', mat: 'Aluminum 6061', desc: 'High-strength aluminum billets for extrusion and forging.' },
            { name: 'Seamless Copper Tube Pipe', mat: 'Pure Copper', desc: 'High conductivity seamless copper tubes for HVAC and plumbing.' },
            { name: 'Galvanized Steel Sheet', mat: 'GI Steel', desc: 'Zinc-coated steel sheets for weather-resistant construction.' },
            { name: 'Mild Steel Angle Bar', mat: 'Mild Steel', desc: 'Standard MS angles for structural engineering and support.' },
            { name: 'Stainless Steel Round Bar', mat: 'SS 202', desc: 'High-precision round bars for machining and automotive parts.' },
            { name: 'Perforated SS Sheet', mat: 'SS 304', desc: 'Custom perforated sheets for filtration and decorative use.' },
            { name: 'Brass Hexagonal Rod', mat: 'Brass', desc: 'Premium brass hexagonal rods for decorative and industrial fittings.' },
            { name: 'SS 316 Wire Mesh', mat: 'Stainless Steel', desc: 'Fine grade wire mesh for chemical and pharmaceutical filtration.' }
        ];

        for (const p of rawMaterials) {
            const sql = `INSERT INTO app_products (name, material, description, category_id, price, brand_id, status, unit, quantity) 
                         VALUES (?, ?, ?, 5, '25000.00', 51, 'active', 'kg', 500)`;
            await connection.execute(sql, [p.name, p.mat, p.desc]);
        }

        console.log('Successfully added 10 premium raw materials.');
        await connection.end();
    } catch (err) {
        console.error('Error seeding data:', err.message);
    }
}

seedRawMaterials();
