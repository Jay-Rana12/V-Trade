const mysql = require('mysql2/promise');
const fs = require('fs');

async function checkLogos() {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'u728463759_Vitrade'
    };
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("SELECT company_name, logo_path FROM app_brands WHERE logo_path IS NOT NULL AND logo_path != '' LIMIT 10");
        fs.writeFileSync('brands_with_logos.json', JSON.stringify(rows, null, 2));
        await connection.end();
    } catch (err) {
        fs.writeFileSync('brands_error.txt', err.message);
    }
}
checkLogos();
