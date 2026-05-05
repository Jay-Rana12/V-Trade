const mysql = require('mysql2/promise');

async function checkKitchenwareBrands() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'u728463759_Vitrade'
    });

    try {
        console.log('--- BRANDS WITH KITCHENWARE PRODUCTS (CAT ID 1) ---');
        const sql = `SELECT DISTINCT b.id, b.company_name 
                    FROM app_brands b 
                    INNER JOIN app_products p ON b.id = p.brand_id 
                    WHERE p.category_id = 1`;
        const [brands] = await connection.execute(sql);
        console.table(brands);

        console.log('\n--- ALL BRANDS ---');
        const [allBrands] = await connection.execute('SELECT id, company_name FROM app_brands LIMIT 20');
        console.table(allBrands);

    } catch (err) {
        console.error(err);
    } finally {
        await connection.end();
    }
}

checkKitchenwareBrands();
