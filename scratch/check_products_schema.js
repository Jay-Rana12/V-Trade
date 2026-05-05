const mysql = require('mysql2/promise');

async function check() {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'u728463759_Vitrade'
    };
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query('DESCRIBE app_products');
    console.log(JSON.stringify(rows, null, 2));
    await connection.end();
}
check();
