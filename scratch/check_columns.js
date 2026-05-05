const mysql = require('mysql2/promise');
const fs = require('fs');

async function checkColumns() {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'u728463759_Vitrade'
    };
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("DESCRIBE app_brands");
        fs.writeFileSync('app_brands_columns.json', JSON.stringify(rows, null, 2));
        await connection.end();
    } catch (err) {
        fs.writeFileSync('columns_error.txt', err.message);
    }
}
checkColumns();
