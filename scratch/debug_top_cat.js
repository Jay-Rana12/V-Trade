const mysql = require('mysql2/promise');

async function check() {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'u728463759_Vitrade'
    };
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query('SELECT name, top_category, tags FROM app_products WHERE top_category IS NOT NULL AND top_category != ""');
    console.log(JSON.stringify(rows, null, 2));
    await connection.end();
}
check();
