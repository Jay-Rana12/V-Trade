const mysql = require('mysql2/promise');

async function describeTable() {
    const dbConfig = { host: 'localhost', user: 'root', password: '', database: 'u728463759_Vitrade' };
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('DESCRIBE app_blogs');
        console.table(rows);
        await connection.end();
    } catch (err) { console.error(err); }
}
describeTable();
