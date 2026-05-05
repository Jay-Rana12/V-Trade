const mysql = require('mysql2/promise');
const fs = require('fs');

async function checkDb() {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'u728463759_Vitrade'
    };
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("SELECT DISTINCT b.company_name, p.category_id FROM app_brands b INNER JOIN app_products p ON b.id = p.brand_id");
        fs.writeFileSync('db_full_check.json', JSON.stringify(rows, null, 2));
        await connection.end();
    } catch (err) {
        fs.writeFileSync('db_check_error.txt', err.message);
    }
}
checkDb();
