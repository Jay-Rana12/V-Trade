const mysql = require('mysql2/promise');
const fs = require('fs');

async function listTables() {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'u728463759_Vitrade'
    };
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("SHOW TABLES");
        fs.writeFileSync('db_tables.json', JSON.stringify(rows, null, 2));
        await connection.end();
    } catch (err) {
        fs.writeFileSync('tables_error.txt', err.message);
    }
}
listTables();
