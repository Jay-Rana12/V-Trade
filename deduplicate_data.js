const mysql = require('mysql2/promise');
const dbConfig = { host: 'localhost', user: 'root', password: '', database: 'u728463759_Vitrade' };
async function deduplicate() {
    try {
        const conn = await mysql.createConnection(dbConfig);
        console.log('--- Deduplicating BRANDS ---');
        const [brands] = await conn.query('SELECT company_name, COUNT(*) as count FROM app_brands GROUP BY company_name HAVING count > 1');
        console.log(`Found ${brands.length} duplicate brand names.`);
        
        for (const brand of brands) {
            const [rows] = await conn.query('SELECT id FROM app_brands WHERE company_name = ? ORDER BY id ASC', [brand.company_name]);
            const keepId = rows[0].id;
            const deleteIds = rows.slice(1).map(r => r.id);
            if (deleteIds.length > 0) {
                await conn.query('DELETE FROM app_brands WHERE id IN (?)', [deleteIds]);
                console.log(`Deleted ${deleteIds.length} duplicates for brand: ${brand.company_name}`);
            }
        }

        console.log('--- Deduplicating PRODUCTS ---');
        const [products] = await conn.query('SELECT name, brand_id, COUNT(*) as count FROM app_products GROUP BY name, brand_id HAVING count > 1');
        console.log(`Found ${products.length} duplicate product entries (same name & brand).`);
        
        for (const prod of products) {
            const [rows] = await conn.query('SELECT id FROM app_products WHERE name = ? AND brand_id = ? ORDER BY id ASC', [prod.name, prod.brand_id]);
            const keepId = rows[0].id;
            const deleteIds = rows.slice(1).map(r => r.id);
            if (deleteIds.length > 0) {
                await conn.query('DELETE FROM app_products WHERE id IN (?)', [deleteIds]);
                // console.log(`Deleted ${deleteIds.length} duplicates for product: ${prod.name}`);
            }
        }

        console.log('Deduplication complete!');
        await conn.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}
deduplicate();
