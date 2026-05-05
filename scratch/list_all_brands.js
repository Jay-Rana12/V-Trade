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
        const [rows] = await connection.execute("SELECT company_name FROM app_brands ORDER BY company_name");
        fs.writeFileSync('all_brands_names.json', JSON.stringify(rows.map(r => r.company_name), null, 2));
        await connection.end();
    } catch (err) {
        fs.writeFileSync('db_check_error.txt', err.message);
    }
}
checkDb();
