const mysql = require('mysql2/promise');
const { realData } = require('./admin/src/data/realData');

const dbConfig = { host: 'localhost', user: 'root', password: '', database: 'u728463759_Vitrade' };

async function syncData() {
    try {
        const conn = await mysql.createConnection(dbConfig);
        console.log('--- SYNCING BRANDS ---');
        for (const b of realData.brands) {
            const [existing] = await conn.query('SELECT id FROM app_brands WHERE company_name = ?', [b.name]);
            if (existing.length === 0) {
                await conn.query('INSERT INTO app_brands (company_name, contact_email, contact_phone, website_url, logo_path, address) VALUES (?, ?, ?, ?, ?, ?)', 
                    [b.name, b.email, b.phone, b.website, b.logo, b.address]);
            } else {
                await conn.query('UPDATE app_brands SET contact_email=?, contact_phone=?, website_url=?, logo_path=?, address=? WHERE id = ?', 
                    [b.email, b.phone, b.website, b.logo, b.address, existing[0].id]);
            }
        }
        console.log(`Synced ${realData.brands.length} brands.`);

        console.log('--- SYNCING PRODUCTS ---');
        let prodCount = 0;
        for (const p of realData.products) {
            const brandId = parseInt(p.brand_id) || 0;
            const categoryId = parseInt(p.category_id) || 0;
            
            const [existing] = await conn.query('SELECT id FROM app_products WHERE name = ? AND brand_id = ?', [p.name || 'Unnamed Product', brandId]);
            if (existing.length === 0) {
                await conn.query('INSERT INTO app_products (name, brand_id, category_id, price, material, image_path, description, status, unit, weight, size, specifications) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [p.name || 'Unnamed Product', brandId, categoryId, p.price || '', p.material || '', p.image || '', p.description || '', p.status || 'active', p.unit || '', p.weight || '', p.size || '', p.specs || '']);
                prodCount++;
            }
        }
        console.log(`Imported ${prodCount} new products.`);

        console.log('Sync complete!');
        await conn.end();
    } catch (err) {
        console.error('Sync Error:', err.message);
    }
}

syncData();
