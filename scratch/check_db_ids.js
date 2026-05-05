const mysql = require('mysql2/promise');

async function checkCategories() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'u728463759_Vitrade'
    });

    try {
        console.log('--- ALL CATEGORIES ---');
        const [cats] = await connection.execute('SELECT * FROM app_categories');
        console.table(cats);

        console.log('\n--- SAMPLE BRANDS FROM RECENT PRODUCTS ---');
        const [brands] = await connection.execute(`SELECT DISTINCT b.company_name, p.category_id 
                                                 FROM app_products p 
                                                 INNER JOIN app_brands b ON p.brand_id = b.id 
                                                 LIMIT 20`);
        console.table(brands);

    } catch (err) {
        console.error(err);
    } finally {
        await connection.end();
    }
}

checkCategories();
